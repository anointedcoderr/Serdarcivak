import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useT } from '../../i18n'

export default function SectionHeader({ title, subtitle, to }) {
  const t = useT()
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-[28px]">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-ink-muted">{subtitle}</p>}
      </div>
      {to && (
        <Link
          to={to}
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-gold-light transition-colors hover:text-gold-champagne"
        >
          {t('common.seeAll')} <ArrowRight style={{ width: 15, height: 15 }} />
        </Link>
      )}
    </div>
  )
}
