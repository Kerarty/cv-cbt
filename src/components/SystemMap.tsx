import { services, candidateNode, type ServiceId, type ServiceLayer } from '../data/services'
import { skillById, type SkillId } from '../data/skills'
import type { ProjectId } from '../data/projects'
import './map.css'

/** Метки слоёв для легенды. */
const LEGEND_LABELS: Record<ServiceLayer, string> = {
  front: 'каналы',
  bus: 'интеграция',
  core: 'ядро',
  data: 'данные',
  ops: 'эксплуатация',
}

interface MapNode {
  id: ServiceId
  short: string
  layer: ServiceLayer
  x: number
  y: number
  w: number
  h: number
  dashed?: boolean
}

const nodes: MapNode[] = [
  ...services.map((s) => ({ id: s.id, short: s.short, layer: s.layer, x: s.x, y: s.y, w: s.w, h: s.h })),
  {
    id: 'candidate',
    short: candidateNode.short,
    layer: 'bus',
    x: candidateNode.x,
    y: candidateNode.y,
    w: candidateNode.w,
    h: candidateNode.h,
    dashed: true,
  },
]


/**
 * Связи конфигурации. Ортогональная трассировка, как на монтажной схеме:
 * A — дуга-«перемычка» там, где трасса перешагивает чужую линию.
 * Связь с модулем-кандидатом — пунктир: физически ещё не замкнута.
 */
const EDGES: Array<{ from: ServiceId; to: ServiceId; d: string; a: [number, number]; b: [number, number]; dashed?: boolean }> = [
  { from: 'channels', to: 'gateway', d: 'M 260 115 H 314 A 6 6 0 0 1 326 115 H 340', a: [260, 115], b: [340, 115] },
  { from: 'gateway', to: 'bus', d: 'M 510 115 H 590', a: [510, 115], b: [590, 115] },
  { from: 'bus', to: 'core', d: 'M 620 60 V 35 H 320 V 235 H 425 V 250', a: [620, 60], b: [425, 250] },
  { from: 'bus', to: 'payments', d: 'M 740 170 V 250', a: [740, 170], b: [740, 250] },
  { from: 'core', to: 'payments', d: 'M 510 305 H 554 A 6 6 0 0 1 566 305 H 590', a: [510, 305], b: [590, 305] },
  { from: 'core', to: 'dwh', d: 'M 470 360 V 415 H 554 A 6 6 0 0 1 566 415 H 900 V 360', a: [470, 360], b: [900, 360] },
  { from: 'payments', to: 'dwh', d: 'M 760 305 H 840', a: [760, 305], b: [840, 305] },
  { from: 'core', to: 'aml', d: 'M 340 305 H 300 V 495 H 260', a: [340, 305], b: [260, 495] },
  { from: 'bus', to: 'security', d: 'M 590 115 H 560 V 495 H 510', a: [590, 115], b: [510, 495] },
  { from: 'bus', to: 'monitoring', d: 'M 760 95 H 965 V 425 H 675 V 440', a: [760, 95], b: [675, 440] },
  { from: 'core', to: 'monitoring', d: 'M 510 340 H 530 V 430 H 554 A 6 6 0 0 1 566 430 H 640 V 440', a: [510, 340], b: [640, 440] },
  { from: 'bus', to: 'candidate', d: 'M 760 140 H 975 V 640 H 760', a: [760, 140], b: [760, 640], dashed: true },
]

interface SystemMapProps {
  activeNode: ServiceId | null
  onActivate: (id: ServiceId) => void
  hoveredSkill: SkillId | null
  hoveredProject: ProjectId | null
}

const HATCHED_LAYERS: ServiceLayer[] = ['front', 'bus', 'core', 'data', 'ops']

export default function SystemMap({
  activeNode,
  onActivate,
  hoveredSkill,
  hoveredProject,
}: SystemMapProps) {
  const skillServices =
    hoveredSkill != null ? (skillById.get(hoveredSkill)?.services ?? []) : null
  const projectServices =
    hoveredProject != null
      ? services.filter((s) => s.projects.includes(hoveredProject)).map((s) => s.id)
      : null
  const hotServices = skillServices ?? projectServices

  const isDim = (id: ServiceId) => hotServices != null && !hotServices.includes(id)
  const isActive = (id: ServiceId) => activeNode === id

  const edgeHighlighted = (e: { from: ServiceId; to: ServiceId }) => {
    if (hotServices == null) return false
    return hotServices.includes(e.from) && hotServices.includes(e.to)
  }

  return (
    <div className="map-wrap">
      <div className="map-chrome">
        <span>КОНТУР АБС · СХЕМА ПОДКЛЮЧЕНИЙ</span>
        <span className="map-chrome__mode">
          <i className="map-chrome__led" aria-hidden="true" />
          режим: реальное время
        </span>
      </div>

      <svg
        className="map-svg"
        viewBox="0 0 1000 700"
        role="img"
        aria-label="Карта автоматизированной банковской системы"
      >
        <defs>
          {/* Штриховка слоёв — как на чертеже: у каждого слоя свой тип заполнения */}
          <pattern id="hatch-front" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" className="hatch hatch--front" />
          </pattern>
          <pattern id="hatch-bus" width="6" height="6" patternUnits="userSpaceOnUse">
            <line x1="0" y1="3" x2="6" y2="3" className="hatch hatch--bus" />
          </pattern>
          <pattern id="hatch-core" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" className="hatch hatch--core" />
            <line x1="0" y1="3" x2="6" y2="3" className="hatch hatch--core" />
          </pattern>
          <pattern id="hatch-data" width="6" height="6" patternUnits="userSpaceOnUse">
            <line x1="3" y1="0" x2="3" y2="6" className="hatch hatch--data" />
          </pattern>
          <pattern id="hatch-ops" width="7" height="7" patternUnits="userSpaceOnUse">
            <circle cx="3.5" cy="3.5" r="1.1" className="hatch hatch--ops" fill="none" />
          </pattern>
          <pattern id="hatch-candidate" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="1.3" className="hatch hatch--candidate" fill="none" />
          </pattern>
        </defs>

        {/* Связи — под узлами */}
        <g className="map-edges">
          {EDGES.map((e, i) => {
            const cls = [
              'map-edge',
              e.dashed ? 'map-edge--dashed' : '',
              edgeHighlighted(e) ? 'is-hot' : '',
              hotServices != null && !edgeHighlighted(e) ? 'is-dim' : '',
            ]
              .filter(Boolean)
              .join(' ')
            return (
              <g key={i} className={cls}>
                <path className="map-edge__line" d={e.d} fill="none" strokeDasharray={e.dashed ? '7 5' : undefined} />
                {/* пины подключения */}
                <rect className="map-edge__pin" x={e.a[0] - 3} y={e.a[1] - 3} width={6} height={6} />
                <rect className="map-edge__pin" x={e.b[0] - 3} y={e.b[1] - 3} width={6} height={6} />
              </g>
            )
          })}
        </g>

        {/* Узлы */}
        {nodes.map((n) => {
          const cls = [
            'map-node',
            n.dashed ? 'map-node--candidate' : '',
            isActive(n.id) ? 'is-active' : '',
            isDim(n.id) ? 'is-dim' : '',
          ]
            .filter(Boolean)
            .join(' ')
          return (
            <g
              key={n.id}
              className={cls}
              data-layer={n.layer}
              onClick={() => onActivate(n.id)}
              onKeyDown={(ev) => {
                if (ev.key === 'Enter' || ev.key === ' ') {
                  ev.preventDefault()
                  onActivate(n.id)
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`${n.short}: открыть карточку узла`}
            >
              <rect className="map-node__body" x={n.x} y={n.y} width={n.w} height={n.h} />
              <rect className="map-node__stripe" x={n.x} y={n.y} width={4} height={n.h} />
              <rect className="map-node__dot" x={n.x + 14} y={n.y + 16} width={6} height={6} />
              <text className="map-node__name" x={n.x + 28} y={n.y + 24}>
                {n.short}
              </text>
              <text className="map-node__layer" x={n.x + 14} y={n.y + n.h - 12}>
                {n.dashed ? 'МОДУЛЬ: НЕ ПОДКЛЮЧЁН' : n.layer.toUpperCase()}
              </text>
            </g>
          )
        })}
      </svg>

      <div className="map-legend">
        {HATCHED_LAYERS.map((layer) => (
          <span key={layer} className="map-legend__item">
            <span className={`map-legend__swatch map-legend__swatch--${layer}`} aria-hidden="true" />
            {LEGEND_LABELS[layer]}
          </span>
        ))}
        <span className="map-legend__item map-legend__note">
          пунктир — связь с модулем-кандидатом не замкнута
        </span>
      </div>
    </div>
  )
}
