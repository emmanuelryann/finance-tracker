import '../styles/RecentTransaction.css';

function RecentTransaction({ transactions }) {
  const formatDate = (dateStr) => {
    let date;
    if (typeof dateStr === 'string' && dateStr.includes('-')) {
      const [year, month, day] = dateStr.split('-');
      date = new Date(year, month - 1, day);
    } else {
      date = new Date(dateStr);
    }
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'success': return <i className="fa-solid fa-circle-check"></i>;
      case 'pending': return <i className="fa-solid fa-circle-notch fa-spin"></i>;
      case 'failed': return <i className="fa-solid fa-circle-xmark"></i>;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'success': return 'var(--color-green)';
      case 'pending': return 'var(--color-orange)';
      case 'failed': return 'var(--color-red)';
      default: return 'var(--color-text-secondary)';
    }
  };

  return (
    <div className="card recent-txn">
      <div className="card-header">
        <div className="transaction-history__title-group">
          <h3 className="card-title">Transaction History</h3>
        </div>
        <div className="transaction-history__actions">
          <button className="txn-filter-btn">
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
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="6" className="transaction-history__empty-cell">
                  <div className="top-categories__empty" style={{ margin: '2rem auto' }}>
                    <div className="top-categories__empty-icon">
                      <i className="fa-solid fa-receipt"></i>
                    </div>
                    <p>No transactions carried out yet.</p>
                  </div>
                </td>
              </tr>
            ) : (
              transactions.map((txn) => (
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
                    <div 
                      className={`status-tag status-tag--${txn.status?.toLowerCase() || 'success'}`}
                      style={{ color: getStatusColor(txn.status) }}
                    >
                      <span className="status-tag__icon">{getStatusIcon(txn.status || 'Success')}</span>
                      <span className="status-tag__text">{txn.status || 'Success'}</span>
                    </div>
                  </td>
                  <td className="txn-action-cell">
                    <button className="three-dot-btn">
                      <i className="fa-solid fa-ellipsis"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentTransaction;
