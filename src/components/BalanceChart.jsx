import { useState } from 'react';
import '../styles/BalanceChart.css';

const categories = ['Housing', 'Food', 'Entertainment', 'Shopping', 'Health', 'Miscellaneous'];

function BalanceChart({ onAddClick, totalIncome, categoryData, monthName }) {
  const [activeTooltip, setActiveTooltip] = useState(null);
  // Use the total monthly income as the chart's upper limit
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

  return (
    <div className="card balance-chart">
      <div className="card-header">
        <div className="balance-chart__title-group">
          <p className="balance-chart__subtitle">{monthName} Overview</p>
        </div>
        <div className="balance-chart__actions">
          <button className="balance-chart__add-btn" onClick={onAddClick}>
            <span className="balance-chart__add-icon"><i className="fa-solid fa-plus"></i></span>
            Add Transaction
          </button>
          <div className="balance-chart__dropdown">
            <span>Monthly</span>
            <span className="balance-chart__dropdown-arrow"><i className="fa-solid fa-chevron-down"></i></span>
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
