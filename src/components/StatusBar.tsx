import { useEffect, useState } from 'react'
import { candidate } from '../data/candidate'

const SYSTEM_CHIPS = [
  { label: 'ЯДРО', ok: true },
  { label: 'ШИНА', ok: true },
  { label: 'ПЛАТЕЖИ', ok: true },
  { label: 'DWH', ok: true },
  { label: 'АФЛ', ok: true },
  { label: 'ИБ', ok: true },
  { label: 'МОДУЛЬ ENG', ok: false },
]

const clockFmt = new Intl.DateTimeFormat('ru-RU', {
  timeZone: 'Europe/Minsk',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
})

export default function StatusBar() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <header className="statusbar" role="banner">
      <span className="statusbar__brand">
        <span className="statusbar__mark" aria-hidden="true">
          {candidate.initials}
        </span>
        АБС · ЦБТ
      </span>

      <nav className="statusbar__chips" aria-label="Состояние подсистем">
        {SYSTEM_CHIPS.map((c) => (
          <span key={c.label} className={`chip${c.ok ? '' : ' chip--warn'}`}>
            <span className="chip__dot" aria-hidden="true" />
            {c.ok ? c.label : `${c.label}: НЕ ПОДКЛЮЧЁН`}
          </span>
        ))}
      </nav>

      <span className="statusbar__sub">UPTIME 99.98% · В РАБОТЕ С 1997</span>
      <span className="statusbar__clock">{clockFmt.format(now)}</span>
    </header>
  )
}
