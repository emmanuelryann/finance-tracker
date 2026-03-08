import { useState, useEffect, useCallback, useMemo } from 'react';
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
      const saved = localStorage.getItem('finhow_transactions_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error("Failed to parse transactions:", e);
    }
    return [];
  });

  const [budgets, setBudgets] = useState(() => {
    try {
      const saved = localStorage.getItem('finhow_budgets_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error("Failed to parse budgets:", e);
    }
    return {
      Daily: 0,
      Weekly: 0,
      Monthly: 0,
      Yearly: 0
    };
  });

  useEffect(() => {
    localStorage.setItem('finhow_transactions_v2', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('finhow_budgets_v2', JSON.stringify(budgets));
  }, [budgets]);

  // Calculate Monthly Metrics
  const { totalIncome, availableBalance, categorySpending, currentMonthName } = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const monthName = now.toLocaleString('default', { month: 'long' });

    console.log("Budget Tracker: Calculating metrics for", monthName);

    let income = 0;
    let expenses = 0;
    const spending = {
      Housing: 0,
      Food: 0,
      Entertainment: 0,
      Shopping: 0,
      Health: 0,
      Others: 0
    };

    transactions.forEach(txn => {
      if (!txn || typeof txn !== 'object') return;
      
      const txnDate = new Date(txn.date);
      if (isNaN(txnDate.getTime())) return;

      if (txnDate.getMonth() === currentMonth && txnDate.getFullYear() === currentYear) {
        const amountStr = String(txn.amount || "0").replace(/[^0-9.-]+/g, "");
        const amount = Math.abs(parseFloat(amountStr));
        if (isNaN(amount)) return;
        
        if (txn.negative) {
          expenses += amount;
          if (spending.hasOwnProperty(txn.category)) {
            spending[txn.category] += amount;
          } else {
            spending.Others += amount;
          }
        } else {
          income += amount;
        }
      }
    });

    return {
      totalIncome: income,
      availableBalance: income - expenses,
      categorySpending: spending,
      currentMonthName: monthName
    };
  }, [transactions]);

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
        currentBalance={availableBalance}
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
          <BalanceChart 
            onAddClick={openTxnModal} 
            availableBalance={availableBalance}
            totalIncome={totalIncome}
            categoryData={categorySpending}
            monthName={currentMonthName}
          />
          <SpendingSummary />
          <RecentTransaction transactions={transactions} />
          <Budget budgets={budgets} transactions={transactions} onSetBudgetClick={openBudgetModal} />
          <TopCategories categorySpending={categorySpending} totalIncome={totalIncome} />
        </div>
      </main>
    </div>
  );
}

export default App;
