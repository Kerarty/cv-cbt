import { skills, readiness } from '../data/skills'
import { projectById } from '../data/projects'
import type { SkillId } from '../data/skills'
import './skillMatrix.css'

interface SkillMatrixProps {
  onHoverSkill: (id: SkillId | null) => void
}

export default function SkillMatrix({ onHoverSkill }: SkillMatrixProps) {
  return (
    <div className="smatrix" role="table" aria-label="Ведомость соответствия навыков">
      <div className="smatrix__row smatrix__row--head" role="row">
        <span role="columnheader">№</span>
        <span role="columnheader">Требование вакансии</span>
        <span role="columnheader">Навык</span>
        <span role="columnheader">Доказательство</span>
        <span role="columnheader">Модули</span>
      </div>

      {skills.map((s, i) => (
        <div
          key={s.id}
          className="smatrix__row"
          role="row"
          onMouseEnter={() => onHoverSkill(s.id)}
          onMouseLeave={() => onHoverSkill(null)}
        >
          <span className="smatrix__no" role="cell" aria-label={`Строка ${i + 1}`}>
            {String(i + 1).padStart(2, '0')}
          </span>

          <span className="smatrix__vacancy" role="cell" data-label="Требование">
            {s.vacancy}
          </span>

          <span className="smatrix__skill" role="cell" data-label="Навык">
            <span className="smatrix__name">{s.name}</span>
            <span
              className="smatrix__level"
              title={`${s.level} из 5 — ${readiness(s.level)}`}
              aria-label={`Уровень ${s.level} из 5, ${readiness(s.level)}`}
            >
              {Array.from({ length: 5 }, (_, j) => (
                <span key={j} className={`smatrix__seg${j < s.level ? ' is-on' : ''}`} />
              ))}
            </span>
            <span className="smatrix__readiness">{readiness(s.level)}</span>
          </span>

          <span className="smatrix__evidence" role="cell" data-label="Доказательство">
            {s.evidence}
          </span>

          <span className="smatrix__projects" role="cell" data-label="Модули">
            {s.projects.map((pid) => {
              const p = projectById.get(pid)
              if (!p) return null
              return (
                <span key={pid} className="smatrix__proj" title={p.title}>
                  {p.codename}
                </span>
              )
            })}
          </span>
        </div>
      ))}
    </div>
  )
}
