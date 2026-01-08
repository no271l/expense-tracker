import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// ΔΕΧΟΜΑΣΤΕ ΤΟ PROP user
export default function Dashboard({ user }) {
  const [balanceData, setBalanceData] = useState([]);

  useEffect(() => {
    // ΧΡΗΣΗ user.username ΑΝΤΙ ΓΙΑ HARDCODED
    if (user && user.username) {
      axios.get(`http://localhost:3001/api/balance/${user.username}`)
        .then(res => setBalanceData(res.data))
        .catch(err => console.error(err));
    }
  }, [user]); 

  const currentMonth = balanceData.length > 0 ? balanceData[0] : { balance: 0, total_income: 0, total_expenses: 0 };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">
        Επισκόπηση: <span className="text-blue-600">{user.username}</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-slate-500 text-sm uppercase font-semibold">Τρέχον Υπόλοιπο</h3>
          <p className={`text-3xl font-bold mt-2 ${currentMonth.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {currentMonth.balance} €
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-slate-500 text-sm uppercase font-semibold">Έσοδα Μήνα</h3>
          <p className="text-3xl font-bold mt-2 text-slate-800">{currentMonth.total_income} €</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-slate-500 text-sm uppercase font-semibold">Έξοδα Μήνα</h3>
          <p className="text-3xl font-bold mt-2 text-orange-600">{currentMonth.total_expenses} €</p>
        </div>
      </div>

      <div className="flex gap-4">
        <Link to="/add" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
          + Νέο Έξοδο
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">Ιστορικό Μηνών</h2>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="p-4">Έτος</th>
              <th className="p-4">Μήνας</th>
              <th className="p-4">Έσοδα</th>
              <th className="p-4">Έξοδα</th>
              <th className="p-4">Υπόλοιπο</th>
            </tr>
          </thead>
          <tbody>
            {balanceData.map((row, idx) => (
              <tr key={idx} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="p-4">{row.year}</td>
                <td className="p-4">{row.month}</td>
                <td className="p-4 text-green-600">+{row.total_income}€</td>
                <td className="p-4 text-red-500">-{row.total_expenses}€</td>
                <td className="p-4 font-bold">{row.balance}€</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}