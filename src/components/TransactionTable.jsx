import React, { useState } from 'react';
import {
  ChevronUp,
  ChevronDown,
  Search,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Plus,
  Download,
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { formatCurrency } from '../utils/calculations';
import { exportTransactionsToCSV } from '../utils/exportToCSV';
import AddTransactionModal from './AddTransactionModal';
import '../styles/components.css';

const TransactionTable = ({ expanded = false }) => {
  const {
    transactions,
    role,
    filters,
    updateFilters,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    getPaginatedTransactions,
    getTotalPages,
    getCategories,
    deleteTransaction,
  } = useAppContext();

  const [editingId, setEditingId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const categories = getCategories();
  const paginatedTransactions = getPaginatedTransactions();
  const totalPages = getTotalPages();

  // Highlight search text function
  const highlightText = (text, searchQuery) => {
    if (!searchQuery || !searchQuery.trim()) {
      return text;
    }
    
    // Escape special regex characters in search query
    const escapedQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Create regex for word matching (case insensitive, word boundaries)
    const regex = new RegExp(`\\b(${escapedQuery})\\b`, 'gi');
    
    // Replace matched words with marked version
    return text.replace(regex, '<mark>$1</mark>');
  };

  // Handle search
  const handleSearch = (e) => {
    updateFilters({ searchText: e.target.value });
  };

  // Handle category filter
  const handleCategoryFilter = (e) => {
    updateFilters({ selectedCategory: e.target.value });
  };

  // Handle date range filter
  const handleDateRangeFilter = (e) => {
    updateFilters({ dateRange: e.target.value });
  };

  // Handle sort
  const handleSort = (sortBy) => {
    if (filters.sortBy === sortBy) {
      updateFilters({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' });
    } else {
      updateFilters({ sortBy, sortOrder: 'desc' });
    }
  };

  const getSortIcon = (column) => {
    if (filters.sortBy !== column) return null;
    return filters.sortOrder === 'asc' ? (
      <ChevronUp size={16} />
    ) : (
      <ChevronDown size={16} />
    );
  };

  return (
    <div className={`transaction-table-container ${expanded ? 'expanded' : ''}`}>
      {/* Header */}
      <div className="table-header">
        <h3 className="table-title">Recent Transactions</h3>
        <div className="table-actions">
          <button
            className="btn-export-csv"
            onClick={() => exportTransactionsToCSV(transactions)}
            aria-label="Export to CSV"
            title="Export transactions to CSV"
          >
            <Download size={18} />
            Export CSV
          </button>
          {role === 'Admin' && (
            <button
              className="btn-add-transaction"
              onClick={() => setShowAddModal(true)}
              aria-label="Add transaction"
            >
              <Plus size={18} />
              Add Transaction
            </button>
          )}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="table-filters">
        {/* Search Bar */}
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="search-input"
            value={filters.searchText}
            onChange={handleSearch}
            aria-label="Search transactions"
          />
        </div>

        {/* Category Filter */}
        <select
          className="filter-select"
          value={filters.selectedCategory}
          onChange={handleCategoryFilter}
          aria-label="Filter by category"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Date Range Filter */}
        <select
          className="filter-select"
          value={filters.dateRange}
          onChange={handleDateRangeFilter}
          aria-label="Filter by date range"
        >
          <option value="All">All Time</option>
          <option value="Last 7 days">Last 7 Days</option>
          <option value="Last 30 days">Last 30 Days</option>
        </select>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>
                <button
                  className="sort-button"
                  onClick={() => handleSort('date')}
                  aria-label="Sort by date"
                >
                  Date
                  {getSortIcon('date')}
                </button>
              </th>
              <th>Description</th>
              <th>Category</th>
              <th>
                <button
                  className="sort-button"
                  onClick={() => handleSort('amount')}
                  aria-label="Sort by amount"
                >
                  Amount
                  {getSortIcon('amount')}
                </button>
              </th>
              <th>Type</th>
              {role === 'Admin' && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((transaction) => (
                <tr key={transaction.id} className="table-row">
                  <td className="date-cell">
                    {new Date(transaction.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="description-cell">
                    <span
                      className="search-highlight"
                      dangerouslySetInnerHTML={{
                        __html: highlightText(transaction.description, filters.searchText),
                      }}
                    />
                  </td>
                  <td className="category-cell">
                    <span className="category-badge">{transaction.category}</span>
                  </td>
                  <td className="amount-cell">
                    <span
                      className={`amount-value ${
                        transaction.type === 'income' ? 'income' : 'expense'
                      }`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </span>
                  </td>
                  <td className="type-cell">
                    <span
                      className={`type-badge ${
                        transaction.type === 'income' ? 'income-badge' : 'expense-badge'
                      }`}
                    >
                      {transaction.type === 'income' ? 'Income' : 'Expense'}
                    </span>
                  </td>
                  {role === 'Admin' && (
                    <td className="actions-cell">
                      <button
                        className="action-button edit-button"
                        onClick={() => {
                          setEditingId(transaction.id);
                          setShowAddModal(true);
                        }}
                        aria-label={`Edit transaction ${transaction.id}`}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className="action-button delete-button"
                        onClick={() => {
                          if (
                            window.confirm(
                              'Are you sure you want to delete this transaction?'
                            )
                          ) {
                            deleteTransaction(transaction.id);
                          }
                        }}
                        aria-label={`Delete transaction ${transaction.id}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={role === 'Admin' ? 6 : 5} className="empty-state">
                  <p>No transactions found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="table-pagination">
          <button
            className="pagination-button"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <ChevronLeft size={18} />
            Previous
          </button>

          <div className="pagination-info">
            Page <span className="current-page">{currentPage}</span> of{' '}
            <span className="total-pages">{totalPages}</span>
          </div>

          <button
            className="pagination-button"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            Next
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* Results Count */}
      <div className="table-footer">
        <p className="results-info">
          Showing {paginatedTransactions.length} of {transactions.length} transactions
        </p>
      </div>

      {/* Add Transaction Modal */}
      <AddTransactionModal
        isOpen={showAddModal || editingId !== null}
        onClose={() => {
          setShowAddModal(false);
          setEditingId(null);
        }}
        editingTransaction={
          transactions.find(t => t.id === editingId)
        }
      />
    </div>
  );
};

export default TransactionTable;
