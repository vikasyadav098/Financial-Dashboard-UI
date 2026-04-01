import React from 'react'
import { useUser } from '../../context/UserContext'
import { Card, StatCard, EmptyState, ProgressBar } from '../common'
import { getKPIData, mockTransactions } from '../../data/mockData'
import { formatCurrency, formatTransactionDate } from '../../utils/helpers'

/**
 * KPI Card Component - Shows key metric with edit capability
 */
const KPICard = ({ label, value, icon, trend, change, onEdit, editable, isAdmin }) => {
  const trendIsPositive = trend === 'up'
  
  return (
    <Card hoverable className="group overflow-hidden bg-gradient-to-br from-slate-800 to-slate-700">
      <Card.Body className="relative">
        <div
          onClick={editable && isAdmin ? onEdit : undefined}
          className={editable && isAdmin ? 'cursor-pointer' : ''}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-hint text-slate-400 mb-3 uppercase tracking-wide">{label}</p>
              <p className="text-4xl font-bold text-slate-50">{value}</p>
            </div>
            <div className="text-5xl opacity-80 group-hover:opacity-100 transition-opacity">
              {icon}
            </div>
          </div>
          
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold text-sm ${
              trendIsPositive
                ? 'bg-success-900 text-success-200'
                : 'bg-danger-900 text-danger-200'
            }`}
          >
            <span>{trendIsPositive ? '📈' : '📉'}</span>
            <span>{trendIsPositive ? '+' : '-'}{change}%</span>
          </div>
        </div>
        
        {editable && isAdmin && (
          <button className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-brand-400 text-xl transition-all">
            ✏️
          </button>
        )}
      </Card.Body>
    </Card>
  )
}

/**
 * Quick Transactions Preview with dark theme styling
 */
const QuickTransactionsList = () => {
  const recentTransactions = mockTransactions.slice(0, 5)

  return (
    <Card>
      <Card.Header>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-heading-sm text-slate-50">📝 Recent Activity</h3>
            <p className="text-hint text-slate-400 mt-1">Last 5 transactions</p>
          </div>
          <span className="status-dot status-dot-active" />
        </div>
      </Card.Header>
      <Card.Body>
        {recentTransactions.length === 0 ? (
          <EmptyState
            icon="🔔"
            title="No transactions"
            description="Your recent transactions will appear here"
          />
        ) : (
          <div className="space-y-3">
            {recentTransactions.map((tx, idx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-700 transition-colors group"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0 ${
                    tx.category === 'Salary' || tx.category === 'Investment' 
                      ? 'bg-success-900 text-success-200' 
                      : tx.category === 'Food'
                      ? 'bg-orange-900 text-orange-200'
                      : 'bg-blue-900 text-blue-200'
                  }`}>
                    {tx.type === 'income' ? '📈' : '💸'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-100 truncate">{tx.description}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {formatTransactionDate(tx.date)}
                    </p>
                  </div>
                </div>
                <div className="text-right ml-4 flex-shrink-0">
                  <p
                    className={`text-sm font-bold ${
                      tx.type === 'income'
                        ? 'text-success-300'
                        : 'text-slate-100'
                    }`}
                  >
                    {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full inline-block mt-1 font-semibold ${
                      tx.status === 'completed'
                        ? 'bg-success-900 text-success-200'
                        : 'bg-warning-900 text-warning-200'
                    }`}
                  >
                    {tx.status === 'completed' ? '✓' : '⏳'} {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  )
}

/**
 * Dashboard Overview - Main landing page with dark theme aesthetics
 */
export default function DashboardOverview() {
  const { user, isAdmin } = useUser()
  const kpis = getKPIData(user.role)

  const handleKPIEdit = (kpiName) => {
    alert(`Edit ${kpiName} functionality would open a modal in production`)
  }

  const kpiColors = [
    'from-slate-700 to-slate-600',
    'from-slate-700 to-slate-600',
    'from-slate-700 to-slate-600',
    'from-slate-700 to-slate-600',
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="animate-slide-up">
        <h1 className="text-heading-lg mb-2 text-slate-50">
          Welcome back, <span className="gradient-text">{user.name.split(' ')[0]}</span>! 👋
        </h1>
        <p className="text-body text-slate-300">
          {isAdmin
            ? "Here's your complete financial dashboard. Manage budgets, track spending, and view insights."
            : 'Here is your financial overview. Monitor your spending and savings goals.'}
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
        <StatCard
          label={kpis.currentBalance.label}
          value={formatCurrency(kpis.currentBalance.value)}
          icon="💵"
          trend={kpis.currentBalance.trend}
          trendValue={kpis.currentBalance.change}
          color={kpiColors[0]}
        />
        <StatCard
          label={kpis.totalSpending.label}
          value={formatCurrency(kpis.totalSpending.value)}
          icon="💸"
          trend={kpis.totalSpending.trend}
          trendValue={kpis.totalSpending.change}
          color={kpiColors[1]}
        />
        <StatCard
          label={kpis.totalSavings.label}
          value={formatCurrency(kpis.totalSavings.value)}
          icon="🏦"
          trend={kpis.totalSavings.trend}
          trendValue={kpis.totalSavings.change}
          color={kpiColors[2]}
        />
        <StatCard
          label={kpis.investmentAmount.label}
          value={formatCurrency(kpis.investmentAmount.value)}
          icon="📈"
          trend={kpis.investmentAmount.trend}
          trendValue={kpis.investmentAmount.change}
          color={kpiColors[3]}
        />
      </div>

      {/* Quick Stats & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Financial Goals */}
        <div className="lg:col-span-1 space-y-4 animate-slide-up">
          <Card>
            <Card.Header>
              <h3 className="text-heading-sm text-slate-50">🎯 Financial Goals</h3>
            </Card.Header>
            <Card.Body className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-semibold text-slate-300">Emergency Fund</span>
                  <span className="text-sm font-bold text-brand-400 bg-brand-900 px-2 py-1 rounded">60%</span>
                </div>
                <ProgressBar percentage={60} color="bg-gradient-to-r from-blue-500 to-blue-400" showLabel={false} />
              </div>
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-semibold text-slate-300">Investment Target</span>
                  <span className="text-sm font-bold text-success-400 bg-success-900 px-2 py-1 rounded">80%</span>
                </div>
                <ProgressBar percentage={80} color="bg-gradient-to-r from-green-500 to-green-400" showLabel={false} />
              </div>
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-semibold text-slate-300">Monthly Budget</span>
                  <span className="text-sm font-bold text-warning-400 bg-warning-900 px-2 py-1 rounded">45%</span>
                </div>
                <ProgressBar percentage={45} color="bg-gradient-to-r from-amber-500 to-amber-400" showLabel={false} />
              </div>
            </Card.Body>
          </Card>

          {/* Admin Section */}
          {isAdmin && (
            <Card className="bg-gradient-to-br from-slate-700 to-slate-600 border-slate-600">
              <Card.Header className="bg-transparent">
                <h3 className="text-heading-sm text-slate-50">⚙️ Admin Tools</h3>
              </Card.Header>
              <Card.Body className="space-y-2">
                <button className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-slate-600 font-medium text-slate-200 transition-colors text-sm">
                  📊 Set Budget Limits
                </button>
                <button className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-slate-600 font-medium text-slate-200 transition-colors text-sm">
                  📋 Generate Reports
                </button>
                <button className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-slate-600 font-medium text-slate-200 transition-colors text-sm">
                  👥 Manage Permissions
                </button>
              </Card.Body>
            </Card>
          )}
        </div>

        {/* Recent Transactions */}
        <div className="lg:col-span-2 animate-slide-up">
          <QuickTransactionsList />
        </div>
      </div>
    </div>
  )
}
