import React, { useState } from 'react';
import { Menu, Moon, Sun, User as UserIcon, LogOut } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import NotificationBadge from './NotificationBadge';
import '../styles/components.css';

const Header = ({ onMenuToggle }) => {
  const { role, toggleRole, darkMode, toggleDarkMode } = useAppContext();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const handleRoleChange = (newRole) => {
    if (newRole !== role) {
      toggleRole();
    }
    setRoleDropdownOpen(false);
  };

  return (
    <header className="dashboard-header">
      {/* Left Section - Menu Toggle */}
      <div className="header-left">
        <button
          className="menu-toggle"
          onClick={onMenuToggle}
          aria-label="Toggle sidebar"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Center Section - Title */}
      <div className="header-center">
        
      </div>

      {/* Right Section - Controls */}
      <div className="header-right">
        {/* Role Dropdown */}
        <div className="role-selector">
          <button
            className="role-button"
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            aria-label="Select role"
            aria-expanded={roleDropdownOpen}
          >
            <UserIcon size={18} />
            <span className="role-text">{role}</span>
          </button>

          {roleDropdownOpen && (
            <div className="role-dropdown">
              <button
                className={`dropdown-item ${role === 'Admin' ? 'active' : ''}`}
                onClick={() => handleRoleChange('Admin')}
              >
                <span className="role-badge admin-badge">A</span>
                Admin
              </button>
              <button
                className={`dropdown-item ${role === 'Viewer' ? 'active' : ''}`}
                onClick={() => handleRoleChange('Viewer')}
              >
                <span className="role-badge viewer-badge">V</span>
                Viewer
              </button>
            </div>
          )}
        </div>

        {/* Dark Mode Toggle */}
        <button
          className="header-button dark-mode-toggle"
          onClick={toggleDarkMode}
          aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          title={`${darkMode ? 'Light' : 'Dark'} Mode`}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notification Badge */}
        <NotificationBadge />

        {/* User Avatar */}
        <div className="user-avatar">
          <div className="avatar-circle">
            <UserIcon size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
