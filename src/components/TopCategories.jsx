import '../styles/TopCategories.css';

const category_map = {
  Housing: { icon: 'fa-solid fa-house', color: '#6366f1' },
  Food: { icon: 'fa-solid fa-burger', color: '#f87171' },
  Entertainment: { icon: 'fa-solid fa-clapperboard', color: '#e50914' },
  Shopping: { icon: 'fa-solid fa-bag-shopping', color: '#ea4c89' },
  Health: { icon: 'fa-solid fa-notes-medical', color: '#49ABA9' },
  Others: { icon: 'fa-solid fa-circle-dollar-to-slot', color: '#6b7280' },
};

function TopCategories({ categorySpending, totalIncome }) {
  // Filter for categories with spending > 0 and sort by amount descending
  const activeCategories = Object.entries(categorySpending)
    .filter(([_, amount]) => amount > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([category, amount]) => {
      const config = category_map[category] || category_map.Others;
      // Calculate percent of total income
      const percent = totalIncome > 0 ? (amount / totalIncome) * 100 : 0;
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
          <ul className="top-categories__list">
            {activeCategories.map((cat) => (
              <li key={cat.label} className="top-categories__item">
                <div className="top-categories__item-top">
                  <div className="top-categories__item-left">
                    <span 
                      className="top-categories__icon" 
                      style={{ backgroundColor: `${cat.color}1a`, color: cat.color }}
                    >
                      <i className={cat.icon}></i>
                    </span>
                    <span className="top-categories__label">{cat.label}</span>
                  </div>
                  <span className="top-categories__amount">
                    ${cat.amount.toLocaleString()}
                  </span>
                </div>
                <div className="top-categories__bar">
                  <div
                    className="top-categories__bar-fill"
                    style={{ width: `${cat.percent}%`, backgroundColor: 'var(--color-orange)' }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TopCategories;
