import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="loading-skeleton">
      {/* Summary Cards Skeleton */}
      <section className="summary-section">
        <div className="summary-cards">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="skeleton-card">
              <div className="skeleton-header">
                <div className="skeleton-icon"></div>
                <div className="skeleton-title"></div>
              </div>
              <div className="skeleton-body">
                <div className="skeleton-amount"></div>
                <div className="skeleton-trend"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Charts Skeleton */}
      <section className="charts-section">
        <div className="charts-container">
          <div className="skeleton-chart-card">
            <div className="skeleton-chart-title"></div>
            <div className="skeleton-chart-wrapper">
              <div className="skeleton-chart-placeholder"></div>
            </div>
          </div>
          <div className="skeleton-chart-card">
            <div className="skeleton-chart-title"></div>
            <div className="skeleton-chart-wrapper">
              <div className="skeleton-chart-placeholder"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Table Skeleton */}
      <section className="table-section">
        <div className="skeleton-table-container">
          <div className="skeleton-table-header">
            <div className="skeleton-table-title"></div>
            <div className="skeleton-button"></div>
          </div>
          <div className="skeleton-table-filters">
            <div className="skeleton-search"></div>
            <div className="skeleton-filter"></div>
            <div className="skeleton-filter"></div>
          </div>
          <div className="skeleton-table-wrapper">
            <div className="skeleton-table">
              <div className="skeleton-table-head">
                <div className="skeleton-table-row">
                  {Array.from({ length: 7 }).map((_, index) => (
                    <div key={index} className="skeleton-table-header-cell"></div>
                  ))}
                </div>
              </div>
              <div className="skeleton-table-body">
                {Array.from({ length: 5 }).map((_, rowIndex) => (
                  <div key={rowIndex} className="skeleton-table-row">
                    {Array.from({ length: 7 }).map((_, cellIndex) => (
                      <div key={cellIndex} className="skeleton-table-cell"></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="skeleton-pagination">
            <div className="skeleton-pagination-info"></div>
            <div className="skeleton-pagination-buttons">
              <div className="skeleton-pagination-button"></div>
              <div className="skeleton-pagination-button"></div>
              <div className="skeleton-pagination-button"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Insights Skeleton */}
      <section className="insights-section">
        <div className="skeleton-insights-container">
          <div className="skeleton-insights-title"></div>
          <div className="skeleton-insights-grid">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="skeleton-insight-card">
                <div className="skeleton-insight-header">
                  <div className="skeleton-insight-icon"></div>
                  <div className="skeleton-insight-label"></div>
                </div>
                <div className="skeleton-insight-body">
                  <div className="skeleton-insight-value"></div>
                  <div className="skeleton-progress-bar"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoadingSkeleton;
