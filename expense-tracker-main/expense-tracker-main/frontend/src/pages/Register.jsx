import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
    // --- STATE ---
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: ''
    });
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

        // 1. Έλεγχος αν ταιριάζουν οι κωδικοί
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            // 2. Αποστολή στο Backend
            const API_BASE = 'http://localhost:3001/api'; 
            await axios.post(`${API_BASE}/register`, {
                username: formData.username,
                password: formData.password,
                email: formData.email
            });

            // 3. Αν πετύχει, πήγαινε στο Login
            setSuccess("Registration successful! Redirecting to login...");
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || "Registration failed. Try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1a1c20] font-sans">
            {/* Κεντρική Κάρτα (Dark Blue/Grey φόντο όπως στην εικόνα) */}
            <div className="w-full max-w-md bg-[#0f172a] p-10 rounded-lg shadow-2xl border border-slate-800">
                
                {/* Header Section */}
                <div className="text-center mb-10">
                    <h2 className="text-white text-2xl font-light mb-2">Welcome to</h2>
                    {/* Το λογότυπο ExpTracker όπως στο Dashboard */}
                    <h1 className="text-5xl font-bold text-blue-500 tracking-tight">
                        ExpTracker
                    </h1>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Username */}
                    <div>
                        <label className="block text-slate-400 text-sm mb-1 ml-1">username</label>
                        <input 
                            type="text" 
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Password */}
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

                    {/* Repeat Password */}
                    <div>
                        <label className="block text-slate-400 text-sm mb-1 ml-1">repeat password</label>
                        <input 
                            type="password" 
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Email */}
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

                    {/* Error/Success Message */}
                    {error && (
                        <div className="text-red-500 text-sm text-center font-semibold">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="text-green-500 text-sm text-center font-semibold">
                            {success}
                        </div>
                    )}

                    {/* Register Button */}
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-200 mt-4"
                    >
                        Create Account
                    </button>
                </form>

                {/* Footer / Login Link */}
                <div className="mt-8 text-center text-slate-400 text-sm">
                    already have an account? <br/>
                    <Link to="/login" className="text-white text-lg font-semibold hover:text-blue-400 transition cursor-pointer mt-2 inline-block">
                        Login
                    </Link>
                </div>

            </div>
        </div>
    );
}