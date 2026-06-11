import { Bell, Gift, ArrowDownLeft, Info, CheckCheck } from 'lucide-react'
import { useT } from '../../i18n'
import { useUI } from '../../store/ui'

const ICONS = { bonus: Gift, deposit: ArrowDownLeft, info: Info }

export default function Notifications() {
  const t = useT()
  const notifications = useUI((s) => s.notifications)
  const markRead = useUI((s) => s.markNotificationsRead)

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-ink">{t('notif.title')}</h1>
        {notifications.some((n) => n.unread) && (
          <button onClick={markRead} className="inline-flex items-center gap-1.5 text-[13px] text-gold-light hover:text-gold-champagne">
            <CheckCheck style={{ width: 15, height: 15 }} /> {t('notif.markRead')}
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="card-glass grid place-items-center p-12 text-center">
          <Bell style={{ width: 36, height: 36, color: 'var(--text-faint)' }} />
          <div className="mt-3 text-sm text-ink-muted">{t('notif.empty')}</div>
        </div>
      ) : (
        <div className="card-glass overflow-hidden">
          <div className="divide-y divide-[color:var(--border)]">
            {notifications.map((n) => {
              const Icon = ICONS[n.type] || Info
              return (
                <div key={n.id} className="flex items-start gap-3 p-4" style={{ background: n.unread ? 'rgba(212,175,55,0.04)' : 'transparent' }}>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line" style={{ background: 'rgba(0,0,0,0.25)' }}>
                    <Icon style={{ width: 18, height: 18, color: 'var(--gold-light)' }} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-ink">{n.title}</span>
                      {n.unread && <span className="h-2 w-2 rounded-full" style={{ background: 'var(--gold)' }} />}
                    </div>
                    <div className="mt-0.5 text-[13px] text-ink-muted">{n.body}</div>
                    <div className="mt-1 text-[11px] text-ink-faint">{n.date}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
