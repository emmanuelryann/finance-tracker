import '../styles/SpendingSummary.css';

const categories = [
  { icon: '🛒', label: 'Shopping', amount: '$900.00', color: '#6366f1' },
  { icon: '📋', label: 'Utilities', amount: '$600.00', color: '#f59e0b' },
  { icon: '👁', label: 'Others', amount: '$300.00', color: '#2db68a' },
];

function SpendingSummary() {
  return (
    <div className="card spending-summary">
      <div className="card-header">
        <h3 className="card-title">Spending Summary</h3>
        <button className="three-dot-btn" aria-label="More options">⋮</button>
      </div>

      {/* Donut Chart */}
      <div className="spending-summary__chart">
        <div className="spending-summary__donut">
          <svg viewBox="0 0 36 36" className="spending-summary__donut-svg">
            {/* Background circle */}
            <circle
              cx="18" cy="18" r="15.915"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="3"
            />
            {/* Green segment (Others) */}
            <circle
              cx="18" cy="18" r="15.915"
              fill="none"
              stroke="#2db68a"
              strokeWidth="3"
              strokeDasharray="16.67 83.33"
              strokeDashoffset="0"
              strokeLinecap="round"
            />
            {/* Orange segment (Utilities) */}
            <circle
              cx="18" cy="18" r="15.915"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="3"
              strokeDasharray="33.33 66.67"
              strokeDashoffset="-16.67"
              strokeLinecap="round"
            />
            {/* Red/primary segment (Shopping) */}
            <circle
              cx="18" cy="18" r="15.915"
              fill="none"
              stroke="#ef4444"
              strokeWidth="3"
              strokeDasharray="50 50"
              strokeDashoffset="-50"
              strokeLinecap="round"
            />
          </svg>
          <div className="spending-summary__donut-center">
            <span className="spending-summary__donut-label">SPENT</span>
            <span className="spending-summary__donut-amount">$1,800.00</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="spending-summary__categories">
        {categories.map((cat) => (
          <div key={cat.label} className="spending-summary__category">
            <div
              className="spending-summary__category-icon"
              style={{ backgroundColor: cat.color + '1a', color: cat.color }}
            >
              {cat.icon}
            </div>
            <span className="spending-summary__category-label">{cat.label}</span>
            <span className="spending-summary__category-amount">{cat.amount}</span>
          </div>
        ))}
      </div>

      {/* Spending Limit */}
      <div className="spending-summary__limit">
        <span>Your weekly spending limit is <strong>$2000</strong>.</span>
        <span className="spending-summary__limit-icon">ℹ</span>
      </div>
    </div>
  );
}

export default SpendingSummary;
