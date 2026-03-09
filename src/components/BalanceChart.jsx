import { useState, useMemo } from 'react';
import '../styles/BalanceChart.css';

const ALL_MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const categories = ['Housing', 'Food', 'Entertainment', 'Shopping', 'Health', 'Miscellaneous'];

function BalanceChart({ onAddClick, transactions }) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);

  // Local calculation of data for the selected month
  const { totalIncome, categoryData } = useMemo(() => {
    const monthTransactions = transactions.filter(txn => {
      let txnDate;
      if (typeof txn.date === 'string' && txn.date.includes('-')) {
        const [year, month, day] = txn.date.split('-');
        txnDate = new Date(year, month - 1, day);
      } else {
        txnDate = new Date(txn.date);
      }
      return txnDate.getMonth() === selectedMonth && txnDate.getFullYear() === new Date().getFullYear();
    });

    const income = monthTransactions
      .filter(txn => !txn.negative && txn.status !== 'Failed')
      .reduce((acc, txn) => acc + Math.abs(parseFloat(String(txn.amount).replace(/[^0-9.-]+/g, ""))), 0);

    const spending = monthTransactions
      .filter(txn => txn.negative && txn.status !== 'Failed')
      .reduce((acc, txn) => {
        const amount = Math.abs(parseFloat(String(txn.amount).replace(/[^0-9.-]+/g, "")));
        acc[txn.category] = (acc[txn.category] || 0) + amount;
        return acc;
      }, {});

    return { totalIncome: income, categoryData: spending };
  }, [transactions, selectedMonth]);

  const maxCategorySpending = Math.max(...Object.values(categoryData), 0);
  const chartMax = Math.max(totalIncome, maxCategorySpending, 100);
  
  // Dependable Y-axis labels: 0% to 100% of the Monthly Income (chartMax)
  const yAxisLabels = [
    `$${Math.round(chartMax).toLocaleString()}`,
    `$${Math.round(chartMax * 0.75).toLocaleString()}`,
    `$${Math.round(chartMax * 0.5).toLocaleString()}`,
    `$${Math.round(chartMax * 0.25).toLocaleString()}`,
    '$0'
  ];

  const handleMonthSelect = (index) => {
    setSelectedMonth(index);
    setIsDropdownOpen(false);
  };

  return (
    <div className="card balance-chart">
      <div className="card-header">
        <div className="balance-chart__title-group">
          <p className="balance-chart__subtitle">{ALL_MONTHS[selectedMonth]} Overview</p>
        </div>
        <div className="balance-chart__actions">
          <button className="balance-chart__add-btn" onClick={onAddClick}>
            <span className="balance-chart__add-icon"><i className="fa-solid fa-plus"></i></span>
            Add Transaction
          </button>
          <div className="balance-chart__dropdown-container">
            <div className="balance-chart__dropdown" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <span>{ALL_MONTHS[selectedMonth]}</span>
              <span className="balance-chart__dropdown-arrow"><i className="fa-solid fa-chevron-down"></i></span>
            </div>
            {isDropdownOpen && (
              <div className="balance-chart__dropdown-menu">
                {ALL_MONTHS.map((month, index) => (
                  <div 
                    key={month} 
                    className={`balance-chart__dropdown-item ${selectedMonth === index ? 'active' : ''}`}
                    onClick={() => handleMonthSelect(index)}
                  >
                    {month}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="balance-chart__chart-container">
        <div className="balance-chart__y-axis">
          {yAxisLabels.map((label, i) => (
            <span key={i} className="balance-chart__y-label">{label}</span>
          ))}
        </div>
        
        <div className="balance-chart__bars-area">
          <div className="balance-chart__grid-lines">
            {[0, 1, 2, 3, 4].map(line => (
              <div key={line} className="balance-chart__grid-line"></div>
            ))}
          </div>

          <div className="balance-chart__bars">
            {categories.map((cat) => {
              const spent = categoryData[cat] || 0;
              const heightPercent = chartMax > 0 ? (spent / chartMax) * 100 : 0;
              
              return (
                <div key={cat} className="balance-chart__bar-group">
                  <div className="balance-chart__bar-wrapper">
                    <div
                      className="balance-chart__bar"
                      style={{ height: `${heightPercent}%` }}
                      onMouseEnter={() => setActiveTooltip(cat)}
                      onMouseLeave={() => setActiveTooltip(null)}
                    >
                      {activeTooltip === cat && spent > 0 && (
                        <div className="balance-chart__tooltip">
                          ${Math.round(spent).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="balance-chart__x-label">{cat}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BalanceChart;
