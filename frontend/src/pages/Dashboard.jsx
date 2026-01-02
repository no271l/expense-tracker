import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [balance, setBalance] = useState(null);
  const user = "Alexandros";

  useEffect(() => {
    axios.get(`http://localhost:3001/api/balance/${user}`)
      .then(res => setBalance(res.data[0]))
      .catch(err => console.error(err));
  }, []);

  if (!balance) return <div>Φόρτωση...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-slate-800">Οικονομική Επισκόπηση</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card title="Τρέχον Υπόλοιπο" value={`${balance.balance}€`} color="text-blue-600" />
        <Card title="Συνολικά Έσοδα" value={`${balance.total_income}€`} color="text-green-600" />
        <Card title="Συνολικά Έξοδα" value={`${balance.total_expenses}€`} color="text-red-600" />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Κατάσταση Μήνα ({balance.month}/{balance.year})</h2>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className="bg-blue-600 h-4 rounded-full" 
            style={{ width: `${Math.min((balance.total_expenses / balance.total_income) * 100, 100)}%` }}
          ></div>
        </div>
        <p className="mt-2 text-sm text-gray-600">
            Έχετε ξοδέψει το {((balance.total_expenses / balance.total_income) * 100).toFixed(1)}% του εισοδήματός σας.
        </p>
      </div>
    </div>
  );
}

const Card = ({ title, value, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
    <h3 className="text-slate-500 text-sm uppercase tracking-wider">{title}</h3>
    <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
  </div>
);