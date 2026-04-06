import React from 'react';
import { LayoutDashboard, List, TrendingUp, X } from 'lucide-react';
import '../styles/components.css';

const Sidebar = ({ activeSection, onNavigate, isOpen, onToggle }) => {
  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'transactions',
      label: 'Transactions',
      icon: List,
    },
    {
      id: 'insights',
      label: 'Insights',
      icon: TrendingUp,
    },
  ];

  return (
    <>
      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Close button for mobile */}
        <button className="sidebar-close" onClick={onToggle} aria-label="Close sidebar">
          <X size={24} />
        </button>

        {/* Logo/Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <TrendingUp size={28} className="logo-icon" />
            <h1>zorvyn</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => onNavigate(item.id)}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={20} className="nav-icon" />
                <span className="nav-label">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer Info */}
        <div className="sidebar-footer">
          <div className="footer-info">
            <p className="footer-text">Finance Dashboard</p>
            <p className="footer-version">v1.0</p>
          </div>
        </div>
      </aside>

      {/* Mobile backdrop */}
      {isOpen && <div className="sidebar-backdrop" onClick={onToggle} />}
    </>
  );
};

export default Sidebar;
