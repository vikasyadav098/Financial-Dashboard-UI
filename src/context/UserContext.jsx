import React, { createContext, useState, useContext, useCallback } from 'react'
import { mockUsers } from '../data/mockData'

/**
 * UserContext - Global state for user and role management
 * 
 * Why Context and not Redux?
 * - This app only has 1-2 global values (user, role)
 * - Redux adds complexity we don't need yet
 * - Easy to migrate to Redux if app grows
 */
export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  // Start with admin role for full feature showcase
  const [currentUser, setCurrentUser] = useState(mockUsers.admin)

  /**
   * Switch between admin and viewer roles
   * Keeps user data but changes permissions
   */
  const switchRole = useCallback((role) => {
    setCurrentUser((prev) => ({
      ...mockUsers[role],
      // Preserve any user-specific data if needed
    }))
  }, [])

  const value = {
    user: currentUser,
    switchRole,
    isAdmin: currentUser.role === 'admin',
    isViewer: currentUser.role === 'viewer',
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

/**
 * Custom hook to use UserContext
 * Always use this instead of useContext(UserContext) directly
 */
export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within UserProvider')
  }
  return context
}
