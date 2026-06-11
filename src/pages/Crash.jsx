import { useEffect, useRef, useState } from 'react'
import { Rocket, TrendingUp } from 'lucide-react'
import { useT } from '../i18n'
import { useUI } from '../store/ui'
import { CRASH_HISTORY, CRASH_LIVE_BETS } from '../services/mock'

function rollCrash() {
  const r = Math.random()
  return Math.min(30, Math.max(1, Math.floor((0.92 / (1 - r)) * 100) / 100))
}

export default function Crash() {
  const t = useT()
  const user = useUI((s) => s.user)
  const openAuth = useUI((s) => s.openAuth)
  const toast = useUI((s) => s.toast)

  const canvasRef = useRef(null)
  const multRef = useRef(null)
  const labelRef = useRef(null)
  const g = useRef({ phase: 'waiting', mult: 1, crashAt: 2, t0: 0, nextAt: 0, betPlaced: false, bet: 0, cashed: false, cashAt: 0, auto: 0 })

  const [phase, setPhase] = useState('waiting')
  const [betPlaced, setBetPlaced] = useState(false)
  const [history, setHistory] = useState(CRASH_HISTORY)
  const [bet, setBet] = useState(50)
  const [auto, setAuto] = useState(2)

  // keep latest bet/auto in the game ref
  useEffect(() => { g.current.bet = Number(bet) || 0 }, [bet])
  useEffect(() => { g.current.auto = Number(auto) || 0 }, [auto])

  useEffect(() => {
    let raf
    let mounted = true
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cv = canvasRef.current
    const ctx = cv?.getContext('2d')
    const now = () => performance.now()
    g.current.nextAt = now() + 2500
    g.current.phase = 'waiting'

    const setColor = (c) => { if (multRef.current) multRef.current.style.color = c }

    const draw = (progress, mult, crashed) => {
      if (!ctx || !cv) return
      const w = cv.width, h = cv.height
      ctx.clearRect(0, 0, w, h)
      // grid
      ctx.strokeStyle = 'rgba(255,255,255,0.04)'
      ctx.lineWidth = 1
      for (let i = 1; i < 5; i++) { ctx.beginPath(); ctx.moveTo(0, (h / 5) * i); ctx.lineTo(w, (h / 5) * i); ctx.stroke() }
      // curve
      const pts = 60
      const grad = ctx.createLinearGradient(0, 0, w, 0)
      grad.addColorStop(0, crashed ? '#ff4d5e' : '#b8902f')
      grad.addColorStop(1, crashed ? '#ff8c97' : '#f7e7b6')
      ctx.strokeStyle = grad
      ctx.lineWidth = 3
      ctx.beginPath()
      for (let i = 0; i <= pts; i++) {
        const p = (i / pts) * progress
        const x = p * w
        const m = 1 + (mult - 1) * (i / pts)
        const y = h - (Math.min(m - 1, 9) / 9) * (h - 8) - 4
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.stroke()
      // head dot
      const hx = progress * w
      const hy = h - (Math.min(mult - 1, 9) / 9) * (h - 8) - 4
      ctx.fillStyle = crashed ? '#ff4d5e' : '#f7e7b6'
      ctx.beginPath(); ctx.arc(hx, hy, 5, 0, Math.PI * 2); ctx.fill()
    }

    const loop = () => {
      if (!mounted) return
      const st = g.current
      const tNow = now()

      if (st.phase === 'waiting') {
        setColor('var(--gold-light)')
        if (multRef.current) multRef.current.textContent = '1.00x'
        if (labelRef.current) labelRef.current.textContent = t('crash.waiting')
        draw(0.02, 1, false)
        if (tNow >= st.nextAt) {
          st.phase = 'running'; st.t0 = tNow; st.crashAt = rollCrash(); st.cashed = false
          setPhase('running')
        }
      } else if (st.phase === 'running') {
        const el = (tNow - st.t0) / 1000
        st.mult = 1 + el * 0.55 + el * el * 0.045
        if (labelRef.current) labelRef.current.textContent = ''
        // auto cashout
        if (st.betPlaced && !st.cashed && st.auto >= 1.01 && st.mult >= st.auto) doCashout(st.auto)
        if (st.mult >= st.crashAt) {
          st.phase = 'crashed'; st.mult = st.crashAt; st.nextAt = tNow + 2400
          setColor('var(--ruby)')
          if (multRef.current) multRef.current.textContent = st.crashAt.toFixed(2) + 'x'
          if (labelRef.current) labelRef.current.textContent = t('crash.flewAway')
          draw(1, st.crashAt, true)
          setHistory((h) => [Number(st.crashAt.toFixed(2)), ...h].slice(0, 14))
          if (st.betPlaced && !st.cashed) { st.betPlaced = false; setBetPlaced(false) }
          setPhase('crashed')
        } else {
          setColor('var(--gold-champagne)')
          if (multRef.current) multRef.current.textContent = st.mult.toFixed(2) + 'x'
          const prog = Math.min(0.96, el / (el + 2.2))
          draw(prog, st.mult, false)
        }
      } else if (st.phase === 'crashed') {
        if (tNow >= st.nextAt) {
          st.phase = 'waiting'; st.nextAt = tNow + 2500; st.cashed = false
          setPhase('waiting')
        }
      }
      raf = requestAnimationFrame(loop)
    }

    const doCashout = (atMult) => {
      const st = g.current
      if (!st.betPlaced || st.cashed) return
      st.cashed = true; st.betPlaced = false
      const win = st.bet * atMult
      setBetPlaced(false)
      toast(`${t('crash.youWon')} +${win.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺ (${atMult.toFixed(2)}x)`, 'success')
    }
    g.current.doCashout = doCashout

    if (reduce) {
      // static frame for reduced motion
      draw(0.5, 2.4, false)
      if (multRef.current) multRef.current.textContent = '2.40x'
    } else {
      raf = requestAnimationFrame(loop)
    }
    return () => { mounted = false; cancelAnimationFrame(raf) }
  }, [t, toast])

  const placeBet = () => {
    if (!user) { openAuth('login'); return }
    const st = g.current
    if (st.phase !== 'waiting' || st.betPlaced) return
    st.betPlaced = true; st.cashed = false; st.bet = Number(bet) || 0
    setBetPlaced(true)
  }
  const cashOut = () => g.current.doCashout?.(g.current.mult)

  return (
    <main className="container-page py-8">
      <div className="mb-5">
        <div className="mb-2 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">
          <Rocket style={{ width: 14, height: 14 }} /> {t('crash.title')}
        </div>
        <h1 className="font-display text-3xl font-semibold text-foil sm:text-[40px]">{t('crash.title')}</h1>
        <p className="mt-2 text-sm text-ink-muted">{t('crash.subtitle')}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* game */}
        <div>
          <div className="card-glass relative overflow-hidden p-4">
            {/* history */}
            <div className="no-scrollbar mb-3 flex gap-1.5 overflow-x-auto">
              {history.map((m, i) => (
                <span
                  key={i}
                  className="tnum shrink-0 rounded-md px-2 py-1 text-[11px] font-semibold"
                  style={{ background: m >= 2 ? 'rgba(52,211,153,0.12)' : 'rgba(255,77,94,0.12)', color: m >= 2 ? '#6ee7b7' : '#ff8c97' }}
                >
                  {m.toFixed(2)}x
                </span>
              ))}
            </div>
            {/* canvas + multiplier */}
            <div className="relative">
              <canvas ref={canvasRef} width={760} height={320} className="w-full rounded-xl" style={{ background: 'radial-gradient(60% 80% at 0% 100%, rgba(212,175,55,0.08), transparent 60%), #0b0b0f', aspectRatio: '760/320' }} />
              <div className="pointer-events-none absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <div ref={multRef} className="tnum font-display text-5xl font-bold sm:text-6xl" style={{ color: 'var(--gold-light)' }}>1.00x</div>
                  <div ref={labelRef} className="mt-1 text-sm text-ink-muted" />
                </div>
              </div>
            </div>
          </div>

          {/* live bets */}
          <div className="card-glass mt-4 overflow-hidden">
            <div className="flex items-center gap-2 border-b border-line p-4">
              <TrendingUp style={{ width: 16, height: 16, color: 'var(--gold)' }} />
              <span className="font-display text-base font-semibold text-ink">{t('crash.liveBets')}</span>
            </div>
            <div className="divide-y divide-[color:var(--border)]">
              {CRASH_LIVE_BETS.map((b, i) => (
                <div key={i} className="flex items-center justify-between p-3">
                  <span className="text-[13px] text-ink">{b.user}</span>
                  <span className="tnum text-[13px] text-ink-muted">{b.amount.toLocaleString('tr-TR')} ₺</span>
                  <span className="tnum text-[13px] font-semibold" style={{ color: b.cashed ? 'var(--emerald)' : 'var(--text-faint)' }}>
                    {b.cashed ? `${b.mult.toFixed(2)}x` : '—'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* bet panel */}
        <aside>
          <div className="card-glass p-5 lg:sticky lg:top-[calc(var(--ticker-h)+var(--nav-h)+16px)]">
            <div className="mb-2 text-[12px] font-medium text-ink-muted">{t('crash.betAmount')}</div>
            <div className="mb-4 flex items-stretch overflow-hidden rounded-lg border border-line" style={{ background: '#1d1d1d' }}>
              <input type="number" value={bet} onChange={(e) => setBet(e.target.value)} className="tnum w-full bg-transparent px-3 py-2.5 text-ink outline-none" style={{ fontSize: 16 }} />
              <span className="grid place-items-center border-l border-line px-3 text-gold-light">₺</span>
            </div>

            <div className="mb-2 text-[12px] font-medium text-ink-muted">{t('crash.autoCashout')}</div>
            <div className="mb-5 flex items-stretch overflow-hidden rounded-lg border border-line" style={{ background: '#1d1d1d' }}>
              <input type="number" step="0.1" value={auto} onChange={(e) => setAuto(e.target.value)} className="tnum w-full bg-transparent px-3 py-2.5 text-ink outline-none" style={{ fontSize: 16 }} />
              <span className="grid place-items-center border-l border-line px-3 text-gold-light">x</span>
            </div>

            {betPlaced && phase === 'running' ? (
              <button onClick={cashOut} className="btn-gold w-full py-3.5" style={{ background: 'linear-gradient(135deg,#6ee7b7,#34d399)' }}>
                {t('crash.cashout')}
              </button>
            ) : (
              <button
                onClick={placeBet}
                disabled={betPlaced || phase !== 'waiting'}
                className="btn-gold w-full py-3.5"
                style={betPlaced || phase !== 'waiting' ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
              >
                {betPlaced ? t('crash.cashedOut') : t('crash.placeBet')}
              </button>
            )}
            <p className="mt-3 text-center text-[11px] text-ink-faint">{t('crash.demoNote')}</p>
          </div>
        </aside>
      </div>
    </main>
  )
}
