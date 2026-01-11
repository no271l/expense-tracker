import { useEffect, useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";

const TRANSACTION_TYPES = {
  expense: "Έξοδα",
  income: "Έσοδα",
  loan: "Δάνεια",
  savings: "Αποταμιεύσεις",
};

// Static list of all possible expense categories from the database schema
const EXPENSE_CATEGORIES = ['Food','Transportation','Housing','Utilities','Health','Entertainment','Personal','Financial','Other'];
const INCOME_SOURCES = ['Salary', 'Gift', 'Rent', 'Investments', 'Other'];


export default function Expenses() {
  const { api } = useOutletContext();
  
  const [transactions, setTransactions] = useState([]);
  const [transactionType, setTransactionType] = useState("expense");
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    category: '',
    subcategory: '',
    source: ''
  });
  const [subcategories, setSubcategories] = useState([]);

  // Fetch all subcategories once
  useEffect(() => {
    if (!api) return;
    api.get('/subcategories')
      .then(res => {
        setSubcategories(res.data);
      })
      .catch(err => console.error("Failed to fetch subcategories:", err));
  }, [api]);

  // Fetch transactions when type or filters change
  useEffect(() => {
    if (!api) return;

    const params = { type: transactionType };
    // Only add filters that have a value
    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        params[key] = value;
      }
    }

    api.get('/transactions', { params })
      .then(res => setTransactions(res.data))
      .catch(err => console.error("Failed to fetch transactions:", err));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, transactionType, JSON.stringify(filters)]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredSubcategories = useMemo(() => {
    if (!filters.category) return [];
    return subcategories.filter(s => s.category_type === filters.category);
  }, [filters.category, subcategories]);

  const renderFilters = () => {
    switch (transactionType) {
      case 'expense':
        return (
          <>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-slate-600 mb-1">Κατηγορία</label>
              <select name="category" value={filters.category} onChange={handleFilterChange} className="p-2 border rounded-md">
                <option value="">Όλες</option>
                {EXPENSE_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-slate-600 mb-1">Υποκατηγορία</label>
              <select name="subcategory" value={filters.subcategory} onChange={handleFilterChange} className="p-2 border rounded-md" disabled={!filters.category}>
                <option value="">Όλες</option>
                {filteredSubcategories.map(sub => <option key={sub.subcategory_id} value={sub.subcategory_id}>{sub.name}</option>)}
              </select>
            </div>
          </>
        );
      case 'income':
        return (
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-600 mb-1">Πηγή</label>
            <select name="source" value={filters.source} onChange={handleFilterChange} className="p-2 border rounded-md">
              <option value="">Όλες</option>
              {INCOME_SOURCES.map(src => <option key={src} value={src}>{src}</option>)}
            </select>
          </div>
        );
      default:
        return null;
    }
  };

  const renderTable = () => {
    const head = {
      expense: ['Ημερομηνία', 'Κατηγορία', 'Υποκατηγορία', 'Περιγραφή', 'Ποσό'],
      income: ['Ημερομηνία', 'Πηγή', 'Περιγραφή', 'Ποσό'],
      loan: ['Ημερομηνία', 'Περιγραφή', 'Ποσό'],
      savings: ['Ημερομηνία', 'Περιγραφή', 'Ποσό'],
    };

    const body = transactions.map((tr, i) => {
      switch (transactionType) {
        case 'expense':
          return (
            <tr key={i} className="border-b hover:bg-slate-50 transition">
              <td className="p-4 text-slate-600">{new Date(tr.date).toLocaleDateString('el-GR')}</td>
              <td className="p-4"><span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm">{tr.category_type}</span></td>
              <td className="p-4 text-slate-600">{tr.subcategory_name || '-'}</td>
              <td className="p-4 text-slate-800">{tr.description || '-'}</td>
              <td className="p-4 font-bold text-red-600 text-right">-{parseFloat(tr.amount).toLocaleString('el-GR', { minimumFractionDigits: 2 })}€</td>
            </tr>
          );
        case 'income':
          return (
             <tr key={i} className="border-b hover:bg-slate-50 transition">
              <td className="p-4 text-slate-600">{new Date(tr.date).toLocaleDateString('el-GR')}</td>
              <td className="p-4"><span className="px-2 py-1 bg-green-50 text-green-700 rounded text-sm">{tr.income_source}</span></td>
              <td className="p-4 text-slate-800">{tr.description || '-'}</td>
              <td className="p-4 font-bold text-green-600 text-right">+{parseFloat(tr.amount).toLocaleString('el-GR', { minimumFractionDigits: 2 })}€</td>
            </tr>
          );
        case 'loan':
           return (
             <tr key={i} className="border-b hover:bg-slate-50 transition">
              <td className="p-4 text-slate-600">{new Date(tr.date).toLocaleDateString('el-GR')}</td>
              <td className="p-4 text-slate-800">{tr.description || '-'}</td>
              <td className="p-4 font-bold text-orange-600 text-right">{parseFloat(tr.amount).toLocaleString('el-GR', { minimumFractionDigits: 2 })}€</td>
            </tr>
          );
        case 'savings':
          return (
            <tr key={i} className="border-b hover:bg-slate-50 transition">
              <td className="p-4 text-slate-600">{new Date(tr.date).toLocaleDateString('el-GR')}</td>
              <td className="p-4 text-slate-800">{tr.description || 'Αποταμίευση'}</td>
              <td className="p-4 font-bold text-indigo-600 text-right">+{parseFloat(tr.amount).toLocaleString('el-GR', { minimumFractionDigits: 2 })}€</td>
            </tr>
          );
        default: return null;
      }
    });

    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              {(head[transactionType] || []).map(h => <th key={h} className="p-4 font-semibold text-slate-600">{h}</th>)}
            </tr>
          </thead>
          <tbody>{body}</tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">Ιστορικό Κινήσεων</h1>

      {/* Transaction Type Selector */}
      <div className="flex space-x-2 mb-6 border-b">
        {Object.entries(TRANSACTION_TYPES).map(([key, value]) => (
          <button
            key={key}
            onClick={() => setTransactionType(key)}
            className={`px-4 py-2 text-sm font-medium transition ${
              transactionType === key
                ? 'border-b-2 border-indigo-600 text-indigo-700'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {value}
          </button>
        ))}
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-slate-50 rounded-lg">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-600 mb-1">Από Ημερομηνία</label>
          <input type="date" name="dateFrom" value={filters.dateFrom} onChange={handleFilterChange} className="p-2 border rounded-md" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-600 mb-1">Έως Ημερομηνία</label>
          <input type="date" name="dateTo" value={filters.dateTo} onChange={handleFilterChange} className="p-2 border rounded-md" />
        </div>
        {renderFilters()}
      </div>

      {renderTable()}
    </div>
  );
}