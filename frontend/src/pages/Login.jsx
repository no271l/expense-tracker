import { useState } from 'react';
import axios from 'axios';
import { User, Lock } from 'lucide-react';

export default function Login({ onLogin }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Καθαρισμός προηγούμενων λαθών

    try {
      // ΣΗΜΑΝΤΙΚΟ: Χρησιμοποιούμε σκέτο /api/login για να περάσει από το Proxy
      const res = await axios.post('/api/login', formData);
      
      if (res.data.success) {
        onLogin(res.data.user); 
      }
    } catch (err) {
      console.error("Login Error:", err); // Για να το δεις στην κονσόλα (F12)
      
      if (err.response && err.response.status === 401) {
        setError('Λάθος όνομα χρήστη ή κωδικός.');
      } else if (err.response && err.response.status === 500) {
        setError('Σφάλμα διακομιστή. Ελέγξτε τη βάση δεδομένων.');
      } else {
        setError('Αδυναμία σύνδεσης στον Server.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-slate-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">ExpTracker</h1>
          <p className="text-slate-500 mt-2">Συνδέσου για να δεις τα οικονομικά σου</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-slate-400" size={20} />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="π.χ. Alexandros"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-400" size={20} />
              <input
                type="password"
                className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded text-sm text-center border border-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition"
          >
            Είσοδος
          </button>
        </form>
      </div>
    </div>
  );
}