const db = require('./db');
const bcrypt = require('bcrypt');
// TODO: User needs to run `npm install jsonwebtoken`
const jwt = require('jsonwebtoken');

// IMPORTANT: In a real application, use an environment variable for the secret key!
const JWT_SECRET = 'your_super_secret_key_change_me';

// --- Protected Route Controllers ---
// Note: All these functions now expect `req.user` from the `authenticateToken` middleware.

exports.getBalance = async (req, res) => {
    try {
        const { username } = req.user.user;
        const [rows] = await db.query(
            'SELECT * FROM view_user_monthly_balance WHERE username = ? ORDER BY year DESC, month DESC',
            [username]
        );
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getExpenses = async (req, res) => {
    try {
        const { username } = req.user.user;
        const [rows] = await db.query(
            'SELECT * FROM view_user_expense_details WHERE username = ? ORDER BY expense_date DESC LIMIT 50',
            [username]
        );
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getGoals = async (req, res) => {
    try {
        const { username } = req.user.user;
        
        const [stats] = await db.query('SELECT * FROM view_user_goal_progress WHERE username = ?', [username]);
        
        const [list] = await db.query(`
            SELECT g.goal_id, g.name, g.target_amount, 
            (SELECT COALESCE(SUM(amount), 0) FROM savings s WHERE s.user_id = g.user_id) as saved_so_far
            FROM goal g 
            JOIN user u ON g.user_id = u.user_id 
            WHERE u.username = ?`, [username]);

        res.json({ stats: stats[0] || {}, list });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getTransactions = async (req, res) => {
    try {
        const { id: user_id } = req.user.user;
        const { type, dateFrom, dateTo, category, subcategory, source } = req.query;

        let query = '';
        const params = [user_id];

        switch (type) {
            case 'expense':
                query = `
                    SELECT e.date, e.amount, e.category_type, e.description, s.name as subcategory_name, 'expense' as type
                    FROM expense e
                    LEFT JOIN expense_subcategory es ON e.user_id = es.user_id AND e.expense_id = es.expense_id
                    LEFT JOIN subcategory s ON es.user_id = s.user_id AND es.subcategory_id = s.subcategory_id
                    WHERE e.user_id = ?
                `;
                if (dateFrom && dateTo) {
                    query += ` AND e.date BETWEEN ? AND ?`;
                    params.push(dateFrom, dateTo);
                }
                if (category) {
                    query += ` AND e.category_type = ?`;
                    params.push(category);
                }
                if (subcategory) {
                    query += ` AND s.subcategory_id = ?`;
                    params.push(subcategory);
                }
                break;
            case 'income':
                query = `SELECT date, amount, income_source, description, 'income' as type FROM income WHERE user_id = ?`;
                if (dateFrom && dateTo) {
                    query += ` AND date BETWEEN ? AND ?`;
                    params.push(dateFrom, dateTo);
                }
                if (source) {
                    query += ` AND income_source = ?`;
                    params.push(source);
                }
                break;
            case 'loan':
                query = `SELECT loan_date as date, amount, debtor_name as description, 'loan' as type FROM loan WHERE user_id = ?`;
                if (dateFrom && dateTo) {
                    query += ` AND loan_date BETWEEN ? AND ?`;
                    params.push(dateFrom, dateTo);
                }
                break;
            case 'savings':
                query = `SELECT date, amount, 'Savings' as description, 'savings' as type FROM savings WHERE user_id = ?`;
                if (dateFrom && dateTo) {
                    query += ` AND date BETWEEN ? AND ?`;
                    params.push(dateFrom, dateTo);
                }
                break;
            default:
                return res.status(400).json({ error: 'Invalid transaction type specified.' });
        }

        query += ` ORDER BY date DESC LIMIT 100`;

        const [transactions] = await db.query(query, params);
        res.json(transactions);

    } catch (err) {
        console.error("Error in getTransactions:", err);
        res.status(500).json({ error: 'Database error: ' + err.message });
    }
};

exports.getRecentTransactions = async (req, res) => {
    try {
        const { id: user_id } = req.user.user;

        const query = `
            (SELECT description, amount, date, 'income' as type FROM income WHERE user_id = ?)
            UNION ALL
            (SELECT description, amount, date, 'expense' as type FROM expense WHERE user_id = ?)
            UNION ALL
            (SELECT debtor_name as description, amount, loan_date as date, 'loan' as type FROM loan WHERE user_id = ?)
            ORDER BY date DESC
            LIMIT 20;
        `;

        const [transactions] = await db.query(query, [user_id, user_id, user_id]);
        res.json(transactions);

    } catch (err) {
        console.error("Error in getRecentTransactions:", err);
        res.status(500).json({ error: 'Database error: ' + err.message });
    }
};

exports.addExpense = async (req, res) => {
    const { amount, date, category_type, description, subcategory_id, new_subcategory_name } = req.body;
    const { id: user_id } = req.user.user; // Get user_id from token
    
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // Step 1: Create the main expense record
        const [expenseIdRows] = await connection.query('SELECT MAX(expense_id) as maxId FROM expense WHERE user_id = ?', [user_id]);
        const nextExpenseId = (expenseIdRows[0].maxId || 0) + 1;

        await connection.query(
            'INSERT INTO expense (user_id, expense_id, amount, date, category_type, description) VALUES (?, ?, ?, ?, ?, ?)',
            [user_id, nextExpenseId, amount, date, category_type, description]
        );

        // For simplicity, we'll classify all manually added expenses as 'one-time' for now
        await connection.query(
            'INSERT INTO one_time_expense (user_id, expense_id) VALUES (?, ?)',
            [user_id, nextExpenseId]
        );

        // Step 2: Handle the subcategory logic
        let final_subcategory_id = subcategory_id;

        // If a new subcategory name is provided, process it
        if (new_subcategory_name && category_type) {
            // Check if it already exists for this user and category
            const [existing] = await connection.query(
                'SELECT subcategory_id FROM subcategory WHERE user_id = ? AND name = ? AND category_type = ?',
                [user_id, new_subcategory_name, category_type]
            );

            if (existing.length > 0) {
                // Use the existing subcategory's ID
                final_subcategory_id = existing[0].subcategory_id;
            } else {
                // Create the new subcategory
                const [maxSubIdRow] = await connection.query('SELECT MAX(subcategory_id) as maxId FROM subcategory WHERE user_id = ?', [user_id]);
                const nextSubId = (maxSubIdRow[0].maxId || 0) + 1;

                await connection.query(
                    'INSERT INTO subcategory (user_id, subcategory_id, name, category_type) VALUES (?, ?, ?, ?)',
                    [user_id, nextSubId, new_subcategory_name, category_type]
                );
                final_subcategory_id = nextSubId;
            }
        }

        // Step 3: If there's a subcategory to link, link it
        if (final_subcategory_id) {
            await connection.query(
                'INSERT INTO expense_subcategory (user_id, expense_id, subcategory_id) VALUES (?, ?, ?)',
                [user_id, nextExpenseId, final_subcategory_id]
            );
        }

        await connection.commit();
        res.json({ message: 'Expense added successfully', expenseId: nextExpenseId });

    } catch (err) {
        await connection.rollback();
        console.error("Error in addExpense:", err);
        res.status(500).json({ error: err.message });
    } finally {
        connection.release();
    }
};

exports.addIncome = async (req, res) => {
    const { amount, date, income_source, description } = req.body;
    const { id: user_id } = req.user.user; // Get user_id from token

    if (!amount || !date || !income_source) {
        return res.status(400).json({ error: 'Missing required fields: amount, date, income_source' });
    }

    let connection;
    try {
        connection = await db.getConnection();
        await connection.beginTransaction();

        const [rows] = await connection.query('SELECT MAX(income_id) as maxId FROM income WHERE user_id = ?', [user_id]);
        const nextId = (rows[0].maxId || 0) + 1;

        await connection.query(
            'INSERT INTO income (user_id, income_id, amount, date, income_source, description) VALUES (?, ?, ?, ?, ?, ?)',
            [user_id, nextId, amount, date, income_source, description || null]
        );

        await connection.commit();
        res.status(201).json({ message: 'Income added successfully', incomeId: nextId });

    } catch (err) {
        if (connection) await connection.rollback();
        res.status(500).json({ error: 'Database error: ' + err.message });
    } finally {
        if (connection) connection.release();
    }
};

exports.addLoan = async (req, res) => {
    const { amount, loan_date, payout_date, debtor_name } = req.body;
    const { id: user_id } = req.user.user; // Get user_id from token

    if (!amount || !loan_date) {
        return res.status(400).json({ error: 'Missing required fields: amount, loan_date' });
    }

    let connection;
    try {
        connection = await db.getConnection();
        await connection.beginTransaction();

        const [rows] = await connection.query('SELECT MAX(loan_id) as maxId FROM loan WHERE user_id = ?', [user_id]);
        const nextId = (rows[0].maxId || 0) + 1;

        await connection.query(
            'INSERT INTO loan (user_id, loan_id, amount, loan_date, payout_date, debtor_name) VALUES (?, ?, ?, ?, ?, ?)',
            [user_id, nextId, amount, loan_date, payout_date || null, debtor_name || null]
        );

        await connection.commit();
        res.status(201).json({ message: 'Loan added successfully', loanId: nextId });

    } catch (err) {
        if (connection) await connection.rollback();
        res.status(500).json({ error: 'Database error: ' + err.message });
    } finally {
        if (connection) connection.release();
    }
};

exports.getSubcategories = async (req, res) => {
    try {
        const { id: user_id } = req.user.user; // Get user_id from token
        const [rows] = await db.query('SELECT * FROM subcategory WHERE user_id = ?', [user_id]);
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getUserProfile = async (req, res) => {
    try {
        // The user's info is already in the token, just return it
        const { username, email } = req.user.user;
        res.json({ username, email });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.addGoal = async (req, res) => {
    const { name, target_amount } = req.body;
    const { id: user_id } = req.user.user; // Get user_id from token

    if (!name || !target_amount) {
        return res.status(400).json({ error: 'Missing required fields: name, target_amount' });
    }

    let connection;
    try {
        connection = await db.getConnection();
        await connection.beginTransaction();

        const [rows] = await connection.query('SELECT MAX(goal_id) as maxId FROM goal WHERE user_id = ?', [user_id]);
        const nextId = (rows[0].maxId || 0) + 1;

        await connection.query(
            'INSERT INTO goal (user_id, goal_id, name, target_amount) VALUES (?, ?, ?, ?)',
            [user_id, nextId, name, target_amount]
        );

        await connection.commit();
        res.status(201).json({ message: 'Goal added successfully', goalId: nextId });

    } catch (err) {
        if (connection) await connection.rollback();
        res.status(500).json({ error: 'Database error: ' + err.message });
    } finally {
        if (connection) connection.release();
    }
};

exports.deleteGoal = async (req, res) => {
    const { goal_id } = req.params;
    const { id: user_id } = req.user.user;

    if (!goal_id) {
        return res.status(400).json({ error: 'Goal ID is required.' });
    }

    try {
        const [result] = await db.query(
            'DELETE FROM goal WHERE user_id = ? AND goal_id = ?',
            [user_id, goal_id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Goal not found or user not authorized.' });
        }

        res.status(200).json({ message: 'Goal deleted successfully.' });

    } catch (err) {
        console.error("Error in deleteGoal:", err);
        res.status(500).json({ error: 'Database error: ' + err.message });
    }
};

exports.achieveGoal = async (req, res) => {
    const { goal_id } = req.body;
    const { id: user_id } = req.user.user;

    if (!goal_id) {
        return res.status(400).json({ error: 'Goal ID is required.' });
    }

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // 1. Get the goal details
        const [goals] = await connection.query(
            'SELECT * FROM goal WHERE user_id = ? AND goal_id = ?',
            [user_id, goal_id]
        );

        if (goals.length === 0) {
            throw new Error('Goal not found.');
        }
        const goal = goals[0];
        const amountToDeduct = goal.target_amount;

        // 2. Delete the goal
        await connection.query(
            'DELETE FROM goal WHERE user_id = ? AND goal_id = ?',
            [user_id, goal_id]
        );

        // 3. Insert a negative savings record to represent the withdrawal
        const [maxSavingsIdRow] = await connection.query('SELECT MAX(savings_id) as maxId FROM savings WHERE user_id = ?', [user_id]);
        const nextSavingsId = (maxSavingsIdRow[0].maxId || 0) + 1;
        
        await connection.query(
            'INSERT INTO savings (user_id, savings_id, amount, date) VALUES (?, ?, ?, NOW())',
            [user_id, nextSavingsId, -Math.abs(amountToDeduct)] // Ensure it's a negative value
        );

        await connection.commit();
        res.status(200).json({ message: 'Goal achieved successfully!' });

    } catch (err) {
        await connection.rollback();
        console.error("Error in achieveGoal:", err);
        res.status(500).json({ error: 'Database error: ' + err.message });
    } finally {
        connection.release();
    }
};

exports.addSavings = async (req, res) => {
    const { amount, date } = req.body;
    const { id: user_id } = req.user.user; // Get user_id from token

    if (!amount || !date) {
        return res.status(400).json({ error: 'Missing required fields: amount, date' });
    }

    let connection;
    try {
        connection = await db.getConnection();
        await connection.beginTransaction();

        const [rows] = await connection.query('SELECT MAX(savings_id) as maxId FROM savings WHERE user_id = ?', [user_id]);
        const nextId = (rows[0].maxId || 0) + 1;

        await connection.query(
            'INSERT INTO savings (user_id, savings_id, amount, date) VALUES (?, ?, ?, ?)',
            [user_id, nextId, amount, date]
        );

        await connection.commit();
        res.status(201).json({ message: 'Savings added successfully', savingsId: nextId });

    } catch (err) {
        if (connection) await connection.rollback();
        res.status(500).json({ error: 'Database error: ' + err.message });
    } finally {
        if (connection) connection.release();
    }
};

// --- Public Route Controllers ---

exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Please provide username, email, and password.' });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await db.query(
            'INSERT INTO user (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );

        res.status(201).json({ message: 'User registered successfully.' });

    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Email already exists.' });
        }
        res.status(500).json({ error: 'Database error: ' + err.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Please provide email and password.' });
    }

    try {
        const [rows] = await db.query('SELECT * FROM user WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        const user = rows[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        const payload = {
            user: {
                id: user.user_id,
                username: user.username,
                email: user.email
            }
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });

    } catch (err) {
        res.status(500).json({ error: 'Database error: ' + err.message });
    }
};