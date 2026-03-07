import '../styles/CardSection.css';

function CardSection() {
  return (
    <div className="card card-section">
      <div className="card-header">
        <h3 className="card-title">Card</h3>
        <button className="three-dot-btn" aria-label="More options">⋮</button>
      </div>

      {/* White Card */}
      <div className="card-section__card card-section__card--white">
        <div className="card-section__row">
          <div className="card-section__field">
            <span className="card-section__field-label">Name</span>
            <span className="card-section__field-value">Turja Sen Das</span>
          </div>
          <div className="card-section__field">
            <span className="card-section__field-label">Number</span>
            <span className="card-section__field-value">**** **** **** 6690</span>
          </div>
        </div>
        <div className="card-section__row card-section__row--bottom">
          <div className="card-section__balance">
            <span className="card-section__balance-symbol">$</span>
            <span className="card-section__balance-value">100.000</span>
            <svg className="card-section__balance-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
            </svg>
          </div>
          <div className="card-section__expiry">
            <span>10/27</span>
            <div className="card-section__card-logo">
              <span className="card-section__logo-circle card-section__logo-circle--red"></span>
              <span className="card-section__logo-circle card-section__logo-circle--orange"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Green Card */}
      <div className="card-section__card card-section__card--green">
        <div className="card-section__row">
          <div className="card-section__field">
            <span className="card-section__field-label card-section__field-label--light">Name</span>
            <span className="card-section__field-value card-section__field-value--light">Das Turja Sen</span>
          </div>
          <div className="card-section__field">
            <span className="card-section__field-label card-section__field-label--light">Number</span>
            <span className="card-section__field-value card-section__field-value--light">**** **** **** 2054</span>
          </div>
        </div>
        <div className="card-section__row card-section__row--bottom">
          <div className="card-section__balance">
            <span className="card-section__balance-label card-section__balance-label--light">Balance</span>
          </div>
          <div className="card-section__expiry">
            <span className="card-section__expiry--light">03/27</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardSection;
