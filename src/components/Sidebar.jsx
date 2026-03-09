import '../styles/Sidebar.css';

function Sidebar({ isOpen, onClose }) {
  return (
    <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
      <div className="sidebar__brand">
        <div className="sidebar__logo">
          <i className="fa-solid fa-grip"></i>
        </div>
        <span className="sidebar__brand-name">Financery</span>
      </div>

      <nav className="sidebar__nav">
        <p className="sidebar__section-title">MAIN MENU</p>
        <ul className="sidebar__menu">
          <li className="sidebar__item sidebar__item--active">
            <i className="fa-solid fa-house"></i>
            <span>Overview</span>
          </li>
          <li className="sidebar__item">
            <i className="fa-solid fa-credit-card"></i>
            <span>Card</span>
          </li>
          <li className="sidebar__item">
            <i className="fa-solid fa-wallet"></i>
            <span>Budget</span>
          </li>
          <li className="sidebar__item">
            <i className="fa-solid fa-receipt"></i>
            <span>Payment</span>
          </li>
          <li className="sidebar__item">
            <i className="fa-solid fa-chart-simple"></i>
            <span>Statistics</span>
          </li>
          <li className="sidebar__item">
            <i className="fa-solid fa-file-lines"></i>
            <span>Report</span>
          </li>
          <li className="sidebar__item">
            <i className="fa-solid fa-user"></i>
            <span>Account</span>
          </li>
        </ul>
      </nav>

      <nav className="sidebar__nav sidebar__nav--bottom">
        <p className="sidebar__section-title">SETTINGS</p>
        <ul className="sidebar__menu">
          <li className="sidebar__item">
            <i className="fa-solid fa-gear"></i>
            <span>Settings</span>
          </li>
          <li className="sidebar__item">
            <i className="fa-solid fa-circle-question"></i>
            <span>Help Center</span>
          </li>
          <li className="sidebar__item">
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Logout</span>
          </li>
        </ul>
      </nav>

      <button className="sidebar__close" onClick={onClose} aria-label="Close sidebar">
        <i className="fa-solid fa-xmark"></i>
      </button>
    </aside>
  );
}

export default Sidebar;
