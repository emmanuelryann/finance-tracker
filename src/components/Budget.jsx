import { useState, useMemo } from 'react';
import '../styles/Budget.css';

function Budget({ budgets, transactions, onSetBudgetClick }) {
  const [filter, setFilter] = useState('Monthly');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);

  const totalBudget = budgets[filter] || 0;

  const spentAmount = useMemo(() => {
    const now = new Date();
    return transactions.reduce((acc, txn) => {
      if (!txn.negative || !txn.amount || !txn.date || txn.status === 'Failed') return acc;
      
      let txnDate;
      if (typeof txn.date === 'string' && txn.date.includes('-')) {
        const [year, month, day] = txn.date.split('-');
        txnDate = new Date(year, month - 1, day);
      } else {
        txnDate = new Date(txn.date);
      }
      if (isNaN(txnDate.getTime())) return acc;

      const amountStr = String(txn.amount).replace(/[^0-9.-]+/g, "");
      const amount = Math.abs(parseFloat(amountStr));
      if (isNaN(amount)) return acc;

      let isMatch = false;
      if (filter === 'Daily') {
        isMatch = txnDate.toDateString() === now.toDateString();
      } else if (filter === 'Weekly') {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);
        isMatch = txnDate >= oneWeekAgo;
      } else if (filter === 'Monthly') {
        isMatch = txnDate.getMonth() === now.getMonth() && txnDate.getFullYear() === now.getFullYear();
      } else if (filter === 'Yearly') {
        isMatch = txnDate.getFullYear() === now.getFullYear();
      }

      return isMatch ? acc + amount : acc;
    }, 0);
  }, [transactions, filter]);

  const remaining = Math.max(0, totalBudget - spentAmount);
  const spentPercent = totalBudget > 0 ? Math.min(100, (spentAmount / totalBudget) * 100) : 0;
  const remainingPercent = 100 - spentPercent;

  const budgetItems = [
    { label: 'Total Budget', amount: `$${totalBudget.toLocaleString()}`, color: 'var(--color-primary)' },
    { label: 'Spent', amount: `$${spentAmount.toLocaleString()}`, color: 'var(--color-orange)' },
    { label: 'Remaining', amount: `$${remaining.toLocaleString()}`, color: 'var(--color-text-muted)' },
  ];

  const headerContent = (
    <div className="budget__header-info">
      <h3 className="card-title">My Budgets</h3>
      <div className="budget__header-controls">
        <button className="budget__set-btn" onClick={onSetBudgetClick}>Set Budget</button>
        <div className="budget__dropdown" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <span>{filter}</span>
          <span className="budget__dropdown-arrow"><i className="fa-solid fa-chevron-down"></i></span>
          {isDropdownOpen && (
            <div className="budget__dropdown-menu">
              {['Daily', 'Weekly', 'Monthly', 'Yearly'].map(t => (
                <div key={t} className="budget__dropdown-item" onClick={() => { setFilter(t); setIsDropdownOpen(false); }}>{t}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="card budget">
      <div className="card-header budget__card-header">
        {headerContent}
      </div>

      <div className="budget__content">
        <div className="budget__gauge-wrapper">
          <svg viewBox="0 0 150 90" className="budget__gauge">
            {/* Background Arc */}
            <path
              d="M 5 80 A 70 70 0 0 1 145 80"
              fill="none"
              stroke="var(--color-bg)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Progress Arc */}
            {spentPercent > 0 && (
              <path
                d="M 5 80 A 70 70 0 0 1 145 80"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="219.91"
                strokeDashoffset={219.91 * (1 - spentPercent / 100)}
                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
              />
            )}
          </svg>
          <div className="budget__gauge-center">
            <span className="budget__gauge-amount">$ {totalBudget.toLocaleString()}</span>
            <span className="budget__gauge-label">Total Budget</span>
          </div>
        </div>

        <div className="budget__stats-grid">
          <div className="budget__stat-item">
            <div className="budget__stat-header">
              <span className="budget__dot" style={{ backgroundColor: 'var(--color-primary)' }}></span>
              <span className="budget__stat-label">Spent</span>
            </div>
            <div className="budget__stat-info">
              <span 
                className="budget__stat-percent"
                onMouseEnter={() => setActiveTooltip('spent')}
                onMouseLeave={() => setActiveTooltip(null)}
              >
                {Math.round(spentPercent)}%
                {activeTooltip === 'spent' && (
                  <div className="budget__tooltip">
                    $ {spentAmount.toLocaleString()}
                  </div>
                )}
              </span>
            </div>
          </div>
          <div className="budget__stat-item">
            <div className="budget__stat-header">
              <span className="budget__dot" style={{ backgroundColor: 'var(--color-text-gray)' }}></span>
              <span className="budget__stat-label">Remaining</span>
            </div>
            <div className="budget__stat-info">
              <span 
                className="budget__stat-percent"
                onMouseEnter={() => setActiveTooltip('remaining')}
                onMouseLeave={() => setActiveTooltip(null)}
              >
                {Math.round(remainingPercent)}%
                {activeTooltip === 'remaining' && (
                  <div className="budget__tooltip">
                    $ {remaining.toLocaleString()}
                  </div>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Budget;
