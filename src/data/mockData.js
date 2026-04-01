/**
 * Finance Dashboard Mock Data
 * 
 * This data structure represents realistic financial data.
 * In production, this would come from an API.
 */

export const CATEGORIES = [
  'Food',
  'Transportation',
  'Entertainment',
  'Utilities',
  'Healthcare',
  'Shopping',
  'Investment',
  'Salary',
]

export const mockTransactions = [
  {
    id: 'TRX_001',
    date: '2024-01-15T14:30:00',
    description: 'Grocery Store - Market Fresh',
    amount: 1200,
    category: 'Food',
    type: 'expense',
    status: 'completed',
    paymentMethod: 'debit_card',
  },
  {
    id: 'TRX_002',
    date: '2024-01-15T09:00:00',
    description: 'Monthly Salary Deposit',
    amount: 50000,
    category: 'Salary',
    type: 'income',
    status: 'completed',
    paymentMethod: 'bank_transfer',
  },
  {
    id: 'TRX_003',
    date: '2024-01-14T18:45:00',
    description: 'Electric Bill Payment',
    amount: 3500,
    category: 'Utilities',
    type: 'expense',
    status: 'completed',
    paymentMethod: 'bank_transfer',
  },
  {
    id: 'TRX_004',
    date: '2024-01-14T15:20:00',
    description: 'Netflix Subscription',
    amount: 499,
    category: 'Entertainment',
    type: 'expense',
    status: 'completed',
    paymentMethod: 'credit_card',
  },
  {
    id: 'TRX_005',
    date: '2024-01-13T10:15:00',
    description: 'Uber - Office Commute',
    amount: 450,
    category: 'Transportation',
    type: 'expense',
    status: 'completed',
    paymentMethod: 'debit_card',
  },
  {
    id: 'TRX_006',
    date: '2024-01-13T08:00:00',
    description: 'Coffee - Local Cafe',
    amount: 120,
    category: 'Food',
    type: 'expense',
    status: 'pending',
    paymentMethod: 'credit_card',
  },
  {
    id: 'TRX_007',
    date: '2024-01-12T19:30:00',
    description: 'Restaurant - Dinner',
    amount: 2800,
    category: 'Food',
    type: 'expense',
    status: 'completed',
    paymentMethod: 'debit_card',
  },
  {
    id: 'TRX_008',
    date: '2024-01-12T14:00:00',
    description: 'Pharmacy - Medical Supplies',
    amount: 850,
    category: 'Healthcare',
    type: 'expense',
    status: 'completed',
    paymentMethod: 'credit_card',
  },
  {
    id: 'TRX_009',
    date: '2024-01-11T11:30:00',
    description: 'Shopping - Clothing Store',
    amount: 3200,
    category: 'Shopping',
    type: 'expense',
    status: 'completed',
    paymentMethod: 'credit_card',
  },
  {
    id: 'TRX_010',
    date: '2024-01-10T16:00:00',
    description: 'Library Fine',
    amount: 100,
    category: 'Shopping',
    type: 'expense',
    status: 'completed',
    paymentMethod: 'cash',
  },
  {
    id: 'TRX_011',
    date: '2024-01-10T09:00:00',
    description: 'Investment - Stock Purchase',
    amount: 10000,
    category: 'Investment',
    type: 'expense',
    status: 'completed',
    paymentMethod: 'bank_transfer',
  },
  {
    id: 'TRX_012',
    date: '2024-01-09T13:45:00',
    description: 'Bonus - Project Completion',
    amount: 5000,
    category: 'Salary',
    type: 'income',
    status: 'completed',
    paymentMethod: 'bank_transfer',
  },
]

/**
 * Monthly spending summary for insights
 * Used for trend charts
 */
export const monthlySpendingData = [
  { month: 'Aug', amount: 12000 },
  { month: 'Sep', amount: 15000 },
  { month: 'Oct', amount: 13500 },
  { month: 'Nov', amount: 18000 },
  { month: 'Dec', amount: 16500 },
  { month: 'Jan', amount: 14000 },
]

/**
 * Category breakdown for current month
 */
export const categoryBreakdownData = [
  { name: 'Food', value: 5200, color: '#ef4444' },
  { name: 'Transportation', value: 1500, color: '#f97316' },
  { name: 'Entertainment', value: 999, color: '#eab308' },
  { name: 'Utilities', value: 3500, color: '#3b82f6' },
  { name: 'Healthcare', value: 850, color: '#ec4899' },
  { name: 'Shopping', value: 3200, color: '#8b5cf6' },
  { name: 'Investment', value: 10000, color: '#10b981' },
]

/**
 * User context data
 * Determines what features are visible
 */
export const mockUsers = {
  admin: {
    id: 1,
    name: 'Vikas Kumar',
    email: 'vikas@fintech.com',
    role: 'admin',
    balance: 50000,
    avatar: '👨‍💼',
  },
  viewer: {
    id: 2,
    name: 'Priya Sharma',
    email: 'priya@fintech.com',
    role: 'viewer',
    balance: 50000,
    avatar: '👩‍💻',
  },
}

/**
 * KPI Card data
 * Shows key financial metrics
 */
export const getKPIData = (role) => ({
  currentBalance: {
    label: 'Current Balance',
    value: 50000,
    currency: '₹',
    trend: 'up',
    change: 5.2,
    editable: role === 'admin',
  },
  totalSpending: {
    label: 'Total Spending (Jan)',
    value: 14000,
    currency: '₹',
    trend: 'down',
    change: 2.1,
    editable: false,
  },
  totalSavings: {
    label: 'Total Savings',
    value: 8500,
    currency: '₹',
    trend: 'up',
    change: 8.5,
    editable: role === 'admin',
  },
  investmentAmount: {
    label: 'Investments',
    value: 25000,
    currency: '₹',
    trend: 'up',
    change: 3.2,
    editable: role === 'admin',
  },
})
