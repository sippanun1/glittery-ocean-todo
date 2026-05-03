import { type InputHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, icon, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-medium text-ocean-text-muted uppercase tracking-wide"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ocean-text-disabled pointer-events-none">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={clsx(
              'w-full bg-ocean-elevated border border-ocean-border rounded-lg',
              'text-sm text-ocean-text-primary placeholder:text-ocean-text-disabled',
              'transition-all duration-150 outline-none',
              'focus:border-ocean-accent focus:shadow-glow-cyan',
              'disabled:opacity-40 disabled:cursor-not-allowed',
              error
                ? 'border-ocean-p1 focus:border-ocean-p1 focus:shadow-[0_0_12px_rgba(239,68,68,0.3)]'
                : '',
              icon ? 'pl-9 pr-3 py-2' : 'px-3 py-2',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-ocean-p1">{error}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'

export default Input
