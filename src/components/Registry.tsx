import { projects, type ProjectId } from '../data/projects'
import './registry.css'

interface RegistryProps {
  onHoverProject: (id: ProjectId | null) => void
}

const STATUS_CLASS: Record<(typeof projects)[number]['status'], string> = {
  'в эксплуатации': 'reg__status--prod',
  релиз: 'reg__status--prod',
  прототип: 'reg__status--proto',
  'в разработке': 'reg__status--dev',
}

export default function Registry({ onHoverProject }: RegistryProps) {
  return (
    <div className="reg">
      {projects.map((p) => (
        <article
          key={p.id}
          className="reg__card card"
          onMouseEnter={() => onHoverProject(p.id)}
          onMouseLeave={() => onHoverProject(null)}
        >
          <header className="reg__head">
            <span className="reg__codename">{p.codename}</span>
            <span className={`reg__status ${STATUS_CLASS[p.status]}`}>{p.status.toUpperCase()}</span>
          </header>

          <h3 className="reg__title">{p.title}</h3>
          <p className="reg__class">{p.moduleClass}</p>
          <p className="reg__desc">{p.description}</p>

          <ul className="reg__highlights">
            {p.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>

          {p.tests && <p className="reg__tests">✓ {p.tests}</p>}

          <div className="reg__stack">
            {p.stack.map((t) => (
              <span key={t} className="reg__tech">
                {t}
              </span>
            ))}
          </div>

          <footer className="reg__foot">
            {p.link ? (
              <a className="reg__link" href={p.link} target="_blank" rel="noreferrer">
                {p.linkLabel ?? 'открыть'} ↗
              </a>
            ) : (
              <span className="reg__restricted">🔒 {p.restricted}</span>
            )}
          </footer>
        </article>
      ))}
    </div>
  )
}
