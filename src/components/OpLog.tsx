import { timeline, type LogEntry } from '../data/timeline'
import './oplog.css'

const TAG_LABEL: Record<LogEntry['tag'], string> = {
  EDU: 'EDU',
  PROJ: 'СБОРКА',
  SHIP: 'РЕЛИЗ',
  REQ: 'ЗАЯВКА',
}

const TAG_CLASS: Record<LogEntry['tag'], string> = {
  EDU: 'oplog__tag--edu',
  PROJ: 'oplog__tag--proj',
  SHIP: 'oplog__tag--ship',
  REQ: 'oplog__tag--req',
}

export default function OpLog() {
  return (
    <ol className="oplog" aria-label="Журнал операций">
      {timeline.map((e, i) => (
        <li key={i} className={`oplog__entry ${TAG_CLASS[e.tag]}`}>
          <span className="oplog__rail" aria-hidden="true">
            <span className="oplog__dot" />
          </span>
          <div className="oplog__content">
            <div className="oplog__meta">
              <span className="oplog__date">{e.date}</span>
              <span className={`oplog__tag ${TAG_CLASS[e.tag]}`}>{TAG_LABEL[e.tag]}</span>
              <span className="oplog__op">{e.op}</span>
            </div>
            <p className="oplog__detail">{e.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
