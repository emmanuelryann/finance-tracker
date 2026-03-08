import '../styles/RecentTransaction.css';

function RecentTransaction({ transactions }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'success': return 'var(--color-green)';
      case 'pending': return 'var(--color-orange)';
      case 'failed': return 'var(--color-red)';
      case 'reversed': return 'var(--color-text-secondary)';
      default: return 'var(--color-text-secondary)';
    }
  };

  return (
    <div className="card recent-txn">
      <div className="card-header">
        <div className="transaction-history__title-group">
          <h3 className="card-title">Transaction History</h3>
          <p className="card-subtitle">Short subtitle</p>
        </div>
        <div className="transaction-history__actions">
          <button className="txn-action-btn">
            <i className="fa-solid fa-arrows-up-down"></i> Short
          </button>
          <button className="txn-action-btn">
            <i className="fa-solid fa-filter"></i> Filter
          </button>
        </div>
      </div>

      <div className="transaction-history__table-container">
        <table className="transaction-history__table">
          <thead>
            <tr>
              <th>Transaction <i className="fa-solid fa-sort"></i></th>
              <th>Date <i className="fa-solid fa-sort"></i></th>
              <th>Category</th>
              <th>Amount <i className="fa-solid fa-sort"></i></th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.id} className="txn-row">
                <td className="txn-name-cell">
                  <span className="txn-name">{txn.name}</span>
                </td>
                <td className="txn-date-cell">{formatDate(txn.date)}</td>
                <td className="txn-category-cell">{txn.category}</td>
                <td className={`txn-amount-cell ${txn.negative ? 'negative' : 'positive'}`}>
                  {txn.amount}
                </td>
                <td className="txn-status-cell">
                  <span 
                    className="status-tag" 
                    style={{ 
                      backgroundColor: `${getStatusColor(txn.status)}15`, 
                      color: getStatusColor(txn.status) 
                    }}
                  >
                    <i className="fa-solid fa-circle-check" style={{ fontSize: '0.625rem' }}></i> {txn.status || 'Success'}
                  </span>
                </td>
                <td className="txn-action-cell">
                  <button className="three-dot-btn">
                    <i className="fa-solid fa-ellipsis"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentTransaction;
