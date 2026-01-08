import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddExpense({ user }) {
    const navigate = useNavigate();
    const [subcategories, setSubcategories] = useState([]);
    const [formData, setFormData] = useState({
        amount: '',
        date: new Date().toISOString().split('T')[0],
        category_type: 'one_time',
        description: '',
        subcategory_id: ''
    });

    useEffect(() => {
        if (user && user.user_id) {
            // Προσοχή: Εδώ θέλουμε user_id για τις υποκατηγορίες
            axios.get(`http://localhost:3001/api/subcategories/${user.user_id}`)
                .then(res => setSubcategories(res.data))
                .catch(err => console.error(err));
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/api/expenses', {
                ...formData,
                user_id: user.user_id // Στέλνουμε το ID του συνδεδεμένου χρήστη
            });
            alert('Το έξοδο προστέθηκε!');
            navigate('/'); // Επιστροφή στο Dashboard
        } catch (err) {
            console.error(err);
            alert('Σφάλμα κατά την αποθήκευση');
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-200">
            <h1 className="text-2xl font-bold mb-6 text-slate-800">Προσθήκη Νέου Εξόδου</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Ποσό (€)</label>
                    <input 
                        type="number" step="0.01" required
                        className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.amount}
                        onChange={e => setFormData({...formData, amount: e.target.value})}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Ημερομηνία</label>
                        <input 
                            type="date" required
                            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.date}
                            onChange={e => setFormData({...formData, date: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Τύπος</label>
                        <select 
                            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            value={formData.category_type}
                            onChange={e => setFormData({...formData, category_type: e.target.value})}
                        >
                            <option value="one_time">Έκτακτο</option>
                            <option value="fixed">Πάγιο</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Περιγραφή</label>
                    <input 
                        type="text"
                        className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="π.χ. Supermarket"
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Υποκατηγορία (Προαιρετικό)</label>
                    <select 
                        className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        value={formData.subcategory_id}
                        onChange={e => setFormData({...formData, subcategory_id: e.target.value})}
                    >
                        <option value="">- Καμία -</option>
                        {subcategories.map(sub => (
                            <option key={sub.subcategory_id} value={sub.subcategory_id}>
                                {sub.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition"
                >
                    Αποθήκευση
                </button>
            </form>
        </div>
    );
}