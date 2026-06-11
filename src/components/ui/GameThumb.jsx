import {
  Candy, Crown, Zap, Fish, Mountain, Star, Flame, Gem, Sparkles, Cherry,
  CircleDot, Spade, PartyPopper, Diamond, Loader, Gauge, Play,
} from 'lucide-react'
import { useT } from '../../i18n'

const ICONS = {
  candy: Candy, crown: Crown, zap: Zap, fish: Fish, mountain: Mountain,
  star: Star, flame: Flame, gem: Gem, sparkles: Sparkles, cherry: Cherry,
  'circle-dot': CircleDot, spade: Spade, 'party-popper': PartyPopper,
  diamond: Diamond, loader: Loader, gauge: Gauge,
}

const TAG_STYLE = {
  hot: { bg: 'rgba(255,77,94,0.16)', color: '#ff8c97', label: 'hot' },
  new: { bg: 'rgba(52,211,153,0.16)', color: '#6ee7b7', label: 'new' },
  live: { bg: 'rgba(255,77,94,0.18)', color: '#ff8c97', label: 'live' },
}

// Generated, original game thumbnail (no copyrighted art).
export default function GameThumb({ game, onPlay }) {
  const t = useT()
  const Icon = ICONS[game.icon] || Gem
  const tag = game.tag ? TAG_STYLE[game.tag] : null

  return (
    <button
      type="button"
      onClick={() => onPlay?.(game)}
      className="group relative block w-full overflow-hidden rounded-2xl border border-line text-left"
      style={{ aspectRatio: '3 / 4', background: `linear-gradient(160deg, ${game.grad[0]}, ${game.grad[1]})` }}
      aria-label={`${game.name} - ${t('common.play')}`}
    >
      {/* decorative motif */}
      <Icon
        className="absolute -right-4 -top-3 opacity-[0.13] transition-transform duration-500 group-hover:scale-110 group-hover:opacity-20"
        style={{ width: 120, height: 120, color: 'var(--gold-light)' }}
        strokeWidth={1.2}
      />
      <Icon
        className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 opacity-90 drop-shadow"
        style={{ width: 46, height: 46, color: 'var(--gold-champagne)' }}
        strokeWidth={1.4}
      />

      {tag && (
        <span
          className="pill absolute left-2.5 top-2.5"
          style={{ background: tag.bg, color: tag.color }}
        >
          {tag.label === 'live' && (
            <span className="inline-block h-1.5 w-1.5 rounded-full animate-pulse-soft" style={{ background: tag.color }} />
          )}
          {t(`common.${tag.label}`)}
        </span>
      )}

      {/* veil + title */}
      <div
        className="absolute inset-x-0 bottom-0 p-3"
        style={{ background: 'linear-gradient(to top, rgba(7,7,10,0.95), rgba(7,7,10,0.55) 55%, transparent)' }}
      >
        <div className="truncate font-display text-[14px] font-semibold text-ink">{game.name}</div>
        <div className="truncate text-[11px] text-ink-muted">{game.provider}</div>
      </div>

      {/* hover play */}
      <div className="absolute inset-0 grid place-items-center bg-black/35 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
        <span
          className="grid place-items-center rounded-full"
          style={{
            width: 52, height: 52,
            background: 'linear-gradient(135deg,#f7e7b6,#d4af37)',
            boxShadow: '0 8px 24px rgba(212,175,55,0.5)',
          }}
        >
          <Play style={{ width: 22, height: 22, color: '#120d00', marginLeft: 2 }} fill="#120d00" />
        </span>
      </div>
    </button>
  )
}
