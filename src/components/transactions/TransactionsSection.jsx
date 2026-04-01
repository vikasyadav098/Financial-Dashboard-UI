import React, { useState, useMemo } from 'react'
import { useUser } from '../../context/UserContext'
import { Card, Button, Select, Input, Badge, EmptyState } from '../common'
import { mockTransactions, CATEGORIES } from '../../data/mockData'
import {
  formatCurrency,
  formatTransactionDate,
  formatTime,
  sortTransactions,
  filterByCategory,
  filterByDateRange,
  paginate,
  getTotalPages,
} from '../../utils/helpers'

/**
 * Filter Bar Component - Date, Category, Amount filters with dark theme styling
 */
const FilterBar = ({ filters, onFilterChange }) => {
  return (
    <Card>
      <Card.Body>
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔍</span>
            <h3 className="text-heading-sm text-slate-50">Advanced Filters</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Date Range */}
            <Input
              label="From Date"
              type="date"
              value={filters.fromDate}
              onChange={(e) => onFilterChange('fromDate', e.target.value)}
            />
            
            <Input
              label="To Date"
              type="date"
              value={filters.toDate}
              onChange={(e) => onFilterChange('toDate', e.target.value)}
            />

            {/* Category Filter */}
            <Select
              label="Category"
              options={[
                ...CATEGORIES.map((cat) => ({ label: cat, value: cat })),
              ]}
              value={filters.category}
              onChange={(e) => onFilterChange('category', e.target.value)}
              placeholder="All Categories"
            />

            {/* Transaction Type */}
            <Select
              label="Type"
              options={[
                { label: 'All', value: '' },
                { label: 'Income', value: 'income' },
                { label: 'Expense', value: 'expense' },
              ]}
              value={filters.type}
              onChange={(e) => onFilterChange('type', e.target.value)}
            />
          </div>

          {/* Reset Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              onFilterChange('reset', true)
            }
            className="text-sm"
          >
            🔄 Reset Filters
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

/**
 * Transaction Row Component - Dark theme styling with hover effects
 */
const TransactionRow = ({ transaction, isAdmin }) => {
  const isIncome = transaction.type === 'income'
  
  return (
    <tr className="border-b border-slate-700 hover:bg-slate-700 transition-colors group">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0 ${
            transaction.category === 'Salary' || transaction.category === 'Investment' 
              ? 'bg-success-900 text-success-200' 
              : transaction.category === 'Food'
              ? 'bg-orange-900 text-orange-200'
              : 'bg-blue-900 text-blue-200'
          }`}>
            {isIncome ? '📈' : '💸'}
          </div>
          <div>
            <p className="font-semibold text-slate-100">{transaction.description}</p>
            <p className="text-hint text-slate-400 mt-0.5">
              {transaction.date}
            </p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <Badge variant={transaction.category === 'Salary' || transaction.category === 'Investment' ? 'primary' : 'default'}>
          {transaction.category}
        </Badge>
      </td>
      <td className="px-6 py-4 text-right font-bold">
        <span
          className={`${
            isIncome ? 'text-success-300' : 'text-slate-100'
          }`}
        >
          {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
        </span>
      </td>
      <td className="px-6 py-4">
        <Badge
          variant={
            transaction.status === 'completed'
              ? 'success'
              : transaction.status === 'pending'
              ? 'warning'
              : 'danger'
          }
        >
          {transaction.status === 'completed' ? '✓' : transaction.status === 'pending' ? '⏳' : '✗'} {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
        </Badge>
      </td>
      <td className="px-6 py-4 text-slate-400 text-sm font-medium">
        {formatTransactionDate(transaction.date)}
      </td>
      {isAdmin && (
        <td className="px-6 py-4 text-right">
          <button className="text-slate-400 hover:text-brand-400 text-lg opacity-0 group-hover:opacity-100 transition-all">
            ⋯
          </button>
        </td>
      )}
    </tr>
  )
}

/**
 * Transactions Section - Main transactions view
 * 
 * Features:
 * - Filter by date, category, type
 * - Sort by date, amount, category
 * - Pagination (10 items per page)
 * - Admin can delete/edit transactions
 */
export default function TransactionsSection() {
  const { isAdmin } = useUser()
  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    category: '',
    type: '',
  })
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    if (key === 'reset') {
      setFilters({ fromDate: '', toDate: '', category: '', type: '' })
      setCurrentPage(1)
    } else {
      setFilters((prev) => ({ ...prev, [key]: value }))
      setCurrentPage(1)
    }
  }

  // Apply filters
  const filteredTransactions = useMemo(() => {
    let result = mockTransactions

    // Category filter
    if (filters.category) {
      result = filterByCategory(result, filters.category)
    }

    // Type filter
    if (filters.type) {
      result = result.filter((tx) => tx.type === filters.type)
    }

    // Date range filter
    if (filters.fromDate && filters.toDate) {
      result = filterByDateRange(
        result,
        new Date(filters.fromDate),
        new Date(filters.toDate)
      )
    }

    // Sort
    result = sortTransactions(result, sortBy, sortOrder)

    return result
  }, [filters, sortBy, sortOrder])

  // Paginate
  const paginatedTransactions = paginate(
    filteredTransactions,
    currentPage,
    itemsPerPage
  )
  const totalPages = getTotalPages(filteredTransactions.length, itemsPerPage)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-slide-up">
        <h1 className="text-heading-lg mb-2 text-slate-50">📝 Transactions</h1>
        <p className="text-body text-slate-300">
          Manage and analyze your financial transactions
          {isAdmin && ' • Admin: view and delete transactions'}
        </p>
      </div>

      {/* Filters */}
      <FilterBar filters={filters} onFilterChange={handleFilterChange} />

      {/* Transactions Table */}
      <Card>
        <Card.Body className="p-0 overflow-x-auto">
          {paginatedTransactions.length === 0 ? (
            <EmptyState
              icon="🔍"
              title="No transactions found"
              description="Try adjusting your filters or make a new transaction"
            />
          ) : (
            <table className="w-full">
              <thead className="border-b-2 border-slate-700 bg-gradient-to-r from-slate-700 to-transparent">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-300 uppercase tracking-wide">
                    Transaction
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-300 uppercase tracking-wide">
                    <button
                      onClick={() => {
                        setSortBy('category')
                        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                      }}
                      className="hover:text-slate-100 flex items-center gap-1"
                    >
                      Category {sortBy === 'category' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-slate-300 uppercase tracking-wide">
                    <button
                      onClick={() => {
                        setSortBy('amount')
                        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                      }}
                      className="hover:text-slate-100 float-right flex items-center gap-1 ml-auto"
                    >
                      Amount {sortBy === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-300 uppercase tracking-wide">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-300 uppercase tracking-wide">
                    <button
                      onClick={() => {
                        setSortBy('date')
                        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                      }}
                      className="hover:text-slate-100"
                    >
                      Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </button>
                  </th>
                  {isAdmin && (
                    <th className="px-6 py-4 text-right text-sm font-bold text-slate-300 uppercase tracking-wide">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {paginatedTransactions.map((transaction) => (
                  <TransactionRow
                    key={transaction.id}
                    transaction={transaction}
                    isAdmin={isAdmin}
                  />
                ))}
              </tbody>
            </table>
          )}
        </Card.Body>

        {/* Pagination */}
        {totalPages > 1 && (
          <Card.Footer className="flex items-center justify-between bg-gradient-to-r from-slate-700 to-transparent">
            <span className="text-sm font-medium text-slate-300">
              Page <span className="font-bold text-slate-100">{currentPage}</span> of <span className="font-bold text-slate-100">{totalPages}</span> • 
              <span className="ml-1 font-bold text-slate-100">{filteredTransactions.length}</span> total
            </span>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                ← Previous
              </Button>
              <Button
                variant="ghost"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                Next →
              </Button>
            </div>
          </Card.Footer>
        )}
      </Card>
    </div>
  )
}
