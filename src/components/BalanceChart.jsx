import '../styles/BalanceChart.css';

const barData = [
  { month: 'Jan', height: 70 },
  { month: 'Feb', height: 90 },
  { month: 'Mar', height: 75 },
  { month: 'Apr', height: 65 },
  { month: 'Mai', height: 60 },
  { month: 'Jun', height: 85 },
];

const yLabels = ['$130', '$130', '$130', '$120'];

function BalanceChart() {
  return (
    <div className="card balance-chart">
      <div className="balance-chart__header">
        <div>
          <p className="balance-chart__label">Balance</p>
          <h2 className="balance-chart__amount">$23,751,05</h2>
        </div>
        <div className="balance-chart__dropdown">
          <span>Days</span>
          <span className="balance-chart__dropdown-arrow">&#9662;</span>
        </div>
      </div>

      <div className="balance-chart__chart">
        <div className="balance-chart__y-axis">
          {yLabels.map((label, i) => (
            <span key={i} className="balance-chart__y-label">{label}</span>
          ))}
        </div>
        <div className="balance-chart__bars-wrapper">
          <div className="balance-chart__dashed-line"></div>
          <div className="balance-chart__bars">
            {barData.map((bar) => (
              <div key={bar.month} className="balance-chart__bar-group">
                <div
                  className="balance-chart__bar"
                  style={{ height: `${bar.height}%` }}
                ></div>
                <span className="balance-chart__x-label">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BalanceChart;
