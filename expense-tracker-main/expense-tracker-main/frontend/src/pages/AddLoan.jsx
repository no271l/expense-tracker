import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

export default function AddLoan() {
  const { api } = useOutletContext(); // Get authenticated API client
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [loan_date, setLoanDate] = useState(new Date().toISOString().slice(0, 10));
  const [payout_date, setPayoutDate] = useState("");
  const [debtor_name, setDebtorName] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const newLoan = {
      // username is no longer needed; backend gets it from the token
      amount: parseFloat(amount),
      loan_date,
      payout_date: payout_date || null,
      debtor_name,
    };

    if (!newLoan.amount || isNaN(newLoan.amount)) {
      setError("Please enter a valid amount.");
      return;
    }
    if (!newLoan.debtor_name) {
      setError("Please enter the debtor's name.");
      return;
    }

    try {
      // Use the authenticated api client
      await api.post("/loans/add", newLoan);
      setSuccess("Loan added successfully!");
      setAmount("");
      setLoanDate(new Date().toISOString().slice(0, 10));
      setPayoutDate("");
      setDebtorName("");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "An unexpected error occurred.");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">Add New Loan</h1>

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
            placeholder="e.g., 500.00"
            required
          />
        </div>

        <div>
          <label htmlFor="debtor_name" className="block text-sm font-medium text-slate-700 mb-1">
            Debtor's Name
          </label>
          <input
            type="text"
            id="debtor_name"
            value={debtor_name}
            onChange={(e) => setDebtorName(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., John Doe"
            required
          />
        </div>

        <div>
          <label htmlFor="loan_date" className="block text-sm font-medium text-slate-700 mb-1">
            Loan Date
          </label>
          <input
            type="date"
            id="loan_date"
            value={loan_date}
            onChange={(e) => setLoanDate(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="payout_date" className="block text-sm font-medium text-slate-700 mb-1">
            Expected Payout Date (Optional)
          </label>
          <input
            type="date"
            id="payout_date"
            value={payout_date}
            onChange={(e) => setPayoutDate(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
          >
            Add Loan
          </button>
        </div>
      </form>
    </div>
  );
}
