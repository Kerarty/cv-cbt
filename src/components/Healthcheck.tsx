import { useEffect, useRef, useState } from 'react'
import { services } from '../data/services'
import { candidate } from '../data/candidate'
import './healthcheck.css'

interface CheckLine {
  status: 'ok' | 'fail' | 'info'
  text: string
}

function buildLines(): CheckLine[] {
  const checks: CheckLine[] = services.map((s, i) => ({
    status: 'ok',
    text: `${s.name} · отвечает · ${4 + ((i * 7) % 21)} ms`,
  }))
  checks.push({
    status: 'fail',
    text: `${candidate.moduleName} · ${candidate.moduleCode} — НЕ ПОДКЛЮЧЁН: незамкнутая зависимость контура`,
  })
  checks.push({
    status: 'info',
    text: 'Итог: конфигурация incomplete — для замыкания контура требуется собеседование',
  })
  return checks
}

export default function Healthcheck() {
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)
  const [lines, setLines] = useState<CheckLine[]>([])
  const timersRef = useRef<number[]>([])

  useEffect(() => () => timersRef.current.forEach(clearTimeout), [])

  const run = () => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    setLines([])
    setDone(false)
    setRunning(true)

    const all = buildLines()
    all.forEach((line, i) => {
      const t = window.setTimeout(() => {
        setLines((prev) => [...prev, line])
        if (i === all.length - 1) {
          setRunning(false)
          setDone(true)
        }
      }, 280 * (i + 1))
      timersRef.current.push(t)
    })
  }

  return (
    <div className="hcheck">
      <div className="hcheck__head">
        <button className="btn" onClick={run} disabled={running}>
          {running ? 'Проверка выполняется…' : 'Проверить конфигурацию'}
        </button>
        {done && <span className="hcheck__verdict">конфигурация incomplete · 10/11 узлов</span>}
      </div>

      {lines.length > 0 && (
        <div className="hcheck__output" role="log" aria-live="polite">
          {lines.map((l, i) => (
            <p key={i} className={`hcheck__line hcheck__line--${l.status}`}>
              <span className="hcheck__mark">
                {l.status === 'ok' ? '[ OK ]' : l.status === 'fail' ? '[FAIL]' : '[INFO]'}
              </span>
              {l.text}
            </p>
          ))}
          {done && (
            <a className="btn btn--primary hcheck__cta" href="#connect">
              Подключить модуль →
            </a>
          )}
        </div>
      )}
    </div>
  )
}
