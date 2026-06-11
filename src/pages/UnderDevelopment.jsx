import { Link, useLocation } from 'react-router-dom'
import { Send, MessageCircle, ArrowLeft, Hammer } from 'lucide-react'
import { useT } from '../i18n'
import { PAGE_TITLES, PATHS } from '../router/paths'
import { BUILDER } from '../config/site'
import Logo from '../components/brand/Logo'

export default function UnderDevelopment() {
  const t = useT()
  const { pathname } = useLocation()
  const titleKey = PAGE_TITLES[pathname]
  const pageName = titleKey ? t(titleKey) : null

  return (
    <main className="relative grid min-h-[calc(100dvh-var(--nav-h)-var(--ticker-h))] place-items-center px-5 py-16">
      <div className="absolute inset-0 -z-10 bg-radial-gold" />
      <div className="card-glass w-full max-w-xl p-8 text-center sm:p-12">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>

        <div
          className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl animate-floaty"
          style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid var(--border)' }}
        >
          <Hammer style={{ width: 28, height: 28, color: 'var(--gold-light)' }} strokeWidth={1.6} />
        </div>

        {pageName && (
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">{pageName}</div>
        )}
        <h1 className="mb-3 text-3xl font-semibold text-foil sm:text-4xl">{t('dev.title')}</h1>
        <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-ink-muted">{t('dev.body')}</p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={BUILDER.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold w-full sm:w-auto"
          >
            <Send style={{ width: 17, height: 17 }} />
            {t('dev.telegram')}
          </a>
          <a
            href={BUILDER.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost w-full sm:w-auto"
          >
            <MessageCircle style={{ width: 17, height: 17 }} />
            {t('dev.whatsapp')}
          </a>
        </div>

        <Link
          to={PATHS.home}
          className="mt-7 inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-gold-light"
        >
          <ArrowLeft style={{ width: 15, height: 15 }} />
          {t('dev.home')}
        </Link>

        <div className="mt-8 border-t border-line pt-5 text-xs text-ink-faint">
          {t('footer.builtBy')} <span className="text-gold-light">{BUILDER.name}</span>
        </div>
      </div>
    </main>
  )
}
