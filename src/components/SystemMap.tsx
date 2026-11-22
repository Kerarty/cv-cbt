import { services, candidateNode, type ServiceId, type ServiceLayer } from '../data/services'
import { skillById, type SkillId } from '../data/skills'
import type { ProjectId } from '../data/projects'
import './map.css'

/** Цвета слоёв конфигурации. */
export const LAYER_COLORS: Record<ServiceLayer, string> = {
  front: '#38bdf8',
  bus: '#3d7fff',
  core: '#34d399',
  data: '#a78bfa',
  ops: '#f0b429',
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

const nodeById = new Map(nodes.map((n) => [n.id, n]))

/** Связи конфигурации. Связь с модулем-кандидатом — пунктир: физически ещё не замкнута. */
const EDGES: Array<{ from: ServiceId; to: ServiceId; dashed?: boolean }> = [
  { from: 'channels', to: 'gateway' },
  { from: 'gateway', to: 'bus' },
  { from: 'bus', to: 'core' },
  { from: 'bus', to: 'payments' },
  { from: 'core', to: 'payments' },
  { from: 'core', to: 'dwh' },
  { from: 'payments', to: 'dwh' },
  { from: 'core', to: 'aml' },
  { from: 'bus', to: 'security' },
  { from: 'bus', to: 'monitoring' },
  { from: 'core', to: 'monitoring' },
  { from: 'core', to: 'docs' },
  { from: 'bus', to: 'candidate', dashed: true },
]

function center(n: MapNode) {
  return { x: n.x + n.w / 2, y: n.y + n.h / 2 }
}

interface SystemMapProps {
  activeNode: ServiceId | null
  onActivate: (id: ServiceId) => void
  hoveredSkill: SkillId | null
  hoveredProject: ProjectId | null
}

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
      <svg
        className="map-svg"
        viewBox="0 0 1000 700"
        role="img"
        aria-label="Карта автоматизированной банковской системы"
      >
        {/* Связи — под узлами */}
        <g className="map-edges">
          {EDGES.map((e, i) => {
            const a = center(nodeById.get(e.from)!)
            const b = center(nodeById.get(e.to)!)
            const cls = [
              'map-edge',
              e.dashed ? 'map-edge--dashed' : '',
              edgeHighlighted(e) ? 'is-hot' : '',
              hotServices != null && !edgeHighlighted(e) ? 'is-dim' : '',
            ]
              .filter(Boolean)
              .join(' ')
            return (
              <line
                key={i}
                className={cls}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                strokeDasharray={e.dashed ? '6 5' : undefined}
              />
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
          const color = LAYER_COLORS[n.layer]
          return (
            <g
              key={n.id}
              className={cls}
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
              <rect className="map-node__body" x={n.x} y={n.y} width={n.w} height={n.h} rx={10} />
              <rect className="map-node__stripe" x={n.x} y={n.y} width={4} height={n.h} rx={2} fill={color} />
              <circle className="map-node__dot" cx={n.x + 16} cy={n.y + 20} r={4} />
              <text className="map-node__name" x={n.x + 28} y={n.y + 24}>
                {n.short}
              </text>
              <text className="map-node__layer" x={n.x + 16} y={n.y + n.h - 14}>
                {n.dashed ? 'МОДУЛЬ: НЕ ПОДКЛЮЧЁН' : n.layer.toUpperCase()}
              </text>
            </g>
          )
        })}
      </svg>

      <div className="map-legend">
        {Object.entries(LAYER_COLORS).map(([layer, color]) => (
          <span key={layer} className="map-legend__item">
            <span className="map-legend__swatch" style={{ background: color }} />
            {
              {
                front: 'каналы',
                bus: 'интеграция',
                core: 'ядро',
                data: 'данные',
                ops: 'эксплуатация',
              }[layer as ServiceLayer]
            }
          </span>
        ))}
        <span className="map-legend__item map-legend__note">
          пунктир — связь с модулем-кандидатом не замкнута
        </span>
      </div>
    </div>
  )
}
