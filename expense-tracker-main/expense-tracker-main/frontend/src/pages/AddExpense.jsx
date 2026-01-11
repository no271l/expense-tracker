import { useState, useEffect, useMemo } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

const ADD_NEW_SUBCAT_VALUE = "--NEW--";

export default function AddExpense() {
  const { api } = useOutletContext();
  const navigate = useNavigate();
  
  const [allSubs, setAllSubs] = useState([]);
  const [form, setForm] = useState({
    amount: "",
    date: new Date().toISOString().split('T')[0],
    category_type: "Food",
    description: "",
    subcategory_id: "", // This will hold the ID from the dropdown
  });
  
  const [newSubcatName, setNewSubcatName] = useState(""); // Holds the name for a new subcategory
  const [showNewSubcatInput, setShowNewSubcatInput] = useState(false);
  const [error, setError] = useState('');

  // Fetch all subcategories for the user once
  useEffect(() => {
    if (!api) return;
    api.get(`/subcategories`)
        .then(res => setAllSubs(res.data))
        .catch(err => console.error("Failed to fetch subcategories", err));
  }, [api]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    let payload = { ...form };
    delete payload.subcategory_id; // Clean up before sending

    if (showNewSubcatInput && newSubcatName.trim() !== "") {
        // User is adding a new subcategory
        payload.new_subcategory_name = newSubcatName.trim();
    } else if (form.subcategory_id && form.subcategory_id !== ADD_NEW_SUBCAT_VALUE) {
        // User selected an existing subcategory
        payload.subcategory_id = form.subcategory_id;
    }

    try {
        await api.post('/expenses', payload);
        navigate('/expenses'); // Redirect to expenses list on success
    } catch (err) {
        setError('Error: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleSubcatDropdownChange = (e) => {
    const { value } = e.target;
    if (value === ADD_NEW_SUBCAT_VALUE) {
      setShowNewSubcatInput(true);
      setForm({ ...form, subcategory_id: value });
    } else {
      setShowNewSubcatInput(false);
      setNewSubcatName(""); // Clear new name if user selects an existing one
      setForm({ ...form, subcategory_id: value });
    }
  };

  // Filter subcategories to show in the dropdown based on the selected main category
  const availableSubs = useMemo(() => {
    if (!form.category_type) return [];
    return allSubs.filter(s => s.category_type === form.category_type);
  }, [allSubs, form.category_type]);
  
  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">Καταχώρηση Εξόδου</h1>
      {error && <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}
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
                value={form.category_type} onChange={e => setForm({...form, category_type: e.target.value, subcategory_id: ""})}>
                {['Food','Transportation','Housing','Utilities','Health','Entertainment','Personal','Financial','Other'].map(c => (
                    <option key={c} value={c}>{c}</option>
                ))}
            </select>
        </div>

        <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Υποκατηγορία (Προαιρετικό)</label>
            <select 
                className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
                value={form.subcategory_id}
                onChange={handleSubcatDropdownChange}
            >
                <option value="">- Καμία -</option>
                {availableSubs.map(s => (
                    <option key={s.subcategory_id} value={s.subcategory_id}>{s.name}</option>
                ))}
                <option value={ADD_NEW_SUBCAT_VALUE}>+ Προσθήκη νέας υποκατηγορίας...</option>
            </select>
        </div>

        {showNewSubcatInput && (
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Όνομα Νέας Υποκατηγορίας</label>
                <input 
                    type="text"
                    className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
                    value={newSubcatName}
                    onChange={e => setNewSubcatName(e.target.value)}
                    placeholder="π.χ. Super Market"
                    required 
                />
            </div>
        )}

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