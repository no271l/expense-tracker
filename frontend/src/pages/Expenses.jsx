import { useState, useEffect } from "react";
import axios from "axios";

export default function Expenses({ user }) {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        if (user && user.username) {
            // Χρησιμοποιούμε το user.username από το prop
            axios.get(`http://localhost:3001/api/expenses/${user.username}`)
                .then(res => setExpenses(res.data))
                .catch(err => console.error(err));
        }
    }, [user]);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-800">Ιστορικό Κινήσεων</h1>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-600">
                        <tr>
                            <th className="p-4">Ημερομηνία</th>
                            <th className="p-4">Περιγραφή</th>
                            <th className="p-4">Κατηγορία</th>
                            <th className="p-4">Ποσό</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="p-4 text-center text-gray-500">Δεν βρέθηκαν κινήσεις.</td>
                            </tr>
                        ) : (
                            expenses.map((exp, idx) => (
                                <tr key={idx} className="border-t border-slate-100 hover:bg-slate-50">
                                    <td className="p-4">{new Date(exp.expense_date).toLocaleDateString('el-GR')}</td>
                                    <td className="p-4 font-medium">{exp.description || '-'}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold 
                                            ${exp.category_type === 'fixed' ? 'bg-blue-100 text-blue-700' : 
                                              exp.category_type === 'one_time' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100'}`}>
                                            {exp.category_type === 'fixed' ? 'Πάγιο' : 'Έκτακτο'}
                                        </span>
                                    </td>
                                    <td className="p-4 font-bold text-red-500">-{exp.amount}€</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}