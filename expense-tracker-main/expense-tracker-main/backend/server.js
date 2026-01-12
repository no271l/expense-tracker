const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const controllers = require('./controllers');
require('dotenv').config();

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// In a real application, use an environment variable for the secret key!
const JWT_SECRET = 'your_super_secret_key_change_me';

// --- Public Routes ---
app.post('/api/register', controllers.registerUser);
app.post('/api/login', controllers.loginUser);

// --- Authentication Middleware ---
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token == null) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        req.user = user; // Add the decoded user payload to the request
        next();
    });
};

// --- Protected Routes ---
// All routes below this point require a valid token.
app.use(authenticateToken);

app.get('/api/balance', controllers.getBalance);
app.get('/api/expenses', controllers.getExpenses);
app.get('/api/goals', controllers.getGoals);
app.get('/api/transactions', controllers.getTransactions);
app.get('/api/recent-transactions', controllers.getRecentTransactions);
app.get('/api/subcategories', controllers.getSubcategories);
app.get('/api/profile', controllers.getUserProfile); // Changed from /:username

app.post('/api/expenses', controllers.addExpense);
app.post('/api/goals/add', controllers.addGoal);
app.delete('/api/goals/:goal_id', controllers.deleteGoal);
app.post('/api/goals/achieve', controllers.achieveGoal);
app.post('/api/savings/add', controllers.addSavings);
app.post('/api/income/add', controllers.addIncome);
app.post('/api/loans/add', controllers.addLoan);


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});