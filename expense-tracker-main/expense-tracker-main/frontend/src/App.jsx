import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, Outlet } from "react-router-dom";
import { LayoutDashboard, Wallet, Target, PlusCircle, Landmark, ArrowLeftRight, LogOut } from 'lucide-react';

import api from './api'; // Import the configured axios instance

import Dashboard from './components/DashBoard'; 
import Expenses from './pages/Expenses';
import Goals from './pages/Goals';
import AddExpense from './pages/AddExpense';
import AddIncome from './pages/AddIncome';
import AddLoan from './pages/AddLoan';
import Login from './pages/Login';
import Register from './pages/register';

// --- Main Layout with Sidebar for Authenticated Users ---
const MainLayout = ({ user, onLogout }) => {
    if (!user) {
        return <div className="flex h-screen items-center justify-center bg-gray-100">Loading...</div>;
    }
    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            <aside className="w-64 bg-slate-900 text-white flex flex-col flex-shrink-0">
                <div className="p-6 text-2xl font-bold text-blue-400">ExpTracker</div>
                
                <nav className="flex-1 px-4 space-y-2">
                    <NavItem to="/" icon={<LayoutDashboard size={20}/>} label="Επισκόπηση" />
                    <NavItem to="/expenses" icon={<Wallet size={20}/>} label="Κινήσεις" />
                    <NavItem to="/goals" icon={<Target size={20}/>} label="Στόχοι" />
                    
                    <div className="pt-4 space-y-2">
                        <Link to="/add" className="flex items-center gap-3 px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition">
                            <PlusCircle size={20} />
                            <span>Νέο Έξοδο</span>
                        </Link>
                        <Link to="/add-income" className="flex items-center gap-3 px-4 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white transition">
                            <Landmark size={20} />
                            <span>Νέο Έσοδο</span>
                        </Link>
                        <Link to="/add-loan" className="flex items-center gap-3 px-4 py-3 bg-amber-600 hover:bg-amber-700 rounded-lg text-white transition">
                            <ArrowLeftRight size={20} />
                            <span>Νέο Δάνειο</span>
                        </Link>
                    </div>
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <div className="text-xs text-slate-500">Logged in as:</div>
                    <div className="text-white font-semibold">{user.username}</div>
                    <button 
                        onClick={onLogout}
                        className="w-full mt-4 flex items-center justify-center gap-2 text-sm px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition"
                    >
                        <LogOut size={16} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-auto bg-gray-50">
                    <Outlet context={{ api }} />
                </main>
            </div>
        </div>
    );
};

const NavItem = ({ to, icon, label }) => (
    <Link to={to} className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition">
        {icon}
        <span>{label}</span>
    </Link>
);


function App() {
    // Check both storages on initial load
    const [token, setToken] = useState(localStorage.getItem("token") || sessionStorage.getItem("token"));
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                try {
                    const res = await api.get('/profile');
                    setUser(res.data);
                } catch (error) {
                    console.error("Failed to fetch user profile", error);
                    handleLogout();
                }
            } else {
                setUser(null);
            }
        };

        fetchUser();
    }, [token]);

    const handleLogin = (newToken, keepLoggedIn) => {
        if (keepLoggedIn) {
            localStorage.setItem("token", newToken);
        } else {
            sessionStorage.setItem("token", newToken);
        }
        setToken(newToken);
    };

    const handleLogout = () => {
        // Clear token from both storages
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    return (
        <Router>
            <Routes>
                {token ? (
                    <Route element={<MainLayout user={user} onLogout={handleLogout} />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/expenses" element={<Expenses />} />
                        <Route path="/goals" element={<Goals />} />
                        <Route path="/add" element={<AddExpense />} />
                        <Route path="/add-income" element={<AddIncome />} />
                        <Route path="/add-loan" element={<AddLoan />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Route>
                ) : (
                    <>
                        <Route path="/login" element={<Login onLogin={handleLogin} />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </>
                )}
            </Routes>
        </Router>
    );
}

export default App;