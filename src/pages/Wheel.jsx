import { useRef, useState } from 'react'
import { Disc3, Gift } from 'lucide-react'
import { useT } from '../i18n'
import { useUI } from '../store/ui'
import { WHEEL_SEGMENTS } from '../services/mock'

const CX = 100, CY = 100, R = 94, SEG = 360 / WHEEL_SEGMENTS.length

function wedgePath(i) {
  const a0 = (i * SEG - 90) * (Math.PI / 180)
  const a1 = ((i + 1) * SEG - 90) * (Math.PI / 180)
  const x0 = CX + R * Math.cos(a0), y0 = CY + R * Math.sin(a0)
  const x1 = CX + R * Math.cos(a1), y1 = CY + R * Math.sin(a1)
  return `M ${CX} ${CY} L ${x0} ${y0} A ${R} ${R} 0 0 1 ${x1} ${y1} Z`
}
function labelPos(i) {
  const a = ((i + 0.5) * SEG - 90) * (Math.PI / 180)
  return { x: CX + 60 * Math.cos(a), y: CY + 60 * Math.sin(a), rot: (i + 0.5) * SEG }
}

export default function Wheel() {
  const t = useT()
  const user = useUI((s) => s.user)
  const openAuth = useUI((s) => s.openAuth)
  const toast = useUI((s) => s.toast)
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [spun, setSpun] = useState(false)
  const rotRef = useRef(0)

  const spin = () => {
    if (!user) { openAuth('login'); return }
    if (spinning || spun) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const index = Math.floor(Math.random() * WHEEL_SEGMENTS.length)
    const seg = WHEEL_SEGMENTS[index]
    // bring segment center to the top pointer
    const target = 360 * 5 + (360 - (index * SEG + SEG / 2))
    const next = rotRef.current + target
    rotRef.current = next
    setSpinning(true)
    setRotation(next)
    const finish = () => {
      setSpinning(false)
      if (seg.kind !== 'again') setSpun(true)
      toast(`${t('wheel.youWon')}: ${seg.label}`, 'success')
    }
    if (reduce) finish()
    else setTimeout(finish, 4300)
  }

  return (
    <main className="container-page py-8">
      <div className="mb-6 text-center">
        <div className="mb-2 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">
          <Disc3 style={{ width: 14, height: 14 }} /> {t('wheel.title')}
        </div>
        <h1 className="font-display text-3xl font-semibold sm:text-[40px]">
          <span className="text-ink">{t('wheel.title').split(' ')[0]} </span>
          <span className="text-foil">{t('wheel.title').split(' ').slice(1).join(' ')}</span>
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">{t('wheel.subtitle')}</p>
      </div>

      <div className="grid items-center gap-8 lg:grid-cols-2">
        {/* wheel */}
        <div className="flex flex-col items-center">
          <div className="relative" style={{ width: 'min(86vw, 360px)' }}>
            {/* pointer */}
            <div className="absolute left-1/2 top-[-6px] z-10 -translate-x-1/2" style={{ width: 0, height: 0, borderLeft: '11px solid transparent', borderRight: '11px solid transparent', borderTop: '22px solid #f7e7b6', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }} />
            <svg
              viewBox="0 0 200 200"
              style={{
                width: '100%', display: 'block',
                transform: `rotate(${rotation}deg)`,
                transition: spinning ? 'transform 4.2s cubic-bezier(0.16,1,0.3,1)' : 'none',
                filter: 'drop-shadow(0 0 30px rgba(212,175,55,0.2))',
              }}
            >
              <circle cx={CX} cy={CY} r={R + 3} fill="none" stroke="rgba(212,175,55,0.5)" strokeWidth="3" />
              {WHEEL_SEGMENTS.map((s, i) => (
                <path key={i} d={wedgePath(i)} fill={s.color} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              ))}
              {WHEEL_SEGMENTS.map((s, i) => {
                const { x, y, rot } = labelPos(i)
                return (
                  <text key={i} x={x} y={y} fill="#fff" fontSize="9" fontWeight="600" textAnchor="middle" dominantBaseline="middle" transform={`rotate(${rot} ${x} ${y})`}>
                    {s.label}
                  </text>
                )
              })}
              <circle cx={CX} cy={CY} r="16" fill="#0b0b0f" stroke="rgba(212,175,55,0.5)" strokeWidth="2" />
            </svg>
          </div>

          <button onClick={spin} disabled={spinning || spun} className="btn-gold mt-6 px-8 py-3.5 text-[15px]" style={spinning || spun ? { opacity: 0.55, cursor: 'not-allowed' } : undefined}>
            <Disc3 style={{ width: 18, height: 18 }} className={spinning ? 'animate-spin' : ''} />
            {spinning ? t('wheel.spinning') : spun ? t('wheel.comeBack') : !user ? t('wheel.loginToSpin') : t('wheel.spin')}
          </button>
          {user && !spun && !spinning && <p className="mt-2 text-[12px] text-emerald">{t('wheel.free')}</p>}
        </div>

        {/* prizes */}
        <div>
          <h2 className="mb-4 font-display text-xl font-semibold text-ink">{t('wheel.prizes')}</h2>
          <div className="grid grid-cols-2 gap-3">
            {WHEEL_SEGMENTS.filter((s) => s.kind !== 'again').map((s, i) => (
              <div key={i} className="card-glass flex items-center gap-3 p-4">
                <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: s.color }}>
                  <Gift style={{ width: 18, height: 18, color: '#fff' }} />
                </span>
                <span className="font-display text-base font-semibold text-ink">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
