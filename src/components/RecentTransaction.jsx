import '../styles/RecentTransaction.css';

const transactions = [
  { icon: 'N', color: '#e50914', bg: '#e509141a', name: 'Netflix Pro', date: 'Mar 5, 2025', amount: '-$120', negative: true },
  { icon: 'D', color: '#ea4c89', bg: '#ea4c891a', name: 'Dribbble Pro', date: 'Mar 6, 2025', amount: '-$98', negative: true },
  { icon: 'D', color: '#5865f2', bg: '#5865f21a', name: 'Discord Pro', date: 'Mar 7, 2025', amount: '-$80', negative: true },
  { icon: 'P', color: '#003087', bg: '#0030871a', name: 'Paypal', date: 'Mar 8, 2025', amount: '+$1,250', negative: false },
  { icon: 'P', color: '#003087', bg: '#0030871a', name: 'Paypal', date: 'Mar 9, 2025', amount: '+$250', negative: false },
  { icon: 'P', color: '#003087', bg: '#0030871a', name: 'Paypal', date: 'Mar 10, 2025', amount: '+$250', negative: false },
];

function RecentTransaction() {
  return (
    <div className="card recent-txn">
      <div className="card-header">
        <h3 className="card-title">Recent Transaction</h3>
        <button className="three-dot-btn" aria-label="More options">⋮</button>
      </div>

      <ul className="recent-txn__list">
        {transactions.map((txn, i) => (
          <li key={i} className="recent-txn__item">
            <div
              className="recent-txn__icon"
              style={{ backgroundColor: txn.bg, color: txn.color }}
            >
              {txn.icon}
            </div>
            <div className="recent-txn__info">
              <span className="recent-txn__name">{txn.name}</span>
              <span className="recent-txn__date">{txn.date}</span>
            </div>
            <span className={`recent-txn__amount ${txn.negative ? 'recent-txn__amount--negative' : 'recent-txn__amount--positive'}`}>
              {txn.amount}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentTransaction;
