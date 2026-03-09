import '../styles/MetricCards.css';

function MetricCards({ availableBalance, totalIncome, totalExpenses, balanceChange, incomeChange, expensesChange }) {
  const formatTrend = (val) => {
    const sign = val >= 0 ? '+' : '';
    return `${sign}${Math.round(val)}%`;
  };

  const cards = [
    {
      label: 'Available Balance',
      amount: availableBalance,
      trend: formatTrend(balanceChange),
      isPositive: balanceChange >= 0,
      trendLabel: 'vs Last month',
      color: 'var(--color-primary)'
    },
    {
      label: 'Monthly Income',
      amount: totalIncome,
      trend: formatTrend(incomeChange),
      isPositive: incomeChange >= 0,
      trendLabel: 'vs Last month',
      color: 'var(--color-primary)'
    },
    {
      label: 'Monthly Expenses',
      amount: totalExpenses,
      trend: formatTrend(expensesChange),
      isPositive: expensesChange >= 0, // Simplified to follow the literal sign (+ is green, - is red)
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
              <span 
                className="trend-value" 
                style={{ color: card.isPositive ? 'var(--color-green)' : 'var(--color-red)' }}
              >
                <i className={`fa-solid ${parseFloat(card.trend) >= 0 ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i> {card.trend}
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
