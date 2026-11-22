import { useState } from 'react'
import { candidate } from '../data/candidate'
import { skills } from '../data/skills'
import './cta.css'

const SUBJECT = encodeURIComponent('Заявка REQ-2026-0001 — вакансия «Инженер-программист» (cbt.by)')
const CANDIDATE_MAIL = candidate.contacts.email

function ContactButton({
  label,
  value,
  href,
  openLabel = 'открыть ↗',
  onCopy,
}: {
  label: string
  value: string
  href: string
  openLabel?: string
  onCopy: (text: string) => void
}) {
  return (
    <div className="cta__contact">
      <div className="cta__contact-info">
        <span className="cta__contact-label">{label}</span>
        <span className="cta__contact-value">{value}</span>
      </div>
      <div className="cta__contact-actions">
        <a
          className="btn"
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel="noreferrer"
        >
          {openLabel}
        </a>
        <button className="btn" onClick={() => onCopy(value)}>
          копировать
        </button>
      </div>
    </div>
  )
}

export default function Cta() {
  const [copied, setCopied] = useState<string | null>(null)

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // Fallback для не-secure контекстов
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(text)
    window.setTimeout(() => setCopied(null), 1600)
  }

  return (
    <div className="cta">
      <div className="cta__panel card">
        <p className="cta__crumb">ФОРМА ЗАЯВКИ · REQ-2026-0001</p>
        <p className="cta__headline">
          Контур замыкается <span className="cta__mark">одним собеседованием</span>
        </p>
        <p className="cta__text">
          Все требования вакансии закрыты доказуемо: в реестре — 8 модулей с исходниками и
          тестами, в ведомости — честные уровни. Модуль готов к подключению.
        </p>

        <p className="cta__act">Акт соответствия требованиям вакансии</p>
        <div className="cta__checklist">
          {skills
            .filter((s) => s.vacancy.startsWith('Опыт') || ['systems', 'debugging', 'docs'].includes(s.id))
            .map((s) => (
              <span key={s.id} className="cta__check">
                ✓ {s.name}
              </span>
            ))}
        </div>

        <a
          className="btn btn--primary cta__apply"
          href={`mailto:${CANDIDATE_MAIL}?subject=${SUBJECT}`}
        >
          Написать кандидату ({CANDIDATE_MAIL})
        </a>
        <p className="cta__note">
          Вакансия «Инженер-программист» ·{' '}
          <a href="https://www.cbt.by/career/" target="_blank" rel="noreferrer">
            cbt.by/career
          </a>{' '}
          · письмо откроется с готовой темой — останется дописать пару строк
        </p>
      </div>

      <div className="cta__contacts">
        <ContactButton
          label="EMAIL"
          value={candidate.contacts.email}
          href={`mailto:${candidate.contacts.email}`}
          onCopy={copy}
        />
        <ContactButton
          label="ТЕЛЕФОН"
          value={candidate.contacts.phone}
          href={`tel:${candidate.contacts.phoneRaw}`}
          openLabel="набрать ↗"
          onCopy={copy}
        />
        <ContactButton
          label="TELEGRAM"
          value={`@Kerarty · ${candidate.contacts.telegram}`}
          href={candidate.contacts.telegram}
          onCopy={copy}
        />
        <ContactButton
          label="GITHUB"
          value="github.com/Kerarty"
          href={candidate.contacts.github}
          onCopy={copy}
        />
        {copied && <p className="cta__copied">скопировано: {copied}</p>}
      </div>
    </div>
  )
}
