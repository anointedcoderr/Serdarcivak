import { Link } from 'react-router-dom'
import { Send, MessageCircle, Camera, ShieldCheck } from 'lucide-react'
import { useT } from '../../i18n'
import { PATHS } from '../../router/paths'
import { SITE, BUILDER, PAYMENTS } from '../../config/site'
import Logo from '../brand/Logo'

export default function Footer() {
  const t = useT()

  const cols = [
    {
      title: t('footer.games'),
      links: [
        { label: t('nav.slots'), to: PATHS.slots },
        { label: t('nav.live'), to: PATHS.live },
        { label: t('nav.sports'), to: PATHS.sports },
        { label: t('nav.crash'), to: PATHS.crash },
      ],
    },
    {
      title: t('footer.account'),
      links: [
        { label: t('footer.profile'), to: PATHS.profile },
        { label: t('common.deposit'), to: PATHS.deposit },
        { label: t('footer.withdraw'), to: PATHS.withdraw },
        { label: t('footer.transactions'), to: PATHS.transactions },
      ],
    },
    {
      title: t('footer.support'),
      links: [
        { label: t('footer.contact'), to: PATHS.contact },
        { label: t('footer.faq'), to: PATHS.faq },
        { label: t('footer.responsible'), to: PATHS.responsible },
        { label: t('footer.kyc'), to: PATHS.kycPolicy },
      ],
    },
  ]

  return (
    <footer className="relative mt-16 border-t border-line pt-12" style={{ background: 'var(--bg-1)' }}>
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">{t('footer.about')}</p>
            <div className="mt-5 flex gap-2">
              {[
                { Icon: Send, href: SITE.social.telegram },
                { Icon: MessageCircle, href: SITE.social.whatsapp },
                { Icon: Camera, href: SITE.social.instagram },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-line text-gold-light transition-colors hover:text-gold-champagne"
                >
                  <Icon style={{ width: 17, height: 17 }} />
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-deep">
                {col.title}
              </div>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.to + l.label}>
                    <Link to={l.to} className="text-sm text-ink-muted transition-colors hover:text-gold-light">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* payments */}
        <div className="mt-10 border-t border-line pt-7">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-deep">
            {t('footer.payments')}
          </div>
          <div className="flex flex-wrap gap-2">
            {PAYMENTS.map((p) => (
              <span
                key={p}
                className="rounded-lg border border-line px-3 py-1.5 text-xs text-ink-muted"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* legal strip */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-line py-6 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-2 text-xs text-ink-muted">
            <span className="pill" style={{ background: 'rgba(255,77,94,0.14)', color: '#ff8c97' }}>18+</span>
            <ShieldCheck style={{ width: 15, height: 15, color: 'var(--gold-deep)' }} />
            {t('footer.ageNote')}
          </div>
          <div className="text-xs text-ink-faint">
            {t('footer.builtBy')}{' '}
            <a
              href={BUILDER.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-light hover:text-gold-champagne"
            >
              {BUILDER.name}
            </a>
            {' · '}
            <a href={`mailto:${BUILDER.email}`} className="hover:text-gold-light">
              {BUILDER.email}
            </a>
          </div>
        </div>

        <div className="pb-[calc(var(--bottomnav-h)+20px)] text-center text-[11px] text-ink-faint lg:pb-6">
          © {SITE.name} · {t('footer.rights')}
        </div>
      </div>
    </footer>
  )
}
