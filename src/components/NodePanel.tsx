import { useEffect } from 'react'
import { serviceById, type ServiceId, type ServiceLayer } from '../data/services'
import { skillById, skills, type SkillId } from '../data/skills'
import { projectById, projects } from '../data/projects'
import { candidate } from '../data/candidate'
import './nodePanel.css'

const LAYER_TITLES: Record<ServiceLayer, string> = {
  front: 'канальный слой',
  bus: 'интеграционный слой',
  core: 'ядро системы',
  data: 'слой данных',
  ops: 'эксплуатация',
}

interface NodePanelProps {
  nodeId: ServiceId | null
  onClose: () => void
  onHoverSkill: (id: SkillId | null) => void
}

export default function NodePanel({ nodeId, onClose, onHoverSkill }: NodePanelProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (nodeId == null) return null

  const isCandidate = nodeId === 'candidate'
  const service = serviceById.get(nodeId)
  if (!isCandidate && !service) return null

  const layer = isCandidate ? 'candidate' : service!.layer

  const projectCards = (isCandidate ? [] : service!.projects)
    .map((p) => projectById.get(p as (typeof projects)[number]['id']))
    .filter(Boolean)

  const skillChips = isCandidate
    ? skills.filter((s) => s.vacancy.startsWith('Опыт') || ['systems', 'docs'].includes(s.id))
    : service!.skills.map((id) => skillById.get(id as SkillId)!).filter(Boolean)

  return (
    <aside
      className={`npanel npanel--${layer}`}
      role="dialog"
      aria-label={isCandidate ? 'Модуль кандидата' : `Узел: ${service!.name}`}
    >
      <div className="npanel__head">
        <div>
          <p className="npanel__crumb">
            {isCandidate
              ? `ЗАЯВКА REQ-2026-0001`
              : `УЗЕЛ КОНФИГУРАЦИИ · ${LAYER_TITLES[service!.layer].toUpperCase()}`}
          </p>
          <p className="npanel__title">{isCandidate ? candidate.moduleName : service!.name}</p>
        </div>
        <button className="npanel__close" onClick={onClose} aria-label="Закрыть панель">
          ×
        </button>
      </div>

      {isCandidate ? (
        <div className="npanel__body">
          <p className="npanel__status npanel__status--warn">
            <span className="chip__dot" /> СТАТУС: НЕ ПОДКЛЮЧЁН
          </p>
          <p className="npanel__text">
            Healthcheck конфигурации находит незамкнутую зависимость: в контуре АБС нет модуля
            «инженер-программист». Совместимость проверена по всем требованиям вакансии —
            смотрите ведомость соответствия и реестр модулей.
          </p>
          <p className="npanel__label">Кандидат модуля</p>
          <p className="npanel__text npanel__text--strong">
            {candidate.lastName} {candidate.firstName} · {candidate.education.institution},{' '}
            {candidate.education.level}
          </p>
          <a className="btn btn--primary npanel__cta" href="#connect">
            Подключить модуль (собеседование)
          </a>
        </div>
      ) : (
        <div className="npanel__body">
          <p className="npanel__status">
            <span className="chip__dot" /> СТАТУС: В РАБОТЕ
          </p>

          <p className="npanel__label">Зона ответственности</p>
          <p className="npanel__text">{service!.problem}</p>

          <p className="npanel__label npanel__label--mark">Чем закрывает модуль ЯК</p>
          <p className="npanel__text npanel__text--mark">{service!.proof}</p>

          {projectCards.length > 0 && (
            <>
              <p className="npanel__label">Доказательства</p>
              <ul className="npanel__projects">
                {projectCards.map((p) => (
                  <li key={p!.id}>
                    {p!.link ? (
                      <a href={p!.link} target="_blank" rel="noreferrer">
                        <span className="npanel__codename">{p!.codename}</span> {p!.title} ↗
                      </a>
                    ) : (
                      <span title={p!.restricted}>
                        <span className="npanel__codename">{p!.codename}</span> {p!.title}
                        <span className="npanel__lock" aria-hidden="true">
                          {' '}
                          🔒
                        </span>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}

          <p className="npanel__label">Навыки узла</p>
          <div className="npanel__skills">
            {skillChips.map((s) => (
              <span
                key={s.id}
                className="npanel__skill"
                onMouseEnter={() => onHoverSkill(s.id)}
                onMouseLeave={() => onHoverSkill(null)}
              >
                {s.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}
