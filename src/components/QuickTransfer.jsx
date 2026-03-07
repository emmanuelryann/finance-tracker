import '../styles/QuickTransfer.css';

const contacts = [
  { name: 'Koyes', initial: 'K', color: '#6366f1' },
  { name: 'Angel', initial: 'A', color: '#ec4899' },
  { name: 'Dipto', initial: 'D', color: '#f59e0b' },
  { name: 'Saimon', initial: 'S', color: '#2db68a' },
  { name: 'Lelie', initial: 'L', color: '#ef4444' },
  { name: 'Washi', initial: 'W', color: '#8b5cf6' },
  { name: 'Ahei', initial: 'A', color: '#06b6d4' },
];

function QuickTransfer() {
  return (
    <div className="card quick-transfer">
      <div className="card-header">
        <h3 className="card-title">Quick Transfer</h3>
        <button className="three-dot-btn" aria-label="More options">⋮</button>
      </div>

      {/* Send To */}
      <p className="quick-transfer__label">Send To</p>
      <div className="quick-transfer__recipient">
        <div className="quick-transfer__recipient-avatar" style={{ background: '#2db68a' }}>
          SR
        </div>
        <div className="quick-transfer__recipient-info">
          <span className="quick-transfer__recipient-name">Surja Sen Das</span>
          <span className="quick-transfer__recipient-number">**** **** **** 0571</span>
        </div>
        <span className="quick-transfer__recipient-check">&#10003;</span>
      </div>

      {/* Contacts Row */}
      <div className="quick-transfer__contacts">
        {contacts.map((c) => (
          <div key={c.name} className="quick-transfer__contact">
            <div
              className="quick-transfer__contact-avatar"
              style={{ backgroundColor: c.color }}
            >
              {c.initial}
            </div>
            <span className="quick-transfer__contact-name">{c.name}</span>
          </div>
        ))}
      </div>

      {/* Amount */}
      <div className="quick-transfer__amount-section">
        <div className="quick-transfer__field">
          <span className="quick-transfer__field-label">Total Amount</span>
          <span className="quick-transfer__field-value">$ 209,24</span>
        </div>
        <div className="quick-transfer__field">
          <span className="quick-transfer__field-label">Description</span>
        </div>
      </div>

      <button className="quick-transfer__btn">Upgrade Now</button>
    </div>
  );
}

export default QuickTransfer;
