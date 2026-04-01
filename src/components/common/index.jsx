/**
 * Card Component - Generic container with dark theme styling
 */
export const Card = ({ children, className = '', hoverable = false }) => {
  return (
    <div
      className={`
        bg-slate-800 bg-opacity-60 backdrop-blur-md rounded-2xl 
        border border-slate-700 border-opacity-50
        shadow-lg hover:shadow-xl
        ${hoverable ? 'card-hover' : 'transition-smooth'}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

Card.Header = ({ children, className = '' }) => (
  <div className={`px-6 py-5 border-b border-slate-700 bg-gradient-to-r from-slate-700 to-transparent rounded-t-2xl ${className}`}>
    {children}
  </div>
)

Card.Body = ({ children, className = '' }) => (
  <div className={`px-6 py-5 ${className}`}>{children}</div>
)

Card.Footer = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-t border-slate-700 bg-slate-900 bg-opacity-50 rounded-b-2xl ${className}`}>
    {children}
  </div>
)

/**
 * Button Component - Dark theme variants
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = '',
  ...props
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-brand-600 to-brand-500 text-white hover:from-brand-700 hover:to-brand-600 shadow-md hover:shadow-lg disabled:bg-slate-600 disabled:shadow-none',
    secondary: 'bg-slate-700 text-slate-100 hover:bg-slate-600 border border-slate-600 shadow-sm disabled:bg-slate-800 disabled:text-slate-500',
    danger: 'bg-gradient-to-r from-danger-600 to-danger-500 text-white hover:from-danger-700 hover:to-danger-600 shadow-md hover:shadow-lg disabled:bg-slate-600',
    ghost: 'bg-transparent text-slate-300 hover:bg-slate-700 disabled:text-slate-500',
  }

  const sizes = {
    sm: 'px-3 py-2 text-sm font-medium rounded-lg',
    md: 'px-4 py-2.5 text-base font-medium rounded-lg',
    lg: 'px-6 py-3 text-lg font-semibold rounded-lg',
  }

  return (
    <button
      className={`
        font-semibold transition-smooth disabled:cursor-not-allowed
        active:scale-95 focus-ring
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

/**
 * Badge Component - Status indicators dark theme
 */
export const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-slate-700 text-slate-200 border border-slate-600',
    success: 'bg-success-900 text-success-200 border border-success-700 font-semibold',
    warning: 'bg-warning-900 text-warning-200 border border-warning-700 font-semibold',
    danger: 'bg-danger-900 text-danger-200 border border-danger-700 font-semibold',
    primary: 'bg-brand-900 text-brand-200 border border-brand-700 font-semibold',
  }

  return (
    <span
      className={`
        inline-block px-3 py-1.5 rounded-full text-xs font-semibold
        ${variants[variant]} ${className}
      `}
    >
      {children}
    </span>
  )
}

/**
 * Input Component - Dark theme form input
 */
export const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-label font-semibold text-slate-200">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          px-4 py-2.5 rounded-lg border-2 transition-smooth
          bg-slate-800 text-slate-100 placeholder:text-slate-500
          ${error ? 'border-danger-600 focus:border-danger-500' : 'border-slate-600 focus:border-brand-500'}
          focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-opacity-20
          disabled:bg-slate-900 disabled:cursor-not-allowed disabled:text-slate-500
          ${className}
        `}
        {...props}
      />
      {error && <span className="text-xs text-danger-400 font-medium">{error}</span>}
    </div>
  )
}

/**
 * Select Component - Dark theme dropdown
 */
export const Select = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  className = '',
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-label font-semibold text-slate-200">{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className={`
          px-4 py-2.5 rounded-lg border-2 border-slate-600
          bg-slate-800 text-slate-100 font-medium
          focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500 focus:ring-opacity-20
          cursor-pointer transition-smooth
          appearance-none bg-no-repeat bg-right
          ${className}
        `}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%230ea5e9' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
          backgroundPosition: 'right 12px center',
          paddingRight: '36px',
        }}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-slate-800 text-slate-100">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

/**
 * Loading Skeleton - Dark theme shimmer
 */
export const Skeleton = ({ className = '' }) => (
  <div
    className={`bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 animate-shimmer rounded-lg ${className}`}
    style={{
      backgroundSize: '1000px 100%',
      animation: 'shimmer 2s infinite',
    }}
  />
)

/**
 * Empty State - Dark theme
 */
export const EmptyState = ({ icon = '📭', title, description }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 rounded-xl bg-gradient-to-br from-slate-800 to-slate-700">
    <div className="text-6xl mb-4 animate-bounce" style={{ animationDuration: '2s' }}>{icon}</div>
    <h3 className="text-heading-sm mb-2 text-slate-200">{title}</h3>
    <p className="text-slate-400 text-center max-w-sm font-medium text-sm">{description}</p>
  </div>
)

/**
 * Stat Card - Dark theme metric display
 */
export const StatCard = ({
  label,
  value,
  icon,
  trend,
  trendValue,
  color = 'from-slate-700 to-slate-800',
  onClick,
}) => (
  <Card
    className={`bg-gradient-to-br ${color} border-opacity-30 hover-lift`}
    hoverable
    onClick={onClick}
  >
    <Card.Body>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-hint mb-2 text-slate-400">{label}</p>
          <p className="text-heading-md font-bold text-slate-50">{value}</p>
          {trend && (
            <div
              className={`flex items-center gap-1 text-sm mt-2 font-semibold ${
                trend === 'up' ? 'text-success-300' : 'text-danger-300'
              }`}
            >
              <span>{trend === 'up' ? '📈' : '📉'}</span>
              <span>{trendValue}% {trend === 'up' ? 'increase' : 'decrease'}</span>
            </div>
          )}
        </div>
        {icon && <span className="text-4xl opacity-80">{icon}</span>}
      </div>
    </Card.Body>
  </Card>
)

/**
 * Divider Component
 */
export const Divider = ({ className = '' }) => (
  <div className={`border-t border-slate-700 ${className}`} />
)

/**
 * Progress Bar Component - Dark theme
 */
export const ProgressBar = ({ percentage = 0, color = 'bg-gradient-to-r from-brand-500 to-brand-600', showLabel = true }) => (
  <div className="w-full">
    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
      <div
        className={`h-full ${color} rounded-full transition-all duration-500 ease-out`}
        style={{ width: `${percentage}%` }}
      />
    </div>
    {showLabel && (
      <span className="text-xs font-semibold text-slate-400 mt-1 inline-block">
        {percentage}%
      </span>
    )}
  </div>
)

/**
 * Tooltip Component - Dark theme
 */
export const Tooltip = ({ text, children }) => (
  <div className="group relative inline-block">
    {children}
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-slate-100 text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 shadow-lg border border-slate-700">
      {text}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
    </div>
  </div>
)
