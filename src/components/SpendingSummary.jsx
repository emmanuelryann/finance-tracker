import '../styles/SpendingSummary.css';

const categories = [
  { icon: 'fa-solid fa-bag-shopping', label: 'Shopping', amount: '$900.00', color: '#2db68a' },
  { icon: 'fa-solid fa-file-invoice', label: 'Utilities', amount: '$600.00', color: '#f59e0b' },
  { icon: 'fa-solid fa-circle-dollar-to-slot', label: 'Miscellaneous', amount: '$300.00', color: '#6b7280' },
];

function SpendingSummary() {
  return (
    <div className="card spending-summary">
      <div className="card-header">
        <h3 className="card-title">Spending Summary</h3>
        <button className="three-dot-btn" aria-label="More options">
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </button>
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
              strokeWidth="4"
            />
            {/* Green segment (Miscellaneous) */}
            <circle
              cx="18" cy="18" r="15.915"
              fill="none"
              stroke="#2db68a"
              strokeWidth="4"
              strokeDasharray="16.67 83.33"
              strokeDashoffset="0"
              strokeLinecap="round"
            />
            {/* Orange segment (Utilities) */}
            <circle
              cx="18" cy="18" r="15.915"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="4"
              strokeDasharray="33.33 66.67"
              strokeDashoffset="-16.67"
              strokeLinecap="round"
            />
            {/* Red/primary segment (Shopping) */}
            <circle
              cx="18" cy="18" r="15.915"
              fill="none"
              stroke="#ef4444"
              strokeWidth="4"
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

      {/* Categories with Dividers */}
      <div className="spending-summary__categories">
        {categories.map((cat, index) => (
          <div key={cat.label} className="spending-summary__category-wrapper">
            <div className="spending-summary__category">
              <div className="spending-summary__category-icon" style={{ color: cat.color }}>
                <i className={cat.icon}></i>
              </div>
              <span className="spending-summary__category-label">{cat.label}</span>
              <span className="spending-summary__category-amount">{cat.amount}</span>
            </div>
            {index < categories.length - 1 && <div className="spending-summary__divider"></div>}
          </div>
        ))}
      </div>

      {/* Spending Limit */}
      <div className="spending-summary__limit">
        <span>Your weekly spending limit is <strong>$2000</strong>.</span>
        <span className="spending-summary__limit-icon">
          <i className="fa-solid fa-circle-info"></i>
        </span>
      </div>
    </div>
  );
}

export default SpendingSummary;
