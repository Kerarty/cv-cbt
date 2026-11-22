import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  no: string
  title: string
  hint?: string
  children: ReactNode
}

/** Секция-«форма»: сквозная нумерация в духе проектной документации. */
export default function Section({ id, no, title, hint, children }: SectionProps) {
  return (
    <section className="section" id={id}>
      <div className="form-header">
        <span className="form-header__no">ФОРМА {no}</span>
        <span>{title.toUpperCase()}</span>
      </div>
      <h2>{title}</h2>
      {hint && <p className="section__hint">{hint}</p>}
      {children}
    </section>
  )
}
