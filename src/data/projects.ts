/**
 * Реестр модулей — проекты кандидата. Политика честности:
 * только публично проверяемое; Diplom и SALON без ссылок — это указано.
 */

export type ProjectId = 'diplom' | 'salon' | 'sdk' | 'prohodnaya' | 'echoloop' | 'hsm' | 'aston' | 'cbt-cv'

export interface Project {
  id: ProjectId
  codename: string
  title: string
  /** Роль в метафоре АБС */
  moduleClass: string
  status: 'в эксплуатации' | 'релиз' | 'прототип' | 'в разработке'
  description: string
  stack: string[]
  highlights: string[]
  link: string | null
  linkLabel?: string
  tests?: string
  /** Проект из закрытого/локального репозитория */
  restricted?: string
}

export const projects: Project[] = [
  {
    id: 'diplom',
    codename: 'DIPL-001',
    title: '«Механизм» — дипломный проект',
    moduleClass: 'модуль ядра, C#',
    status: 'в разработке',
    description:
      'Производственная симуляция электротехнического завода (Unity 6 + URP): полный цикл заказа — от звонка заказчика до акта сдачи-приёмки. Документо-ориентированный интерфейс: ЕСКД-бланки, ведомости, паспорта изделий, контроль ОТК.',
    stack: ['C#', 'Unity 6', 'URP 17', 'HLSL', 'PowerShell'],
    highlights: [
      '~2.7 МБ исходного C#, 6 сцен, полный игровой цикл',
      'Слоистая архитектура: interaction → managers → Data, шина GameEvents, GameBootstrap в любой сцене',
      'Формулы баланса вынесены из логики: одна функция даёт цифру UI и цифру сейва',
      'Сохранение с версионированием миграцией, JsonUtility',
      'UI строится из кода — ни одного префаба интерфейса',
    ],
    link: null,
    tests: '161 smoke-проверка + 76 unit-тестов формул',
    restricted: 'Репозиторий приватный — покажу на собеседовании или по запросу',
  },
  {
    id: 'salon',
    codename: 'KP-SALON',
    title: '«SALON» — курсовой проект',
    moduleClass: 'клиент-серверный модуль, Java',
    status: 'прототип',
    description:
      'Автоматизированная система учёта деятельности парикмахерской: JavaFX-клиент с тремя ролями (админ / сотрудник / клиент) и многопоточный сокетный сервер с DAO-слоем над MySQL.',
    stack: ['Java', 'JavaFX 23', 'Socket API', 'JDBC', 'MySQL', 'jBCrypt', 'Maven'],
    highlights: [
      '~30 контроллеров клиента, 3 ролевых сценария работы',
      'Сервер: ClientHandler на соединение, DAO-интерфейсы + фабрика, 11 POJO-классов протокола',
      'Хеширование паролей jBCrypt, разграничение доступа по ролям',
      'Пояснительная записка по стандарту БГУИР, защита — 2025',
    ],
    link: null,
    restricted: 'Исходники локальные — продемонстрирую на собеседовании',
  },
  {
    id: 'sdk',
    codename: 'SDK-PA',
    title: 'playble-ads — SDK playable-рекламы',
    moduleClass: 'интеграционный модуль, TypeScript',
    status: 'в эксплуатации',
    description:
      'Движко-независимый SDK для HTML5 playable-рекламы: фасад install() выбирает адаптер под рекламную сеть, игра никогда не знает, куда именно уходит CTA.',
    stack: ['TypeScript', 'npm workspaces', 'Vitest', 'GitHub Actions', 'MRAID'],
    highlights: [
      'Монорепо: core без зависимостей, 11 адаптеров сетей, движок PixiJS, симулятор, spec-check',
      'Фасад поверх mraid.open / FbPlayableAd / ExitApi / window.install — с фоллбеком',
      'Spec-check проверяет собранный файл по требованиям каждой сети: размер, внешние запросы, обязательный вызов выхода',
      'Честные ограничения в README: что проверяется, а что нет',
    ],
    link: 'https://github.com/Kerarty/playble-ads',
    linkLabel: 'github.com/Kerarty/playble-ads',
    tests: '194 unit-теста + npm run smoke в Chrome',
  },
  {
    id: 'prohodnaya',
    codename: 'GAME-PRH',
    title: '«Проходная» — браузерная игра',
    moduleClass: 'канальный модуль, TypeScript',
    status: 'релиз',
    description:
      'Казуальный «инспектор-сим»: пропускной пункт, проверка документов по правилам смены. TypeScript strict + Phaser 3, P2P-дуэли поверх WebRTC, сервер-лидерборд на ws.',
    stack: ['TypeScript', 'Phaser 3', 'PeerJS/WebRTC', 'Vite', 'ws'],
    highlights: [
      'Платформенная абстракция PlatformAPI: одна сборка логики, три цели — Yandex Games, CrazyGames, itch.io',
      '78 Vitest-тестов чистой игровой логики без Phaser',
      '7 языков интерфейса, responsive-вёрстка, сидированная генерация смен',
      'Весь арт в коде (Phaser Graphics), платформенный zip ~440 КБ',
    ],
    link: 'https://kerarty.github.io/prohodnaya/',
    linkLabel: 'kerarty.github.io/prohodnaya',
    tests: '78 unit-тестов',
  },
  {
    id: 'echoloop',
    codename: 'UE-LOOP',
    title: 'Echoloop — головоломка о времени',
    moduleClass: 'модуль логики, C#',
    status: 'прототип',
    description:
      'Time-loop паззл на Unity 6 + URP: эхо прошлых проходов как твёрдые тела — они нажимают плиты и открывают ворота. 8 уровней.',
    stack: ['C#', 'Unity 6', 'URP', 'new Input System'],
    highlights: [
      'LoopClock: фиксированный тик 60 Гц вместо кадров, LoopTape без аллокаций',
      'Уровни — данные, не сцены: LevelDefinition строит геометрию в рантайме',
      'Автотесты уровней: достижимость эха, непроходимость без него',
    ],
    link: 'https://github.com/Kerarty/echoloop-playble',
    linkLabel: 'github.com/Kerarty/echoloop-playble',
    tests: '26 EditMode-тестов',
  },
  {
    id: 'hsm',
    codename: 'QA-HSM',
    title: 'HSM QA-скрипт (SoftFx)',
    moduleClass: 'диагностический модуль, Python',
    status: 'релиз',
    description:
      'Тестовое задание QA: скрипт отправки показаний датчиков в HSM-сервер через REST API. Побочный результат — задокументированные расхождения API со спецификацией.',
    stack: ['Python', 'REST', 'TLS', 'Docker'],
    highlights: [
      'Отправка по каждому типу датчиков + batch-запрос, CLI с параметрами',
      'Задокументированы реальные баги API: обязательные поля «опциональных», числовые коды типов, формат byte-array',
      'Тестовый стенд — HSM Server в Docker локально',
    ],
    link: 'https://github.com/Kerarty/hsm-qa-scripts',
    linkLabel: 'github.com/Kerarty/hsm-qa-scripts',
  },
  {
    id: 'aston',
    codename: 'WEB-AST',
    title: 'CV_Aston — React-портфолио',
    moduleClass: 'канальный модуль, React',
    status: 'в эксплуатации',
    description:
      'SPA-портфолио на React 19 + TypeScript + Vite: системная карта, досье проектов, 3D-сцена на React Three Fiber с WebGL-фоллбеком.',
    stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind 4', 'R3F'],
    highlights: ['CI: typecheck + ESLint + build → GitHub Pages', 'Паттерн data/ — проверяемый контент отдельным слоем', 'Поддержка reduced-motion и клавиатурной навигации'],
    link: 'https://kerarty.github.io/CV_Aston/',
    linkLabel: 'kerarty.github.io/CV_Aston',
  },
  {
    id: 'cbt-cv',
    codename: 'WEB-CBT',
    title: 'Это резюме — cv-cbt',
    moduleClass: 'канальный модуль, React',
    status: 'в разработке',
    description:
      'Интерактивная карта АБС: SVG-диаграмма без библиотек, панели узлов, healthcheck, print/PDF-фоллбек. Собрано как доказательство заявленного фронтенд-стека.',
    stack: ['React 19', 'TypeScript', 'Vite'],
    highlights: ['Нулевые runtime-зависимости диаграммы', 'Контент одним слоем src/data/', 'Коммит и push на каждом этапе — как и требует вакансия'],
    link: 'https://github.com/Kerarty/cv-cbt',
    linkLabel: 'github.com/Kerarty/cv-cbt',
  },
]

export const projectById = new Map(projects.map((p) => [p.id, p]))
