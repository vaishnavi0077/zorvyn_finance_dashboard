// Helper function to generate a random date within the last 60 days
const getRandomDateInLast60Days = () => {
  const today = new Date();
  const sixtyDaysAgo = new Date(today);
  sixtyDaysAgo.setDate(today.getDate() - 60);
  const randomTime = sixtyDaysAgo.getTime() + Math.random() * (today.getTime() - sixtyDaysAgo.getTime());
  const randomDate = new Date(randomTime);
  return randomDate.toISOString().split('T')[0]; // YYYY-MM-DD
};

export const transactionsData = [
  // Income
  { id: 1, date: getRandomDateInLast60Days(), description: 'Monthly Salary', category: 'Salary', amount: 5000, type: 'income' },
  { id: 2, date: getRandomDateInLast60Days(), description: 'Monthly Salary', category: 'Salary', amount: 5000, type: 'income' },
  { id: 3, date: getRandomDateInLast60Days(), description: 'Monthly Salary', category: 'Salary', amount: 5000, type: 'income' },
  { id: 4, date: getRandomDateInLast60Days(), description: 'Freelance Project', category: 'Freelance', amount: 800, type: 'income' },
  { id: 5, date: getRandomDateInLast60Days(), description: 'Bonus Payment', category: 'Freelance', amount: 1500, type: 'income' },

  // Food & Dining
  { id: 6, date: getRandomDateInLast60Days(), description: 'Grocery Shopping - Walmart', category: 'Groceries', amount: 65.50, type: 'expense' },
  { id: 7, date: getRandomDateInLast60Days(), description: 'Coffee & Breakfast', category: 'Food', amount: 12.30, type: 'expense' },
  { id: 8, date: getRandomDateInLast60Days(), description: 'Restaurant - Pizza Hut', category: 'Food', amount: 28.99, type: 'expense' },
  { id: 9, date: getRandomDateInLast60Days(), description: 'Grocery Shopping - Costco', category: 'Groceries', amount: 120.45, type: 'expense' },
  { id: 10, date: getRandomDateInLast60Days(), description: 'Lunch - Subway', category: 'Healthcare', amount: 9.50, type: 'expense' },
  { id: 11, date: getRandomDateInLast60Days(), description: 'Dinner - Italian Restaurant', category: 'Food', amount: 65.00, type: 'expense' },
  { id: 12, date: getRandomDateInLast60Days(), description: 'Grocery Shopping - Whole Foods', category: 'Groceries', amount: 95.30, type: 'expense' },
  { id: 13, date: getRandomDateInLast60Days(), description: 'Fast Food - Burger King', category: 'Food', amount: 15.20, type: 'expense' },
  { id: 14, date: getRandomDateInLast60Days(), description: 'Restaurant - Steakhouse', category: 'Healthcare', amount: 85.75, type: 'expense' },
  { id: 15, date: getRandomDateInLast60Days(), description: 'Grocery Shopping - Trader Joe', category: 'Groceries', amount: 78.40, type: 'expense' },

  // Transport
  { id: 16, date: getRandomDateInLast60Days(), description: 'Gas - Shell', category: 'Transport', amount: 45.00, type: 'expense' },
  { id: 17, date: getRandomDateInLast60Days(), description: 'Uber - To Airport', category: 'Transport', amount: 32.50, type: 'expense' },
  { id: 18, date: getRandomDateInLast60Days(), description: 'Gas - Chevron', category: 'Transport', amount: 48.75, type: 'expense' },
  { id: 19, date: getRandomDateInLast60Days(), description: 'Car Maintenance', category: 'Transport', amount: 150.00, type: 'expense' },
  { id: 20, date: getRandomDateInLast60Days(), description: 'Public Transit Pass', category: 'Transport', amount: 75.00, type: 'expense' },
  { id: 21, date: getRandomDateInLast60Days(), description: 'Gas - BP', category: 'Transport', amount: 50.25, type: 'expense' },
  { id: 22, date: getRandomDateInLast60Days(), description: 'Lyft - To Office', category: 'Transport', amount: 18.90, type: 'expense' },
  { id: 23, date: getRandomDateInLast60Days(), description: 'Car Insurance Payment', category: 'Transport', amount: 120.00, type: 'expense' },

  // Shopping
  { id: 24, date: getRandomDateInLast60Days(), description: 'Clothing - H&M', category: 'Shopping', amount: 55.80, type: 'expense' },
  { id: 25, date: getRandomDateInLast60Days(), description: 'Electronics - Best Buy', category: 'Shopping', amount: 199.99, type: 'expense' },
  { id: 26, date: getRandomDateInLast60Days(), description: 'Book Store - Barnes & Noble', category: 'Shopping', amount: 42.50, type: 'expense' },
  { id: 27, date: getRandomDateInLast60Days(), description: 'Shoes - Nike Store', category: 'Shopping', amount: 89.99, type: 'expense' },
  { id: 28, date: getRandomDateInLast60Days(), description: 'Valentine Gifts - Amazon', category: 'Shopping', amount: 75.00, type: 'expense' },
  { id: 29, date: getRandomDateInLast60Days(), description: 'Home Decor - Ikea', category: 'Shopping', amount: 120.30, type: 'expense' },
  { id: 30, date: getRandomDateInLast60Days(), description: 'Clothing - Zara', category: 'Shopping', amount: 65.45, type: 'expense' },

  // Bills & Utilities
  { id: 31, date: getRandomDateInLast60Days(), description: 'Electric Bill - January', category: 'Bills', amount: 125.00, type: 'expense' },
  { id: 32, date: getRandomDateInLast60Days(), description: 'Internet Bill', category: 'Bills', amount: 59.99, type: 'expense' },
  { id: 33, date: getRandomDateInLast60Days(), description: 'Water Bill', category: 'Bills', amount: 45.50, type: 'expense' },
  { id: 34, date: getRandomDateInLast60Days(), description: 'Mobile Phone Bill', category: 'Bills', amount: 75.00, type: 'expense' },
  { id: 35, date: getRandomDateInLast60Days(), description: 'Electric Bill - February', category: 'Bills', amount: 130.00, type: 'expense' },
  { id: 36, date: getRandomDateInLast60Days(), description: 'Internet Bill', category: 'Bills', amount: 59.99, type: 'expense' },
  { id: 37, date: getRandomDateInLast60Days(), description: 'Mobile Phone Bill', category: 'Bills', amount: 75.00, type: 'expense' },
  { id: 38, date: getRandomDateInLast60Days(), description: 'Electric Bill - March', category: 'Bills', amount: 115.00, type: 'expense' },
  { id: 39, date: getRandomDateInLast60Days(), description: 'Rent Payment', category: 'Bills', amount: 1500.00, type: 'expense' },

  // Entertainment
  { id: 40, date: getRandomDateInLast60Days(), description: 'Movie Tickets', category: 'Entertainment', amount: 28.00, type: 'expense' },
  { id: 41, date: getRandomDateInLast60Days(), description: 'Netflix Subscription', category: 'Entertainment', amount: 15.99, type: 'expense' },
  { id: 42, date: getRandomDateInLast60Days(), description: 'Concert Tickets', category: 'Entertainment', amount: 95.00, type: 'expense' },
  { id: 43, date: getRandomDateInLast60Days(), description: 'Gaming - Steam Purchase', category: 'Entertainment', amount: 49.99, type: 'expense' },
  { id: 44, date: getRandomDateInLast60Days(), description: 'Spotify Premium', category: 'Entertainment', amount: 12.99, type: 'expense' },
  { id: 45, date: getRandomDateInLast60Days(), description: 'Sports Event - Basketball', category: 'Entertainment', amount: 120.00, type: 'expense' },
  { id: 46, date: getRandomDateInLast60Days(), description: 'Museum Tickets', category: 'Entertainment', amount: 35.00, type: 'expense' },
  { id: 47, date: getRandomDateInLast60Days(), description: 'Disney Plus Subscription', category: 'Entertainment', amount: 13.99, type: 'expense' },
];
