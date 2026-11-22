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
          title="Матрица соответствия"
          hint="Требование вакансии → честный уровень → доказательство. Наведите на строку — узлы карты подсветятся."
        >
          <SkillMatrix onHoverSkill={setHoveredSkill} />
        </Section>

        <Section
          id="registry"
          no="03"
          title="Реестр модулей"
          hint="Личные проекты как модули системы: стек, архитектурные решения, автотесты. Только публично проверяемое — без приписок. Наведите на карточку — увидите её место на карте."
        >
          <Registry onHoverProject={setHoveredProject} />
        </Section>

        <Section
          id="log"
          no="04"
          title="Журнал операций"
          hint="Хронология в формате op-log: инициализация, сборки, релизы, заявка на подключение."
        >
          <OpLog />
        </Section>

        <Section
          id="connect"
          no="05"
          title="Заявка на подключение"
          hint="Healthcheck рекомендует закрыть незамкнутую зависимость: модуль подключается одним собеседованием."
        >
          <Cta />
        </Section>

        <footer className="footer">
          <span>
            Данные резюме — только проверяемый опыт · Дипломный проект описан без ссылки
            (репозиторий приватный)
          </span>
          <span>
            {candidate.lastName} {candidate.firstName} · 2026 · React + TypeScript + Vite
          </span>
        </footer>
      </main>
    </>
  )
}

export default App
