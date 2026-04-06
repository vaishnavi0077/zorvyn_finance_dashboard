import React from 'react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useAppContext } from '../context/AppContext';
import {
  getBalanceTrendData,
  getSpendingByCategory,
  formatCurrency,
} from '../utils/calculations';
import '../styles/components.css';

const ChartSection = () => {
  const { transactions } = useAppContext();

  // Chart data
  const balanceTrendData = getBalanceTrendData(transactions);
  const spendingByCategory = getSpendingByCategory(transactions);

  // Pie chart colors
  const COLORS = [
    '#3b82f6',
    '#10b981',
    '#f59e0b',
    '#ef4444',
    '#8b5cf6',
    '#ec4899',
    '#06b6d4',
    '#f97316',
  ];

  // Custom tooltip for line chart
  const CustomLineTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{payload[0].payload.date}</p>
          <p className="tooltip-value">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for pie chart
  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{payload[0].name}</p>
          <p className="tooltip-value">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="charts-container">
      {/* Line Chart - Balance Trend */}
      <div className="chart-card line-chart-card">
        <h3 className="chart-title">Balance Trend</h3>
        <div className="chart-wrapper">
          {balanceTrendData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={balanceTrendData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip content={<CustomLineTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 4 }}
                  activeDot={{ r: 6 }}
                  fillOpacity={1}
                  fill="url(#colorBalance)"
                  name="Balance"
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="no-data-message">No balance data available</p>
          )}
        </div>
      </div>

      {/* Pie Chart - Spending Distribution */}
      <div className="chart-card pie-chart-card">
        <h3 className="chart-title">Spending by Category</h3>
        <div className="chart-wrapper">
          {spendingByCategory.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <Pie
                  data={spendingByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, value }) => `${name}: ${formatCurrency(value)}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  isAnimationActive={true}
                  animationBegin={0}
                  animationDuration={800}
                >
                  {spendingByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="no-data-message">No spending data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
