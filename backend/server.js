const express = require('express');
const cors = require('cors');
const controllers = require('./controllers');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/balance/:username', controllers.getBalance);
app.get('/api/expenses/:username', controllers.getExpenses);
app.get('/api/goals/:username', controllers.getGoals);
app.get('/api/subcategories/:userId', controllers.getSubcategories);
app.post('/api/expenses', controllers.addExpense);

// ΝΕΑ ROUTES (Προστέθηκαν για Login και Users)
app.post('/api/login', controllers.login);
app.get('/api/users', controllers.getAllUsers);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});