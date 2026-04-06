/**
 * Utility function to export transactions data to CSV format and trigger download
 * @param {Array} transactions - Array of transaction objects
 * @param {string} filename - Optional custom filename (defaults to transactions_YYYY-MM-DD.csv)
 */
export const exportTransactionsToCSV = (transactions, filename = null) => {
  if (!transactions || transactions.length === 0) {
    console.warn('No transactions to export');
    return;
  }

  // Define CSV headers
  const headers = ['Date', 'Description', 'Category', 'Amount', 'Type'];

  // Convert transactions to CSV rows
  const csvRows = transactions.map(transaction => {
    const row = [
      transaction.date || '',
      transaction.description || '',
      transaction.category || '',
      transaction.amount || 0,
      transaction.type || ''
    ];

    // Escape CSV values that contain commas, quotes, or newlines
    return row.map(field => {
      const stringField = String(field);
      // If field contains comma, quote, or newline, wrap in quotes and escape internal quotes
      if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
        return `"${stringField.replace(/"/g, '""')}"`;
      }
      return stringField;
    });
  });

  // Combine headers and rows
  const csvContent = [headers, ...csvRows]
    .map(row => row.join(','))
    .join('\n');

  // Generate filename with current date if not provided
  const defaultFilename = filename || `transactions_${new Date().toISOString().split('T')[0]}.csv`;

  // Create and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  if (link.download !== undefined) {
    // Feature detection for download attribute
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', defaultFilename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } else {
    // Fallback for older browsers
    console.error('CSV download not supported in this browser');
  }
};

/**
 * Alternative function that returns CSV content as string instead of triggering download
 * @param {Array} transactions - Array of transaction objects
 * @returns {string} CSV content as string
 */
export const generateCSVContent = (transactions) => {
  if (!transactions || transactions.length === 0) {
    return '';
  }

  const headers = ['Date', 'Description', 'Category', 'Amount', 'Type'];

  const csvRows = transactions.map(transaction => {
    const row = [
      transaction.date || '',
      transaction.description || '',
      transaction.category || '',
      transaction.amount || 0,
      transaction.type || ''
    ];

    return row.map(field => {
      const stringField = String(field);
      if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
        return `"${stringField.replace(/"/g, '""')}"`;
      }
      return stringField;
    });
  });

  return [headers, ...csvRows]
    .map(row => row.join(','))
    .join('\n');
};
