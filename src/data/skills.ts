/**
 * Матрица навыков: требование вакансии → уровень → доказательства.
 * Уровни честные: 3 = уверенное владение, 4 = производство, 5 = эксперт.
 */

import type { ServiceId } from './services'

export type SkillId =
  | 'csharp'
  | 'java'
  | 'react'
  | 'typescript'
  | 'systems'
  | 'debugging'
  | 'docs'
  | 'sql'
  | 'python'

export interface Skill {
  id: SkillId
  name: string
  /** Требование вакансии, закрываемое навыком */
  vacancy: string
  /** Честный уровень 1–5 */
  level: 1 | 2 | 3 | 4 | 5
  /** Строка-обоснование уровня */
  evidence: string
  /** Кодовые имена проектов (см. projects.ts) */
  projects: string[]
  /** Узлы АБС, где навык применяется */
  services: ServiceId[]
}

export const skills: Skill[] = [
  {
    id: 'csharp',
    name: 'C#',
    vacancy: 'Опыт разработки на C#',
    level: 4,
    evidence:
      'Дипломный проект «Механизм» на Unity 6 + URP: ~2.7 МБ кода, слоистая архитектура (interaction → managers → Data, шина GameEvents), save-миграции, 161 smoke + 76 unit-тестов. Плюс головоломка Echoloop с 26 EditMode-тестами.',
    projects: ['diplom', 'echoloop'],
    services: ['bus', 'monitoring', 'docs'],
  },
  {
    id: 'java',
    name: 'Java',
    vacancy: 'Опыт разработки на Java (Spring)',
    level: 3,
    evidence:
      'Курсовая «SALON»: Java-клиент на JavaFX 23 (~30 контроллеров) + многопоточный сокетный сервер, DAO-интерфейсы с фабрикой, JDBC/MySQL, jBCrypt, Maven на два модуля. Spring в проектах пока не использовался — это честно сказано в резюме.',
    projects: ['salon'],
    services: ['core', 'payments', 'security', 'dwh'],
  },
  {
    id: 'react',
    name: 'React',
    vacancy: 'Опыт разработки на ASP.NET, React, Vue, Angular',
    level: 3,
    evidence:
      'React 19 + TypeScript + Vite + Tailwind: SPA-портфолио с CI-деплоем в GitHub Pages, React Three Fiber для 3D-сцены, HashRouter, поддержка reduced-motion. Это резюме — тоже React.',
    projects: ['aston', 'cbt-cv'],
    services: ['channels'],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    vacancy: 'Опыт разработки на ASP.NET, React, Vue, Angular',
    level: 4,
    evidence:
      'Strict-режим в двух игровых проектах; npm-workspaces monorepo SDK с Vitest (194 теста), CI с typecheck и spec-проверкой сборки.',
    projects: ['sdk', 'prohodnaya', 'aston'],
    services: ['channels', 'gateway'],
  },
  {
    id: 'systems',
    name: 'Системное мышление',
    vacancy: 'Системное мышление',
    level: 4,
    evidence:
      'Движко-независимый SDK: фасад + 11 адаптеров рекламных сетей, изоляция протокола от игры. Слоистая архитектура Diplom. DAO + типизированный протокол в курсовой. Карта АБС на этой странице — сам способ подачи.',
    projects: ['sdk', 'diplom', 'salon'],
    services: ['gateway', 'bus', 'monitoring'],
  },
  {
    id: 'debugging',
    name: 'Отладка и тестирование',
    vacancy: 'Проводить отладку разработанного ПО',
    level: 4,
    evidence:
      '535+ автотестов суммарно: unit, EditMode, smoke-прогоны готовых сборок. Тесты нашли реальные баги: 4 дизайн-бага в Echoloop, 4 логических в SDK. QA для HSM-сервера — задокументированные расхождения API со спецификацией.',
    projects: ['diplom', 'sdk', 'echoloop', 'hsm'],
    services: ['payments', 'monitoring', 'aml'],
  },
  {
    id: 'docs',
    name: 'Документация',
    vacancy: 'Участие в разработке и модернизации проектной эксплуатационной документации',
    level: 4,
    evidence:
      'Diplom: GDD + 5 системных доков (ЧПУ, трамвай, демо-сценарий, арт-направление, адаптация под задание) + плакаты А1. Курсовая: пояснительная записка по ГОСТ вуза. README у каждого репозитория.',
    projects: ['diplom', 'salon'],
    services: ['docs', 'aml'],
  },
  {
    id: 'sql',
    name: 'SQL / MySQL',
    vacancy: 'Системное мышление',
    level: 3,
    evidence:
      'JDBC + MySQL в курсовой: схема на 8 сущностей, транзакционные операции, агрегированные отчёты по заказам и загрузке мастеров.',
    projects: ['salon'],
    services: ['core', 'dwh'],
  },
  {
    id: 'python',
    name: 'Python',
    vacancy: 'Системное мышление',
    level: 2,
    evidence:
      'QA-скрипт для HSM-сервера SoftFx: REST API, работа с TLS/self-signed, batch-запросы; скрипты автотестов Diplom на PowerShell + Python-утилиты.',
    projects: ['hsm', 'diplom'],
    services: ['aml', 'security'],
  },
]

export const skillById = new Map(skills.map((s) => [s.id, s]))

/** Уровень владения в шкале АБС: готовность модуля к работе */
export function readiness(level: number): string {
  if (level >= 4) return 'в эксплуатации'
  if (level === 3) return 'приёмочные испытания'
  return 'пилот'
}
