import { useEffect, useState } from "react";
import axios from "axios";

export default function Goals() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/goals/Alexandros`)
      .then(res => setData(res.data));
  }, []);

  if (!data) return <div>Φόρτωση...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-slate-800">Στόχοι & Αποταμίευση</h1>
      
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-8 rounded-xl shadow-lg mb-8">
        <h2 className="text-xl opacity-90">Συνολική Πρόοδος</h2>
        <div className="mt-4 flex items-end gap-2">
            <span className="text-4xl font-bold">{data.stats.total_saved}€</span>
            <span className="text-lg opacity-75 mb-1">/ {data.stats.total_goals_amount}€</span>
        </div>
        <div className="w-full bg-black/20 mt-4 rounded-full h-2">
            <div className="bg-white h-2 rounded-full transition-all duration-1000" 
                 style={{ width: `${(data.stats.total_saved / data.stats.total_goals_amount) * 100}%` }}></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.list.map((goal) => (
            <div key={goal.goal_id} className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="font-bold text-lg text-slate-800">{goal.name}</h3>
                <div className="mt-4 flex justify-between text-sm text-slate-500">
                    <span>Έχουν μαζευτεί</span>
                    <span>Στόχος</span>
                </div>
                <div className="flex justify-between font-semibold mt-1">
                    <span className="text-green-600">{goal.saved_so_far}€</span>
                    <span>{goal.target_amount}€</span>
                </div>
                <div className="w-full bg-gray-100 mt-3 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" 
                         style={{ width: `${Math.min((goal.saved_so_far / goal.target_amount) * 100, 100)}%` }}></div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}