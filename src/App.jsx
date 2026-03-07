import { useState, useEffect, useCallback } from 'react';
import './index.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import BalanceChart from './components/BalanceChart';
import SpendingSummary from './components/SpendingSummary';
import RecentTransaction from './components/RecentTransaction';
import CardSection from './components/CardSection';
import QuickTransfer from './components/QuickTransfer';
import Overlay from './components/Overlay';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = useCallback(() => {
    setSidebarOpen(true);
    document.body.classList.add('no-scroll');
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
    document.body.classList.remove('no-scroll');
  }, []);

  /* Close sidebar on Escape key */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && sidebarOpen) closeSidebar();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [sidebarOpen, closeSidebar]);

  return (
    <div className="dashboard">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <Overlay isVisible={sidebarOpen} onClick={closeSidebar} />

      <main className="main-content">
        <Header onMenuToggle={openSidebar} />

        <div className="content-grid">
          <div className="left-column">
            <BalanceChart />
            <div className="bottom-row">
              <RecentTransaction />
              <CardSection />
              <QuickTransfer />
            </div>
          </div>
          <div className="right-column">
            <SpendingSummary />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
