import { useEffect, useState } from 'react'
import { X, Eye, EyeOff, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react'
import { useT } from '../../i18n'
import { useUI } from '../../store/ui'
import Logo from '../brand/Logo'
import { cn } from '../../lib/cn'

function Field({ label, type = 'text', value, onChange, placeholder, prefix }) {
  const [show, setShow] = useState(false)
  const isPw = type === 'password'
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-medium text-ink-muted">{label}</span>
      <span className="flex items-stretch overflow-hidden rounded-lg border border-line" style={{ background: '#1d1d1d' }}>
        {prefix && (
          <span className="grid place-items-center border-r border-line px-3 text-sm text-ink-muted">{prefix}</span>
        )}
        <input
          type={isPw ? (show ? 'text' : 'password') : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent px-3.5 py-2.5 text-[14px] text-ink outline-none placeholder:text-ink-faint"
          style={{ fontSize: 16 }}
        />
        {isPw && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="grid place-items-center px-3 text-ink-muted hover:text-ink"
            aria-label="toggle"
          >
            {show ? <EyeOff style={{ width: 17, height: 17 }} /> : <Eye style={{ width: 17, height: 17 }} />}
          </button>
        )}
      </span>
    </label>
  )
}

function ModalShell({ children, wide }) {
  const t = useT()
  const closeAuth = useUI((s) => s.closeAuth)
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && closeAuth()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [closeAuth])

  return (
    <div
      className="fixed inset-0 z-[140] grid place-items-center p-4 animate-fade-in"
      style={{ background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(5px)' }}
      onClick={closeAuth}
    >
      <div
        className="card-glass relative grid w-full overflow-hidden animate-slide-up"
        style={{ maxWidth: wide ? 780 : 460 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeAuth}
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full text-ink-muted hover:text-ink"
          style={{ background: 'rgba(0,0,0,0.35)' }}
          aria-label={t('common.close')}
        >
          <X style={{ width: 17, height: 17 }} />
        </button>
        <div className={cn('grid', wide && 'md:grid-cols-[42%_1fr]')}>
          {/* image / brand panel */}
          <div
            className="relative hidden flex-col justify-between p-7 md:flex"
            style={{ background: 'linear-gradient(160deg,#2a2208,#0b0905)' }}
          >
            <div className="absolute inset-0 bg-radial-gold opacity-70" />
            <Logo className="relative" />
            <div className="relative">
              <Sparkles style={{ width: 30, height: 30, color: 'var(--gold)' }} />
              <div className="mt-3 font-display text-2xl font-semibold leading-tight text-foil">
                {t('hero.title1')} {t('hero.title2')}
              </div>
            </div>
          </div>
          {/* form panel */}
          <div className="p-6 sm:p-7">{children}</div>
        </div>
      </div>
    </div>
  )
}

function LoginForm() {
  const t = useT()
  const login = useUI((s) => s.login)
  const openAuth = useUI((s) => s.openAuth)
  const toast = useUI((s) => s.toast)
  const [u, setU] = useState('')
  const [p, setP] = useState('')

  const submit = (e) => {
    e.preventDefault()
    login()
    toast(`${t('hero.title1')} 🎉`, 'success')
  }

  return (
    <form onSubmit={submit}>
      <h2 className="text-2xl font-semibold text-foil">{t('auth.loginTitle')}</h2>
      <p className="mb-5 mt-1 text-sm text-ink-muted">{t('auth.loginSubtitle')}</p>
      <div className="flex flex-col gap-3.5">
        <Field label={t('auth.username')} value={u} onChange={setU} placeholder="oyuncu@mail.com" />
        <Field label={t('auth.password')} type="password" value={p} onChange={setP} placeholder="••••••••" />
        <div className="flex items-center justify-between text-[12.5px]">
          <label className="flex cursor-pointer items-center gap-2 text-ink-muted">
            <input type="checkbox" style={{ accentColor: 'var(--gold)' }} /> {t('auth.remember')}
          </label>
          <button type="button" onClick={() => openAuth('forgot')} className="text-gold-light hover:text-gold-champagne">
            {t('auth.forgot')}
          </button>
        </div>
        <button type="submit" className="btn-gold mt-1 w-full">
          {t('auth.signIn')} <ArrowRight style={{ width: 16, height: 16 }} />
        </button>
      </div>
      <p className="mt-5 text-center text-sm text-ink-muted">
        {t('auth.noAccount')}{' '}
        <button type="button" onClick={() => openAuth('register')} className="font-semibold text-gold-light hover:text-gold-champagne">
          {t('common.register')}
        </button>
      </p>
    </form>
  )
}

function RegisterWizard() {
  const t = useT()
  const login = useUI((s) => s.login)
  const openAuth = useUI((s) => s.openAuth)
  const toast = useUI((s) => s.toast)
  const [step, setStep] = useState(1)
  const [f, setF] = useState({ first: '', last: '', phone: '', email: '', user: '', pass: '', age: false, terms: false })
  const set = (k) => (v) => setF((s) => ({ ...s, [k]: v }))

  const submit = (e) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
      return
    }
    login()
    toast('🎉', 'success')
  }

  return (
    <form onSubmit={submit}>
      <h2 className="text-2xl font-semibold text-foil">{t('auth.registerTitle')}</h2>
      <p className="mb-4 mt-1 text-sm text-ink-muted">{t('auth.registerSubtitle')}</p>

      {/* step dots */}
      <div className="mb-5 flex gap-1.5">
        {[1, 2].map((n) => (
          <span
            key={n}
            className="h-1 flex-1 rounded-full transition-colors"
            style={{ background: step >= n ? 'linear-gradient(90deg,#b8902f,#f7e7b6)' : 'rgba(255,255,255,0.1)' }}
          />
        ))}
      </div>

      {step === 1 ? (
        <div className="flex flex-col gap-3">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-gold-deep">{t('auth.step1')}</div>
          <div className="grid grid-cols-2 gap-3">
            <Field label={t('auth.firstName')} value={f.first} onChange={set('first')} placeholder="Ad" />
            <Field label={t('auth.lastName')} value={f.last} onChange={set('last')} placeholder="Soyad" />
          </div>
          <Field label={t('auth.phone')} value={f.phone} onChange={set('phone')} prefix="+90" placeholder="5XX XXX XX XX" />
          <Field label={t('auth.email')} type="email" value={f.email} onChange={set('email')} placeholder="ornek@mail.com" />
          <button type="submit" className="btn-gold mt-1 w-full">
            {t('auth.continue')} <ArrowRight style={{ width: 16, height: 16 }} />
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-gold-deep">{t('auth.step2')}</div>
          <Field label={t('auth.chooseUsername')} value={f.user} onChange={set('user')} placeholder="kullaniciadi" />
          <Field label={t('auth.createPassword')} type="password" value={f.pass} onChange={set('pass')} placeholder="••••••••" />
          <label className="flex cursor-pointer items-center gap-2 text-[12.5px] text-ink-muted">
            <input type="checkbox" checked={f.age} onChange={(e) => set('age')(e.target.checked)} style={{ accentColor: 'var(--gold)' }} />
            {t('auth.age')}
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-[12.5px] text-ink-muted">
            <input type="checkbox" checked={f.terms} onChange={(e) => set('terms')(e.target.checked)} style={{ accentColor: 'var(--gold)' }} />
            {t('auth.terms')}
          </label>
          <div className="mt-1 flex gap-2">
            <button type="button" onClick={() => setStep(1)} className="btn-ghost">
              <ArrowLeft style={{ width: 16, height: 16 }} /> {t('auth.back')}
            </button>
            <button type="submit" className="btn-gold flex-1">
              {t('common.register')}
            </button>
          </div>
        </div>
      )}

      <p className="mt-4 text-center text-[11px] text-ink-faint">{t('auth.demoNote')}</p>
      <p className="mt-3 text-center text-sm text-ink-muted">
        {t('auth.hasAccount')}{' '}
        <button type="button" onClick={() => openAuth('login')} className="font-semibold text-gold-light hover:text-gold-champagne">
          {t('auth.signIn')}
        </button>
      </p>
    </form>
  )
}

function ForgotForm() {
  const t = useT()
  const openAuth = useUI((s) => s.openAuth)
  const toast = useUI((s) => s.toast)
  const closeAuth = useUI((s) => s.closeAuth)
  const [email, setEmail] = useState('')

  const submit = (e) => {
    e.preventDefault()
    toast(t('auth.sendLink') + ' ✓', 'success')
    closeAuth()
  }

  return (
    <form onSubmit={submit}>
      <h2 className="text-2xl font-semibold text-foil">{t('auth.forgotTitle')}</h2>
      <p className="mb-5 mt-1 text-sm text-ink-muted">{t('auth.forgotSubtitle')}</p>
      <Field label={t('auth.email')} type="email" value={email} onChange={setEmail} placeholder="ornek@mail.com" />
      <button type="submit" className="btn-gold mt-4 w-full">
        {t('auth.sendLink')}
      </button>
      <p className="mt-5 text-center text-sm text-ink-muted">
        {t('auth.hasAccount')}{' '}
        <button type="button" onClick={() => openAuth('login')} className="font-semibold text-gold-light hover:text-gold-champagne">
          {t('auth.signIn')}
        </button>
      </p>
    </form>
  )
}

export default function AuthModals() {
  const which = useUI((s) => s.authModal)
  if (!which) return null
  if (which === 'login') return <ModalShell wide><LoginForm /></ModalShell>
  if (which === 'register') return <ModalShell wide><RegisterWizard /></ModalShell>
  if (which === 'forgot') return <ModalShell wide><ForgotForm /></ModalShell>
  return null
}
