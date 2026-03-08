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
import BudgetModal from './components/BudgetModal';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isTxnModalOpen, setIsTxnModalOpen] = useState(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem('finhow_transactions');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse transactions:", e);
    }
    return [
      { id: 1, color: '#e50914', bg: '#e509141a', name: 'Netflix Pro', date: '2025-03-05', amount: '-$120', negative: true, category: 'Entertainment' },
      { id: 2, color: '#ea4c89', bg: '#ea4c891a', name: 'Dribbble Pro', date: '2025-03-06', amount: '-$98', negative: true, category: 'Shopping' },
      { id: 3, color: '#5865f2', bg: '#5865f21a', name: 'Discord Pro', date: '2025-03-07', amount: '-$80', negative: true, category: 'Others' },
      { id: 4, color: '#003087', bg: '#0030871a', name: 'Paypal', date: '2025-03-08', amount: '+$1,250', negative: false, category: 'Others' },
    ];
  });

  const [budgets, setBudgets] = useState(() => {
    try {
      const saved = localStorage.getItem('finhow_budgets');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse budgets:", e);
    }
    return {
      Daily: 0,
      Weekly: 0,
      Monthly: 4000,
      Yearly: 0
    };
  });

  useEffect(() => {
    localStorage.setItem('finhow_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('finhow_budgets', JSON.stringify(budgets));
  }, [budgets]);

  const addTransaction = useCallback((newTxn) => {
    setTransactions(prev => [newTxn, ...prev]);
  }, []);

  const setBudget = useCallback((timeframe, amount) => {
    setBudgets(prev => ({ ...prev, [timeframe]: amount }));
  }, []);

  const openSidebar = useCallback(() => {
    setSidebarOpen(true);
    document.body.classList.add('no-scroll');
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
    document.body.classList.remove('no-scroll');
  }, []);

  const openTxnModal = () => {
    setIsTxnModalOpen(true);
    document.body.classList.add('no-scroll');
  };
  const closeTxnModal = () => {
    setIsTxnModalOpen(false);
    document.body.classList.remove('no-scroll');
  };

  const openBudgetModal = () => {
    setIsBudgetModalOpen(true);
    document.body.classList.add('no-scroll');
  };
  const closeBudgetModal = () => {
    setIsBudgetModalOpen(false);
    document.body.classList.remove('no-scroll');
  };

  /* Close sidebar/modals on Escape key */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        if (sidebarOpen) closeSidebar();
        if (isTxnModalOpen) closeTxnModal();
        if (isBudgetModalOpen) closeBudgetModal();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [sidebarOpen, closeSidebar, isTxnModalOpen, isBudgetModalOpen]);

  return (
    <div className="dashboard">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <Overlay isVisible={sidebarOpen} onClick={closeSidebar} />
      
      <TransactionModal 
        isOpen={isTxnModalOpen} 
        onClose={closeTxnModal} 
        onAdd={addTransaction} 
      />

      <BudgetModal
        isOpen={isBudgetModalOpen}
        onClose={closeBudgetModal}
        onSet={setBudget}
        currentBudgets={budgets}
      />

      <main className="main-content">
        <Header onMenuToggle={openSidebar} />

        <div className="content-grid">
          <BalanceChart onAddClick={openTxnModal} />
          <SpendingSummary />
          <RecentTransaction transactions={transactions} />
          <Budget budgets={budgets} transactions={transactions} onSetBudgetClick={openBudgetModal} />
          <TopCategories />
        </div>
      </main>
    </div>
  );
}

export default App;
