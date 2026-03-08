import '../styles/TransactionModal.css';
import { useState } from 'react';

function TransactionModal({ isOpen, onClose, onAdd, currentBalance }) {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: 'Shopping',
    date: new Date().toISOString().split('T')[0],
    negative: true
  });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.name || !formData.amount) return;

    const amountValue = parseFloat(formData.amount);
    
    // Logic: Prevent negative transaction if it exceeds current balance
    if (formData.negative && amountValue > currentBalance) {
      setError(`Insufficient balance. Current ${new Date().toLocaleString('default', { month: 'long' })} balance: $${currentBalance.toLocaleString()}`);
      return;
    }

    const newTransaction = {
      ...formData,
      category: formData.negative ? formData.category : 'Others',
      amount: `${formData.negative ? '-' : '+'}$${amountValue.toLocaleString(undefined, { minimumFractionDigits: 0 })}`,
      id: Date.now()
    };

    onAdd(newTransaction);
    onClose();
    setFormData({
      name: '',
      amount: '',
      category: 'Shopping',
      date: new Date().toISOString().split('T')[0],
      negative: true
    });
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
            <label>Description</label>
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
                placeholder="0.00"
                value={formData.amount}
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
            {formData.negative && (
              <div className="form-group">
                <label>Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Housing">Housing</option>
                  <option value="Food">Food</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Health">Health</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            )}
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
