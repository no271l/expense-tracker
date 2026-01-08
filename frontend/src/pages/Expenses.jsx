import { useState, useEffect } from "react";
import axios from "axios";

// Λεξικό για μετάφραση των κατηγοριών στα Ελληνικά
const categoryTranslations = {
    'Food': 'Φαγητό',
    'Transportation': 'Μετακίνηση',
    'Housing': 'Στέγαση',
    'Utilities': 'Λογαριασμοί',
    'Health': 'Υγεία',
    'Entertainment': 'Διασκέδαση',
    'Personal': 'Προσωπικά',
    'Financial': 'Οικονομικά',
    'Other': 'Άλλα'
};

export default function Expenses({ user }) {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        if (user && user.username) {
            axios.get(`http://localhost:3001/api/expenses/${user.username}`)
                .then(res => {
                    console.log("Data received:", res.data); // Για debugging
                    setExpenses(res.data);
                })
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
                            <th className="p-4">Υποκατηγορία</th> {/* Αλλαγή από Περιγραφή */}
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
                                    {/* 1. Διόρθωση ονόματος πεδίου ημερομηνίας */}
                                    <td className="p-4 text-slate-600">
                                        {new Date(exp.expense_date).toLocaleDateString('el-GR')}
                                    </td>
                                    
                                    {/* 2. Χρήση του subcategory_name γιατί το description λείπει από το View */}
                                    <td className="p-4 font-medium text-slate-800">
                                        {exp.subcategory_name || '-'}
                                    </td>

                                    {/* 3. Εμφάνιση της πραγματικής κατηγορίας (Food, Housing) μεταφρασμένης */}
                                    <td className="p-4">
                                        <span className="px-2 py-1 rounded text-xs font-bold bg-blue-100 text-blue-700">
                                            {categoryTranslations[exp.category_type] || exp.category_type}
                                        </span>
                                    </td>

                                    {/* 4. Διόρθωση ονόματος πεδίου: expense_amount αντί για amount */}
                                    <td className="p-4 font-bold text-red-500">
                                        -{exp.expense_amount}€
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}