import '../styles/MetricCards.css';

function MetricCards({ availableBalance, totalIncome, totalExpenses }) {
  const cards = [
    {
      label: 'Total Balance',
      amount: availableBalance,
      trend: '+12%',
      trendLabel: 'vs Last month',
      color: 'var(--color-primary)'
    },
    {
      label: 'Monthly Income',
      amount: totalIncome,
      trend: '+12%',
      trendLabel: 'vs Last month',
      color: 'var(--color-primary)'
    },
    {
      label: 'Monthly Expenses',
      amount: totalExpenses,
      trend: '+12%',
      trendLabel: 'vs Last month',
      color: 'var(--color-primary)'
    }
  ];

  return (
    <div className="metrics-row">
      {cards.map((card, index) => (
        <div key={index} className="card metric-card">
          <div className="metric-card__header">
            <span className="metric-card__label">{card.label}</span>
          </div>
          <div className="metric-card__content">
            <h2 className="metric-card__amount">${(card.amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
            <div className="metric-card__trend">
              <span className="trend-value" style={{ color: 'var(--color-primary)' }}>
                <i className="fa-solid fa-arrow-up"></i> {card.trend}
              </span>
              <span className="trend-label">{card.trendLabel}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MetricCards;
