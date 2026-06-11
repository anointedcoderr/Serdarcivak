import { useEffect } from 'react'
import { CheckCircle2, XCircle, Info, X } from 'lucide-react'
import { useUI } from '../../store/ui'

const STYLE = {
  success: { Icon: CheckCircle2, color: 'var(--emerald)' },
  error: { Icon: XCircle, color: 'var(--ruby)' },
  info: { Icon: Info, color: 'var(--gold-light)' },
}

function Toast({ toast }) {
  const dismiss = useUI((s) => s.dismissToast)
  const { Icon, color } = STYLE[toast.type] || STYLE.info
  useEffect(() => {
    const id = setTimeout(() => dismiss(toast.id), 3500)
    return () => clearTimeout(id)
  }, [toast.id, dismiss])

  return (
    <div
      role="status"
      className="card-glass flex items-center gap-3 px-4 py-3 animate-slide-up"
      style={{ minWidth: 260 }}
    >
      <Icon style={{ width: 18, height: 18, color }} />
      <span className="text-sm text-ink">{toast.message}</span>
      <button onClick={() => dismiss(toast.id)} className="ml-auto text-ink-faint hover:text-ink" aria-label="Close">
        <X style={{ width: 16, height: 16 }} />
      </button>
    </div>
  )
}

export default function Toasts() {
  const toasts = useUI((s) => s.toasts)
  return (
    <div className="fixed right-4 top-[calc(var(--nav-h)+var(--ticker-h)+12px)] z-[120] flex flex-col gap-2">
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} />
      ))}
    </div>
  )
}
