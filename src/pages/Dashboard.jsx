import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Wallet, ArrowUp, ArrowDown } from 'lucide-react';
import { calculateTotalIncome, calculateTotalExpense, calculateBalance } from '../utils/calculations';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import SummaryCard from '../components/SummaryCard';
import ChartSection from '../components/ChartSection';
import TransactionTable from '../components/TransactionTable';
import Insights from '../components/Insights';
import '../styles/global.css';

const Dashboard = () => {
  const { darkMode, transactions } = useAppContext();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const totalIncome = calculateTotalIncome(transactions);
  const totalExpense = calculateTotalExpense(transactions);
  const totalBalance = calculateBalance(transactions);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavigate = (section) => {
    setActiveSection(section);
    setSidebarOpen(false);
  };

  return (
    <div className={`dashboard-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onToggle={handleSidebarToggle}
      />

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Header */}
        <Header onMenuToggle={handleSidebarToggle} />

        {/* Content Area */}
        <div className="dashboard-content">
          {/* Dashboard Section */}
          {activeSection === 'dashboard' && (
            <>
              {/* Summary Cards */}
              <section className="summary-section">
                <div className="summary-cards">
                  <SummaryCard
                    title="Total Balance"
                    amount={totalBalance}
                    icon={Wallet}
                    trend={null}
                  />
                  <SummaryCard
                    title="Total Income"
                    amount={totalIncome}
                    icon={ArrowUp}
                    trend={null}
                  />
                  <SummaryCard
                    title="Total Expenses"
                    amount={totalExpense}
                    icon={ArrowDown}
                    trend={null}
                  />
                </div>
              </section>

              {/* Charts Section */}
              <section className="charts-section">
                <ChartSection />
              </section>

              {/* Transactions & Insights */}
              <section className="main-grid">
                {/* Transactions Table */}
                <div className="transactions-container">
                  <TransactionTable />
                </div>

                {/* Insights */}
                <div className="insights-container">
                  <Insights />
                </div>
              </section>
            </>
          )}

          {/* Transactions Section */}
          {activeSection === 'transactions' && (
            <section className="full-width-section">
              <TransactionTable expanded={true} />
            </section>
          )}

          {/* Insights Section */}
          {activeSection === 'insights' && (
            <section className="full-width-section">
              <Insights expanded={true} />
            </section>
          )}
        </div>
      </main>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={handleSidebarToggle} />
      )}
    </div>
  );
};

export default Dashboard;
