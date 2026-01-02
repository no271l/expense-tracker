import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Goals from "./pages/Goals";
import AddExpense from "./pages/AddExpense";
import { LayoutDashboard, Wallet, Target, PlusCircle } from 'lucide-react';

function App() {
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
          <div className="p-4 text-xs text-slate-500 text-center">
            Logged in as: Alexandros
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/add" element={<AddExpense />} />
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