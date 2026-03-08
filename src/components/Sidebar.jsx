import '../styles/Sidebar.css';

function Sidebar({ isOpen, onClose }) {
  return (
    <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
      {/* User Profile */}
      <div className="sidebar__profile">
        <div className="sidebar__avatar">
          <span className="sidebar__avatar-text">T</span>
        </div>
        <span className="sidebar__username">Mgbeadichie Emmanuel</span>
        <span className="sidebar__dropdown">&#9662;</span>
      </div>

      {/* Menu Section */}
      <nav className="sidebar__nav">
        <p className="sidebar__label">Menu</p>
        <ul className="sidebar__menu">
          <li className="sidebar__item sidebar__item--active">
            <svg className="sidebar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            <span>Dashboard</span>
          </li>
          <li className="sidebar__item">
            <svg className="sidebar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7" />
              <polyline points="22 17 17 22 13 18" />
            </svg>
            <span>Analytics</span>
          </li>
          <li className="sidebar__item">
            <svg className="sidebar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 1l4 4-4 4" />
              <path d="M3 11V9a4 4 0 0 1 4-4h14" />
              <path d="M7 23l-4-4 4-4" />
              <path d="M21 13v2a4 4 0 0 1-4 4H3" />
            </svg>
            <span>Transaction</span>
          </li>
          <li className="sidebar__item">
            <svg className="sidebar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
            <span>Card</span>
          </li>
          <li className="sidebar__item">
            <svg className="sidebar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span>Report</span>
          </li>
        </ul>
      </nav>

      {/* Help Section */}
      <nav className="sidebar__nav">
        <p className="sidebar__label">Help</p>
        <ul className="sidebar__menu">
          <li className="sidebar__item">
            <svg className="sidebar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span>Get Help</span>
          </li>
          <li className="sidebar__item">
            <svg className="sidebar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            <span>Learn About Finhow</span>
          </li>
        </ul>
      </nav>

      {/* Upgrade Plan */}
      <div className="sidebar__upgrade">
        <div className="sidebar__upgrade-icon"><i className="fa-solid fa-leaf"></i></div>
        <p className="sidebar__upgrade-title">Upgrade Plan</p>
        <p className="sidebar__upgrade-desc">
          Get 1 month free and unlock all pro features
        </p>
        <button className="sidebar__upgrade-btn">Upgrade Now</button>
      </div>

      {/* Close button for mobile */}
      <button className="sidebar__close" onClick={onClose} aria-label="Close sidebar">
        <i className="fa-solid fa-xmark"></i>
      </button>
    </aside>
  );
}

export default Sidebar;
