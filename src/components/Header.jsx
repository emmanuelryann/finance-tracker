import '../styles/Header.css';

function Header({ onMenuToggle }) {
  return (
    <header className="header">
      <div className="header__left">
        <button
          className="header__hamburger"
          onClick={onMenuToggle}
          aria-label="Open menu"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
        <div className="header__greeting">
          <h1 className="header__title">Good Morning, Emmanuel</h1>
          <p className="header__subtitle">
            This is your finance management platform.
          </p>
        </div>
      </div>

      <div className="header__right">
        <div className="header__search">
          <i className="fa-solid fa-magnifying-glass header__search-icon"></i>
          <input
            type="text"
            className="header__search-input"
            placeholder="Search..."
          />
          <button className="header__search-btn">Search</button>
        </div>

        <button className="header__icon-btn" aria-label="Notifications">
          <i className="fa-solid fa-bell"></i>
        </button>
        <button className="header__icon-btn" aria-label="Settings">
          <i className="fa-solid fa-gear"></i>
        </button>
        <button className="header__icon-btn header__icon-btn--menu" aria-label="More options">
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
    </header>
  );
}

export default Header;
