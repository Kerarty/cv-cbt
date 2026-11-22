import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  no: string
  /** Номер листа документа, например «2 / 6» */
  sheet: string
  title: string
  hint?: string
  children: ReactNode
}

/** Секция-«раздел документа»: рубрика с номером раздела и листа. */
export default function Section({ id, no, sheet, title, hint, children }: SectionProps) {
  return (
    <section className="section" id={id}>
      <header className="section__head">
        <span className="section__no">Раздел {no}</span>
        <span className="section__sheet">Лист {sheet}</span>
      </header>
      <h2>{title}</h2>
      {hint && <p className="section__hint">{hint}</p>}
      {children}
    </section>
  )
}
