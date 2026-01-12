import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './Dashboard.css'; 

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const { api } = useOutletContext(); // Get the authenticated api client
    const [balance, setBalance] = useState('0.00');
    const [goals, setGoals] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [chartData, setChartData] = useState(null);
    
    useEffect(() => {
        if (!api) return;

        const fetchData = async () => {
            try {
                // All requests now use the authenticated 'api' instance
                // The backend identifies the user via the JWT token

                // Fetch Balance
                const balRes = await api.get(`/balance`);
                if (balRes.data.length > 0) {
                    setBalance(balRes.data[0].balance);
                }

                // Fetch Goals
                const goalRes = await api.get(`/goals`);
                if (goalRes.data.list && goalRes.data.list.length > 0) {
                    setGoals(goalRes.data.list);
                }

                // Fetch Recent Transactions
                const transRes = await api.get(`/recent-transactions`);
                setTransactions(transRes.data);

                // Fetch Expenses for Chart
                const expRes = await api.get(`/expenses`);
                const allExpenses = expRes.data;
                const categoryTotals = {};
                allExpenses.forEach(exp => {
                    const cat = exp.category_type;
                    const amount = parseFloat(exp.expense_amount);
                    if (categoryTotals[cat]) {
                        categoryTotals[cat] += amount;
                    } else {
                        categoryTotals[cat] = amount;
                    }
                });

                setChartData({
                    labels: Object.keys(categoryTotals),
                    datasets: [
                        {
                            data: Object.values(categoryTotals),
                            backgroundColor: ['#6C5DD3', '#FF754C', '#FFA600', '#56CCF2', '#FF5B5B', '#2ac769'],
                            borderWidth: 0,
                        },
                    ],
                });

            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchData();
    }, [api]); // Rerun effect if the api client instance changes

    return (
        <div className="dashboard-container">
            
            <div className="dashboard-header">
                <div className="logo-text">Dashboard</div>
            </div>

            <div className="info-grid">
                <div className="info-card">
                    <h2>Current Balance</h2>
                    <div className="value-text">{parseFloat(balance).toLocaleString('el-GR', { minimumFractionDigits: 2 })} €</div>
                    <div className="sub-text">Income - Expenses</div>
                </div>

                <div className="info-card">
                    <h2>Active Goals</h2>
                    <div style={{ maxHeight: '150px', overflowY: 'auto', paddingRight: '5px' }}>
                        {goals.length > 0 ? (
                            goals.map((goal) => (
                                <div key={goal.goal_id} style={{ marginBottom: '15px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: '600', color: '#2d3436' }}>
                                        <span>{goal.name}</span>
                                        <span>{parseFloat(goal.saved_so_far || 0).toLocaleString('el-GR')} / {parseFloat(goal.target_amount).toLocaleString('el-GR')}€</span>
                                    </div>
                                    <div style={{ width: '100%', backgroundColor: '#eee', height: '6px', borderRadius: '3px', marginTop: '5px' }}>
                                        <div style={{ width: `${Math.min(((goal.saved_so_far || 0) / goal.target_amount) * 100, 100)}%`, backgroundColor: '#6C5DD3', height: '100%', borderRadius: '3px' }}></div>
                                    </div>
                                </div>
                            ))
                        ) : (<p className="sub-text">No active goals found.</p>)}
                    </div>
                </div>

                <div className="info-card">
                    <h2>Expense Distribution</h2>
                    <div className="chart-wrapper">
                        {chartData ? <Doughnut data={chartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, cutout: '75%' }} /> : <p>Loading Chart...</p>}
                    </div>
                </div>
            </div>

            {/* NEW: Recent Transactions Table */}
            <div className="table-section">
                <h2 className="table-title">Recent Transactions</h2>
                <table className="expense-table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.length > 0 ? (
                            transactions.map((item, index) => {
                                const isIncome = item.type === 'income';
                                const isLoan = item.type === 'loan';
                                const color = isIncome ? '#2ac769' : isLoan ? '#D97706' : '#FF5B5B';
                                const prefix = isIncome ? '+' : isLoan ? '~' : '-';

                                return (
                                    <tr key={index}>
                                        <td><span style={{ fontWeight: '500' }}>{item.description || item.type}</span></td>
                                        <td>{new Date(item.date).toLocaleDateString('el-GR')}</td>
                                        <td style={{ color: color, fontWeight: 'bold' }}>
                                            {prefix} {parseFloat(item.amount).toLocaleString('el-GR', { minimumFractionDigits: 2 })}€
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="3" style={{ textAlign: 'center', color: '#999' }}>No recent transactions found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;