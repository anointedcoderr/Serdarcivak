import { useLang } from '../../i18n'
import { cn } from '../../lib/cn'

export default function LanguageToggle({ className }) {
  const { lang, setLang } = useLang()
  return (
    <div
      className={cn('inline-flex items-center rounded-full border border-line p-0.5', className)}
      style={{ background: 'rgba(255,255,255,0.03)' }}
      role="group"
      aria-label="Language"
    >
      {['tr', 'en'].map((code) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          className="rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase transition-colors"
          style={
            lang === code
              ? { background: 'linear-gradient(135deg,#f7e7b6,#d4af37)', color: '#120d00' }
              : { color: 'var(--text-muted)' }
          }
          aria-pressed={lang === code}
        >
          {code}
        </button>
      ))}
    </div>
  )
}
