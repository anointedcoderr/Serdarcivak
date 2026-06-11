import { useEffect, useMemo, useRef, useState } from 'react'
import { Search, ChevronLeft, ChevronRight, Plus, SearchX } from 'lucide-react'
import { useT } from '../../i18n'
import GameThumb from '../ui/GameThumb'
import GameLaunchModal from './GameLaunchModal'
import { cn } from '../../lib/cn'

const BATCH = 24

export default function CatalogShell({ type, games, providers, categories, eyebrow, title, subtitle, searchPlaceholder }) {
  const t = useT()
  const [rawSearch, setRawSearch] = useState('')
  const [search, setSearch] = useState('')
  const [provider, setProvider] = useState('all')
  const [cat, setCat] = useState('all')
  const [visible, setVisible] = useState(BATCH)
  const [selected, setSelected] = useState(null)
  const tabsRef = useRef(null)

  // debounce search
  useEffect(() => {
    const id = setTimeout(() => setSearch(rawSearch.trim().toLowerCase()), 350)
    return () => clearTimeout(id)
  }, [rawSearch])

  const filtered = useMemo(() => {
    return games.filter((g) => {
      if (provider !== 'all' && g.provider !== provider) return false
      if (cat !== 'all') {
        if (cat === 'turkish') {
          if (!g.turkish) return false
        } else if (cat === 'hot' || cat === 'new') {
          if (g.tag !== cat) return false
        } else if (g.cat !== cat) {
          return false
        }
      }
      if (search && !g.name.toLowerCase().includes(search)) return false
      return true
    })
  }, [games, provider, cat, search])

  // reset paging when filters change
  useEffect(() => {
    setVisible(BATCH)
  }, [provider, cat, search])

  const scrollTabs = (dir) => {
    tabsRef.current?.scrollBy({ left: dir * 240, behavior: 'smooth' })
  }

  const shown = filtered.slice(0, visible)

  return (
    <main>
      {/* command bar */}
      <div
        className="sticky z-[60] border-b border-line backdrop-blur-xl"
        style={{ top: 'calc(var(--ticker-h) + var(--nav-h))', background: 'rgba(8,8,11,0.96)' }}
      >
        <div className="container-page py-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            {/* search */}
            <div className="relative lg:w-72 lg:shrink-0">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" style={{ width: 16, height: 16, color: 'var(--text-faint)' }} />
              <input
                value={rawSearch}
                onChange={(e) => setRawSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full rounded-lg border border-line py-2.5 pl-9 pr-3 text-sm text-ink outline-none placeholder:text-ink-faint focus:border-gold/50"
                style={{ background: '#1d1d1d', fontSize: 16 }}
              />
            </div>

            {/* provider tabs */}
            <div className="relative flex min-w-0 flex-1 items-center">
              <button
                onClick={() => scrollTabs(-1)}
                className="mr-1 hidden h-8 w-8 shrink-0 place-items-center rounded-lg border border-line text-ink-muted hover:text-ink sm:grid"
                aria-label="prev"
              >
                <ChevronLeft style={{ width: 16, height: 16 }} />
              </button>
              <div ref={tabsRef} className="no-scrollbar flex flex-1 gap-1.5 overflow-x-auto scroll-smooth">
                <Tab active={provider === 'all'} onClick={() => setProvider('all')}>
                  {t('catalog.all')}
                </Tab>
                {providers.map((p) => (
                  <Tab key={p.name} active={provider === p.name} onClick={() => setProvider(p.name)}>
                    {p.name}
                    <span className="ml-1 text-[10px] text-ink-faint">{p.count}</span>
                  </Tab>
                ))}
              </div>
              <button
                onClick={() => scrollTabs(1)}
                className="ml-1 hidden h-8 w-8 shrink-0 place-items-center rounded-lg border border-line text-ink-muted hover:text-ink sm:grid"
                aria-label="next"
              >
                <ChevronRight style={{ width: 16, height: 16 }} />
              </button>
            </div>
          </div>

          {/* category chips */}
          {categories?.length > 0 && (
            <div className="no-scrollbar mt-2.5 flex gap-1.5 overflow-x-auto">
              <Chip active={cat === 'all'} onClick={() => setCat('all')}>
                {t('catalog.all')}
              </Chip>
              {categories.map((c) => (
                <Chip key={c} active={cat === c} onClick={() => setCat(c)}>
                  {t(`catalog.cats.${c}`)}
                </Chip>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* hero */}
      <div className="container-page pb-2 pt-8">
        <div className="mb-2 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">
          <span className="h-px w-6" style={{ background: 'var(--gold-deep)' }} />
          {eyebrow}
        </div>
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-[40px]">
          {title.split(' ')[0]} <span className="text-foil">{title.split(' ').slice(1).join(' ')}</span>
        </h1>
        <p className="mt-2 text-sm text-ink-muted">{subtitle}</p>
        <div className="mt-3 text-xs text-ink-faint">
          <span className="tnum text-gold-light">{filtered.length}</span> {t('catalog.results')}
        </div>
      </div>

      {/* grid */}
      <div className="container-page pb-12">
        {shown.length === 0 ? (
          <div className="card-glass grid place-items-center p-12 text-center">
            <SearchX style={{ width: 40, height: 40, color: 'var(--text-faint)' }} />
            <div className="mt-3 font-display text-lg text-ink">{t('catalog.noResults')}</div>
            <div className="mt-1 text-sm text-ink-muted">{t('catalog.noResultsSub')}</div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
              {shown.map((g) => (
                <GameThumb key={g.id} game={g} onPlay={setSelected} />
              ))}
            </div>
            {visible < filtered.length && (
              <div className="mt-8 flex justify-center">
                <button onClick={() => setVisible((v) => v + BATCH)} className="btn-ghost px-6 py-3">
                  <Plus style={{ width: 16, height: 16 }} /> {t('catalog.loadMore')}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <GameLaunchModal game={selected} type={type} onClose={() => setSelected(null)} />
    </main>
  )
}

function Tab({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'shrink-0 whitespace-nowrap rounded-lg border px-3.5 py-2 text-[13px] font-medium transition-colors',
        active ? 'border-transparent text-[#120d00]' : 'border-line text-ink-muted hover:text-ink',
      )}
      style={active ? { background: 'linear-gradient(135deg,#f7e7b6,#d4af37)' } : { background: 'rgba(255,255,255,0.02)' }}
    >
      {children}
    </button>
  )
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors',
        active ? 'text-gold-champagne' : 'text-ink-muted hover:text-ink',
      )}
      style={{
        background: active ? 'rgba(212,175,55,0.12)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${active ? 'rgba(212,175,55,0.4)' : 'var(--border)'}`,
      }}
    >
      {children}
    </button>
  )
}
