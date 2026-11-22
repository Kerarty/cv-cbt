import { candidate } from '../data/candidate'
import './hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__text">
        <p className="hero__eyebrow">
          Интерактивное резюме · вакансия «Инженер-программист» · cbt.by
        </p>
        <h1>
          АБС: <span className="hero__accent">подключите модуль</span>
        </h1>
        <p className="hero__lead">
          Карта автоматизированной банковской системы открыта. Все подсистемы работают,
          но проверка конфигурации находит незамкнутую зависимость: в контуре нет
          модуля <strong>«инженер-программист»</strong>. Клики по узлам карты показывают,
          что именно этот модуль закрывает.
        </p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#map">
            Открыть карту АБС
          </a>
          <a className="btn" href="#connect">
            Подключить модуль →
          </a>
        </div>
      </div>

      <aside className="hero__card card" aria-label="Карточка кандидата">
        <div className="hero__id">
          <span className="hero__avatar" aria-hidden="true">
            {candidate.initials}
          </span>
          <div>
            <p className="hero__name">
              {candidate.lastName} {candidate.firstName}
            </p>
            <p className="hero__role">
              Модуль «{candidate.moduleName}» · {candidate.moduleCode}
            </p>
          </div>
        </div>
        <p className="hero__edu">
          {candidate.education.institution} · {candidate.education.programme} ·{' '}
          {candidate.education.level} ({candidate.education.years})
        </p>
        <div className="hero__stats">
          {candidate.stats.map((s) => (
            <div key={s.label} className="stat">
              <span className="stat__value">{s.value}</span>
              <span className="stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </aside>
    </section>
  )
}
