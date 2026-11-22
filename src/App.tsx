import { useState } from 'react'
import StatusBar from './components/StatusBar'
import Hero from './components/Hero'
import Section from './components/Section'
import SystemMap from './components/SystemMap'
import NodePanel from './components/NodePanel'
import type { ServiceId } from './data/services'
import type { SkillId } from './data/skills'
import { candidate } from './data/candidate'

function App() {
  const [activeNode, setActiveNode] = useState<ServiceId | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<SkillId | null>(null)

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
          <SystemMap activeNode={activeNode} onActivate={setActiveNode} hoveredSkill={hoveredSkill} />
        </Section>

        <Section
          id="skills"
          no="02"
          title="Матрица соответствия"
          hint="Требование вакансии → честный уровень → доказательство. Наведите на навык — узлы карты подсветятся."
        >
          <div className="placeholder">[ ЭТАП 06 ] МАТРИЦА НАВЫКОВ — В РАЗРАБОТКЕ</div>
        </Section>

        <Section
          id="registry"
          no="03"
          title="Реестр модулей"
          hint="Личные проекты как модули системы: стек, архитектурные решения, автотесты. Только публично проверяемое — без приписок."
        >
          <div className="placeholder">[ ЭТАП 06 ] РЕЕСТР ПРОЕКТОВ — В РАЗРАБОТКЕ</div>
        </Section>

        <Section
          id="log"
          no="04"
          title="Журнал операций"
          hint="Хронология в формате op-log: инициализация, сборки, релизы, заявка на подключение."
        >
          <div className="placeholder">[ ЭТАП 07 ] ЖУРНАЛ ОПЕРАЦИЙ — В РАЗРАБОТКЕ</div>
        </Section>

        <Section
          id="connect"
          no="05"
          title="Заявка на подключение"
          hint="Healthcheck рекомендует закрыть незамкнутую зависимость. Контакты модуля — ниже."
        >
          <div className="placeholder">[ ЭТАП 07 ] CTA + КОНТАКТЫ — В РАЗРАБОТКЕ</div>
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
