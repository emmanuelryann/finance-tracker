import '../styles/TransactionModal.css';
import { useState } from 'react';

const categories = ['Housing', 'Food', 'Entertainment', 'Shopping', 'Health', 'Miscellaneous'];

function TransactionModal({ isOpen, onClose, onAdd, currentBalance }) {
  // Utility to get YYYY-MM-DD in local time (ISO gives UTC which misaligns timezones)
  const getLocalISODate = () => {
    const d = new Date();
    // Adjust to local timezone offset
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: 'Shopping',
    status: 'Success',
    date: getLocalISODate(),
    negative: true
  });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.name || !formData.amount) return;

    const amountValue = parseFloat(formData.amount);
    
    if (isNaN(amountValue) || amountValue <= 0) {
      setError('Please enter a valid amount greater than 0.');
      return;
    }
    
    // Logic: Prevent negative transaction if it exceeds current balance
    if (formData.negative && amountValue > currentBalance) {
      setError(`Insufficient balance. Current ${new Date().toLocaleString('default', { month: 'long' })} balance: $${currentBalance.toLocaleString()}`);
      return;
    }

    const newTransaction = {
      ...formData,
      category: formData.negative ? formData.category : 'Miscellaneous',
      amount: `${formData.negative ? '-' : '+'}$${amountValue.toLocaleString(undefined, { minimumFractionDigits: 0 })}`,
      id: Date.now()
    };

    onAdd(newTransaction);
    onClose();
    setFormData({
      name: '',
      amount: '',
      category: 'Shopping',
      status: 'Success',
      date: getLocalISODate(),
      negative: true
    });
  };

  const handleAmountKeyDown = (e) => {
    if (e.key === '-' || e.key === 'e' || e.key === '+') {
      e.preventDefault();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Add New Transaction</h3>
          <button className="modal-close-btn" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          {error && <div className="modal-error-message" style={{ color: 'var(--color-red)', fontSize: '0.8125rem', marginBottom: '1rem', fontWeight: '500' }}>{error}</div>}
          
          <div className="form-group">
            <label>Transaction</label>
            <input
              type="text"
              placeholder="e.g. Netflix Subscription"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Amount</label>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.amount}
                onKeyDown={handleAmountKeyDown}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Type</label>
              <select
                value={formData.negative ? 'expense' : 'income'}
                onChange={(e) => setFormData({ ...formData, negative: e.target.value === 'expense' })}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                disabled={!formData.negative}
              >
                <option value="Housing">Housing</option>
                <option value="Food">Food</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Shopping">Shopping</option>
                <option value="Health">Health</option>
                <option value="Miscellaneous">Miscellaneous</option>
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Success">Success</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="modal-btn modal-btn--cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="modal-btn modal-btn--submit">
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TransactionModal;
