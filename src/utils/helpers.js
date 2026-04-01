/**
 * Utility Functions for Finance Dashboard
 * 
 * Single responsibility principle:
 * - Each function does ONE thing
 * - Pure functions (same input = same output)
 * - Easy to test, reuse, and reason about
 */

/**
 * Format currency with proper locale and symbol
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency code (default: INR)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format transaction date to human-readable format
 * Shows "Today", "Yesterday", or relative time
 * @param {string|Date} dateString - ISO date string or Date object
 * @returns {string} Human-readable date
 */
export const formatTransactionDate = (dateString) => {
  const date = new Date(dateString)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  // Compare dates (ignore time)
  if (date.toDateString() === today.toDateString()) {
    return 'Today'
  }
  if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday'
  }

  // For older dates, show relative time
  const diffTime = Math.abs(today - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays <= 30) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
  }

  // Fallback to formatted date
  return date.toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/**
 * Format time to HH:MM format
 * @param {string|Date} dateString - ISO date string or Date object
 * @returns {string} Time in HH:MM format
 */
export const formatTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

/**
 * Filter transactions by date range
 * @param {Array} transactions - Array of transaction objects
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {Array} Filtered transactions
 */
export const filterByDateRange = (transactions, startDate, endDate) => {
  return transactions.filter((transaction) => {
    const txDate = new Date(transaction.date)
    return txDate >= startDate && txDate <= endDate
  })
}

/**
 * Filter transactions by category
 * @param {Array} transactions - Array of transaction objects
 * @param {string|Array} categories - Category name(s) to filter by
 * @returns {Array} Filtered transactions
 */
export const filterByCategory = (transactions, categories) => {
  const categoryArray = Array.isArray(categories) ? categories : [categories]
  return transactions.filter((tx) => categoryArray.includes(tx.category))
}

/**
 * Filter transactions by amount range
 * @param {Array} transactions - Array of transaction objects
 * @param {number} minAmount - Minimum amount
 * @param {number} maxAmount - Maximum amount
 * @returns {Array} Filtered transactions
 */
export const filterByAmount = (transactions, minAmount, maxAmount) => {
  return transactions.filter((tx) => tx.amount >= minAmount && tx.amount <= maxAmount)
}

/**
 * Sort transactions by specified field
 * @param {Array} transactions - Array of transaction objects
 * @param {string} sortBy - Field to sort by: 'date', 'amount', 'category'
 * @param {string} order - Sort order: 'asc' or 'desc'
 * @returns {Array} Sorted transactions
 */
export const sortTransactions = (transactions, sortBy = 'date', order = 'desc') => {
  const sorted = [...transactions].sort((a, b) => {
    let aVal = a[sortBy]
    let bVal = b[sortBy]

    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase()
      bVal = bVal.toLowerCase()
      return order === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
    }

    return order === 'asc' ? aVal - bVal : bVal - aVal
  })

  return sorted
}

/**
 * Calculate summary statistics for transactions
 * @param {Array} transactions - Array of transaction objects
 * @returns {Object} Summary with total income, expense, net
 */
export const calculateSummary = (transactions) => {
  return transactions.reduce(
    (summary, tx) => {
      if (tx.type === 'income') {
        summary.income += tx.amount
      } else {
        summary.expense += tx.amount
      }
      summary.net = summary.income - summary.expense
      return summary
    },
    { income: 0, expense: 0, net: 0 }
  )
}

/**
 * Get spending category breakdown
 * @param {Array} transactions - Array of transaction objects
 * @returns {Object} Category breakdown with amounts
 */
export const getCategoryBreakdown = (transactions) => {
  const breakdown = {}

  transactions.forEach((tx) => {
    if (tx.type === 'expense') {
      breakdown[tx.category] = (breakdown[tx.category] || 0) + tx.amount
    }
  })

  return breakdown
}

/**
 * Calculate trend percentage change
 * @param {number} current - Current value
 * @param {number} previous - Previous value
 * @returns {Object} Trend direction and percentage
 */
export const calculateTrend = (current, previous) => {
  if (previous === 0) return { direction: 'neutral', percentage: 0 }

  const change = ((current - previous) / previous) * 100
  const direction = change > 0 ? 'up' : change < 0 ? 'down' : 'neutral'

  return {
    direction,
    percentage: Math.abs(Math.round(change * 10) / 10),
  }
}

/**
 * Get color based on transaction type or status
 * @param {string} type - Type: 'income', 'expense', or status
 * @returns {string} Tailwind class name
 */
export const getStatusColor = (type) => {
  const colors = {
    income: 'text-green-600 bg-green-50',
    expense: 'text-red-600 bg-red-50',
    completed: 'text-green-600 bg-green-50',
    pending: 'text-yellow-600 bg-yellow-50',
    failed: 'text-red-600 bg-red-50',
  }
  return colors[type] || 'text-slate-600 bg-slate-50'
}

/**
 * Paginate array items
 * @param {Array} items - Array to paginate
 * @param {number} currentPage - Current page (1-indexed)
 * @param {number} itemsPerPage - Items per page
 * @returns {Array} Paginated items
 */
export const paginate = (items, currentPage = 1, itemsPerPage = 10) => {
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return items.slice(startIndex, endIndex)
}

/**
 * Calculate total pages
 * @param {number} totalItems - Total items count
 * @param {number} itemsPerPage - Items per page
 * @returns {number} Total pages
 */
export const getTotalPages = (totalItems, itemsPerPage = 10) => {
  return Math.ceil(totalItems / itemsPerPage)
}

/**
 * Debounce function for filtering/searching
 * Prevents excessive function calls during typing
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, delay = 300) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}
