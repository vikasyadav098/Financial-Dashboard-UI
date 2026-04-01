import React from 'react'
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useUser } from '../../context/UserContext'
import { Card, EmptyState } from '../common'
import { monthlySpendingData, categoryBreakdownData } from '../../data/mockData'
import { formatCurrency } from '../../utils/helpers'

/**
 * Spending Trend Chart - Line chart showing monthly spending with dark theme
 * 
 * Why line chart for this?
 * - Shows trends over time
 * - Easy to see if spending is increasing/decreasing
 * - Better for continuous data
 */
const SpendingTrendChart = () => {
  return (
    <Card className="animate-slide-up">
      <Card.Header>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-heading-sm text-slate-50">📈 Spending Trend</h3>
            <p className="text-hint text-slate-400 mt-1">Last 6 months analysis</p>
          </div>
          <span className="text-3xl">📊</span>
        </div>
      </Card.Header>
      <Card.Body>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlySpendingData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '2px solid #0ea5e9',
                borderRadius: '12px',
                color: '#f1f5f9'
              }}
              formatter={(value) => formatCurrency(value)}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#0ea5e9"
              strokeWidth={3}
              dot={{ fill: '#0ea5e9', r: 6, strokeWidth: 2, stroke: '#1e293b' }}
              activeDot={{ r: 8 }}
              name="Monthly Spending"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  )
}

/**
 * Category Breakdown Chart - Pie chart with dark theme styling
 */
const CategoryBreakdownChart = () => {
  const COLORS = categoryBreakdownData.map((item) => item.color)

  const renderLabel = (entry) => {
    const total = categoryBreakdownData.reduce((sum, item) => sum + item.value, 0)
    const percent = ((entry.value / total) * 100).toFixed(0)
    return `${percent}%`
  }

  return (
    <Card className="animate-slide-up">
      <Card.Header>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-heading-sm text-slate-50">🥧 Category Breakdown</h3>
            <p className="text-hint text-slate-400 mt-1">January spending distribution</p>
          </div>
          <span className="text-3xl">💰</span>
        </div>
      </Card.Header>
      <Card.Body>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryBreakdownData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {COLORS.map((color, index) => (
                <Cell key={`cell-${index}`} fill={color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => formatCurrency(value)}
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '2px solid #0ea5e9',
                borderRadius: '12px',
                color: '#f1f5f9'
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Category Legend */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          {categoryBreakdownData.map((category) => (
            <div key={category.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700 transition-colors">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: category.color }}
              />
              <span className="text-sm text-slate-300 flex-1 font-medium">{category.name}</span>
              <span className="text-sm font-bold text-slate-100">
                {formatCurrency(category.value)}
              </span>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  )
}

/**
 * Insights Statistics - Key insights and recommendations with dark theme
 */
const InsightsStats = () => {
  const totalSpending = categoryBreakdownData.reduce(
    (sum, item) => sum + item.value,
    0
  )
  const avgMonthlySpending =
    monthlySpendingData.reduce((sum, item) => sum + item.amount, 0) /
    monthlySpendingData.length

  // Find highest spending category
  const highestCategory = categoryBreakdownData.reduce((prev, current) =>
    prev.value > current.value ? prev : current
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
      {/* Total Spending Card */}
      <Card className="bg-gradient-to-br from-orange-900 to-orange-800">
        <Card.Body>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-hint text-orange-300 mb-2 uppercase font-bold">Total Spending (Jan)</p>
              <p className="text-3xl font-bold text-orange-100">{formatCurrency(totalSpending)}</p>
              <p className="text-xs text-success-300 font-semibold mt-3 flex items-center gap-1">
                <span>📉</span> 5% below budget
              </p>
            </div>
            <span className="text-4xl opacity-80">📊</span>
          </div>
        </Card.Body>
      </Card>

      {/* Average Monthly Card */}
      <Card className="bg-gradient-to-br from-blue-900 to-blue-800">
        <Card.Body>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-hint text-blue-300 mb-2 uppercase font-bold">Average Monthly</p>
              <p className="text-3xl font-bold text-blue-100">
                {formatCurrency(Math.round(avgMonthlySpending))}
              </p>
              <p className="text-xs text-slate-300 font-semibold mt-3">Last 6 months</p>
            </div>
            <span className="text-4xl opacity-80">💹</span>
          </div>
        </Card.Body>
      </Card>

      {/* Highest Category Card */}
      <Card className="bg-gradient-to-br from-purple-900 to-purple-800">
        <Card.Body>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-hint text-purple-300 mb-2 uppercase font-bold">Top Category</p>
              <p className="text-3xl font-bold text-purple-100">{highestCategory.name}</p>
              <p className="text-xs text-slate-300 font-semibold mt-3">
                {formatCurrency(highestCategory.value)} total
              </p>
            </div>
            <span className="text-4xl opacity-80">🎯</span>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

/**
 * Insights Section - Charts and financial insights with dark theme
 */
export default function InsightsSection() {
  const { isAdmin } = useUser()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-slide-up">
        <h1 className="text-heading-lg mb-2 text-slate-50">📊 Insights & Analytics</h1>
        <p className="text-body text-slate-300">
          Deep dive into your spending patterns, financial trends, and actionable insights
          {isAdmin && ' • Admin analytics view'}
        </p>
      </div>

      {/* Key Stats */}
      <InsightsStats />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending Trend */}
        <SpendingTrendChart />

        {/* Category Breakdown */}
        <CategoryBreakdownChart />
      </div>

      {/* Insights & Recommendations */}
      <Card className="bg-gradient-to-br from-slate-700 to-slate-600 border-slate-600 animate-slide-up">
        <Card.Header className="bg-transparent">
          <h3 className="text-heading-sm flex items-center gap-2 text-slate-50">
            <span>💡</span> Insights & Recommendations
          </h3>
        </Card.Header>
        <Card.Body>
          <ul className="space-y-5">
            <li className="flex gap-4 p-3 rounded-lg hover:bg-slate-600 bg-opacity-50 transition-colors group">
              <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">📍</span>
              <div>
                <p className="font-bold text-slate-50">
                  Food spending increased by 12%
                </p>
                <p className="text-sm text-slate-300 mt-1 font-medium">
                  Your food expenses are higher than usual. Review your dining habits to optimize spending and save ₹1,500-2,000 monthly.
                </p>
              </div>
            </li>
            <li className="flex gap-4 p-3 rounded-lg hover:bg-slate-600 bg-opacity-50 transition-colors group">
              <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">🎯</span>
              <div>
                <p className="font-bold text-slate-50">
                  On track with savings goal ✓
                </p>
                <p className="text-sm text-slate-300 mt-1 font-medium">
                  Your savings are 80% of target. Keep up the good work! You'll reach your goal by end of Q1.
                </p>
              </div>
            </li>
            <li className="flex gap-4 p-3 rounded-lg hover:bg-slate-600 bg-opacity-50 transition-colors group">
              <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">⚡</span>
              <div>
                <p className="font-bold text-slate-50">
                  Subscription optimization opportunity
                </p>
                <p className="text-sm text-slate-300 mt-1 font-medium">
                  Consider reviewing your entertainment subscriptions. You can save ₹500 per month by canceling unused services.
                </p>
              </div>
            </li>
          </ul>
        </Card.Body>
      </Card>
    </div>
  )
}
