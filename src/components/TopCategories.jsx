import '../styles/TopCategories.css';

const categories = [
  { icon: 'fa-solid fa-clapperboard', label: 'Entertainment', spent: '$230.00', total: '$900', color: 'var(--color-primary)', percent: 25.5 },
  { icon: 'fa-solid fa-bag-shopping', label: 'Shopping', spent: '$230.00', total: '$600', color: 'var(--color-orange)', percent: 38.3 },
  { icon: 'fa-solid fa-notes-medical', label: 'Health', spent: '$230.00', total: '$600', color: 'var(--color-primary)', percent: 38.3 },
  { icon: 'fa-solid fa-burger', label: 'Food & Drink', spent: '$230.00', total: '$300', color: 'var(--color-orange)', percent: 76.7 },
];

function TopCategories() {
  return (
    <div className="card top-categories">
      <div className="card-header">
        <h3 className="card-title">Top Categories</h3>
      </div>

      <ul className="top-categories__list">
        {categories.map((cat) => (
          <li key={cat.label} className="top-categories__item">
            <div className="top-categories__item-top">
              <div className="top-categories__item-left">
                <span className="top-categories__icon"><i className={cat.icon}></i></span>
                <span className="top-categories__label">{cat.label}</span>
              </div>
              <span className="top-categories__amount">
                {cat.spent} / {cat.total}
              </span>
            </div>
            <div className="top-categories__bar">
              <div
                className="top-categories__bar-fill"
                style={{ width: `${cat.percent}%`, backgroundColor: cat.color }}
              ></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopCategories;
