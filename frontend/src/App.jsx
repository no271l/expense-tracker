import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Goals from "./pages/Goals";
import AddExpense from "./pages/AddExpense";
import Login from "./pages/Login";
import { LayoutDashboard, Wallet, Target, PlusCircle, LogOut } from 'lucide-react';

function App() {
  // State για τον συνδεδεμένο χρήστη
  // Ελέγχουμε αν υπάρχει ήδη στο localStorage για να μην μας πετάει έξω στο refresh
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Αν δεν υπάρχει χρήστης, δείχνουμε ΜΟΝΟ το Login
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  // Αν υπάρχει χρήστης, δείχνουμε την εφαρμογή
  return (
    <Router>
      <div className="flex h-screen bg-gray-100 font-sans">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900 text-white flex flex-col">
          <div className="p-6 text-2xl font-bold text-blue-400">ExpTracker</div>
          
          <nav className="flex-1 px-4 space-y-2">
            <NavItem to="/" icon={<LayoutDashboard size={20}/>} label="Επισκόπηση" />
            <NavItem to="/expenses" icon={<Wallet size={20}/>} label="Κινήσεις" />
            <NavItem to="/goals" icon={<Target size={20}/>} label="Στόχοι" />
            
            <div className="pt-4">
                <Link to="/add" className="flex items-center gap-3 px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition">
                    <PlusCircle size={20} />
                    <span>Νέο Έξοδο</span>
                </Link>
            </div>
          </nav>

          <div className="p-4 border-t border-slate-800">
            <div className="text-xs text-slate-500 mb-2">Logged in as:</div>
            <div className="font-bold text-sm mb-4">{user.username}</div>
            
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm transition"
            >
              <LogOut size={16} /> Αποσύνδεση
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-8">
          <Routes>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/expenses" element={<Expenses user={user} />} />
            <Route path="/goals" element={<Goals user={user} />} />
            <Route path="/add" element={<AddExpense user={user} />} />
            {/* Αν πάει κάποιος στο /login ενώ είναι μέσα, τον γυρνάμε στο home */}
            <Route path="/login" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

const NavItem = ({ to, icon, label }) => (
  <Link to={to} className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition">
    {icon}
    <span>{label}</span>
  </Link>
);

export default App;