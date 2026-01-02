import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddExpense() {
  const navigate = useNavigate();
  const [subs, setSubs] = useState([]);
  const [form, setForm] = useState({
    user_id: 1, // Alexandros
    amount: "",
    date: new Date().toISOString().split('T')[0],
    category_type: "Food",
    description: "",
    subcategory_id: ""
  });

  useEffect(() => {
    // Φέρε υποκατηγορίες του χρήστη 1
    axios.get('http://localhost:3001/api/subcategories/1').then(res => setSubs(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:3001/api/expenses', {
            ...form, 
            subcategory_id: form.subcategory_id || null
        });
        navigate('/expenses');
    } catch (err) {
        alert('Σφάλμα: ' + err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">Καταχώρηση Εξόδου</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border space-y-4">
        
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Ποσό (€)</label>
            <input type="number" step="0.01" required className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
                value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} />
        </div>

        <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Ημερομηνία</label>
            <input type="date" required className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
                value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
        </div>

        <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Κατηγορία</label>
            <select className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
                value={form.category_type} onChange={e => setForm({...form, category_type: e.target.value})}>
                {['Food','Transportation','Housing','Utilities','Health','Entertainment','Personal','Financial','Other'].map(c => (
                    <option key={c} value={c}>{c}</option>
                ))}
            </select>
        </div>

        <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Υποκατηγορία (Προαιρετικό)</label>
            <select className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
                value={form.subcategory_id} onChange={e => setForm({...form, subcategory_id: e.target.value})}>
                <option value="">- Καμία -</option>
                {subs.filter(s => s.category_type === form.category_type).map(s => (
                    <option key={s.subcategory_id} value={s.subcategory_id}>{s.name}</option>
                ))}
            </select>
        </div>

        <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Περιγραφή</label>
            <input type="text" className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
                value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition">
            Αποθήκευση
        </button>
      </form>
    </div>
  );
}