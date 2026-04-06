import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../utils/calculations';
import '../styles/components.css';

const SummaryCard = ({
  title = 'Total Balance',
  amount = 0,
  icon: Icon,
  trend = 0,
  comparison = null,
}) => {
  const isPositive = trend >= 0;
  const trendColor = isPositive ? '#10b981' : '#ef4444';
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div className={`summary-card ${isPositive ? 'positive' : 'negative'}`}>
      {/* Card Header */}
      <div className="card-header">
        <div className="card-icon-wrapper">
          {Icon && <Icon size={28} className="card-icon" />}
        </div>
        <h3 className="card-title">{title}</h3>
      </div>

      {/* Card Body */}
      <div className="card-body">
        <div className="amount-section">
          <p className="card-amount">{formatCurrency(amount)}</p>
        </div>

        {/* Trend Badge */}
        {trend !== null && (
          <div className="trend-badge" style={{ backgroundColor: trendColor }}>
            <TrendIcon size={16} className="trend-icon" />
            <span className="trend-text">{Math.abs(trend)}%</span>
          </div>
        )}
      </div>

      {/* Card Footer - Comparison Text */}
      {comparison && (
        <div className="card-footer">
          <p className="comparison-text">{comparison}</p>
        </div>
      )}
    </div>
  );
};

export default SummaryCard;
