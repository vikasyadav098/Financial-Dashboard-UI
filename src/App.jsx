import React, { useState } from 'react'
import { UserProvider } from './context/UserContext'
import { MainLayout } from './components/layout'
import DashboardOverview from './components/dashboard/DashboardOverview'
import TransactionsSection from './components/transactions/TransactionsSection'
import InsightsSection from './components/charts/InsightsSection'

/**
 * App Component - Root component with section routing
 * 
 * Why use useState for section routing instead of React Router?
 * - This is a single-page dashboard, not a multi-page app
 * - useState is simpler, fewer dependencies
 * - Easy to migrate to Router if needed later
 */
export default function App() {
  const [activeSection, setActiveSection] = useState('overview')

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <DashboardOverview />
      case 'transactions':
        return <TransactionsSection />
      case 'insights':
        return <InsightsSection />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <UserProvider>
      <MainLayout activeSection={activeSection} onSectionChange={setActiveSection}>
        {renderSection()}
      </MainLayout>
    </UserProvider>
  )
}
