import { candidate } from '../data/candidate'
import './hero.css'

export default function Hero() {
  return (
    <section className="hero" aria-label="Паспорт модуля-кандидата">
      <div className="hero__text">
        <p className="hero__eyebrow">
          Резюме-модуль {candidate.moduleCode} · вакансия «Инженер-программист» · cbt.by
        </p>
        <h1>
          Архитектура АБС.
          <span className="hero__open">Контур открыт.</span>
        </h1>
        <p className="hero__lead">
          Карта автоматизированной банковской системы открыта. Все подсистемы работают,
          но проверка конфигурации находит незамкнутую зависимость: в контуре нет
          модуля <strong>«инженер-программист»</strong>. Клики по узлам карты показывают,
          что именно этот модуль закрывает.
        </p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#map">
            Открыть контур
          </a>
          <a className="btn" href="#connect">
            Подключить модуль →
          </a>
          <a
            className="btn"
            href={`${import.meta.env.BASE_URL}cv/Yaroslav-Kukar-CBT.pdf`}
            target="_blank"
            rel="noreferrer"
          >
            PDF
          </a>
        </div>
      </div>

      <aside className="hero__card" aria-label="Паспорт модуля-кандидата">
        <p className="stamp" aria-hidden="true">
          <span>Не подключён</span>
          <small>замкнуть: собеседование</small>
        </p>
        <header className="hero__card-head">
          <span className="hero__card-label">Паспорт модуля</span>
          <span className="hero__card-code">{candidate.moduleCode}</span>
        </header>

        <dl className="hero__fields">
          <div className="hero__field">
            <dt>Модуль</dt>
            <dd>{candidate.moduleName}</dd>
          </div>
          <div className="hero__field">
            <dt>Кандидат</dt>
            <dd>
              {candidate.lastName} {candidate.firstName}
            </dd>
          </div>
          <div className="hero__field">
            <dt>База</dt>
            <dd>
              {candidate.education.institution} · {candidate.education.level} (
              {candidate.education.years})
            </dd>
          </div>
          <div className="hero__field">
            <dt>Статус</dt>
            <dd className="hero__status">не подключён · незамкнутая зависимость контура</dd>
          </div>
        </dl>

        <ul className="hero__stats" aria-label="Показатели модуля">
          {candidate.stats.map((s) => (
            <li key={s.label} className="hero__stat">
              <span className="stat__value">{s.value}</span>
              <span className="stat__label">{s.label}</span>
            </li>
          ))}
        </ul>
      </aside>
    </section>
  )
}
