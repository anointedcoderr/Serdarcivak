import { cn } from '../../lib/cn'

// Serdarcivak wordmark + gem monogram. Swappable via SITE config later.
export default function Logo({ className, compact = false }) {
  return (
    <span className={cn('inline-flex items-center gap-2 select-none', className)}>
      <span className="relative inline-grid place-items-center" style={{ width: 34, height: 34 }}>
        <svg viewBox="0 0 40 40" width="34" height="34" aria-hidden="true">
          <defs>
            <linearGradient id="lg-gem" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f7e7b6" />
              <stop offset="0.5" stopColor="#d4af37" />
              <stop offset="1" stopColor="#8a6a1f" />
            </linearGradient>
          </defs>
          <path
            d="M20 2 L34 11 V29 L20 38 L6 29 V11 Z"
            fill="none"
            stroke="url(#lg-gem)"
            strokeWidth="2"
          />
          <path
            d="M20 9 L28 14 V26 L20 31 L12 26 V14 Z"
            fill="url(#lg-gem)"
            opacity="0.16"
          />
          <text
            x="20"
            y="25.5"
            textAnchor="middle"
            fontFamily="Clash Display, sans-serif"
            fontWeight="700"
            fontSize="16"
            fill="url(#lg-gem)"
          >
            S
          </text>
        </svg>
      </span>
      {!compact && (
        <span
          className="text-shimmer font-display font-semibold tracking-tight"
          style={{ fontSize: 20, letterSpacing: '0.01em' }}
        >
          SERDARCIVAK
        </span>
      )}
    </span>
  )
}
