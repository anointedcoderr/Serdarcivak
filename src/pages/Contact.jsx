import { useState } from 'react'
import { Send, Headset, Mail, MessageSquare } from 'lucide-react'
import { useT } from '../i18n'
import { useUI } from '../store/ui'
import { SITE } from '../config/site'

export default function Contact() {
  const t = useT()
  const toast = useUI((s) => s.toast)
  const [form, setForm] = useState({ name: '', email: '', msg: '' })
  const set = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }))

  const cards = [
    { Icon: Send, title: t('contact.telegram'), desc: t('contact.telegramDesc'), action: t('contact.write'), href: SITE.social.telegram, grad: ['#0a3a52', '#06121c'], accent: '#36c8ff' },
    { Icon: Headset, title: t('contact.live'), desc: t('contact.liveDesc'), action: t('contact.start'), onClick: () => toast(t('contact.live'), 'info'), grad: ['#1d2a52', '#0a0f1e'], accent: '#63b3ff' },
    { Icon: Mail, title: t('contact.email'), desc: t('contact.emailDesc'), action: t('contact.send'), href: `mailto:${SITE.email}`, grad: ['#3a2208', '#100b05'], accent: '#e9c96a' },
  ]

  const submit = (e) => {
    e.preventDefault()
    toast(t('contact.sent'), 'success')
    setForm({ name: '', email: '', msg: '' })
  }

  return (
    <main className="container-page py-10">
      <div className="mb-6 text-center">
        <h1 className="font-display text-3xl font-semibold text-foil sm:text-4xl">{t('contact.title')}</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">{t('contact.subtitle')}</p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {cards.map((c) => (
          <div key={c.title} className="card-glass overflow-hidden p-5" style={{ background: `linear-gradient(155deg, ${c.grad[0]}, ${c.grad[1]})` }}>
            <span className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: 'rgba(0,0,0,0.3)', border: `1px solid ${c.accent}40` }}>
              <c.Icon style={{ width: 20, height: 20, color: c.accent }} />
            </span>
            <div className="mt-3 font-display text-lg font-semibold text-ink">{c.title}</div>
            <div className="mt-0.5 text-[13px] text-ink-muted">{c.desc}</div>
            {c.href ? (
              <a href={c.href} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-4 w-full" style={{ color: c.accent, borderColor: `${c.accent}55` }}>{c.action}</a>
            ) : (
              <button onClick={c.onClick} className="btn-ghost mt-4 w-full" style={{ color: c.accent, borderColor: `${c.accent}55` }}>{c.action}</button>
            )}
          </div>
        ))}
      </div>

      {/* form */}
      <form onSubmit={submit} className="card-glass mx-auto mt-6 max-w-xl p-6">
        <div className="mb-4 flex items-center gap-2">
          <MessageSquare style={{ width: 18, height: 18, color: 'var(--gold)' }} />
          <h2 className="font-display text-lg font-semibold text-ink">{t('contact.formTitle')}</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <input value={form.name} onChange={set('name')} placeholder={t('contact.formName')} className="rounded-lg border border-line bg-[#1d1d1d] px-3.5 py-2.5 text-ink outline-none placeholder:text-ink-faint focus:border-gold/50" style={{ fontSize: 16 }} required />
          <input value={form.email} onChange={set('email')} type="email" placeholder={t('contact.formEmail')} className="rounded-lg border border-line bg-[#1d1d1d] px-3.5 py-2.5 text-ink outline-none placeholder:text-ink-faint focus:border-gold/50" style={{ fontSize: 16 }} required />
        </div>
        <textarea value={form.msg} onChange={set('msg')} placeholder={t('contact.formMsg')} rows={4} className="mt-3 w-full rounded-lg border border-line bg-[#1d1d1d] px-3.5 py-2.5 text-ink outline-none placeholder:text-ink-faint focus:border-gold/50" style={{ fontSize: 16 }} required />
        <button type="submit" className="btn-gold mt-4 w-full sm:w-auto sm:px-8">{t('contact.formSend')}</button>
      </form>
    </main>
  )
}
