import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login({ onLogin }) {
    // --- STATE ---
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [keepLoggedIn, setKeepLoggedIn] = useState(false); // State for the checkbox
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    // --- HANDLERS ---
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const API_BASE = 'http://localhost:3001/api'; 
            const res = await axios.post(`${API_BASE}/login`, {
                email: formData.email,
                password: formData.password
            });

            const token = res.data.token;
            if (token) {
                setSuccess('Login successful! Redirecting...');
                
                // Pass the token AND the "keep logged in" preference to the parent
                onLogin(token, keepLoggedIn);

                setTimeout(() => {
                    navigate('/'); 
                }, 1500);
            } else {
                throw new Error("No token received.");
            }

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || "Invalid email or password.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1a1c20] font-sans">
            <div className="w-full max-w-md bg-[#0f172a] p-10 rounded-lg shadow-2xl border border-slate-800">
                
                <div className="text-center mb-10">
                    <h2 className="text-white text-2xl font-light mb-2">Welcome back to</h2>
                    <h1 className="text-5xl font-bold text-blue-500 tracking-tight">
                        ExpTracker
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    <div>
                        <label className="block text-slate-400 text-sm mb-1 ml-1">email</label>
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-slate-400 text-sm mb-1 ml-1">password</label>
                        <input 
                            type="password" 
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Keep Me Logged In Checkbox */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="keep-logged-in"
                                name="keep-logged-in"
                                type="checkbox"
                                checked={keepLoggedIn}
                                onChange={(e) => setKeepLoggedIn(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor="keep-logged-in" className="ml-2 block text-sm text-slate-400">
                                Keep me logged in
                            </label>
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center font-semibold bg-red-100/10 p-2 rounded">
                            {error}
                        </div>
                    )}
                     {success && (
                        <div className="text-green-500 text-sm text-center font-semibold">
                            {success}
                        </div>
                    )}

                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-200 shadow-lg shadow-blue-600/20"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-8 text-center text-slate-400 text-sm">
                    don't have an account? <br/>
                    <Link to="/register" className="text-white text-lg font-semibold hover:text-blue-400 transition cursor-pointer mt-2 inline-block">
                        Register
                    </Link>
                </div>

            </div>
        </div>
    );
}