// Calculate total income from transactions
export const calculateTotalIncome = (transactions) => {
  return transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
};

// Calculate total expenses from transactions
export const calculateTotalExpense = (transactions) => {
  return transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
};

// Calculate balance (income - expenses)
export const calculateBalance = (transactions) => {
  const income = calculateTotalIncome(transactions);
  const expenses = calculateTotalExpense(transactions);
  return income - expenses;
};

// Get the category with highest spending
export const getHighestSpendingCategory = (transactions) => {
  const categoryTotals = {};

  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });

  if (Object.keys(categoryTotals).length === 0) return null;

  const highest = Object.entries(categoryTotals).reduce(
    (max, [category, amount]) =>
      amount > max.amount ? { category, amount } : max,
    { category: null, amount: 0 }
  );

  return highest;
};

// Get monthly income vs expenses comparison
export const calculateMonthlyComparison = (transactions) => {
  const monthlyData = {};

  transactions.forEach((t) => {
    const [year, month] = t.date.split('-').slice(0, 2);
    const monthKey = `${year}-${month}`;

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { income: 0, expenses: 0, month: monthKey };
    }

    if (t.type === 'income') {
      monthlyData[monthKey].income += t.amount;
    } else {
      monthlyData[monthKey].expenses += t.amount;
    }
  });

  return Object.values(monthlyData).sort((a, b) =>
    a.month.localeCompare(b.month)
  );
};

// Get spending distribution by category
export const getSpendingByCategory = (transactions) => {
  const categoryTotals = {};

  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });

  return Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value: parseFloat(value.toFixed(2)),
  }));
};

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Calculate percentage change
export const getPercentageChange = (current, previous) => {
  if (previous === 0) return current === 0 ? 0 : 100;
  return parseFloat((((current - previous) / previous) * 100).toFixed(2));
};

// Calculate average expense
export const calculateAverageExpense = (transactions) => {
  const expenses = transactions.filter((t) => t.type === 'expense');
  if (expenses.length === 0) return 0;
  return expenses.reduce((sum, t) => sum + t.amount, 0) / expenses.length;
};

// Get most frequent category
export const getMostFrequentCategory = (transactions) => {
  const categoryCount = {};

  transactions.forEach((t) => {
    categoryCount[t.category] = (categoryCount[t.category] || 0) + 1;
  });

  if (Object.keys(categoryCount).length === 0) return null;

  return Object.entries(categoryCount).reduce(
    (max, [category, count]) =>
      count > max.count ? { category, count } : max,
    { category: null, count: 0 }
  );
};

// Calculate total savings
export const calculateTotalSavings = (transactions) => {
  const balance = calculateBalance(transactions);
  return balance > 0 ? balance : 0;
};

// Get balance trend data for chart
export const getBalanceTrendData = (transactions) => {
  const trendData = {};
  let runningBalance = 0;

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  sortedTransactions.forEach((t) => {
    const amount = t.type === 'income' ? t.amount : -t.amount;
    runningBalance += amount;
    trendData[t.date] = runningBalance;
  });

  return Object.entries(trendData).map(([date, balance]) => ({
    date: new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    balance: parseFloat(balance.toFixed(2)),
  }));
};
