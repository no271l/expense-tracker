import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

export default function AddIncome() {
  const { api } = useOutletContext(); // Get authenticated API client
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [income_source, setIncomeSource] = useState("Salary");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const newIncome = {
      // username is no longer needed; backend gets it from the token
      amount: parseFloat(amount),
      date,
      income_source,
      description,
    };

    if (!newIncome.amount || isNaN(newIncome.amount)) {
      setError("Please enter a valid amount.");
      return;
    }

    try {
      // Use the authenticated api client
      await api.post("/income/add", newIncome);
      setSuccess("Income added successfully!");
      setAmount("");
      setDate(new Date().toISOString().slice(0, 10));
      setIncomeSource("Salary");
      setDescription("");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "An unexpected error occurred.");
    }
  };

  const incomeSources = ['Salary', 'Gift', 'Rent', 'Investments', 'Other'];

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">Add New Income</h1>

      {error && <div className="p-4 mb-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">{error}</div>}
      {success && <div className="p-4 mb-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-slate-700 mb-1">
            Amount (€)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., 1200.00"
            required
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="income_source" className="block text-sm font-medium text-slate-700 mb-1">
            Income Source
          </label>
          <select
            id="income_source"
            value={income_source}
            onChange={(e) => setIncomeSource(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            {incomeSources.map(source => (
              <option key={source} value={source}>{source}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
            Description (Optional)
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Monthly Salary"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            Add Income
          </button>
        </div>
      </form>
    </div>
  );
}
