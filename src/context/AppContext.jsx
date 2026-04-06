import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { transactionsData } from '../data/mockData';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
      try {
        const parsed = JSON.parse(savedTransactions);
        return Array.isArray(parsed) && parsed.length > 0
  ? parsed
  : transactionsData;
      } catch (error) {
        console.warn('Failed to parse saved transactions, loading default data.', error);
        return transactionsData;
      }
    }
    return transactionsData;
  });
  const [role, setRole] = useState(() => {
    const savedRole = localStorage.getItem('userRole');
    return savedRole || 'Viewer';
  });
  const [darkMode, setDarkMode] = useState(() => {
  const savedTheme = localStorage.getItem('theme');
  return savedTheme ? savedTheme === 'dark' : true;
});
  const [filters, setFilters] = useState({
    searchText: '',
    selectedCategory: 'All',
    dateRange: 'All',
    sortBy: 'date',
    sortOrder: 'desc',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Save transactions to localStorage
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Save role to localStorage
  useEffect(() => {
    localStorage.setItem('userRole', role);
  }, [role]);

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Add new transaction
  const addTransaction = (newTransaction) => {
    const transaction = {
      id: Date.now(),
      ...newTransaction,
      date: new Date(newTransaction.date).toISOString().split('T')[0],
    };
    setTransactions([transaction, ...transactions]);
    toast.success('Transaction added successfully', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // Edit transaction
  const editTransaction = (id, updatedTransaction) => {
    setTransactions(
      transactions.map((t) =>
        t.id === id
          ? {
              ...t,
              ...updatedTransaction,
              date: new Date(updatedTransaction.date).toISOString().split('T')[0],
            }
          : t
      )
    );
  };

  // Update transaction by object
  const updateTransaction = (updatedTransaction) => {
    setTransactions(
      transactions.map((t) =>
        t.id === updatedTransaction.id
          ? {
              ...t,
              ...updatedTransaction,
              date: new Date(updatedTransaction.date).toISOString().split('T')[0],
            }
          : t
      )
    );
    toast.success('Transaction updated successfully', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // Delete transaction
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
    toast.success('Transaction deleted successfully', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // Toggle role between Admin and Viewer
  const toggleRole = () => {
    setRole((prevRole) => (prevRole === 'Admin' ? 'Viewer' : 'Admin'));
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Update filters
  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  // Get filtered transactions
  const getFilteredTransactions = () => {
    let filtered = transactions.filter((transaction) => {
      // Search filter
      const matchesSearch = transaction.description
        .toLowerCase()
        .includes(filters.searchText.toLowerCase());

      // Category filter
      const matchesCategory =
        filters.selectedCategory === 'All' ||
        transaction.category === filters.selectedCategory;

      // Date range filter
      const transactionDate = new Date(transaction.date);
      const today = new Date();
      let matchesDate = true;

      if (filters.dateRange === 'Last 7 Days') {
        const sevenDaysAgo = new Date(today.setDate(today.getDate() - 7));
        matchesDate = transactionDate >= sevenDaysAgo;
      } else if (filters.dateRange === 'Last 30 Days') {
        const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));
        matchesDate = transactionDate >= thirtyDaysAgo;
      }

      return matchesSearch && matchesCategory && matchesDate;
    });

    // Sorting
    const sorted = filtered.sort((a, b) => {
      let compareValue = 0;

      if (filters.sortBy === 'date') {
        compareValue = new Date(b.date) - new Date(a.date);
      } else if (filters.sortBy === 'amount') {
        compareValue = Math.abs(b.amount) - Math.abs(a.amount);
      }

      return filters.sortOrder === 'asc' ? -compareValue : compareValue;
    });

    return sorted;
  };

  // Get paginated transactions
  const getPaginatedTransactions = () => {
    const filtered = getFilteredTransactions();
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filtered.slice(startIndex, startIndex + itemsPerPage);
  };

  // Get total pages
  const getTotalPages = () => {
    return Math.ceil(getFilteredTransactions().length / itemsPerPage);
  };

  // Get categories from transactions
  const getCategories = () => {
    const categories = [...new Set(transactions.map((t) => t.category))];
    return ['All', ...categories];
  };

  const value = {
    // State
    transactions,
    role,
    darkMode,
    filters,
    currentPage,
    itemsPerPage,

    // Actions
    addTransaction,
    editTransaction,
    updateTransaction,
    deleteTransaction,
    toggleRole,
    toggleDarkMode,
    updateFilters,
    setCurrentPage,

    // Selectors
    getFilteredTransactions,
    getPaginatedTransactions,
    getTotalPages,
    getCategories,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook for using context
export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
