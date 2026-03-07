import { useState, useEffect, useCallback } from 'react';
import './index.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import BalanceChart from './components/BalanceChart';
import SpendingSummary from './components/SpendingSummary';
import RecentTransaction from './components/RecentTransaction';
import Budget from './components/Budget';
import TopCategories from './components/TopCategories';
import Overlay from './components/Overlay';

import TransactionModal from './components/TransactionModal';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('finhow_transactions');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, color: '#e50914', bg: '#e509141a', name: 'Netflix Pro', date: '2025-03-05', amount: '-$120', negative: true, category: 'Entertainment' },
      { id: 2, color: '#ea4c89', bg: '#ea4c891a', name: 'Dribbble Pro', date: '2025-03-06', amount: '-$98', negative: true, category: 'Shopping' },
      { id: 3, color: '#5865f2', bg: '#5865f21a', name: 'Discord Pro', date: '2025-03-07', amount: '-$80', negative: true, category: 'Others' },
      { id: 4, color: '#003087', bg: '#0030871a', name: 'Paypal', date: '2025-03-08', amount: '+$1,250', negative: false, category: 'Others' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('finhow_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = useCallback((newTxn) => {
    setTransactions(prev => [newTxn, ...prev]);
  }, []);

  const openSidebar = useCallback(() => {
    setSidebarOpen(true);
    document.body.classList.add('no-scroll');
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
    document.body.classList.remove('no-scroll');
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.classList.add('no-scroll');
  };
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove('no-scroll');
  };

  /* Close sidebar/modal on Escape key */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        if (sidebarOpen) closeSidebar();
        if (isModalOpen) closeModal();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [sidebarOpen, closeSidebar, isModalOpen]);

  return (
    <div className="dashboard">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <Overlay isVisible={sidebarOpen} onClick={closeSidebar} />
      
      <TransactionModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        onAdd={addTransaction} 
      />

      <main className="main-content">
        <Header onMenuToggle={openSidebar} />

        <div className="content-grid">
          <BalanceChart onAddClick={openModal} />
          <SpendingSummary />
          <RecentTransaction transactions={transactions} />
          <Budget />
          <TopCategories />
        </div>
      </main>
    </div>
  );
}

export default App;
