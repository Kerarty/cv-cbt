import { timeline, type LogEntry } from '../data/timeline'
import './oplog.css'

const TAG_LABEL: Record<LogEntry['tag'], string> = {
  EDU: 'УЧЁБА',
  PROJ: 'СБОРКА',
  SHIP: 'РЕЛИЗ',
  REQ: 'ЗАЯВКА',
}

export default function OpLog() {
  return (
    <ol className="oplog" aria-label="Журнал операций">
      <li className="oplog__row oplog__row--head" aria-hidden="true">
        <span className="oplog__date">Дата</span>
        <span className="oplog__tagcell">Операция</span>
        <span className="oplog__content">Запись</span>
      </li>
      {timeline.map((e, i) => (
        <li key={i} className={`oplog__row oplog__row--${e.tag.toLowerCase()}`}>
          <span className="oplog__date">{e.date}</span>
          <span className="oplog__tagcell">
            <span className="oplog__tag">{TAG_LABEL[e.tag]}</span>
          </span>
          <div className="oplog__content">
            <span className="oplog__op">{e.op}</span>
            <p className="oplog__detail">{e.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
