import '../styles/Budget.css';

const budgetItems = [
  { label: 'Total Budget', amount: '$4,000.00', color: 'var(--color-primary)' },
  { label: 'Spent', amount: '$2,250.00', color: 'var(--color-orange)' },
  { label: 'Remaining', amount: '$1,120.00', color: 'var(--color-text-muted)' },
];

const segments = [
  { percent: 20, color: 'var(--color-text-muted)', label: '20%' },
  { percent: 29, color: 'var(--color-orange)', label: '29%' },
  { percent: 51, color: 'var(--color-primary)', label: '51%' },
];

function Budget() {
  return (
    <div className="card budget">
      <div className="card-header">
        <h3 className="card-title">Budget</h3>
        <div className="budget__dropdown">
          <span>Monthly</span>
          <span className="budget__dropdown-arrow"><i className="fa-solid fa-chevron-down"></i></span>
        </div>
      </div>

      {/* Budget Items */}
      <ul className="budget__items">
        {budgetItems.map((item) => (
          <li key={item.label} className="budget__item">
            <div className="budget__item-left">
              <span
                className="budget__dot"
                style={{ backgroundColor: item.color }}
              ></span>
              <span className="budget__item-label">{item.label}</span>
            </div>
            <span className="budget__item-amount">{item.amount}</span>
          </li>
        ))}
      </ul>

      {/* Bar Segments */}
      <div className="budget__bar-wrapper">
        {segments.map((seg) => (
          <div
            key={seg.label}
            className="budget__segment"
            style={{ flex: seg.percent }}
          >
            <div
              className="budget__segment-fill"
              style={{ backgroundColor: seg.color }}
            >
              <span className="budget__segment-label">{seg.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Budget;
