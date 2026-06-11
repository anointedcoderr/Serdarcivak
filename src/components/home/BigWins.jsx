import { Trophy, Flame } from 'lucide-react'
import { useT } from '../../i18n'
import { BIG_WINS } from '../../services/mock'
import Reveal from '../ui/Reveal'

export default function BigWins() {
  const t = useT()
  return (
    <section className="container-page py-8">
      <Reveal>
        <div className="mb-4 flex items-center gap-2">
          <Flame style={{ width: 18, height: 18, color: 'var(--ruby)' }} />
          <h2 className="font-display text-xl font-semibold text-ink">{t('bigwins.title')}</h2>
          <span className="pill ml-1 animate-pulse-soft" style={{ background: 'rgba(255,77,94,0.14)', color: '#ff8c97' }}>
            {t('common.live')}
          </span>
        </div>
      </Reveal>
      <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
        {BIG_WINS.map((w, i) => (
          <Reveal key={w.id} delay={i * 50}>
            <div className="card-glass flex w-[230px] shrink-0 items-center gap-3 p-3">
              <div
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full"
                style={{
                  background: 'linear-gradient(145deg,#f7e7b6,#c8a84b 45%,#8a6a00 75%,#d4af37)',
                  padding: 2,
                }}
              >
                <span className="grid h-full w-full place-items-center rounded-full" style={{ background: 'var(--bg-1)' }}>
                  <Trophy style={{ width: 18, height: 18, color: 'var(--gold)' }} />
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-[13px] font-semibold text-ink">{w.user}</span>
                  <span className="tnum text-[11px] font-semibold text-gold-light">{w.mult}</span>
                </div>
                <div className="truncate text-[11px] text-ink-muted">{w.game}</div>
                <div className="tnum mt-0.5 text-sm font-semibold text-emerald">
                  +{w.amount.toLocaleString('tr-TR')} ₺
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
