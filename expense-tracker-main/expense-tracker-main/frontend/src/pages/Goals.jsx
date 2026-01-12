import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { PlusCircle, PiggyBank } from "lucide-react";

export default function Goals() {
  const { api } = useOutletContext(); // Get authenticated api client
  const [data, setData] = useState(null);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showSavingsModal, setShowSavingsModal] = useState(false);
  const [refresh, setRefresh] = useState(false); // To reload data

  // State for forms
  const [newGoal, setNewGoal] = useState({ name: '', target: '' });
  const [newSaving, setNewSaving] = useState({ amount: '', date: new Date().toISOString().split('T')[0] });

  useEffect(() => {
    if (!api) return;

    api.get(`/goals`)
      .then(res => setData(res.data))
      .catch(err => console.error("Failed to fetch goals:", err));
  }, [api, refresh]);

  // --- HANDLERS ---
  const handleAddGoal = async (e) => {
    e.preventDefault();
    try {
        // Backend gets user_id from the token
        await api.post(`/goals/add`, { 
            name: newGoal.name, 
            target_amount: newGoal.target 
        });
        setShowGoalModal(false);
        setNewGoal({ name: '', target: '' });
        setRefresh(!refresh); // Trigger data reload
    } catch (error) {
        console.error('Error adding goal:', error);
        alert('Error adding goal');
    }
  };

  const handleAddSaving = async (e) => {
    e.preventDefault();
    try {
        // Backend gets user_id from the token
        await api.post(`/savings/add`, { 
            amount: newSaving.amount, 
            date: newSaving.date 
        });
        setShowSavingsModal(false);
        setNewSaving({ amount: '', date: new Date().toISOString().split('T')[0] });
        setRefresh(!refresh);
    } catch (error) {
        console.error('Error adding savings:', error);
        alert('Error adding savings');
    }
  };

  const handleDeleteGoal = async (goalId) => {
    if (!window.confirm("Are you sure you want to delete this goal? This action cannot be undone.")) {
        return;
    }
    try {
        await api.delete(`/goals/${goalId}`);
        setRefresh(!refresh);
    } catch (error) {
        console.error('Error deleting goal:', error);
        alert('Error deleting goal');
    }
  };

  const handleAchieveGoal = async (goalId) => {
    if (!window.confirm("Are you sure you want to mark this goal as achieved? This will update your savings.")) {
        return;
    }
    try {
        await api.post(`/goals/achieve`, { goal_id: goalId });
        setRefresh(!refresh);
    } catch (error) {
        console.error('Error marking goal as achieved:', error);
        alert('Error marking goal as achieved');
    }
  };

  if (!data) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-6 relative">
      
      {/* HEADER & ACTIONS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-slate-800">Goals & Savings</h1>
          
          <div className="flex gap-3">
              <button 
                  onClick={() => setShowGoalModal(true)}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition shadow-md"
              >
                  <PlusCircle size={20} /> Add Goal
              </button>
              <button 
                  onClick={() => setShowSavingsModal(true)}
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition shadow-md"
              >
                  <PiggyBank size={20} /> Add Savings
              </button>
          </div>
      </div>
      
      {/* TOTAL PROGRESS CARD */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-8 rounded-xl shadow-lg mb-8">
        <h2 className="text-xl opacity-90">Total Progress</h2>
        <div className="mt-4 flex items-end gap-2">
            <span className="text-4xl font-bold">
                {parseFloat(data.stats.total_saved || 0).toLocaleString('en-US', {minimumFractionDigits: 2})}€
            </span>
            <span className="text-lg opacity-75 mb-1">
                / {parseFloat(data.stats.total_goals_amount || 0).toLocaleString('en-US', {minimumFractionDigits: 2})}€
            </span>
        </div>
        <div className="w-full bg-black/20 mt-4 rounded-full h-2">
            <div className="bg-white h-2 rounded-full transition-all duration-1000" 
                 style={{ width: `${(data.stats.total_goals_amount > 0 ? Math.min((data.stats.total_saved / data.stats.total_goals_amount) * 100, 100) : 0)}%` }}></div>
        </div>
        <p className="mt-2 text-sm opacity-80">
            Total accumulated savings vs total target of all goals.
        </p>
      </div>

      {/* GOALS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.list.map((goal) => (
            <div key={goal.goal_id} className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition">
                <h3 className="font-bold text-lg text-slate-800">{goal.name}</h3>
                <div className="mt-4 flex justify-between text-sm text-slate-500">
                    <span>Saved (Total)</span>
                    <span>Target</span>
                </div>
                <div className="flex justify-between font-semibold mt-1">
                    <span className="text-green-600">{parseFloat(goal.saved_so_far || 0).toLocaleString('en-US')}€</span>
                    <span>{parseFloat(goal.target_amount).toLocaleString('en-US')}€</span>
                </div>
                <div className="w-full bg-gray-100 mt-3 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" 
                         style={{ width: `${(goal.target_amount > 0 ? Math.min(((goal.saved_so_far || 0) / goal.target_amount) * 100, 100) : 0)}%` }}></div>
                </div>
                {goal.achieved ? (
                    <p className="text-sm text-center text-green-600 mt-4">Goal Achieved!</p>
                ) : (
                    <div className="flex justify-end gap-2 mt-4">
                        <button 
                            onClick={() => handleDeleteGoal(goal.goal_id)}
                            className="text-sm text-red-600 hover:text-red-800 px-3 py-1 rounded border border-red-600 hover:border-red-800 transition"
                        >
                            Delete
                        </button>
                        <button 
                            onClick={goal.saved_so_far >= goal.target_amount ? () => handleAchieveGoal(goal.goal_id) : undefined}
                            className={`text-sm text-white px-3 py-1 rounded shadow-sm transition ${
                                goal.saved_so_far >= goal.target_amount 
                                    ? 'bg-green-500 hover:bg-green-600' 
                                    : 'bg-gray-400 cursor-not-allowed'
                            }`}
                            disabled={goal.saved_so_far < goal.target_amount}
                        >
                            Achieve
                        </button>
                    </div>
                )}
            </div>
        ))}
      </div>

      {/* --- MODAL: ADD GOAL --- */}
      {showGoalModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-96">
                <h2 className="text-2xl font-bold mb-4">Add New Goal</h2>
                <form onSubmit={handleAddGoal} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Goal Name</label>
                        <input 
                            type="text" required
                            className="w-full p-2 border rounded mt-1"
                            value={newGoal.name}
                            onChange={e => setNewGoal({...newGoal, name: e.target.value})}
                            placeholder="e.g., New Car"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Target Amount (€)</label>
                        <input 
                            type="number" step="0.01" required
                            className="w-full p-2 border rounded mt-1"
                            value={newGoal.target}
                            onChange={e => setNewGoal({...newGoal, target: e.target.value})}
                            placeholder="e.g., 5000"
                        />
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                        <button type="button" onClick={() => setShowGoalModal(false)} className="text-gray-500 hover:text-gray-700">Cancel</button>
                        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Save Goal</button>
                    </div>
                </form>
            </div>
        </div>
      )}

      {/* --- MODAL: ADD SAVINGS --- */}
      {showSavingsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-96">
                <h2 className="text-2xl font-bold mb-4">Add Savings</h2>
                <p className="text-xs text-gray-500 mb-4">Adding to general savings pool (Table: Savings)</p>
                <form onSubmit={handleAddSaving} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Amount (€)</label>
                        <input 
                            type="number" step="0.01" required
                            className="w-full p-2 border rounded mt-1"
                            value={newSaving.amount}
                            onChange={e => setNewSaving({...newSaving, amount: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input 
                            type="date" required
                            className="w-full p-2 border rounded mt-1"
                            value={newSaving.date}
                            onChange={e => setNewSaving({...newSaving, date: e.target.value})}
                        />
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                        <button type="button" onClick={() => setShowSavingsModal(false)} className="text-gray-500 hover:text-gray-700">Cancel</button>
                        <button type="submit" className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700">Save Entry</button>
                    </div>
                </form>
            </div>
        </div>
      )}

    </div>
  );
}