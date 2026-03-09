import '../styles/TopCategories.css';

const category_map = {
  Housing: { icon: 'fa-solid fa-house', color: '#6366f1' },
  Food: { icon: 'fa-solid fa-burger', color: '#f87171' },
  Entertainment: { icon: 'fa-solid fa-clapperboard', color: '#e50914' },
  Shopping: { icon: 'fa-solid fa-bag-shopping', color: '#ea4c89' },
  Health: { icon: 'fa-solid fa-notes-medical', color: '#49ABA9' },
  Miscellaneous: { icon: 'fa-solid fa-grid-2', color: '#64748b' },
};

function TopCategories({ categorySpending, totalExpenses }) {
  // Filter for categories with spending > 0 and sort by amount descending
  const activeCategories = Object.entries(categorySpending)
    .filter(([_, amount]) => amount > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([category, amount]) => {
      const config = category_map[category] || category_map.Miscellaneous;
      // Calculate percent of total expenses
      const percent = totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0;
      return {
        label: category,
        amount: amount,
        percent: percent,
        ...config
      };
    });

  const hasSpending = activeCategories.length > 0;

  return (
    <div className="card top-categories">
      <div className="card-header">
        <h3 className="card-title">Top Categories</h3>
        <button className="three-dot-btn" aria-label="More options">
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </button>
      </div>

      <div className="top-categories__content">
        {!hasSpending ? (
          <div className="top-categories__empty">
            <div className="top-categories__empty-icon">
              <i className="fa-solid fa-chart-pie"></i>
            </div>
            <p>No transactions carried out for this month.</p>
          </div>
        ) : (
          <>
            <div className="top-categories__chart-container">
              <svg viewBox="0 0 36 36" className="top-categories__pie">
                {activeCategories.reduce((acc, cat, i) => {
                  const strokeDasharray = `${cat.percent} ${100 - cat.percent}`;
                  const strokeDashoffset = -acc.offset;
                  acc.elements.push(
                    <circle
                      key={cat.label}
                      cx="18" cy="18" r="16"
                      fill="transparent"
                      stroke={cat.color}
                      strokeWidth="4"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                    />
                  );
                  acc.offset += cat.percent;
                  return acc;
                }, { elements: [], offset: 0 }).elements}
              </svg>
              <div className="top-categories__chart-center">
                <span className="chart-label">Total spent</span>
                <span className="chart-value">${Object.values(categorySpending).reduce((a, b) => a + b, 0).toLocaleString()}</span>
              </div>
            </div>

            <div className="top-categories__list-wrapper">
              <ul className="top-categories__list">
                {activeCategories.map((cat) => (
                  <li key={cat.label} className="top-categories__item">
                    <div className="top-categories__item-left">
                      <span 
                        className="top-categories__badge" 
                        style={{ backgroundColor: cat.color }}
                      >
                        {Math.round(cat.percent)}%
                      </span>
                      <span className="top-categories__label">{cat.label}</span>
                    </div>
                    <span className="top-categories__amount">
                      ${cat.amount.toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TopCategories;
