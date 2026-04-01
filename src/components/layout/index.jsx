import React from 'react'
import { useUser } from '../../context/UserContext'
import { Button, Badge } from '../common'

/**
 * Header Component - Top navigation bar with dark theme styling
 * Shows logo, user info, and role switcher
 */
export const Header = () => {
  const { user, switchRole, isAdmin } = useUser()

  return (
    <header className="bg-slate-800 bg-opacity-80 backdrop-blur-xl border-b border-slate-700 border-opacity-50 sticky top-0 z-40 shadow-lg">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Logo & Branding */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-cyan-500 flex items-center justify-center shadow-lg">
            <span className="text-xl">💰</span>
          </div>
          <div>
            <h1 className="text-heading-sm font-bold bg-gradient-to-r from-brand-400 to-cyan-400 bg-clip-text text-transparent">
              Finance Pro
            </h1>
            <p className="text-hint text-slate-400">Dashboard</p>
          </div>
        </div>

        {/* User Info & Role Switcher */}
        <div className="flex items-center gap-6">
          {/* Current Role Badge */}
          <Badge variant={isAdmin ? 'primary' : 'default'}>
            {isAdmin ? '👨‍💼 Admin' : '👩‍💻 Viewer'}
          </Badge>

          {/* Role Switcher Buttons */}
          <div className="flex gap-2 bg-slate-700 bg-opacity-50 p-1 rounded-lg border border-slate-600">
            <Button
              variant={isAdmin ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => switchRole('admin')}
              className="text-sm"
            >
              Admin
            </Button>
            <Button
              variant={!isAdmin ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => switchRole('viewer')}
              className="text-sm"
            >
              Viewer
            </Button>
          </div>

          {/* User Avatar & Info */}
          <div className="flex items-center gap-3 pl-4 border-l border-slate-600">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-cyan-500 flex items-center justify-center shadow-md text-lg">
              {user.avatar}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-100">{user.name.split(' ')[0]}</p>
              <p className="text-hint text-slate-400">{isAdmin ? 'Full Access' : 'Read Only'}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

/**
 * Sidebar Component - Left navigation menu with dark theme styling
 */
export const Sidebar = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: '📊' },
    { id: 'transactions', label: 'Transactions', icon: '📝' },
    { id: 'insights', label: 'Insights', icon: '📈' },
  ]

  return (
    <aside className="w-64 bg-slate-800 bg-opacity-80 backdrop-blur-md border-r border-slate-700 border-opacity-50 hidden md:block h-screen sticky top-16">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`
              w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3
              font-medium group
              ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-lg border border-brand-400'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-slate-100 border border-transparent'
              }
            `}
          >
            <span className={`text-xl transition-transform ${activeSection === item.id ? 'scale-110' : 'group-hover:scale-105'}`}>
              {item.icon}
            </span>
            <span>{item.label}</span>
            {activeSection === item.id && (
              <span className="ml-auto w-2 h-2 rounded-full bg-cyan-400" />
            )}
          </button>
        ))}
      </nav>

      {/* Sidebar Footer - Quick Tip */}
      <div className="absolute bottom-6 left-4 right-4 p-4 rounded-xl bg-gradient-to-br from-slate-700 to-slate-600 border border-slate-600">
        <p className="text-xs font-semibold text-slate-200 mb-2">💡 Pro Tip</p>
        <p className="text-xs text-slate-300 leading-relaxed">
          Switch between Admin and Viewer roles to see different features!
        </p>
      </div>
    </aside>
  )
}

/**
 * Mobile Navigation - Bottom tabs for mobile with dark theme styling
 */
export const MobileNav = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'overview', label: 'Home', icon: '📊' },
    { id: 'transactions', label: 'Transactions', icon: '📝' },
    { id: 'insights', label: 'Insights', icon: '📈' },
  ]

  return (
    <nav className="md:hidden fixed bottom-16 left-0 right-0 bg-slate-800 bg-opacity-95 backdrop-blur-xl border-t border-slate-700 border-opacity-50 shadow-2xl flex justify-around">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onSectionChange(item.id)}
          className={`
            flex-1 py-4 flex flex-col items-center gap-1 text-xs transition-all duration-300
            ${
              activeSection === item.id
                ? 'text-brand-400 font-bold'
                : 'text-slate-400 hover:text-slate-300'
            }
          `}
        >
          <span className={`text-2xl transition-transform ${activeSection === item.id ? 'scale-110' : 'scale-100'}`}>
            {item.icon}
          </span>
          <span className={`font-semibold ${activeSection === item.id ? 'text-xs' : 'text-xxs'}`}>
            {item.label}
          </span>
          {activeSection === item.id && (
            <div className="w-1 h-1 rounded-full bg-brand-400 mt-1" />
          )}
        </button>
      ))}
    </nav>
  )
}

/**
 * Footer Component - Bottom footer with creator attribution
 */
export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 bg-opacity-60 backdrop-blur-md border-t border-slate-700 border-opacity-50 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Section - About */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💰</span>
              <h3 className="text-sm font-bold text-slate-100">Finance Pro Dashboard</h3>
            </div>
            <p className="text-xs text-slate-400 text-center md:text-left">
              Professional financial management and analytics platform
            </p>
          </div>

          {/* Middle Section - Links */}
          <div className="flex gap-8 text-sm">
            <a href="#" className="text-slate-400 hover:text-brand-400 transition-colors font-medium">
              Features
            </a>
            <a href="#" className="text-slate-400 hover:text-brand-400 transition-colors font-medium">
              Documentation
            </a>
            <a href="#" className="text-slate-400 hover:text-brand-400 transition-colors font-medium">
              Support
            </a>
          </div>

          {/* Right Section - Creator Attribution */}
          <div className="text-center md:text-right">
            <p className="text-sm text-slate-300 font-medium">
              Created by <span className="text-brand-400 font-bold">Vikas Yadav</span>
            </p>
            <p className="text-xs text-slate-500 mt-1">
              © {currentYear} All rights reserved
            </p>
          </div>
        </div>

        {/* Bottom Divider and Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-700 border-opacity-50 flex flex-col md:flex-row items-center justify-center gap-4">
          <p className="text-xs text-slate-500">
            Built with React, Tailwind CSS & Vite
          </p>
        </div>
      </div>
    </footer>
  )
}

/**
 * Main Layout Wrapper - Combines header, sidebar, footer and content area
 */
export const MainLayout = ({ children, activeSection, onSectionChange }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar activeSection={activeSection} onSectionChange={onSectionChange} />
        <main className="flex-1 p-6 pb-24 md:pb-6 animate-fade-in overflow-y-auto">
          {children}
        </main>
      </div>
      <Footer />
      <MobileNav activeSection={activeSection} onSectionChange={onSectionChange} />
    </div>
  )
}
