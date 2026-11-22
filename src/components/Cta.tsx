import { useState } from 'react'
import { candidate } from '../data/candidate'
import { skills } from '../data/skills'
import './cta.css'

const SUBJECT = encodeURIComponent('Отклик: инженер-программист — модуль «инженер-программист» подключён')
const HR_MAIL = 'HR@cbt.by'

function ContactButton({
  label,
  value,
  href,
  onCopy,
}: {
  label: string
  value: string
  href: string
  onCopy: (text: string) => void
}) {
  return (
    <div className="cta__contact">
      <div className="cta__contact-info">
        <span className="cta__contact-label">{label}</span>
        <span className="cta__contact-value">{value}</span>
      </div>
      <div className="cta__contact-actions">
        <a className="btn" href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer">
          открыть ↗
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
          href={`mailto:${HR_MAIL}?subject=${SUBJECT}&body=${encodeURIComponent(
            `Здравствуйте!\n\nПишу по вакансии «Инженер-программист» (cbt.by/career).\nИнтерактивное резюме: https://kerarty.github.io/cv-cbt/\nGitHub: ${candidate.contacts.github}\n\nС уважением,\n${candidate.lastName} ${candidate.firstName}`,
          )}`}
        >
          Откликнуться в HR ({HR_MAIL.toLowerCase()})
        </a>
        <p className="cta__note">
          Вакансия «Инженер-программист» ·{' '}
          <a href="https://www.cbt.by/career/" target="_blank" rel="noreferrer">
            cbt.by/career
          </a>{' '}
          · отклик продублирует письмо HR со ссылкой на живое резюме
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
