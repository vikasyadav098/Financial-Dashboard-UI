/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          // Main background colors
          50: '#1a1a2e',  // Darkest background
          100: '#16213e', // Main background
          200: '#0f3460', // Subtle background variant
          300: '#2d4959', // Lighter variant
          400: '#3a5a6e', // Card backgrounds
          500: '#4a6fa5', // Active/hover state
        },
        // Keep brand colors but adjust for dark background
        brand: {
          25: '#e6f2ff',
          50: '#cce5ff',
          100: '#99ccff',
          200: '#6eb3ff',
          300: '#4d9aff',
          400: '#3385ff',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#082f49',
        },
        success: {
          25: '#e6f9f1',
          50: '#ccf3e3',
          100: '#99e8d4',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        danger: {
          25: '#ffe6e6',
          50: '#ffcccc',
          100: '#ff9999',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
        warning: {
          25: '#fff9e6',
          50: '#fff3cc',
          100: '#ffe699',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
        },
        slate: {
          25: '#f1f5f9',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
        'elegant': '0 10px 40px -15px rgba(0, 0, 0, 0.8)',
        'inner-subtle': 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-subtle': 'pulseSubtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
}
