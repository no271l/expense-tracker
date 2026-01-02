const db = require('./db');

// 1. Dashboard: Χρήση του VIEW για υπόλοιπο
exports.getBalance = async (req, res) => {
    try {
        const username = req.params.username;
        const [rows] = await db.query(
            'SELECT * FROM View_User_Monthly_Balance WHERE username = ? ORDER BY year DESC, month DESC',
            [username]
        );
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// 2. Expenses List: Χρήση του VIEW για λεπτομέρειες
exports.getExpenses = async (req, res) => {
    try {
        const username = req.params.username;
        const [rows] = await db.query(
            'SELECT * FROM View_User_Expense_Details WHERE username = ? ORDER BY expense_date DESC LIMIT 50',
            [username]
        );
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// 3. Goals: Χρήση του VIEW για πρόοδο στόχων
exports.getGoals = async (req, res) => {
    try {
        const username = req.params.username;
        // Στατιστικά από το View
        const [stats] = await db.query('SELECT * FROM View_User_Goal_Progress WHERE username = ?', [username]);
        
        // Λίστα στόχων αναλυτικά
        const [list] = await db.query(`
            SELECT g.goal_id, g.name, g.target_amount, 
            (SELECT COALESCE(SUM(amount), 0) FROM savings s WHERE s.user_id = g.user_id) as saved_so_far
            FROM goal g 
            JOIN user u ON g.user_id = u.user_id 
            WHERE u.username = ?`, [username]);

        res.json({ stats: stats[0] || {}, list });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// 4. Add Expense: Σύνθετη λογική (Expense -> Expense_Subcategory)
exports.addExpense = async (req, res) => {
    const { user_id, amount, date, category_type, description, subcategory_id } = req.body;
    
    // Ξεκινάμε connection για Transaction (ώστε να γίνουν όλα ή τίποτα)
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // Εύρεση Next ID (επειδή δεν είναι auto_increment στο σχήμα)
        const [rows] = await connection.query('SELECT MAX(expense_id) as maxId FROM expense WHERE user_id = ?', [user_id]);
        const nextId = (rows[0].maxId || 0) + 1;

        // Βήμα 1: Εισαγωγή στο Expense
        await connection.query(
            'INSERT INTO expense (user_id, expense_id, amount, date, category_type, description) VALUES (?, ?, ?, ?, ?, ?)',
            [user_id, nextId, amount, date, category_type, description]
        );

        // Βήμα 2: Εισαγωγή στο One_Time_Expense (ως default, βάσει λογικής PDF)
        await connection.query(
            'INSERT INTO one_time_expense (user_id, expense_id) VALUES (?, ?)',
            [user_id, nextId]
        );

        // Βήμα 3: Σύνδεση με Subcategory (Αν υπάρχει)
        if (subcategory_id) {
            await connection.query(
                'INSERT INTO expense_subcategory (user_id, expense_id, subcategory_id) VALUES (?, ?, ?)',
                [user_id, nextId, subcategory_id]
            );
        }

        await connection.commit();
        res.json({ message: 'Expense added successfully', expenseId: nextId });

    } catch (err) {
        await connection.rollback();
        res.status(500).json({ error: err.message });
    } finally {
        connection.release();
    }
};

// Helper: Φέρε τις υποκατηγορίες για τη φόρμα
exports.getSubcategories = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM subcategory WHERE user_id = ?', [req.params.userId]);
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
};