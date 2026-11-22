import { useState } from 'react'
import StatusBar from './components/StatusBar'
import Hero from './components/Hero'
import Section from './components/Section'
import SystemMap from './components/SystemMap'
import NodePanel from './components/NodePanel'
import SkillMatrix from './components/SkillMatrix'
import Registry from './components/Registry'
import OpLog from './components/OpLog'
import Healthcheck from './components/Healthcheck'
import Cta from './components/Cta'
import type { ServiceId } from './data/services'
import type { SkillId } from './data/skills'
import type { ProjectId } from './data/projects'
import { candidate } from './data/candidate'

function App() {
  const [activeNode, setActiveNode] = useState<ServiceId | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<SkillId | null>(null)
  const [hoveredProject, setHoveredProject] = useState<ProjectId | null>(null)

  return (
    <>
      <StatusBar />
      <NodePanel nodeId={activeNode} onClose={() => setActiveNode(null)} onHoverSkill={setHoveredSkill} />

      <main className="wrap">
        <Hero />

        <Section
          id="map"
          no="01"
          sheet="2 / 6"
          title="Конфигурация системы"
          hint="Клик по узлу — зона ответственности и чем её закрывает кандидат. Пунктирный узел внизу — незадействованный модуль."
        >
          <SystemMap
            activeNode={activeNode}
            onActivate={setActiveNode}
            hoveredSkill={hoveredSkill}
            hoveredProject={hoveredProject}
          />
          <Healthcheck />
        </Section>

        <Section
          id="skills"
          no="02"
          sheet="3 / 6"
          title="Ведомость соответствия"
          hint="Требование вакансии → честный уровень → доказательство. Наведите на строку — узлы карты подсветятся."
        >
          <SkillMatrix onHoverSkill={setHoveredSkill} />
        </Section>

        <Section
          id="registry"
          no="03"
          sheet="4 / 6"
          title="Реестр модулей"
          hint="Личные проекты как модули системы: стек, архитектурные решения, автотесты. Только публично проверяемое — без приписок. Наведите на карточку — увидите её место на карте."
        >
          <Registry onHoverProject={setHoveredProject} />
        </Section>

        <Section
          id="log"
          no="04"
          sheet="5 / 6"
          title="Журнал операций"
          hint="Хронология в формате op-log: инициализация, сборки, релизы, заявка на подключение."
        >
          <OpLog />
        </Section>

        <Section
          id="connect"
          no="05"
          sheet="6 / 6"
          title="Заявка на подключение"
          hint="Healthcheck рекомендует закрыть незамкнутую зависимость: модуль подключается одним собеседованием."
        >
          <Cta />
        </Section>

        <footer className="titleblock" aria-label="Основная надпись документа">
          <div className="titleblock__row titleblock__row--roles">
            <span className="tb-cell tb-cell--label">Разраб.</span>
            <span className="tb-cell">
              <strong>
                {candidate.lastName} {candidate.firstName}
              </strong>{' '}
              · БГУИР, 4 курс
            </span>
            <span className="tb-cell tb-cell--label">Пров.</span>
            <span className="tb-cell">HR ЦБТ</span>
            <span className="tb-cell tb-cell--label">Утв.</span>
            <span className="tb-cell">собеседованием</span>
          </div>
          <div className="titleblock__row titleblock__row--doc">
            <span className="tb-cell tb-cell--grow">
              АБС. Интерактивное резюме модуля <strong>{candidate.moduleCode}</strong> · React +
              TypeScript + Vite
            </span>
            <span className="tb-cell">Лист 1 · Листов 6</span>
          </div>
        </footer>
        <p className="footer-note">
          Данные резюме — только проверяемый опыт · Дипломный проект описан без ссылки (репозиторий
          приватный) · Шрифты ParaType, собраны локально
        </p>
      </main>
    </>
  )
}

export default App
