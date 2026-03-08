import '../styles/RecentTransaction.css';

const category_map = {
  Housing: { icon: 'fa-solid fa-house', color: '#6366f1' },
  Food: { icon: 'fa-solid fa-burger', color: '#f87171' },
  Entertainment: { icon: 'fa-solid fa-clapperboard', color: '#e50914' },
  Shopping: { icon: 'fa-solid fa-bag-shopping', color: '#ea4c89' },
  Health: { icon: 'fa-solid fa-notes-medical', color: '#49ABA9' },
  Others: { icon: 'fa-solid fa-circle-dollar-to-slot', color: '#6b7280' },
};

function RecentTransaction({ transactions }) {
  const getCategoryData = (cat) => category_map[cat] || category_map.Others;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="card recent-txn">
      <div className="card-header">
        <h3 className="card-title">Recent Transactions</h3>
        <button className="three-dot-btn" aria-label="More options">
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </button>
      </div>

      <ul className="recent-txn__list">
        {transactions.map((txn) => {
          const { icon, color } = getCategoryData(txn.category);
          return (
            <li key={txn.id} className="recent-txn__item">
              <div
                className="recent-txn__icon"
                style={{ backgroundColor: `${color}1a`, color: color }}
              >
                <i className={icon}></i>
              </div>
              <div className="recent-txn__info">
                <span className="recent-txn__name">{txn.name}</span>
                <span className="recent-txn__date">{formatDate(txn.date)}</span>
              </div>
              <span className={`recent-txn__amount ${txn.negative ? 'recent-txn__amount--negative' : 'recent-txn__amount--positive'}`}>
                {txn.amount}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default RecentTransaction;
