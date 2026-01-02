import { useEffect, useState } from "react";
import axios from "axios";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/expenses/Alexandros`)
      .then(res => setExpenses(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-slate-800">Ιστορικό Κινήσεων</h1>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-slate-600">Ημερομηνία</th>
              <th className="p-4 font-semibold text-slate-600">Κατηγορία</th>
              <th className="p-4 font-semibold text-slate-600">Υποκατηγορία</th>
              <th className="p-4 font-semibold text-slate-600">Περιγραφή</th>
              <th className="p-4 font-semibold text-slate-600 text-right">Ποσό</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp, i) => (
              <tr key={i} className="border-b hover:bg-slate-50 transition">
                <td className="p-4 text-slate-600">{new Date(exp.expense_date).toLocaleDateString()}</td>
                <td className="p-4"><span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm">{exp.category_type}</span></td>
                <td className="p-4 text-slate-600">{exp.subcategory_name || '-'}</td>
                <td className="p-4 text-slate-800">{exp.username ? '' : ''}{/* Bug fix logic */} {exp.expense_description || '-'}</td>
                <td className="p-4 font-bold text-red-600 text-right">-{exp.expense_amount}€</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}