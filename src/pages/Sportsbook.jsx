import { useState, useMemo } from 'react'
import { Trophy, Clock, Ticket, ChevronUp } from 'lucide-react'
import { useT } from '../i18n'
import { useUI } from '../store/ui'
import { SPORT_EVENTS } from '../services/mock'
import BetSlip from '../components/sportsbook/BetSlip'
import { cn } from '../lib/cn'

const SPORT_TABS = ['all', 'football', 'basketball', 'tennis', 'volleyball']

export default function Sportsbook() {
  const t = useT()
  const slip = useUI((s) => s.betSlip)
  const addSelection = useUI((s) => s.addSelection)
  const [sport, setSport] = useState('all')
  const [tab, setTab] = useState('all') // all | live | prematch
  const [mobileSlip, setMobileSlip] = useState(false)

  const events = useMemo(
    () =>
      SPORT_EVENTS.filter((e) => {
        if (sport !== 'all' && e.sport !== sport) return false
        if (tab === 'live' && !e.live) return false
        if (tab === 'prematch' && e.live) return false
        return true
      }),
    [sport, tab],
  )

  const onPick = (e, market, pick) => {
    const key = `${e.id}|${market.name}|${pick.label}`
    addSelection({
      key,
      eventId: e.id,
      match: `${e.home} - ${e.away}`,
      market: market.name,
      pick: pick.label,
      odd: pick.odd,
    })
  }

  const totalOdds = slip.reduce((acc, b) => acc * parseFloat(b.odd), 1)

  return (
    <main className="container-page py-8">
      {/* header */}
      <div className="mb-5">
        <div className="mb-2 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">
          <Trophy style={{ width: 14, height: 14 }} /> {t('sb.title')}
        </div>
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-[40px]">
          {t('sb.title').split(' ')[0]} <span className="text-foil">{t('sb.title').split(' ').slice(1).join(' ')}</span>
        </h1>
        <p className="mt-2 text-sm text-ink-muted">{t('sb.subtitle')}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div>
          {/* sport + status tabs */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <div className="no-scrollbar flex gap-1.5 overflow-x-auto">
              {SPORT_TABS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSport(s)}
                  className={cn(
                    'shrink-0 rounded-lg border px-3.5 py-2 text-[13px] font-medium transition-colors',
                    sport === s ? 'border-transparent text-[#120d00]' : 'border-line text-ink-muted hover:text-ink',
                  )}
                  style={sport === s ? { background: 'linear-gradient(135deg,#f7e7b6,#d4af37)' } : { background: 'rgba(255,255,255,0.02)' }}
                >
                  {t(`sb.sports.${s}`)}
                </button>
              ))}
            </div>
            <div className="ml-auto flex gap-1.5">
              {['all', 'live', 'prematch'].map((tb) => (
                <button
                  key={tb}
                  onClick={() => setTab(tb)}
                  className={cn('rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors', tab === tb ? 'text-gold-champagne' : 'text-ink-muted hover:text-ink')}
                  style={{ background: tab === tb ? 'rgba(212,175,55,0.12)' : 'transparent', border: `1px solid ${tab === tb ? 'rgba(212,175,55,0.4)' : 'transparent'}` }}
                >
                  {tb === 'all' ? t('sb.sports.all') : tb === 'live' ? t('sb.live') : t('sb.prematch')}
                </button>
              ))}
            </div>
          </div>

          {/* events */}
          <div className="flex flex-col gap-3">
            {events.map((e) => (
              <div key={e.id} className="card-glass p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={`https://flagcdn.com/20x15/${e.cc}.png`} alt="" width={20} height={15} className="rounded-sm" loading="lazy" />
                    <span className="text-[12px] text-ink-muted">{e.league}</span>
                  </div>
                  {e.live ? (
                    <span className="pill animate-pulse-soft" style={{ background: 'rgba(255,77,94,0.14)', color: '#ff8c97' }}>
                      {t('sb.live')} {e.minute}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] text-ink-muted">
                      <Clock style={{ width: 12, height: 12 }} /> {e.time}
                    </span>
                  )}
                </div>

                <div className="mb-3 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-ink">{e.home}</div>
                    <div className="text-sm font-medium text-ink">{e.away}</div>
                  </div>
                  {e.score && <div className="tnum text-lg font-semibold text-gold-light">{e.score}</div>}
                </div>

                {/* markets */}
                <div className="flex flex-col gap-2">
                  {e.markets.map((m) => (
                    <div key={m.name} className="flex items-center gap-2">
                      <span className="w-14 shrink-0 text-[11px] text-ink-faint">{m.name}</span>
                      <div className="flex flex-1 gap-2">
                        {m.picks.map((p) => {
                          const key = `${e.id}|${m.name}|${p.label}`
                          const active = slip.some((b) => b.key === key)
                          return (
                            <button
                              key={p.label}
                              onClick={() => onPick(e, m, p)}
                              className={cn(
                                'flex flex-1 items-center justify-between rounded-lg border px-3 py-2 transition-colors',
                                active ? 'border-transparent text-[#120d00]' : 'border-line hover:border-gold/50',
                              )}
                              style={active ? { background: 'linear-gradient(135deg,#f7e7b6,#d4af37)' } : { background: 'rgba(255,255,255,0.02)' }}
                            >
                              <span className={cn('text-[11px]', active ? 'text-[#120d00]' : 'text-ink-muted')}>{p.label}</span>
                              <span className="tnum text-[13px] font-semibold">{p.odd}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* desktop bet slip */}
        <aside className="hidden lg:block">
          <div className="sticky top-[calc(var(--ticker-h)+var(--nav-h)+16px)]">
            <BetSlip />
          </div>
        </aside>
      </div>

      {/* mobile bet slip bar + sheet */}
      {slip.length > 0 && (
        <>
          <button
            onClick={() => setMobileSlip(true)}
            className="btn-gold fixed inset-x-4 z-[70] flex items-center justify-between lg:hidden"
            style={{ bottom: 'calc(var(--bottomnav-h) + 12px)' }}
          >
            <span className="flex items-center gap-2"><Ticket style={{ width: 16, height: 16 }} /> {t('sb.betslip')} ({slip.length})</span>
            <span className="tnum flex items-center gap-1">{totalOdds.toFixed(2)} <ChevronUp style={{ width: 15, height: 15 }} /></span>
          </button>
          {mobileSlip && (
            <div className="fixed inset-0 z-[100] flex items-end bg-black/70 lg:hidden" onClick={() => setMobileSlip(false)}>
              <div className="w-full animate-slide-up" onClick={(ev) => ev.stopPropagation()}>
                <BetSlip onClose={() => setMobileSlip(false)} />
              </div>
            </div>
          )}
        </>
      )}
    </main>
  )
}
