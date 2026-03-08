import '../styles/BudgetModal.css';
import { useState } from 'react';

function BudgetModal({ isOpen, onClose, onSet, currentBudgets }) {
  const [timeframe, setTimeframe] = useState('Monthly');
  const [amount, setAmount] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) return;

    onSet(timeframe, parseFloat(amount));
    onClose();
    setAmount('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Set Budget</h3>
          <button className="modal-close-btn" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Timeframe</label>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>

          <div className="form-group">
            <label>Budget Amount</label>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            {currentBudgets[timeframe] > 0 && (
              <p className="modal-info-text">
                Current {timeframe} budget: ${currentBudgets[timeframe].toLocaleString()}
              </p>
            )}
          </div>

          <div className="modal-actions">
            <button type="button" className="modal-btn modal-btn--cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="modal-btn modal-btn--submit">
              Set Budget
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BudgetModal;
