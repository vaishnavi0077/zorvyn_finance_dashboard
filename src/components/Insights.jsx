import React from 'react';
import { TrendingUp, Target, PieChart as PieChartIcon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import {
  getHighestSpendingCategory,
  calculateTotalSavings,
  calculateTotalIncome,
  calculateTotalExpense,
  calculateMonthlyComparison,
  getMostFrequentCategory,
  calculateAverageExpense,
  formatCurrency,
  getPercentageChange,
} from '../utils/calculations';
import '../styles/components.css';

const Insights = ({ expanded = false }) => {
  const { transactions } = useAppContext();

  // Calculate insights
  const highestSpendingCategory = getHighestSpendingCategory(transactions);
  const totalSavings = calculateTotalSavings(transactions);
  const totalIncome = calculateTotalIncome(transactions);
  const totalExpense = calculateTotalExpense(transactions);
  const monthlyData = calculateMonthlyComparison(transactions);
  const mostFrequent = getMostFrequentCategory(transactions);
  const avgExpense = calculateAverageExpense(transactions);

  // Calculate percentage of income saved
  const savingPercentage =
    totalIncome > 0 ? parseFloat(((totalSavings / totalIncome) * 100).toFixed(2)) : 0;

  // Get last month data for comparison
  const getLastMonthComparison = () => {
    if (monthlyData.length < 2) return null;
    const currentMonth = monthlyData[monthlyData.length - 1];
    const previousMonth = monthlyData[monthlyData.length - 2];
    return {
      current: currentMonth,
      previous: previousMonth,
      expenseChange: getPercentageChange(currentMonth.expenses, previousMonth.expenses),
    };
  };

  const lastMonthComparison = getLastMonthComparison();

  return (
    <div className={`insights-container ${expanded ? 'expanded' : ''}`}>
      <h3 className="insights-title">Financial Insights</h3>

      <div className="insights-grid">
        {/* Savings Card */}
        <div className="insight-card savings-card">
          <div className="insight-header">
            <div className="insight-icon savings-icon">
              <Target size={24} />
            </div>
            <h4 className="insight-label">Total Savings</h4>
          </div>
          <div className="insight-body">
            <p className="insight-value">{formatCurrency(totalSavings)}</p>
            <div className="progress-bar-container">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${Math.min(savingPercentage, 100)}%` }}
                />
              </div>
              <p className="progress-label">{savingPercentage}% of income saved</p>
            </div>
          </div>
        </div>

        {/* Highest Spending Category */}
        {highestSpendingCategory && (
          <div className="insight-card highest-spending-card">
            <div className="insight-header">
              <div className="insight-icon spending-icon">
                <PieChartIcon size={24} />
              </div>
              <h4 className="insight-label">Top Spending Category</h4>
            </div>
            <div className="insight-body">
              <p className="category-name">{highestSpendingCategory.category}</p>
              <p className="insight-value">{formatCurrency(highestSpendingCategory.amount)}</p>
              <div className="category-percentage">
                {totalExpense > 0 && (
                  <span className="percentage-badge">
                    {((highestSpendingCategory.amount / totalExpense) * 100).toFixed(1)}% of
                    total spending
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Average Expense */}
        <div className="insight-card average-card">
          <div className="insight-header">
            <div className="insight-icon average-icon">
              <TrendingUp size={24} />
            </div>
            <h4 className="insight-label">Avg. Expense</h4>
          </div>
          <div className="insight-body">
            <p className="insight-value">{formatCurrency(avgExpense)}</p>
            <p className="insight-description">Per transaction</p>
          </div>
        </div>
      </div>

      {/* Monthly Comparison Section */}
      {monthlyData.length > 0 && (
        <div className="monthly-comparison-card">
          <h4 className="comparison-title">Monthly Overview</h4>

          <div className="monthly-grid">
            {monthlyData.map((month, index) => (
              <div key={month.month} className="month-item">
                <p className="month-label">
                  {new Date(month.month + '-01').toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>

                {/* Income Bar */}
                <div className="month-stat">
                  <div className="stat-label">
                    <span>Income</span>
                    <span className="stat-value income">{formatCurrency(month.income)}</span>
                  </div>
                  <div className="mini-progress-bar">
                    <div
                      className="mini-progress-fill income-fill"
                      style={{
                        width: `${Math.min((month.income / (totalIncome / monthlyData.length)) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Expense Bar */}
                <div className="month-stat">
                  <div className="stat-label">
                    <span>Expenses</span>
                    <span className="stat-value expense">{formatCurrency(month.expenses)}</span>
                  </div>
                  <div className="mini-progress-bar">
                    <div
                      className="mini-progress-fill expense-fill"
                      style={{
                        width: `${Math.min((month.expenses / (totalExpense / monthlyData.length)) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Balance */}
                <div className="month-balance">
                  <span className="balance-label">Balance</span>
                  <span className={`balance-value ${month.income - month.expenses >= 0 ? 'positive' : 'negative'}`}>
                    {formatCurrency(month.income - month.expenses)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Additional Stats */}
      {mostFrequent && (
        <div className="additional-stats">
          <div className="stat-item">
            <p className="stat-title">Most Frequent Category</p>
            <p className="stat-content">{mostFrequent.category}</p>
            <p className="stat-description">{mostFrequent.count} transactions</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Insights;
