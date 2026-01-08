import { useState, useEffect } from "react";
import axios from "axios";
import { Target } from 'lucide-react';

export default function Goals({ user }) {
    const [data, setData] = useState({ stats: {}, list: [] });

    useEffect(() => {
        if (user && user.username) {
            axios.get(`http://localhost:3001/api/goals/${user.username}`)
                .then(res => setData(res.data))
                .catch(err => console.error(err));
        }
    }, [user]);

    const stats = data.stats || {};

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-800">Οι Στόχοι μου</h1>

            {/* Στατιστικά */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-lg">
                            <Target size={32} />
                        </div>
                        <div>
                            <p className="text-indigo-100 text-sm">Ποσοστό Επίτευξης</p>
                            <p className="text-3xl font-bold">{stats.overall_progress || 0}%</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-slate-500 text-sm uppercase font-semibold">Αποταμίευση (Τρέχον Έτος)</h3>
                    <p className="text-3xl font-bold mt-2 text-indigo-600">{stats.total_savings_current_year || 0} €</p>
                </div>
            </div>

            {/* Λίστα Στόχων */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.list && data.list.map(goal => {
                    const progress = goal.target_amount > 0 ? (goal.saved_so_far / goal.target_amount) * 100 : 0;
                    return (
                        <div key={goal.goal_id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 relative overflow-hidden">
                            <h3 className="font-bold text-lg text-slate-800 mb-1">{goal.name}</h3>
                            <p className="text-sm text-slate-500 mb-4">Στόχος: {goal.target_amount}€</p>
                            
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-2xl font-bold text-indigo-600">{goal.saved_so_far}€</span>
                                <span className="text-sm font-medium text-slate-400">{Math.round(progress)}%</span>
                            </div>

                            <div className="w-full bg-slate-100 rounded-full h-2">
                                <div 
                                    className="bg-indigo-500 h-2 rounded-full transition-all duration-500" 
                                    style={{ width: `${Math.min(progress, 100)}%` }}
                                ></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}