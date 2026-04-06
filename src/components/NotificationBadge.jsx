import React, { useState } from 'react';
import { Bell } from 'lucide-react';

const NotificationBadge = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: 'transaction',
      message: 'New transaction added: Grocery shopping',
      time: '2 minutes ago',
      read: false,
    },
    {
      id: 2,
      type: 'alert',
      message: 'Monthly budget exceeded by $50',
      time: '1 hour ago',
      read: false,
    },
    {
      id: 3,
      type: 'reminder',
      message: 'Don\'t forget to review your expenses',
      time: '3 hours ago',
      read: true,
    },
    {
      id: 4,
      type: 'achievement',
      message: 'Congratulations! You saved $200 this month',
      time: '1 day ago',
      read: true,
    },
  ];

  const unreadCount = notifications.filter(notification => !notification.read).length;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'transaction':
        return '💳';
      case 'alert':
        return '⚠️';
      case 'reminder':
        return '🔔';
      case 'achievement':
        return '🎉';
      default:
        return '📢';
    }
  };

  return (
    <div className="notification-container">
      <button
        className="notification-button"
        onClick={toggleDropdown}
        aria-label="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="notification-badge">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h4>Notifications</h4>
            <span className="notification-count">
              {unreadCount} new
            </span>
          </div>

          <div className="notification-list">
            {notifications.length === 0 ? (
              <div className="notification-empty">
                <p>No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item ${!notification.read ? 'unread' : ''}`}
                >
                  <div className="notification-icon">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="notification-content">
                    <p className="notification-message">
                      {notification.message}
                    </p>
                    <span className="notification-time">
                      {notification.time}
                    </span>
                  </div>
                  {!notification.read && (
                    <div className="notification-dot"></div>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="notification-footer">
            <button className="view-all-button">
              View All Notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBadge;
