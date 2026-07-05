const CYRILLIC_PATTERN = /[А-Яа-яЁё]/;
const EMAIL_DOMAINS = ["gmail.com", "mail.ru", "yandex.ru", "outlook.com", "icloud.com", "yahoo.com", "proton.me", "rambler.ru"];

function validateAuthPassword(password) {
  if (password.length < 6) return "authPasswordTooShort";
  if (CYRILLIC_PATTERN.test(password)) return "authPasswordCyrillic";
  return "";
}

function validateAuthEmail(email) {
  if (email.length < 6) return "authEmailTooShort";
  const atIndex = email.indexOf("@");
  if (atIndex <= 0) return "authEmailAtMissing";
  const domain = email.slice(atIndex + 1);
  const dotIndex = domain.lastIndexOf(".");
  if (dotIndex <= 0 || domain.length - dotIndex - 1 < 2) return "authEmailDomainInvalid";
  return "";
}

function emailSuggestions(email) {
  const [local, typedDomain = ""] = email.split("@");
  if (!local) return [];
  if (!email.includes("@")) {
    const domainHint = EMAIL_DOMAINS.find((domain) => local.toLowerCase().includes(domain.split(".")[0]));
    if (!domainHint) return [];
    const name = local.slice(0, local.toLowerCase().indexOf(domainHint.split(".")[0]));
    if (!name) return [];
    return emailSuggestions(`${name}@${local.slice(name.length)}`);
  }
  const domainPart = typedDomain.toLowerCase();
  if (EMAIL_DOMAINS.includes(domainPart)) return [];
  return EMAIL_DOMAINS.filter((domain) => domain.startsWith(domainPart) || domain.includes(domainPart)).map((domain) => `${local}@${domain}`);
}

function emailGhostSuggestion(email) {
  const [suggestion = ""] = emailSuggestions(email);
  return suggestion && suggestion !== email ? suggestion : "";
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { validateAuthPassword, validateAuthEmail, emailSuggestions, emailGhostSuggestion };
}

if (typeof window !== "undefined") {
const translations = {
  ru: {
    brandTagline: "центр IT-событий",
    eyebrow: "Менеджер событий по программированию",
    heroTitle: "Найди IT-событие, которое двигает тебя дальше.",
    heroSubtitle:
      "Смотри IT-события по категориям, открывай подробности, регистрируйся в один клик и держи выбранные события на виду.",
    registeredLabel: "зарегистрировано",
    visibleLabel: "событий видно",
    seasonLabel: "сезон",
    calendarLabel: "Календарь",
    upcomingLabel: "Ближайшие",
    featuredTitle: "Подборка событий",
    newsLabel: "IT-дайджест",
    newsTitle: "Актуальные новости",
    newsUpdated: "Обновлено сегодня",
    newsAutoLabel: "Автообновлено",
    newsFallbackLabel: "Локальная подборка",
    myEvents: "Мои события",
    openEvent: "Открыть событие",
    register: "Зарегистрироваться",
    unregister: "Отменить регистрацию",
    registered: "Вы участвуете",
    empty: "Нет событий для выбранных фильтров.",
    all: "Все",
    registeredOnly: "Показаны только мои события",
    authOpen: "Войти",
    signOut: "Выйти",
    signIn: "Войти",
    signUp: "Зарегистрироваться",
    createAccount: "Зарегестрироваться",
    haveAccount: "У меня уже есть аккаунт",
    authEyebrowSignIn: "Аккаунт",
    authEyebrowSignUp: "Новый аккаунт",
    authSignInTitle: "Вход",
    authSignUpTitle: "Регистрация",
    authName: "Имя",
    authPassword: "Пароль",
    authPasswordTooShort: "Пароль должен быть не короче 6 символов",
    authPasswordCyrillic: "Пароль не должен содержать русские буквы",
    authEmailTooShort: "Email должен быть не короче 6 символов",
    authEmailAtMissing: "Email должен содержать @",
    authEmailDomainInvalid: "После @ должен быть домен с точкой",
    authNameRequired: "Введите имя",
    authSupabaseMissing: "Добавьте Supabase URL и anon key в app.js",
    authCheckEmail: "Проверьте почту для подтверждения аккаунта",
    authWelcome: "Вы вошли",
    authSignedOut: "Вы вышли из аккаунта",
    authGreeting: "Привет, {name}",
    authError: "Не удалось выполнить действие. Проверьте данные и попробуйте ещё раз.",
    subjects: {
      it: "IT",
      physics: "Физика",
      math: "Математика"
    },
    subjectContent: {
      it: {
        brandTagline: "центр IT-событий",
        eyebrow: "Менеджер событий по программированию",
        heroTitle: "Найди IT-событие, которое двигает тебя дальше.",
        heroSubtitle:
          "Смотри IT-события по категориям, открывай подробности, регистрируйся в один клик и держи выбранные события на виду.",
        newsLabel: "IT-дайджест",
        newsTitle: "Актуальные новости"
      },
      physics: {
        brandTagline: "центр научных событий",
        eyebrow: "Календарь физики",
        heroTitle: "Следи за физикой: от олимпиад до больших коллайдеров.",
        heroSubtitle:
          "Собирай конференции, школы, лекции и соревнования по физике в одном календаре: частицы, космос, квантовые технологии и материалы.",
        newsLabel: "Физический дайджест",
        newsTitle: "Новости физики"
      },
      math: {
        brandTagline: "центр математических событий",
        eyebrow: "Календарь математики",
        heroTitle: "Держи рядом математику: олимпиады, конгрессы и школы.",
        heroSubtitle:
          "Отбирай математические события по формату и теме, открывай детали и сохраняй важные даты: от IMO до исследовательских конференций.",
        newsLabel: "Математический дайджест",
        newsTitle: "Новости математики"
      }
    },
    details: {
      format: "Формат",
      level: "Уровень",
      location: "Локация",
      deadline: "Дедлайн"
    },
    weekdays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    categories: {
      hackathon: "Хакатоны",
      olympiad: "Олимпиады",
      ai: "AI",
      conference: "Конференции",
      workshop: "Воркшопы",
      meetup: "Митапы",
      school: "Школы",
      lecture: "Лекции",
      research: "Исследования",
      congress: "Конгрессы",
      seminar: "Семинары",
      contest: "Соревнования"
    },
    news: {
      "godot-ai-policy": {
        title: "Godot ограничивает AI-сгенерированные вклады в код",
        summary:
          "Команда движка меняет правила контрибьюта: существенный код должен быть написан человеком, а автономные AI-агенты не допускаются к pull request.",
        tag: "Open source",
        source: "Godot Engine"
      },
      "claude-science-bionemo": {
        title: "Claude Science интегрируется с NVIDIA BioNeMo",
        summary:
          "Anthropic и NVIDIA продвигают AI-агентов глубже в научные workflow: ставка сделана на воспроизводимость, аудит и инструменты для life sciences.",
        tag: "AI",
        source: "AI News"
      },
      "ai-cyber-insurance": {
        title: "Киберстрахование перестраивается под скорость AI-атак",
        summary:
          "Страховщики всё чаще оценивают не только защиту, но и способность компаний быстро обнаруживать, изолировать и закрывать уязвимости.",
        tag: "Security",
        source: "WSJ Pro"
      },
      "ai-chip-supply": {
        title: "Спрос на AI-инфраструктуру усиливает давление на рынок чипов",
        summary:
          "Аналитики предупреждают о возможных узких местах в поставках компонентов для дата-центров, памяти и продвинутой упаковки чипов.",
        tag: "Hardware",
        source: "MarketWatch"
      },
      "shadow-ai-security": {
        title: "Shadow AI становится одной из главных слепых зон ИБ-команд",
        summary:
          "Новый обзор по кибербезопасности показывает, что почти половина компаний видит лишь часть AI-инструментов, которые сотрудники используют в работе.",
        tag: "Security",
        source: "The Hacker News"
      },
      "oracle-ebs-flaw": {
        title: "Критическую уязвимость Oracle E-Business Suite уже эксплуатируют",
        summary:
          "Баг в Oracle Payments получил оценку 9.8 CVSS и может привести к захвату уязвимых инсталляций, поэтому обновления лучше не откладывать.",
        tag: "Vulnerability",
        source: "The Hacker News"
      },
      "techcrunch-disrupt-builders": {
        title: "TechCrunch раскрыл программу Builders Stage на Disrupt 2026",
        summary:
          "На октябрьской конференции в Сан-Франциско основатели и операторы разберут масштабирование продуктов, рост команд и практические стратегии для стартапов.",
        tag: "Startups",
        source: "TechCrunch"
      },
      "neo-ai-office": {
        title: "Основатель Neo инвестирует $30 млн в AI-альтернативу офисным пакетам",
        summary:
          "Новый продукт строится вокруг идеи, что рабочее ПО эпохи AI нужно проектировать заново, а не просто добавлять чат-бота в старые интерфейсы.",
        tag: "Enterprise AI",
        source: "TechCrunch"
      },
      "lhc-long-shutdown": {
        title: "CERN переводит LHC в долгую модернизацию",
        summary:
          "Большой адронный коллайдер уходит в Long Shutdown 3: установка High-Luminosity LHC должна резко увеличить объём столкновений после перезапуска.",
        tag: "Particle physics",
        source: "CERN"
      },
      "xi-cc-plus": {
        title: "LHCb сообщил о новом тяжёлом барионе",
        summary:
          "Наблюдение частицы Ξcc+ помогает точнее проверять, как сильное взаимодействие работает внутри систем с двумя тяжёлыми кварками.",
        tag: "CERN",
        source: "ScienceDaily"
      },
      "nasa-spherex-first-light": {
        title: "SPHEREx начинает инфракрасную карту неба",
        summary:
          "Космическая обсерватория NASA готовит спектральный обзор всего неба, который поможет изучать происхождение галактик, льда и органики.",
        tag: "Space",
        source: "NASA"
      },
      "quantum-materials-2026": {
        title: "Квантовые материалы остаются одной из главных тем летних школ",
        summary:
          "Конференции и школы 2026 года заметно смещаются к сверхпроводимости, фотонике и материалам для квантовых вычислений.",
        tag: "Quantum",
        source: "Institute of Physics"
      },
      "arxiv-spinout": {
        title: "arXiv становится независимой некоммерческой организацией",
        summary:
          "Платформа препринтов выходит из структуры Cornell University, сохраняя научную миссию и получая поддержку Simons Foundation и Schmidt Sciences.",
        tag: "Research",
        source: "arXiv"
      },
      "ai-erdos-unit-distance": {
        title: "AI помог продвинуть задачу Эрдёша о единичных расстояниях",
        summary:
          "Новая конструкция изменила ожидания вокруг классической геометрической проблемы и снова подняла вопрос о роли AI в математических открытиях.",
        tag: "AI + math",
        source: "The Guardian"
      },
      "imo-record-2026": {
        title: "IMO 2026 ждёт рекордное число участников",
        summary:
          "Организаторы сообщили о 119 странах и 685 участниках на Международной математической олимпиаде в Шанхае.",
        tag: "Olympiad",
        source: "IMO"
      },
      "icm-2026-philadelphia": {
        title: "ICM 2026 возвращает главный математический конгресс в США",
        summary:
          "Международный конгресс математиков пройдёт в Филадельфии и станет центральной точкой года для исследовательского сообщества.",
        tag: "Congress",
        source: "AMS"
      }
    },
    events: {
      "quantum-hack": {
        title: "Quantum Code Sprint",
        description:
          "48-часовой онлайн-хакатон для команд, которые хотят собрать прототип на стыке квантовых алгоритмов, симуляций и облачных вычислений.",
        format: "Онлайн",
        level: "Middle+",
        location: "Global",
        deadline: "8 июля"
      },
      "icpc-camp": {
        title: "ICPC Summer Selection",
        description:
          "Серия олимпиадных раундов с разбором задач, рейтингом команд и подготовкой к международным соревнованиям по алгоритмам.",
        format: "Гибрид",
        level: "Advanced",
        location: "Москва / онлайн",
        deadline: "11 июля"
      },
      "frontend-nation": {
        title: "Frontend Nation Summit",
        description:
          "Международная конференция про дизайн-системы, производительность, accessibility и современные подходы к веб-приложениям.",
        format: "Онлайн",
        level: "All levels",
        location: "Global",
        deadline: "15 июля"
      },
      "ai-builders": {
        title: "AI Builders Lab",
        description:
          "Практический воркшоп по созданию AI-продуктов: от прототипирования и RAG до оценки качества и запуска в продакшен.",
        format: "Офлайн",
        level: "Junior+",
        location: "Санкт-Петербург",
        deadline: "18 июля"
      },
      "oss-meetup": {
        title: "Open Source Maintainers Night",
        description:
          "Вечер коротких докладов и нетворкинга для разработчиков, которые ведут open source проекты или хотят начать контрибьютить.",
        format: "Офлайн",
        level: "All levels",
        location: "Берлин",
        deadline: "22 июля"
      },
      "security-cup": {
        title: "Cyber Defense Cup",
        description:
          "CTF-соревнование по web security, reverse engineering и incident response с отдельным треком для начинающих команд.",
        format: "Онлайн",
        level: "Intermediate",
        location: "Global",
        deadline: "25 июля"
      },
      "data-conf": {
        title: "Data Systems World",
        description:
          "Конференция про распределенные базы данных, стриминг, lakehouse-архитектуру и надежность больших дата-платформ.",
        format: "Офлайн",
        level: "Senior",
        location: "Amsterdam",
        deadline: "2 августа"
      },
      "mobile-hack": {
        title: "Mobile UX Hack",
        description:
          "Командный хакатон для iOS, Android и Flutter-разработчиков: нужно собрать полезный мобильный сервис за один уикенд.",
        format: "Гибрид",
        level: "Junior+",
        location: "Казань / онлайн",
        deadline: "6 августа"
      },
      "season-code-kazan": {
        title: "Сезон кода: Казань 2026",
        description:
          "Российское мероприятие для разработчиков, продуктовых команд и студентов: практика, доклады и знакомство с IT-сообществом региона.",
        format: "Офлайн",
        level: "All levels",
        location: "Казань",
        deadline: "4 июля"
      },
      "ai-weekends-moscow": {
        title: "AI Weekends",
        description:
          "Московская встреча про нейросети и практическое применение AI в продуктах, разработке и аналитике.",
        format: "Офлайн",
        level: "Junior+",
        location: "Москва",
        deadline: "4 июля"
      },
      "ii-confa-2026": {
        title: "ИИ КОНФА 2026",
        description:
          "Практическая конференция по применению искусственного интеллекта и нейросетей в бизнесе: кейсы, промптинг, AI-агенты и автоматизация.",
        format: "Офлайн",
        level: "All levels",
        location: "Москва",
        deadline: "1 июля"
      },
      "moscowqa-ozon-ai": {
        title: "MoscowQA x Ozon Tech: AI in Testing",
        description:
          "Встреча QA-сообщества про тестирование AI API, надежность нейросетевых функций и практики контроля качества в продуктах с ML.",
        format: "Трансляция",
        level: "Junior+",
        location: "Москва / онлайн",
        deadline: "3 июля"
      },
      "turbo-ml-conf": {
        title: "Turbo ML Conf",
        description:
          "Бесплатная встреча про ML, GenAI, NLP и рекомендательные системы от практиков, которые строят AI-сервисы в production.",
        format: "Офлайн",
        level: "Middle+",
        location: "Москва",
        deadline: "18 июля"
      },
      "devrel-ai-analytics": {
        title: "Аналитика и презентации для DevRel с помощью ИИ",
        description:
          "Онлайн-сессия о том, как использовать AI для анализа данных сообщества, подготовки презентаций и ускорения DevRel-процессов.",
        format: "Онлайн",
        level: "All levels",
        location: "Онлайн",
        deadline: "22 июля"
      },
      "ulcamp-2026": {
        title: "ULCAMP 2026",
        description:
          "IT-фестиваль и конференция в Ульяновске с треками по frontend, backend, mobile, QA, DevOps, GameDev, AI и продуктовой разработке.",
        format: "Офлайн",
        level: "All levels",
        location: "Ульяновск",
        deadline: "17 июля"
      },
      "pycon-russia-2026": {
        title: "PyCon Russia 2026",
        description:
          "Российская конференция Python-сообщества для backend-разработчиков, ML-инженеров, архитекторов и техлидов.",
        format: "Офлайн",
        level: "Middle+",
        location: "Москва",
        deadline: "24 июля"
      },
      "kuber-community-day": {
        title: "Kuber Community Day",
        description:
          "День Kubernetes-сообщества в Москве: инфраструктура, платформенная инженерия, DevOps-практики и опыт production-команд.",
        format: "Офлайн",
        level: "Middle+",
        location: "Москва",
        deadline: "30 июля"
      },
      "digital-breakthrough-spb": {
        title: "Цифровой прорыв: AI, СЗФО",
        description:
          "Всероссийский AI-хакатон в Санкт-Петербурге: команды решают социальные и бизнес-задачи с применением искусственного интеллекта.",
        format: "Офлайн",
        level: "Junior+",
        location: "Санкт-Петербург",
        deadline: "25 августа"
      },
      "ai-summit-2026": {
        title: "AI Summit",
        description:
          "Профессиональная бизнес-конференция об искусственном интеллекте, информационной безопасности, правовом регулировании нейросетей и AI-кейсах.",
        format: "Офлайн",
        level: "Middle+",
        location: "Россия",
        deadline: "7 октября"
      },
      "lct-moscow-2026": {
        title: "Лидеры цифровой трансформации",
        description:
          "Московский хакатон для IT-специалистов: регистрация команд, разработка решений и защита проектов для городских и бизнес-задач.",
        format: "Гибрид",
        level: "Middle+",
        location: "Москва",
        deadline: "15 сентября"
      },
      "gorod-it-2026": {
        title: "Город IT 2026",
        description:
          "Ежегодная томская IT-конференция для специалистов, предпринимателей и студентов: разработка, управление, продукты и технологии.",
        format: "Офлайн",
        level: "All levels",
        location: "Томск",
        deadline: "12 сентября"
      },
      "nto-2026": {
        title: "Национальная технологическая олимпиада",
        description:
          "Всероссийские инженерные соревнования для школьников: дистанционные этапы, командная работа и финалы с практическими задачами.",
        format: "Онлайн + финал",
        level: "8-11 классы",
        location: "Россия",
        deadline: "31 августа"
      },
      "belchonok-info-2026": {
        title: "«Бельчонок» по информатике",
        description:
          "Университетская олимпиада школьников по информатике для 2-11 классов; следующий сезон ожидается осенью 2026 года.",
        format: "Онлайн + очно",
        level: "2-11 классы",
        location: "Россия",
        deadline: "1 октября"
      },
      "mos-inf-2026": {
        title: "Московская олимпиада школьников по информатике",
        description:
          "Олимпиада по информатике с отборочным и заключительным турами для двух возрастных категорий школьников.",
        format: "Заочно + очно",
        level: "6-11 классы",
        location: "Москва",
        deadline: "5 октября"
      },
      "spbu-engineering-2026": {
        title: "СПбГУ «Инженерные системы»",
        description:
          "Олимпиада для будущих инженеров по математике, физике, химии и информатике с отборочным и заключительным этапами.",
        format: "Онлайн + очно",
        level: "5-11 классы",
        location: "Санкт-Петербург / Россия",
        deadline: "25 октября"
      },
      "open-programming-2026": {
        title: "Открытая олимпиада по программированию",
        description:
          "Олимпиада для школьников, увлекающихся программированием; по уровню задач близка к сильным этапам Всероссийской олимпиады.",
        format: "Отбор + финал",
        level: "7-11 классы",
        location: "Россия",
        deadline: "19 ноября"
      },
      "innopolis-open-info-2026": {
        title: "Innopolis Open по информатике",
        description:
          "Олимпиада Университета Иннополис для школьников 7-11 классов: два независимых дистанционных отбора и очный финал.",
        format: "Онлайн + очно",
        level: "7-11 классы",
        location: "Иннополис / онлайн",
        deadline: "1 ноября"
      },
      "team-programming-2026": {
        title: "ВКОШП",
        description:
          "Всероссийская командная олимпиада школьников по программированию: статусное соревнование для команд из трех участников.",
        format: "Отбор + финал",
        level: "7-11 классы",
        location: "Россия",
        deadline: "1 декабря"
      },
      "vsosh-info-school-2026": {
        title: "ВсОШ по информатике: школьный этап",
        description:
          "Первый массовый этап Всероссийской олимпиады школьников по информатике и программированию; участвовать могут все желающие школьники.",
        format: "Школьный этап",
        level: "5-11 классы",
        location: "Россия / школа",
        deadline: "1 ноября"
      },
      "vsosh-info-sirius-2026": {
        title: "ВсОШ по информатике: этап на платформе «Сириус»",
        description:
          "Онлайн-формат школьного этапа на платформе «Сириус» для регионов, где этап проводится централизованно.",
        format: "Онлайн",
        level: "5-11 классы",
        location: "Сириус / онлайн",
        deadline: "24 октября"
      },
      "vsosh-info-municipal-2026": {
        title: "ВсОШ по информатике: муниципальный этап",
        description:
          "Второй этап олимпиады для школьников, прошедших школьный этап; задачи становятся ближе к олимпиадному программированию.",
        format: "Муниципальный этап",
        level: "7-11 классы",
        location: "Россия",
        deadline: "25 декабря"
      },
      "vsosh-info-regional-2027": {
        title: "ВсОШ по информатике: региональный этап",
        description:
          "Региональный этап для сильнейших участников муниципального этапа; обычно проводится в несколько туров.",
        format: "Региональный этап",
        level: "9-11 классы",
        location: "Россия",
        deadline: "19 января"
      },
      "vsosh-info-final-2027": {
        title: "ВсОШ по информатике: заключительный этап",
        description:
          "Финальный этап Всероссийской олимпиады школьников по информатике, где соревнуются сильнейшие участники из регионов.",
        format: "Финал",
        level: "9-11 классы",
        location: "Россия",
        deadline: "28 марта"
      },
      "vsosh-programming-invitational-2027": {
        title: "ВсОШ: пригласительный этап «Программирование»",
        description:
          "Пригласительный этап по профилю «Программирование» для школьников, которые хотят попробовать формат ВсОШ заранее.",
        format: "Онлайн / пригласительный",
        level: "Школьники",
        location: "Россия / онлайн",
        deadline: "19 мая"
      },
      "ipho-2026": {
        title: "International Physics Olympiad 2026",
        description:
          "Международная олимпиада по физике для школьных сборных: экспериментальный и теоретический туры в Колумбии.",
        format: "Очно",
        level: "Школьные сборные",
        location: "Букараманга, Колумбия",
        deadline: "4 июля"
      },
      "iop-photonic-metasurfaces": {
        title: "Всероссийская олимпиада по физике",
        description:
          "Главная российская олимпиадная траектория по физике: школьный, муниципальный, региональный и заключительный этапы.",
        format: "Школьный этап + финалы",
        level: "7-11 классы",
        location: "Россия / Сириус",
        deadline: "10 сентября"
      },
      "superconductivity-school-2026": {
        title: "Интернет-олимпиада школьников по физике",
        description:
          "Заочная олимпиада с виртуальными лабораториями: отбор проходит онлайн, а задания моделируют физический эксперимент.",
        format: "Онлайн + финал",
        level: "7-11 классы",
        location: "Россия / онлайн",
        deadline: "1 ноября"
      },
      "synergy-for-science-2026": {
        title: "Олимпиада школьников «Физтех» по физике",
        description:
          "Сильная олимпиада МФТИ для школьников: заочный отбор и заключительный этап для участников, прошедших квалификацию.",
        format: "Заочно + финал",
        level: "8-11 классы",
        location: "Россия / онлайн",
        deadline: "20 сентября"
      },
      "ictp-cosmology-school": {
        title: "Олимпиада «Росатом» по физике",
        description:
          "Физико-математическая олимпиада для 7-11 классов: несколько отборочных туров и финал на площадках в регионах.",
        format: "Дистанционный отбор + финал",
        level: "7-11 классы",
        location: "Россия / онлайн",
        deadline: "25 сентября"
      },
      "nanoscience-surfaces-school": {
        title: "Олимпиада Курчатов по физике",
        description:
          "Олимпиада по физике с электронным отборочным этапом и финалом для школьников, которые хотят решать сильные задачи.",
        format: "Онлайн-отбор + финал",
        level: "7-11 классы",
        location: "Россия / онлайн",
        deadline: "1 октября"
      },
      "phystec-workshop-2026": {
        title: "Олимпиада СПбГУ по физике",
        description:
          "Олимпиада Санкт-Петербургского государственного университета по физике: заочный отбор и заключительный этап.",
        format: "Заочно + очно",
        level: "7-11 классы",
        location: "Россия / Санкт-Петербург",
        deadline: "25 октября"
      },
      "moscow-physics-2026": {
        title: "Московская олимпиада по физике",
        description:
          "Одна из ключевых российских олимпиад по физике для школьников с сильными теоретическими и экспериментальными задачами.",
        format: "Отбор + финал",
        level: "7-11 классы",
        location: "Москва / Россия",
        deadline: "5 ноября"
      },
      "city-open-physics-2026": {
        title: "Городская открытая олимпиада по физике",
        description:
          "Олимпиада для школьников, которые хотят проверить себя в задачах городского уровня и подготовиться к более крупным этапам.",
        format: "Отбор + финал",
        level: "7-11 классы",
        location: "Россия",
        deadline: "10 ноября"
      },
      "maxwell-physics-2026": {
        title: "Олимпиада по физике имени Дж. Кл. Максвелла",
        description:
          "Олимпиада для младших классов олимпиадной физики: региональный этап и дистанционный учебно-отборочный курс Сириуса.",
        format: "Дистанционный курс + этап",
        level: "7-8 классы",
        location: "Россия / Сириус",
        deadline: "1 декабря"
      },
      "open-physics-2026": {
        title: "Открытая олимпиада школьников по физике",
        description:
          "Открытая олимпиада по физике для школьников с заочным отбором и очным финалом.",
        format: "Заочно + финал",
        level: "7-11 классы",
        location: "Россия / онлайн",
        deadline: "15 ноября"
      },
      "sirius-physics-program-2026": {
        title: "Сириус: программы по физике",
        description:
          "Подборка образовательных программ и онлайн-курсов центра «Сириус» для школьников, которые готовятся к физике и олимпиадам.",
        format: "Онлайн / образовательная программа",
        level: "7-11 классы",
        location: "Сириус / онлайн",
        deadline: "3 сентября"
      },
      "lhc-ls3-briefing": {
        title: "LHC Long Shutdown 3 Briefing",
        description:
          "Ориентир по главной истории года в физике частиц: переход LHC к модернизации High-Luminosity LHC и анализ данных Run 3.",
        format: "Онлайн",
        level: "All levels",
        location: "CERN / онлайн",
        deadline: "15 августа"
      },
      "imo-2026": {
        title: "International Mathematical Olympiad 2026",
        description:
          "67-я Международная математическая олимпиада в Шанхае: главная мировая площадка для школьных сборных по математике.",
        format: "Очно",
        level: "Школьные сборные",
        location: "Шанхай",
        deadline: "10 июля"
      },
      "siam-annual-2026": {
        title: "Всероссийская олимпиада по математике",
        description:
          "Главная российская школьная олимпиада по математике: школьный, муниципальный, региональный и заключительный этапы.",
        format: "Школьный этап + финалы",
        level: "4-11 классы",
        location: "Россия / Сириус",
        deadline: "10 сентября"
      },
      "icm-2026": {
        title: "International Congress of Mathematicians",
        description:
          "Главный математический конгресс четырёхлетия: пленарные доклады, премии, секции и встречи исследовательского сообщества.",
        format: "Очно",
        level: "Research",
        location: "Филадельфия",
        deadline: "22 июля"
      },
      "maa-mathfest-2026": {
        title: "Московская математическая олимпиада",
        description:
          "Классическая сильная олимпиада по математике: для 8-10 классов открытая регистрация, для 11 классов предусмотрен отбор.",
        format: "Регистрация + туры",
        level: "8-11 классы",
        location: "Москва",
        deadline: "15 октября"
      },
      "ipmc-2026": {
        title: "Турнир городов",
        description:
          "Международная математическая олимпиада с осенним и весенним турами; можно выбрать базовый или сложный вариант.",
        format: "Очно / городские площадки",
        level: "8-11 классы",
        location: "Россия и другие города",
        deadline: "15 сентября"
      },
      "ams-sectional-kennesaw": {
        title: "Открытая олимпиада школьников по математике",
        description:
          "Открытая олимпиада школьников Университета ИТМО по математике для 5-11 классов.",
        format: "Отбор + финал",
        level: "5-11 классы",
        location: "Россия / онлайн",
        deadline: "1 декабря"
      },
      "lms-calendar-autumn": {
        title: "Олимпиада Курчатов по математике",
        description:
          "Олимпиада по математике с электронным отборочным этапом и финалом для школьников 6-11 классов.",
        format: "Онлайн-отбор + финал",
        level: "6-11 классы",
        location: "Россия / онлайн",
        deadline: "1 октября"
      },
      "ioqm-2026": {
        title: "Олимпиада «Росатом» по математике",
        description:
          "Физико-математическая олимпиада с несколькими отборочными турами, включая дистанционный, и заключительным этапом.",
        format: "Дистанционный отбор + финал",
        level: "7-11 классы",
        location: "Россия / онлайн",
        deadline: "20 сентября"
      },
      "bibn-math-2026": {
        title: "БИБН по математике",
        description:
          "Олимпиада «Будущие исследователи - будущее науки» по математике для школьников 7-11 классов.",
        format: "Отбор + финал",
        level: "7-11 классы",
        location: "Россия",
        deadline: "1 ноября"
      },
      "path-success-math-2026": {
        title: "«Путь к успеху» по математике",
        description:
          "Многопрофильная олимпиада школьников с математическим направлением для 10-11 классов.",
        format: "Отбор + финал",
        level: "10-11 классы",
        location: "Россия",
        deadline: "10 ноября"
      },
      "spb-math-2026": {
        title: "Санкт-Петербургская олимпиада школьников по математике",
        description:
          "Региональная математическая олимпиада с сильными задачами для школьников, ориентированных на олимпиадную траекторию.",
        format: "Отбор + финал",
        level: "6-11 классы",
        location: "Санкт-Петербург / Россия",
        deadline: "5 декабря"
      },
      "sirius-math-program-2026": {
        title: "Сириус: программы по математике",
        description:
          "Онлайн-курсы и образовательные программы центра «Сириус» для школьников, готовящихся к математическим олимпиадам.",
        format: "Онлайн / образовательная программа",
        level: "7-11 классы",
        location: "Сириус / онлайн",
        deadline: "1 октября"
      }
    },
    months: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь"
    ]
  },
  en: {
    brandTagline: "IT events hub",
    eyebrow: "Programming event manager",
    heroTitle: "Find the tech event that moves you forward.",
    heroSubtitle:
      "Browse IT events by category, open full details, register in one click and keep your selected events visible in the calendar.",
    registeredLabel: "registered",
    visibleLabel: "visible events",
    seasonLabel: "season",
    calendarLabel: "Calendar",
    upcomingLabel: "Upcoming",
    featuredTitle: "Selected events",
    newsLabel: "IT digest",
    newsTitle: "Fresh tech news",
    newsUpdated: "Updated today",
    newsAutoLabel: "Auto-updated",
    newsFallbackLabel: "Local digest",
    myEvents: "My events",
    openEvent: "Open event",
    register: "Register",
    unregister: "Cancel registration",
    registered: "You are in",
    empty: "No events match the selected filters.",
    all: "All",
    registeredOnly: "Showing your events only",
    authOpen: "Sign in",
    signOut: "Sign out",
    signIn: "Sign in",
    signUp: "Sign up",
    createAccount: "Sign up",
    haveAccount: "I already have an account",
    authEyebrowSignIn: "Account",
    authEyebrowSignUp: "New account",
    authSignInTitle: "Sign in",
    authSignUpTitle: "Registration",
    authName: "Name",
    authPassword: "Password",
    authPasswordTooShort: "Password must be at least 6 characters",
    authPasswordCyrillic: "Password must not contain Russian letters",
    authEmailTooShort: "Email must be at least 6 characters",
    authEmailAtMissing: "Email must include @",
    authEmailDomainInvalid: "After @, add a domain with a dot",
    authNameRequired: "Enter your name",
    authSupabaseMissing: "Add Supabase URL and anon key in app.js",
    authCheckEmail: "Check your email to confirm the account",
    authWelcome: "You are signed in",
    authSignedOut: "You are signed out",
    authGreeting: "Hi, {name}",
    authError: "Could not complete the action. Check the details and try again.",
    subjects: {
      it: "IT",
      physics: "Physics",
      math: "Math"
    },
    subjectContent: {
      it: {
        brandTagline: "IT events hub",
        eyebrow: "Programming event manager",
        heroTitle: "Find the tech event that moves you forward.",
        heroSubtitle:
          "Browse IT events by category, open full details, register in one click and keep your selected events visible in the calendar.",
        newsLabel: "IT digest",
        newsTitle: "Fresh tech news"
      },
      physics: {
        brandTagline: "science events hub",
        eyebrow: "Physics calendar",
        heroTitle: "Track physics from olympiads to big colliders.",
        heroSubtitle:
          "Collect physics conferences, schools, lectures and competitions in one calendar: particles, space, quantum technology and materials.",
        newsLabel: "Physics digest",
        newsTitle: "Physics news"
      },
      math: {
        brandTagline: "mathematics events hub",
        eyebrow: "Mathematics calendar",
        heroTitle: "Keep mathematics close: olympiads, congresses and schools.",
        heroSubtitle:
          "Filter mathematical events by format and topic, open details and save important dates from the IMO to research conferences.",
        newsLabel: "Math digest",
        newsTitle: "Mathematics news"
      }
    },
    details: {
      format: "Format",
      level: "Level",
      location: "Location",
      deadline: "Deadline"
    },
    weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    categories: {
      hackathon: "Hackathons",
      olympiad: "Olympiads",
      ai: "AI",
      conference: "Conferences",
      workshop: "Workshops",
      meetup: "Meetups",
      school: "Schools",
      lecture: "Lectures",
      research: "Research",
      congress: "Congresses",
      seminar: "Seminars",
      contest: "Contests"
    },
    news: {
      "godot-ai-policy": {
        title: "Godot tightens rules on AI-authored code contributions",
        summary:
          "The engine team is changing contribution policy: substantial code must be human-authored, while autonomous AI agents are blocked from pull requests.",
        tag: "Open source",
        source: "Godot Engine"
      },
      "claude-science-bionemo": {
        title: "Claude Science integrates with NVIDIA BioNeMo",
        summary:
          "Anthropic and NVIDIA are moving AI agents deeper into scientific workflows, emphasizing reproducibility, audit trails and life-sciences tooling.",
        tag: "AI",
        source: "AI News"
      },
      "ai-cyber-insurance": {
        title: "Cyber insurance adapts to the speed of AI-driven attacks",
        summary:
          "Insurers are looking beyond prevention and asking how quickly companies can detect, isolate and recover from fast-moving vulnerabilities.",
        tag: "Security",
        source: "WSJ Pro"
      },
      "ai-chip-supply": {
        title: "AI infrastructure demand keeps pressure on chip supply",
        summary:
          "Analysts warn that data-center components, memory and advanced packaging capacity could become bottlenecks for the AI hardware buildout.",
        tag: "Hardware",
        source: "MarketWatch"
      },
      "shadow-ai-security": {
        title: "Shadow AI becomes a major blind spot for security teams",
        summary:
          "A new cybersecurity assessment says nearly half of companies have only partial or no visibility into the AI tools employees use at work.",
        tag: "Security",
        source: "The Hacker News"
      },
      "oracle-ebs-flaw": {
        title: "Critical Oracle E-Business Suite flaw is being actively exploited",
        summary:
          "The Oracle Payments bug is rated 9.8 CVSS and can enable takeover of vulnerable instances, making rapid patching a priority.",
        tag: "Vulnerability",
        source: "The Hacker News"
      },
      "techcrunch-disrupt-builders": {
        title: "TechCrunch reveals the Builders Stage agenda for Disrupt 2026",
        summary:
          "The October San Francisco event will focus on practical scaling strategy, product growth and operating lessons for founders and startup teams.",
        tag: "Startups",
        source: "TechCrunch"
      },
      "neo-ai-office": {
        title: "Neo founder puts $30M into an AI-native office alternative",
        summary:
          "The company is betting that workplace software for the AI era should be redesigned from the ground up instead of retrofitted with chatbots.",
        tag: "Enterprise AI",
        source: "TechCrunch"
      },
      "lhc-long-shutdown": {
        title: "CERN moves the LHC into its long upgrade",
        summary:
          "The Large Hadron Collider is entering Long Shutdown 3, preparing the High-Luminosity LHC for a much larger collision dataset after restart.",
        tag: "Particle physics",
        source: "CERN"
      },
      "xi-cc-plus": {
        title: "LHCb reports a new heavy baryon",
        summary:
          "The Ξcc+ observation gives physicists another way to test how the strong force behaves inside systems with two heavy quarks.",
        tag: "CERN",
        source: "ScienceDaily"
      },
      "nasa-spherex-first-light": {
        title: "SPHEREx begins its infrared map of the sky",
        summary:
          "NASA's space observatory is preparing an all-sky spectral survey to study the origins of galaxies, ice and organic material.",
        tag: "Space",
        source: "NASA"
      },
      "quantum-materials-2026": {
        title: "Quantum materials lead the summer-school circuit",
        summary:
          "Physics meetings and schools in 2026 lean strongly into superconductivity, photonics and materials for quantum computing.",
        tag: "Quantum",
        source: "Institute of Physics"
      },
      "arxiv-spinout": {
        title: "arXiv becomes an independent nonprofit",
        summary:
          "The preprint platform is spinning out of Cornell University while keeping its scientific mission and gaining support from Simons Foundation and Schmidt Sciences.",
        tag: "Research",
        source: "arXiv"
      },
      "ai-erdos-unit-distance": {
        title: "AI advances Erdős' unit-distance problem",
        summary:
          "A new construction changed expectations around a classic geometry problem and renewed discussion of AI's role in mathematical discovery.",
        tag: "AI + math",
        source: "The Guardian"
      },
      "imo-record-2026": {
        title: "IMO 2026 expects record participation",
        summary:
          "Organizers report 119 countries and 685 contestants for the International Mathematical Olympiad in Shanghai.",
        tag: "Olympiad",
        source: "IMO"
      },
      "icm-2026-philadelphia": {
        title: "ICM 2026 brings mathematics' flagship congress to the US",
        summary:
          "The International Congress of Mathematicians will take place in Philadelphia and anchor the research community's calendar.",
        tag: "Congress",
        source: "AMS"
      }
    },
    events: {
      "quantum-hack": {
        title: "Quantum Code Sprint",
        description:
          "A 48-hour online hackathon for teams building prototypes across quantum algorithms, simulations and cloud computing.",
        format: "Online",
        level: "Middle+",
        location: "Global",
        deadline: "July 8"
      },
      "icpc-camp": {
        title: "ICPC Summer Selection",
        description:
          "A series of algorithm rounds with editorials, team ranking and preparation for international programming contests.",
        format: "Hybrid",
        level: "Advanced",
        location: "Moscow / online",
        deadline: "July 11"
      },
      "frontend-nation": {
        title: "Frontend Nation Summit",
        description:
          "An international conference on design systems, performance, accessibility and modern web application architecture.",
        format: "Online",
        level: "All levels",
        location: "Global",
        deadline: "July 15"
      },
      "ai-builders": {
        title: "AI Builders Lab",
        description:
          "A hands-on workshop for AI products: prototyping, RAG, quality evaluation and production launch patterns.",
        format: "Offline",
        level: "Junior+",
        location: "Saint Petersburg",
        deadline: "July 18"
      },
      "oss-meetup": {
        title: "Open Source Maintainers Night",
        description:
          "Lightning talks and networking for developers who maintain open source projects or want to start contributing.",
        format: "Offline",
        level: "All levels",
        location: "Berlin",
        deadline: "July 22"
      },
      "security-cup": {
        title: "Cyber Defense Cup",
        description:
          "A CTF competition covering web security, reverse engineering and incident response with a separate beginner track.",
        format: "Online",
        level: "Intermediate",
        location: "Global",
        deadline: "July 25"
      },
      "data-conf": {
        title: "Data Systems World",
        description:
          "A conference about distributed databases, streaming, lakehouse architecture and reliability of large data platforms.",
        format: "Offline",
        level: "Senior",
        location: "Amsterdam",
        deadline: "August 2"
      },
      "mobile-hack": {
        title: "Mobile UX Hack",
        description:
          "A team hackathon for iOS, Android and Flutter developers building a useful mobile service over one weekend.",
        format: "Hybrid",
        level: "Junior+",
        location: "Kazan / online",
        deadline: "August 6"
      },
      "season-code-kazan": {
        title: "Code Season: Kazan 2026",
        description:
          "A Russian event for developers, product teams and students with practical sessions, talks and regional IT community networking.",
        format: "Offline",
        level: "All levels",
        location: "Kazan",
        deadline: "July 4"
      },
      "ai-weekends-moscow": {
        title: "AI Weekends",
        description:
          "A Moscow meetup focused on neural networks and practical AI use in products, software development and analytics.",
        format: "Offline",
        level: "Junior+",
        location: "Moscow",
        deadline: "July 4"
      },
      "ii-confa-2026": {
        title: "AI CONFA 2026",
        description:
          "A practical conference on applying AI and neural networks in business: cases, prompting, AI agents and automation.",
        format: "Offline",
        level: "All levels",
        location: "Moscow",
        deadline: "July 1"
      },
      "moscowqa-ozon-ai": {
        title: "MoscowQA x Ozon Tech: AI in Testing",
        description:
          "A QA community meetup about AI API testing, reliability of neural features and quality practices for ML-powered products.",
        format: "Stream",
        level: "Junior+",
        location: "Moscow / online",
        deadline: "July 3"
      },
      "turbo-ml-conf": {
        title: "Turbo ML Conf",
        description:
          "A free meetup about ML, GenAI, NLP and recommendation systems from practitioners building production AI services.",
        format: "Offline",
        level: "Middle+",
        location: "Moscow",
        deadline: "July 18"
      },
      "devrel-ai-analytics": {
        title: "AI Analytics and Presentations for DevRel",
        description:
          "An online session on using AI for community data analysis, presentation preparation and faster DevRel workflows.",
        format: "Online",
        level: "All levels",
        location: "Online",
        deadline: "July 22"
      },
      "ulcamp-2026": {
        title: "ULCAMP 2026",
        description:
          "An IT festival and conference in Ulyanovsk with tracks on frontend, backend, mobile, QA, DevOps, GameDev, AI and product work.",
        format: "Offline",
        level: "All levels",
        location: "Ulyanovsk",
        deadline: "July 17"
      },
      "pycon-russia-2026": {
        title: "PyCon Russia 2026",
        description:
          "A Russian Python community conference for backend developers, ML engineers, architects and tech leads.",
        format: "Offline",
        level: "Middle+",
        location: "Moscow",
        deadline: "July 24"
      },
      "kuber-community-day": {
        title: "Kuber Community Day",
        description:
          "A Kubernetes community day in Moscow covering infrastructure, platform engineering, DevOps practices and production case studies.",
        format: "Offline",
        level: "Middle+",
        location: "Moscow",
        deadline: "July 30"
      },
      "digital-breakthrough-spb": {
        title: "Digital Breakthrough: AI, NWFD",
        description:
          "A Russian AI hackathon in Saint Petersburg where teams solve social and business challenges with artificial intelligence.",
        format: "Offline",
        level: "Junior+",
        location: "Saint Petersburg",
        deadline: "August 25"
      },
      "ai-summit-2026": {
        title: "AI Summit",
        description:
          "A professional business conference about artificial intelligence, information security, neural network regulation and AI case studies.",
        format: "Offline",
        level: "Middle+",
        location: "Russia",
        deadline: "October 7"
      },
      "lct-moscow-2026": {
        title: "Leaders of Digital Transformation",
        description:
          "A Moscow hackathon for IT specialists: team registration, solution development and project defense for city and business tasks.",
        format: "Hybrid",
        level: "Middle+",
        location: "Moscow",
        deadline: "September 15"
      },
      "gorod-it-2026": {
        title: "Gorod IT 2026",
        description:
          "An annual IT conference in Tomsk for specialists, founders and students covering development, management, products and technology.",
        format: "Offline",
        level: "All levels",
        location: "Tomsk",
        deadline: "September 12"
      },
      "nto-2026": {
        title: "National Technology Olympiad",
        description:
          "A Russian engineering competition for school students with remote rounds, team work and finals based on practical challenges.",
        format: "Online + final",
        level: "Grades 8-11",
        location: "Russia",
        deadline: "August 31"
      },
      "belchonok-info-2026": {
        title: "Belchonok Informatics Olympiad",
        description:
          "A university school olympiad in informatics for grades 2-11; the next season is expected in autumn 2026.",
        format: "Online + onsite",
        level: "Grades 2-11",
        location: "Russia",
        deadline: "October 1"
      },
      "mos-inf-2026": {
        title: "Moscow Informatics Olympiad",
        description:
          "An informatics olympiad with qualification and final rounds for two school age groups.",
        format: "Remote + onsite",
        level: "Grades 6-11",
        location: "Moscow",
        deadline: "October 5"
      },
      "spbu-engineering-2026": {
        title: "SPbU Engineering Systems",
        description:
          "An olympiad for future engineers covering mathematics, physics, chemistry and informatics with qualification and final stages.",
        format: "Online + onsite",
        level: "Grades 5-11",
        location: "Saint Petersburg / Russia",
        deadline: "October 25"
      },
      "open-programming-2026": {
        title: "Open Programming Olympiad",
        description:
          "An olympiad for school students interested in programming, with problem difficulty close to strong national-level contests.",
        format: "Qualification + final",
        level: "Grades 7-11",
        location: "Russia",
        deadline: "November 19"
      },
      "innopolis-open-info-2026": {
        title: "Innopolis Open in Informatics",
        description:
          "Innopolis University olympiad for grades 7-11 with two independent remote qualification rounds and an onsite final.",
        format: "Online + onsite",
        level: "Grades 7-11",
        location: "Innopolis / online",
        deadline: "November 1"
      },
      "team-programming-2026": {
        title: "Russian Team Programming Olympiad",
        description:
          "A major Russian team programming olympiad for school students, designed for teams of three participants.",
        format: "Qualification + final",
        level: "Grades 7-11",
        location: "Russia",
        deadline: "December 1"
      },
      "vsosh-info-school-2026": {
        title: "Russian Informatics Olympiad: School Round",
        description:
          "The first mass round of the Russian National School Olympiad in informatics and programming, open to interested school students.",
        format: "School round",
        level: "Grades 5-11",
        location: "Russia / school",
        deadline: "November 1"
      },
      "vsosh-info-sirius-2026": {
        title: "Russian Informatics Olympiad: Sirius Platform Round",
        description:
          "An online school-round format on the Sirius platform for regions that run the round centrally.",
        format: "Online",
        level: "Grades 5-11",
        location: "Sirius / online",
        deadline: "October 24"
      },
      "vsosh-info-municipal-2026": {
        title: "Russian Informatics Olympiad: Municipal Round",
        description:
          "The second round for students who passed the school stage, with tasks closer to competitive programming.",
        format: "Municipal round",
        level: "Grades 7-11",
        location: "Russia",
        deadline: "December 25"
      },
      "vsosh-info-regional-2027": {
        title: "Russian Informatics Olympiad: Regional Round",
        description:
          "The regional round for top municipal-stage participants, usually held across several contest days.",
        format: "Regional round",
        level: "Grades 9-11",
        location: "Russia",
        deadline: "January 19"
      },
      "vsosh-info-final-2027": {
        title: "Russian Informatics Olympiad: Final Round",
        description:
          "The national final of the Russian school informatics olympiad, gathering the strongest regional qualifiers.",
        format: "Final",
        level: "Grades 9-11",
        location: "Russia",
        deadline: "March 28"
      },
      "vsosh-programming-invitational-2027": {
        title: "Russian Olympiad: Programming Invitational",
        description:
          "An invitational programming-profile round for students who want to try the national olympiad format early.",
        format: "Online / invitational",
        level: "School students",
        location: "Russia / online",
        deadline: "May 19"
      },
      "ipho-2026": {
        title: "International Physics Olympiad 2026",
        description:
          "The international physics olympiad for school national teams, with theoretical and experimental rounds in Colombia.",
        format: "Onsite",
        level: "School teams",
        location: "Bucaramanga, Colombia",
        deadline: "July 4"
      },
      "iop-photonic-metasurfaces": {
        title: "Russian National Physics Olympiad",
        description:
          "Russia's main school physics olympiad track, from school and municipal rounds to regional and national finals.",
        format: "School round + finals",
        level: "Grades 7-11",
        location: "Russia / Sirius",
        deadline: "September 10"
      },
      "superconductivity-school-2026": {
        title: "Internet Physics Olympiad",
        description:
          "A remote physics olympiad with virtual laboratories and tasks designed around experimental modelling.",
        format: "Online + final",
        level: "Grades 7-11",
        location: "Russia / online",
        deadline: "November 1"
      },
      "synergy-for-science-2026": {
        title: "Phystech Physics Olympiad",
        description:
          "A strong MIPT olympiad for school students, with remote qualification and a final round for selected participants.",
        format: "Remote qualification + final",
        level: "Grades 8-11",
        location: "Russia / online",
        deadline: "September 20"
      },
      "ictp-cosmology-school": {
        title: "Rosatom Physics Olympiad",
        description:
          "A physics and mathematics olympiad for grades 7-11, with several qualification rounds and finals across Russian venues.",
        format: "Remote qualification + final",
        level: "Grades 7-11",
        location: "Russia / online",
        deadline: "September 25"
      },
      "nanoscience-surfaces-school": {
        title: "Kurchatov Physics Olympiad",
        description:
          "A physics olympiad with an electronic qualification round and finals for students ready for advanced problems.",
        format: "Online qualification + final",
        level: "Grades 7-11",
        location: "Russia / online",
        deadline: "October 1"
      },
      "phystec-workshop-2026": {
        title: "SPbU Physics Olympiad",
        description:
          "Saint Petersburg State University olympiad in physics, with remote qualification and a final round.",
        format: "Remote + onsite",
        level: "Grades 7-11",
        location: "Russia / Saint Petersburg",
        deadline: "October 25"
      },
      "moscow-physics-2026": {
        title: "Moscow Physics Olympiad",
        description:
          "One of Russia's key school physics contests, known for strong theoretical and experimental problems.",
        format: "Qualification + final",
        level: "Grades 7-11",
        location: "Moscow / Russia",
        deadline: "November 5"
      },
      "city-open-physics-2026": {
        title: "City Open Physics Olympiad",
        description:
          "A school physics olympiad for students preparing for larger regional and national contest tracks.",
        format: "Qualification + final",
        level: "Grades 7-11",
        location: "Russia",
        deadline: "November 10"
      },
      "maxwell-physics-2026": {
        title: "J. C. Maxwell Physics Olympiad",
        description:
          "An olympiad for younger physics contestants, connected with the Sirius remote training and selection path.",
        format: "Remote course + round",
        level: "Grades 7-8",
        location: "Russia / Sirius",
        deadline: "December 1"
      },
      "open-physics-2026": {
        title: "Open School Physics Olympiad",
        description:
          "An open physics olympiad for school students with remote qualification and a final round.",
        format: "Remote + final",
        level: "Grades 7-11",
        location: "Russia / online",
        deadline: "November 15"
      },
      "sirius-physics-program-2026": {
        title: "Sirius Physics Programs",
        description:
          "Online courses and educational programs from Sirius for students preparing for physics olympiads.",
        format: "Online / educational program",
        level: "Grades 7-11",
        location: "Sirius / online",
        deadline: "September 3"
      },
      "lhc-ls3-briefing": {
        title: "LHC Long Shutdown 3 Briefing",
        description:
          "A guide to particle physics' major 2026 story: the LHC's transition to the High-Luminosity upgrade and Run 3 data analysis.",
        format: "Online",
        level: "All levels",
        location: "CERN / online",
        deadline: "August 15"
      },
      "imo-2026": {
        title: "International Mathematical Olympiad 2026",
        description:
          "The 67th International Mathematical Olympiad in Shanghai, the leading global contest for school mathematics teams.",
        format: "Onsite",
        level: "School teams",
        location: "Shanghai",
        deadline: "July 10"
      },
      "siam-annual-2026": {
        title: "Russian National Mathematics Olympiad",
        description:
          "Russia's main school mathematics olympiad, running from school rounds to municipal, regional and national finals.",
        format: "School round + finals",
        level: "Grades 4-11",
        location: "Russia / Sirius",
        deadline: "September 10"
      },
      "icm-2026": {
        title: "International Congress of Mathematicians",
        description:
          "Mathematics' flagship four-year congress, with plenary lectures, prizes, sections and research-community meetings.",
        format: "Onsite",
        level: "Research",
        location: "Philadelphia",
        deadline: "July 22"
      },
      "maa-mathfest-2026": {
        title: "Moscow Mathematical Olympiad",
        description:
          "A classic strong mathematics olympiad: open registration for grades 8-10 and qualification for grade 11.",
        format: "Registration + rounds",
        level: "Grades 8-11",
        location: "Moscow",
        deadline: "October 15"
      },
      "ipmc-2026": {
        title: "Tournament of Towns",
        description:
          "An international mathematical olympiad held twice a year, with basic and advanced versions of the contest.",
        format: "Onsite / city venues",
        level: "Grades 8-11",
        location: "Russia and other cities",
        deadline: "September 15"
      },
      "ams-sectional-kennesaw": {
        title: "Open School Mathematics Olympiad",
        description:
          "ITMO University's open mathematics olympiad for school students in grades 5-11.",
        format: "Qualification + final",
        level: "Grades 5-11",
        location: "Russia / online",
        deadline: "December 1"
      },
      "lms-calendar-autumn": {
        title: "Kurchatov Mathematics Olympiad",
        description:
          "A mathematics olympiad with an electronic qualification round and finals for students in grades 6-11.",
        format: "Online qualification + final",
        level: "Grades 6-11",
        location: "Russia / online",
        deadline: "October 1"
      },
      "ioqm-2026": {
        title: "Rosatom Mathematics Olympiad",
        description:
          "A physics and mathematics olympiad with several qualification rounds, including a remote round, and a final stage.",
        format: "Remote qualification + final",
        level: "Grades 7-11",
        location: "Russia / online",
        deadline: "September 20"
      },
      "bibn-math-2026": {
        title: "Future Researchers in Mathematics",
        description:
          "The mathematics track of the 'Future Researchers - Future Science' olympiad for grades 7-11.",
        format: "Qualification + final",
        level: "Grades 7-11",
        location: "Russia",
        deadline: "November 1"
      },
      "path-success-math-2026": {
        title: "Path to Success in Mathematics",
        description:
          "A multidisciplinary school olympiad with a mathematics track for grades 10-11.",
        format: "Qualification + final",
        level: "Grades 10-11",
        location: "Russia",
        deadline: "November 10"
      },
      "spb-math-2026": {
        title: "Saint Petersburg School Mathematics Olympiad",
        description:
          "A regional mathematics olympiad with strong problems for students following an olympiad track.",
        format: "Qualification + final",
        level: "Grades 6-11",
        location: "Saint Petersburg / Russia",
        deadline: "December 5"
      },
      "sirius-math-program-2026": {
        title: "Sirius Mathematics Programs",
        description:
          "Online courses and educational programs from Sirius for students preparing for mathematics olympiads.",
        format: "Online / educational program",
        level: "Grades 7-11",
        location: "Sirius / online",
        deadline: "October 1"
      }
    },
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]
  }
};

const categoriesBySubject = {
  it: [
    { id: "hackathon", color: "#0f766e" },
    { id: "olympiad", color: "#c2410c" },
    { id: "ai", color: "#7c3aed" },
    { id: "conference", color: "#2563eb" },
    { id: "workshop", color: "#9333ea" },
    { id: "meetup", color: "#be123c" }
  ],
  physics: [
    { id: "olympiad", color: "#ea580c" },
    { id: "conference", color: "#0e7490" },
    { id: "school", color: "#2563eb" },
    { id: "workshop", color: "#7c3aed" },
    { id: "lecture", color: "#be123c" },
    { id: "research", color: "#0f766e" }
  ],
  math: [
    { id: "olympiad", color: "#0e7490" },
    { id: "congress", color: "#f97316" },
    { id: "conference", color: "#0891b2" },
    { id: "school", color: "#2563eb" },
    { id: "seminar", color: "#be123c" },
    { id: "contest", color: "#7c3aed" }
  ]
};

const eventsBySubject = {
  it: [
  { id: "ii-confa-2026", category: "ai", date: "2026-07-01", url: "https://ai-confa.ru/" },
  { id: "moscowqa-ozon-ai", category: "ai", date: "2026-07-03", url: "https://networkly.app/event?event_filter%5Btags%5D=ai" },
  { id: "season-code-kazan", category: "meetup", date: "2026-07-04", url: "https://ict2go.ru/" },
  { id: "ai-weekends-moscow", category: "ai", date: "2026-07-04", url: "https://networkly.app/event?event_filter%5Btags%5D=ai" },
  { id: "quantum-hack", category: "hackathon", date: "2026-07-09", url: "https://devpost.com/hackathons" },
  { id: "icpc-camp", category: "olympiad", date: "2026-07-12", url: "https://icpc.global/" },
  { id: "frontend-nation", category: "conference", date: "2026-07-16", url: "https://www.frontendnation.com/" },
  { id: "ulcamp-2026", category: "conference", date: "2026-07-17", url: "https://it-event-hub.ru/" },
  { id: "turbo-ml-conf", category: "ai", date: "2026-07-18", url: "https://networkly.app/event?event_filter%5Btags%5D=ai" },
  { id: "ai-builders", category: "workshop", date: "2026-07-20", url: "https://www.meetup.com/topics/artificial-intelligence/" },
  { id: "devrel-ai-analytics", category: "ai", date: "2026-07-22", url: "https://networkly.app/event?event_filter%5Btags%5D=ai" },
  { id: "oss-meetup", category: "meetup", date: "2026-07-24", url: "https://www.meetup.com/topics/open-source/" },
  { id: "pycon-russia-2026", category: "conference", date: "2026-07-24", url: "https://it-event-hub.ru/" },
  { id: "security-cup", category: "olympiad", date: "2026-07-27", url: "https://ctftime.org/" },
  { id: "kuber-community-day", category: "conference", date: "2026-07-30", url: "https://www.directline.pro/digital-events/it/konferenczii/" },
  { id: "data-conf", category: "conference", date: "2026-08-04", url: "https://conferences.oreilly.com/" },
  { id: "mobile-hack", category: "hackathon", date: "2026-08-08", url: "https://devpost.com/hackathons" },
  { id: "digital-breakthrough-spb", category: "ai", date: "2026-08-25", url: "https://www.xn--80aa3anexr8c.xn--p1acf/tpost/sg3ijrfuz1-hakaton-v-szfo-tsifrovoi-proriv-sezon-is" },
  { id: "nto-2026", category: "olympiad", date: "2026-08-31", url: "https://olimpiada.ru/activity/5369" },
  { id: "gorod-it-2026", category: "conference", date: "2026-09-12", url: "https://gorod.it/" },
  { id: "lct-moscow-2026", category: "hackathon", date: "2026-09-15", url: "https://i.moscow/lct" },
  { id: "vsosh-info-school-2026", category: "olympiad", date: "2026-09-01", url: "https://olimpiada.ru/activity/73" },
  { id: "belchonok-info-2026", category: "olympiad", date: "2026-10-01", url: "https://olimpiada.ru/activity/398" },
  { id: "mos-inf-2026", category: "olympiad", date: "2026-10-05", url: "https://mos-inf.olimpiada.ru/" },
  { id: "ai-summit-2026", category: "ai", date: "2026-10-07", url: "https://aisummit.ru/" },
  { id: "vsosh-info-sirius-2026", category: "olympiad", date: "2026-10-20", url: "https://olimpiada.ru/activity/73/events/120" },
  { id: "spbu-engineering-2026", category: "olympiad", date: "2026-10-25", url: "https://olimpiada.ru/activity/5345" },
  { id: "vsosh-info-municipal-2026", category: "olympiad", date: "2026-11-02", url: "https://olimpiada.ru/activity/73/events/120" },
  { id: "innopolis-open-info-2026", category: "olympiad", date: "2026-11-01", url: "https://olimpiada.ru/activity/5283" },
  { id: "open-programming-2026", category: "olympiad", date: "2026-11-19", url: "https://olimpiada.ru/activity/23" },
  { id: "team-programming-2026", category: "olympiad", date: "2026-12-01", url: "https://olimpiada.ru/activity/4326" },
  { id: "vsosh-info-regional-2027", category: "olympiad", date: "2027-01-17", url: "https://olimpiada.ru/activity/73/events/120" },
  { id: "vsosh-info-final-2027", category: "olympiad", date: "2027-03-22", url: "https://olimpiada.ru/activity/73/events/120" },
  { id: "vsosh-programming-invitational-2027", category: "olympiad", date: "2027-05-18", url: "https://olimpiada.ru/activity/73/events/120" }
  ],
  physics: [
    { id: "ipho-2026", category: "olympiad", date: "2026-07-04", url: "https://www.ipho-new.org/" },
    { id: "sirius-physics-program-2026", category: "school", date: "2026-09-03", url: "https://olimpiada.ru/activity/5321/news" },
    { id: "iop-photonic-metasurfaces", category: "olympiad", date: "2026-09-10", url: "https://olimpiada.ru/activity/74" },
    { id: "synergy-for-science-2026", category: "olympiad", date: "2026-09-20", url: "https://olimpiada.ru/activity/394" },
    { id: "ictp-cosmology-school", category: "olympiad", date: "2026-09-25", url: "https://olimpiada.ru/activity/412" },
    { id: "nanoscience-surfaces-school", category: "olympiad", date: "2026-10-01", url: "https://olimpiada.ru/activity/388" },
    { id: "phystec-workshop-2026", category: "olympiad", date: "2026-10-25", url: "https://olimpiada.ru/activity/444" },
    { id: "superconductivity-school-2026", category: "olympiad", date: "2026-11-01", url: "https://olimpiada.ru/activity/57" },
    { id: "moscow-physics-2026", category: "olympiad", date: "2026-11-05", url: "https://olimpiada.ru/activity/108" },
    { id: "city-open-physics-2026", category: "olympiad", date: "2026-11-10", url: "https://olimpiada.ru/activity/241" },
    { id: "open-physics-2026", category: "olympiad", date: "2026-11-15", url: "https://olimpiada.ru/activity/5809" },
    { id: "maxwell-physics-2026", category: "olympiad", date: "2026-12-01", url: "https://olimpiada.ru/activity/254" },
    { id: "lhc-ls3-briefing", category: "research", date: "2026-08-15", url: "https://home.cern/science/accelerators/large-hadron-collider/" }
  ],
  math: [
    { id: "imo-2026", category: "olympiad", date: "2026-07-10", url: "https://www.imo-official.org/editions/2026/" },
    { id: "icm-2026", category: "congress", date: "2026-07-22", url: "https://www.ams.org/meetings/international/international-index" },
    { id: "siam-annual-2026", category: "olympiad", date: "2026-09-10", url: "https://olimpiada.ru/activity/72" },
    { id: "ipmc-2026", category: "contest", date: "2026-09-15", url: "https://olimpiada.ru/activity/5" },
    { id: "ioqm-2026", category: "olympiad", date: "2026-09-20", url: "https://olimpiada.ru/activity/411" },
    { id: "sirius-math-program-2026", category: "school", date: "2026-10-01", url: "https://olimpiada.ru/activity/5321/news" },
    { id: "lms-calendar-autumn", category: "olympiad", date: "2026-10-01", url: "https://olimpiada.ru/activity/389" },
    { id: "maa-mathfest-2026", category: "olympiad", date: "2026-10-15", url: "https://olimpiada.ru/activity/1" },
    { id: "bibn-math-2026", category: "olympiad", date: "2026-11-01", url: "https://olimpiada.ru/activity/360" },
    { id: "path-success-math-2026", category: "olympiad", date: "2026-11-10", url: "https://olimpiada.ru/activity/5706" },
    { id: "ams-sectional-kennesaw", category: "olympiad", date: "2026-12-01", url: "https://olimpiada.ru/activity/121" },
    { id: "spb-math-2026", category: "olympiad", date: "2026-12-05", url: "https://olimpiada.ru/activity/246" }
  ]
};

const newsItemsBySubject = {
  it: [
    {
      id: "godot-ai-policy",
      date: "2026-07-03",
      color: "#0f766e",
      url: "https://godotengine.org/article/contribution-policy-2026/"
    },
    {
      id: "claude-science-bionemo",
      date: "2026-07-02",
      color: "#2563eb",
      url: "https://www.artificialintelligence-news.com/news/nvidia-bionemo-accelerates-anthropic-claude-science/"
    },
    {
      id: "ai-cyber-insurance",
      date: "2026-07-01",
      color: "#be123c",
      url: "https://www.wsj.com/pro/cybersecurity/cyber-insurers-focus-on-speed-as-ai-rewrites-security-0983ad61"
    },
    {
      id: "ai-chip-supply",
      date: "2026-07-01",
      color: "#c2410c",
      url: "https://www.marketwatch.com/story/why-its-too-early-to-call-a-top-on-semiconductor-stocks-according-to-these-highly-regarded-analysts-bb1139d4"
    },
    {
      id: "shadow-ai-security",
      date: "2026-07-01",
      color: "#7c3aed",
      url: "https://thehackernews.com/2026/07/2026-cybersecurity-assessment-gap.html"
    },
    {
      id: "oracle-ebs-flaw",
      date: "2026-06-30",
      color: "#be123c",
      url: "https://thehackernews.com/2026/06/oracle-e-business-suite-flaw-cve-2026.html"
    },
    {
      id: "techcrunch-disrupt-builders",
      date: "2026-07-01",
      color: "#0f766e",
      url: "https://techcrunch.com/2026/07/01/builders-stage-agenda-revealed-practical-strategies-for-scaling-startups-at-techcrunch-disrupt-2026/"
    },
    {
      id: "neo-ai-office",
      date: "2026-07-01",
      color: "#2563eb",
      url: "https://techcrunch.com/2026/07/01/indian-tech-tycoon-bets-30m-to-build-an-ai-alternative-to-microsoft-office/"
    }
  ],
  physics: [
    { id: "lhc-long-shutdown", date: "2026-07-01", color: "#0e7490", url: "https://home.cern/science/accelerators/large-hadron-collider/" },
    { id: "xi-cc-plus", date: "2026-05-26", color: "#ea580c", url: "https://www.sciencedaily.com/releases/2026/05/260526022012.htm" },
    { id: "nasa-spherex-first-light", date: "2026-06-18", color: "#2563eb", url: "https://www.nasa.gov/missions/spherex/" },
    { id: "quantum-materials-2026", date: "2026-07-03", color: "#7c3aed", url: "https://www.iop.org/physics-community/iop-conferences" }
  ],
  math: [
    { id: "arxiv-spinout", date: "2026-07-01", color: "#0891b2", url: "https://blog.arxiv.org/2026/06/30/arxivs-next-chapter/" },
    { id: "ai-erdos-unit-distance", date: "2026-05-21", color: "#f97316", url: "https://www.theguardian.com/technology/2026/may/21/openai-paul-erdos-maths-problem-breakthrough" },
    { id: "imo-record-2026", date: "2026-06-25", color: "#0e7490", url: "https://www.imo-official.org/news/record-participation-imo-2026/" },
    { id: "icm-2026-philadelphia", date: "2026-04-01", color: "#be123c", url: "https://www.ams.org/news?news_id=7627" }
  ]
};

const NEWS_REFRESH_INTERVAL = 5 * 60 * 60 * 1000;
const HN_NEWS_URL = "https://hn.algolia.com/api/v1/search_by_date?tags=story&hitsPerPage=18";
const SUPABASE_URL = "https://lnqjsoqkybtxmboqisbw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxucWpzb3FreWJ0eG1ib3Fpc2J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyNTE0NzgsImV4cCI6MjA5ODgyNzQ3OH0.U_plSDL6ACvf-fpEZD2RZuvSA5mFZpiQoZ2tMAdN6-E";
const newsColors = ["#0f766e", "#2563eb", "#be123c", "#c2410c", "#7c3aed", "#9333ea", "#0e7490", "#a16207"];
const savedLang = localStorage.getItem("cc-lang");
const savedTheme = localStorage.getItem("cc-theme");
const savedSubject = localStorage.getItem("cc-subject");
const initialLang = Object.prototype.hasOwnProperty.call(translations, savedLang) ? savedLang : "ru";
const initialTheme = savedTheme === "dark" || savedTheme === "light" ? savedTheme : "light";
const initialSubject = Object.prototype.hasOwnProperty.call(eventsBySubject, savedSubject) ? savedSubject : "it";

const state = {
  lang: initialLang,
  theme: initialTheme,
  subject: initialSubject,
  month: new Date(2026, 6, 1),
  activeCategory: "all",
  registeredOnly: false,
  registered: new Set(JSON.parse(localStorage.getItem("cc-registered") || "[]")),
  activeEventId: null,
  newsItems: newsItemsBySubject[initialSubject],
  newsLastUpdated: null,
  newsUsesFallback: true,
  authMode: "signin",
  authUser: null,
  authMessage: ""
};

const supabaseClient =
  SUPABASE_URL.startsWith("http") && SUPABASE_ANON_KEY.length > 40 && window.supabase
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

const els = {
  html: document.documentElement,
  subjectSwitcher: document.getElementById("subjectSwitcher"),
  filters: document.getElementById("filters"),
  weekdayRow: document.getElementById("weekdayRow"),
  calendarGrid: document.getElementById("calendarGrid"),
  calendarColumn: document.querySelector(".calendar-column"),
  eventListPanel: document.querySelector(".event-list-panel"),
  newsPanel: document.querySelector(".news-panel"),
  newsList: document.getElementById("newsList"),
  newsUpdated: document.querySelector("[data-i18n='newsUpdated']"),
  eventList: document.getElementById("eventList"),
  monthTitle: document.getElementById("monthTitle"),
  registeredCount: document.getElementById("registeredCount"),
  visibleCount: document.getElementById("visibleCount"),
  showRegistered: document.getElementById("showRegistered"),
  dialog: document.getElementById("eventDialog"),
  dialogMedia: document.getElementById("dialogMedia"),
  dialogCategory: document.getElementById("dialogCategory"),
  dialogDate: document.getElementById("dialogDate"),
  dialogTitle: document.getElementById("dialogTitle"),
  dialogDescription: document.getElementById("dialogDescription"),
  dialogDetails: document.getElementById("dialogDetails"),
  dialogLink: document.getElementById("dialogLink"),
  registerButton: document.getElementById("registerButton"),
  themeToggle: document.getElementById("themeToggle"),
  themeIcon: document.getElementById("themeIcon"),
  accountGreeting: document.getElementById("accountGreeting"),
  authOpenButton: document.getElementById("authOpenButton"),
  signOutButton: document.getElementById("signOutButton"),
  authDialog: document.getElementById("authDialog"),
  closeAuthDialog: document.getElementById("closeAuthDialog"),
  authForm: document.getElementById("authForm"),
  authTitle: document.getElementById("authTitle"),
  authEyebrow: document.getElementById("authEyebrow"),
  authName: document.getElementById("authName"),
  authEmail: document.getElementById("authEmail"),
  emailGhost: document.getElementById("emailGhost"),
  authPasswordSignIn: document.getElementById("authPasswordSignIn") || document.getElementById("authPassword"),
  authPasswordSignUp: document.getElementById("authPasswordSignUp") || document.getElementById("authPassword"),
  passwordSignInField: document.getElementById("passwordSignInField"),
  passwordSignUpField: document.getElementById("passwordSignUpField"),
  nameField: document.getElementById("nameField"),
  authMessage: document.getElementById("authMessage"),
  authSubmit: document.getElementById("authSubmit"),
  authModeToggle: document.getElementById("authModeToggle")
};

function t(path) {
  const current = path.split(".").reduce((acc, key) => acc?.[key], translations[state.lang]);
  if (current !== undefined) return current;
  return path.split(".").reduce((acc, key) => acc?.[key], translations.ru) ?? "";
}

function currentCategories() {
  return categoriesBySubject[state.subject] || categoriesBySubject.it;
}

function currentEvents() {
  return eventsBySubject[state.subject] || eventsBySubject.it;
}

function currentFallbackNews() {
  return newsItemsBySubject[state.subject] || newsItemsBySubject.it;
}

function eventCopy(event) {
  return (
    translations[state.lang].events[event.id] ||
    translations.ru.events[event.id] || {
      title: event.id,
      description: "",
      format: "",
      level: "",
      location: "",
      deadline: ""
    }
  );
}

function eventCategory(event) {
  return currentCategories().find((category) => category.id === event.category) || currentCategories()[0];
}

function filteredEvents() {
  return currentEvents().filter((event) => {
    const categoryMatches = state.activeCategory === "all" || event.category === state.activeCategory;
    const registrationMatches = !state.registeredOnly || state.registered.has(event.id);
    return categoryMatches && registrationMatches;
  });
}

function formatDate(dateString, options = { day: "numeric", month: "long" }) {
  return new Intl.DateTimeFormat(state.lang === "ru" ? "ru-RU" : "en-US", options).format(new Date(`${dateString}T12:00:00`));
}

function formatTime(date) {
  return new Intl.DateTimeFormat(state.lang === "ru" ? "ru-RU" : "en-US", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function dateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function renderStaticText() {
  document.documentElement.lang = state.lang;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === state.lang);
  });
  els.subjectSwitcher.querySelectorAll("[data-subject]").forEach((button) => {
    button.textContent = t(`subjects.${button.dataset.subject}`);
    button.classList.toggle("active", button.dataset.subject === state.subject);
  });

  const subjectCopy = t(`subjectContent.${state.subject}`) || t("subjectContent.it") || {};
  Object.entries(subjectCopy).forEach(([key, value]) => {
    const node = document.querySelector(`[data-i18n="${key}"]`);
    if (node) node.textContent = value;
  });
  renderAuth();
}

function userDisplayName() {
  return state.authUser?.user_metadata?.name || state.authUser?.email?.split("@")[0] || "";
}

function renderAuth() {
  const isSignedIn = Boolean(state.authUser);
  const name = userDisplayName();
  els.accountGreeting.textContent = isSignedIn && name ? t("authGreeting").replace("{name}", name) : "";
  els.authOpenButton.classList.toggle("hidden", isSignedIn);
  els.signOutButton.classList.toggle("hidden", !isSignedIn);
  els.nameField.classList.toggle("hidden", state.authMode !== "signup");
  els.authName.required = state.authMode === "signup";
  els.passwordSignInField?.classList.toggle("hidden", state.authMode === "signup");
  els.passwordSignUpField?.classList.toggle("hidden", state.authMode !== "signup");
  if (els.authPasswordSignIn) els.authPasswordSignIn.required = state.authMode !== "signup";
  if (els.authPasswordSignUp) els.authPasswordSignUp.required = state.authMode === "signup";
  els.authTitle.textContent = state.authMode === "signup" ? t("authSignUpTitle") : t("authSignInTitle");
  els.authEyebrow.textContent = state.authMode === "signup" ? t("authEyebrowSignUp") : t("authEyebrowSignIn");
  els.authSubmit.textContent = state.authMode === "signup" ? t("signUp") : t("signIn");
  els.authModeToggle.textContent = state.authMode === "signup" ? t("haveAccount") : t("createAccount");
  els.authMessage.textContent = state.authMessage;
}

function renderEmailSuggestions() {
  const typed = els.authEmail.value.trim();
  const ghost = emailGhostSuggestion(typed);
  els.emailGhost.textContent = ghost && ghost.startsWith(typed) ? `${typed}${ghost.slice(typed.length)}` : "";
}

function applyEmailSuggestion(email) {
  els.authEmail.value = email;
  renderEmailSuggestions();
}

function renderFilters() {
  const filterItems = [{ id: "all", color: "var(--text)" }, ...currentCategories()];
  els.filters.innerHTML = filterItems
    .map((category) => {
      const label = category.id === "all" ? t("all") : t(`categories.${category.id}`);
      return `
        <button class="filter-chip ${state.activeCategory === category.id ? "active" : ""}" type="button" data-category="${category.id}">
          <span class="filter-dot" style="color: ${category.color}"></span>
          ${label}
        </button>
      `;
    })
    .join("");
}

function renderWeekdays() {
  els.weekdayRow.innerHTML = t("weekdays").map((day) => `<div>${day}</div>`).join("");
}

function renderCalendar() {
  const year = state.month.getFullYear();
  const month = state.month.getMonth();
  const firstDay = new Date(year, month, 1);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const gridStart = new Date(year, month, 1 - startOffset);
  const visible = filteredEvents();
  const todayKey = "2026-07-03";

  els.monthTitle.textContent = `${t("months")[month]} ${year}`;
  els.calendarGrid.innerHTML = "";

  for (let i = 0; i < 42; i += 1) {
    const cellDate = new Date(gridStart);
    cellDate.setDate(gridStart.getDate() + i);
    const cellDateKey = dateKey(cellDate);
    const dayEvents = visible.filter((event) => event.date === cellDateKey);
    const cell = document.createElement("div");
    cell.className = `calendar-cell ${cellDate.getMonth() !== month ? "is-muted" : ""}`;
    cell.innerHTML = `
      <div class="day-number ${cellDateKey === todayKey ? "today" : ""}"><span>${cellDate.getDate()}</span></div>
      <div class="day-events"></div>
    `;

    const dayEventsNode = cell.querySelector(".day-events");
    dayEvents.forEach((event) => {
      const copy = eventCopy(event);
      const category = eventCategory(event);
      const button = document.createElement("button");
      button.type = "button";
      button.className = `event-chip ${state.registered.has(event.id) ? "is-registered" : ""}`;
      button.style.setProperty("--event-color", category.color);
      button.innerHTML = `<strong>${copy.title}</strong><span>${t(`categories.${event.category}`)}</span>`;
      button.addEventListener("click", () => openEvent(event.id));
      dayEventsNode.append(button);
    });

    els.calendarGrid.append(cell);
  }
}

function renderEventList() {
  const visible = filteredEvents().sort((a, b) => a.date.localeCompare(b.date));
  els.eventList.innerHTML = visible.length
    ? ""
    : `<div class="event-card"><p>${state.registeredOnly ? t("registeredOnly") : t("empty")}</p></div>`;

  visible.forEach((event) => {
    const copy = eventCopy(event);
    const category = eventCategory(event);
    const card = document.createElement("article");
    card.className = `event-card ${state.registered.has(event.id) ? "is-registered" : ""}`;
    card.style.setProperty("--event-color", category.color);
    card.tabIndex = 0;
    card.innerHTML = `
      <div class="event-card-top">
        <span class="pill">${t(`categories.${event.category}`)}</span>
        ${state.registered.has(event.id) ? `<span class="registered-badge">${t("registered")}</span>` : ""}
      </div>
      <h3>${copy.title}</h3>
      <p>${formatDate(event.date, { day: "numeric", month: "long", year: "numeric" })} · ${copy.location}</p>
      <p>${copy.description}</p>
    `;
    card.addEventListener("click", () => openEvent(event.id));
    card.addEventListener("keydown", (eventKey) => {
      if (eventKey.key === "Enter") openEvent(event.id);
    });
    els.eventList.append(card);
  });
}

function renderNews() {
  if (!els.newsList) return;
  els.newsUpdated.textContent = state.newsUsesFallback
    ? t("newsFallbackLabel")
    : `${t("newsAutoLabel")} ${formatTime(state.newsLastUpdated)}`;

  els.newsList.innerHTML = state.newsItems
    .map((item) => {
      const copy = item.live
        ? item.copy[state.lang] || item.copy.ru
        : translations[state.lang].news[item.id] || translations.ru.news[item.id];
      if (!copy) return "";
      return `
        <a class="news-card" href="${item.url}" target="_blank" rel="noreferrer" style="--news-color: ${item.color}">
          <div class="news-meta">
            <span class="news-tag">${copy.tag}</span>
            <time datetime="${item.date}">${formatDate(item.date, { day: "numeric", month: "long" })}</time>
          </div>
          <h3>${copy.title}</h3>
          <p>${copy.summary}</p>
          <span class="news-source">${copy.source}</span>
        </a>
      `;
    })
    .join("");
}

function hostnameFromUrl(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "Hacker News";
  }
}

function newsTagForTitle(title) {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("ai") || lowerTitle.includes("llm") || lowerTitle.includes("model")) return "AI";
  if (lowerTitle.includes("security") || lowerTitle.includes("vulnerability") || lowerTitle.includes("breach")) return "Security";
  if (lowerTitle.includes("open source") || lowerTitle.includes("github")) return "Open source";
  if (lowerTitle.includes("startup") || lowerTitle.includes("funding")) return "Startups";
  if (lowerTitle.includes("chip") || lowerTitle.includes("hardware")) return "Hardware";
  return "Tech";
}

function liveNewsCopy(title, source) {
  return {
    ru: {
      title,
      summary: `Свежая история из технологической ленты Hacker News. Источник: ${source}.`,
      tag: newsTagForTitle(title),
      source
    },
    en: {
      title,
      summary: `A fresh story from the Hacker News technology feed. Source: ${source}.`,
      tag: newsTagForTitle(title),
      source
    }
  };
}

function mapHackerNewsItems(hits) {
  const seen = new Set();
  return hits
    .map((hit, index) => {
      const title = hit.title || hit.story_title;
      const url = hit.url || hit.story_url || `https://news.ycombinator.com/item?id=${hit.objectID}`;
      if (!title || seen.has(title)) return null;
      seen.add(title);

      const source = hostnameFromUrl(url);
      return {
        id: `hn-${hit.objectID}`,
        live: true,
        date: (hit.created_at || new Date().toISOString()).slice(0, 10),
        color: newsColors[index % newsColors.length],
        url,
        copy: liveNewsCopy(title, source)
      };
    })
    .filter(Boolean)
    .slice(0, 8);
}

async function refreshNews() {
  const requestedSubject = state.subject;

  if (requestedSubject !== "it") {
    state.newsItems = currentFallbackNews();
    state.newsLastUpdated = null;
    state.newsUsesFallback = true;
    renderNews();
    scheduleLayoutSync();
    return;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(HN_NEWS_URL, { signal: controller.signal });
    if (!response.ok) throw new Error(`News request failed: ${response.status}`);

    const data = await response.json();
    const liveItems = mapHackerNewsItems(data.hits || []);
    if (liveItems.length < 4) throw new Error("Not enough live news items");

    if (state.subject !== requestedSubject) return;
    state.newsItems = liveItems;
    state.newsLastUpdated = new Date();
    state.newsUsesFallback = false;
    renderNews();
    scheduleLayoutSync();
  } catch {
    if (state.subject !== requestedSubject) return;
    state.newsItems = currentFallbackNews();
    state.newsUsesFallback = true;
    renderNews();
    scheduleLayoutSync();
  } finally {
    clearTimeout(timeoutId);
  }
}

function renderStats() {
  els.registeredCount.textContent = currentEvents().filter((event) => state.registered.has(event.id)).length;
  els.visibleCount.textContent = filteredEvents().length;
  els.showRegistered.classList.toggle("active", state.registeredOnly);
}

let layoutSyncFrame = 0;

function syncEventPanelHeight() {
  const isDesktop = window.matchMedia("(min-width: 1121px)").matches;
  const cards = [...els.eventList.querySelectorAll(".event-card")];
  els.eventList.classList.remove("is-fitted");
  els.eventList.style.height = "";

  cards.forEach((card) => {
    card.hidden = false;
  });

  els.eventListPanel.style.height = "";
  els.eventListPanel.style.maxHeight = "";
  els.eventListPanel.style.marginTop = "";
  if (!isDesktop) return;

  const leftColumnRect = els.calendarColumn.getBoundingClientRect();
  const panelNaturalRect = els.eventListPanel.getBoundingClientRect();
  const targetHeight = Math.max(0, Math.round(leftColumnRect.bottom - panelNaturalRect.top));

  els.eventListPanel.style.height = `${targetHeight}px`;
  els.eventListPanel.style.maxHeight = `${targetHeight}px`;

  const panelRect = els.eventListPanel.getBoundingClientRect();
  const listRect = els.eventList.getBoundingClientRect();
  const newsCards = [...els.newsList.querySelectorAll(".news-card")];
  const lastNewsCard = newsCards.at(-1);
  const targetListBottom = lastNewsCard ? lastNewsCard.getBoundingClientRect().bottom : panelRect.bottom - 16;
  const listHeight = Math.max(0, targetListBottom - listRect.top);
  els.eventList.style.height = `${listHeight}px`;

  const panelBottom = targetListBottom;
  let shouldHideRest = false;

  cards.forEach((card) => {
    if (shouldHideRest || card.getBoundingClientRect().bottom > panelBottom) {
      card.hidden = true;
      shouldHideRest = true;
    }
  });

  els.eventList.classList.add("is-fitted");
}

function scheduleLayoutSync() {
  if (layoutSyncFrame) {
    cancelAnimationFrame(layoutSyncFrame);
  }

  layoutSyncFrame = requestAnimationFrame(() => {
    layoutSyncFrame = requestAnimationFrame(() => {
      layoutSyncFrame = 0;
      syncEventPanelHeight();
    });
  });
}

function renderTheme() {
  document.body.dataset.theme = state.theme;
  document.body.dataset.subject = state.subject;
  els.themeIcon.textContent = state.theme === "dark" ? "☼" : "☾";
}

function render() {
  renderStaticText();
  renderTheme();
  renderFilters();
  renderWeekdays();
  renderCalendar();
  renderNews();
  renderEventList();
  renderStats();
  scheduleLayoutSync();
}

function openEvent(id) {
  const event = currentEvents().find((item) => item.id === id);
  const copy = eventCopy(event);
  const category = eventCategory(event);
  state.activeEventId = id;

  els.dialog.style.setProperty("--event-color", category.color);
  els.dialogMedia.style.setProperty("--event-color", category.color);
  els.dialogCategory.textContent = t(`categories.${event.category}`);
  els.dialogDate.textContent = formatDate(event.date, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  els.dialogTitle.textContent = copy.title;
  els.dialogDescription.textContent = copy.description;
  els.dialogLink.href = event.url;
  els.dialogDetails.innerHTML = ["format", "level", "location", "deadline"]
    .map((key) => `<div><span>${t(`details.${key}`)}</span><strong>${copy[key]}</strong></div>`)
    .join("");
  updateRegisterButton();
  if (!els.dialog.open) {
    els.dialog.showModal();
  }
}

function updateRegisterButton() {
  const isRegistered = state.registered.has(state.activeEventId);
  els.registerButton.textContent = isRegistered ? t("unregister") : t("register");
  els.registerButton.classList.toggle("is-registered", isRegistered);
}

function eventSubject(eventId) {
  return Object.keys(eventsBySubject).find((key) => eventsBySubject[key].some((event) => event.id === eventId)) || state.subject;
}

async function syncRegisteredEvents() {
  if (!supabaseClient || !state.authUser) return;
  const { data, error } = await supabaseClient.from("user_events").select("event_id").eq("user_id", state.authUser.id);
  if (error) {
    console.error("Could not load registered events", error);
    return;
  }
  state.registered = new Set((data || []).map((row) => row.event_id));
  renderCalendar();
  renderEventList();
  renderStats();
}

async function uploadLocalRegisteredEvents() {
  if (!supabaseClient || !state.authUser) return;
  const localIds = JSON.parse(localStorage.getItem("cc-registered") || "[]");
  if (!localIds.length) return;
  const rows = localIds.map((eventId) => ({
    user_id: state.authUser.id,
    event_id: eventId,
    subject: eventSubject(eventId)
  }));
  const { error } = await supabaseClient.from("user_events").upsert(rows, { onConflict: "user_id,event_id" });
  if (error) console.error("Could not upload local registered events", error);
}

async function saveRegisteredEvent(eventId, isRegistered) {
  if (!supabaseClient || !state.authUser) return;
  if (isRegistered) {
    const { error } = await supabaseClient.from("user_events").upsert(
      {
        user_id: state.authUser.id,
        event_id: eventId,
        subject: eventSubject(eventId)
      },
      { onConflict: "user_id,event_id" }
    );
    if (error) console.error("Could not save registered event", error);
    return;
  }
  const { error } = await supabaseClient.from("user_events").delete().eq("user_id", state.authUser.id).eq("event_id", eventId);
  if (error) console.error("Could not delete registered event", error);
}

async function toggleRegistration() {
  if (!state.activeEventId) return;
  const eventId = state.activeEventId;
  const willRegister = !state.registered.has(eventId);
  if (state.registered.has(eventId)) {
    state.registered.delete(eventId);
  } else {
    state.registered.add(eventId);
  }
  if (state.authUser) {
    await saveRegisteredEvent(eventId, willRegister);
  } else {
    localStorage.setItem("cc-registered", JSON.stringify([...state.registered]));
  }
  updateRegisterButton();
  renderCalendar();
  renderEventList();
  renderStats();
  scheduleLayoutSync();
}

function openAuthDialog(mode = "signin") {
  state.authMode = mode;
  state.authMessage = supabaseClient ? "" : t("authSupabaseMissing");
  renderAuth();
  if (!els.authDialog.open) els.authDialog.showModal();
}

async function handleAuthSubmit(event) {
  event.preventDefault();
  if (!supabaseClient) {
    state.authMessage = t("authSupabaseMissing");
    renderAuth();
    return;
  }

  const name = els.authName.value.trim();
  const email = els.authEmail.value.trim();
  const password = state.authMode === "signup" ? els.authPasswordSignUp.value : els.authPasswordSignIn.value;
  const emailError = validateAuthEmail(email);
  const passwordError = validateAuthPassword(password);
  if (state.authMode === "signup" && !name) {
    state.authMessage = t("authNameRequired");
    renderAuth();
    return;
  }
  if (emailError) {
    state.authMessage = t(emailError);
    renderAuth();
    return;
  }
  if (passwordError) {
    state.authMessage = t(passwordError);
    renderAuth();
    return;
  }

  const result =
    state.authMode === "signup"
      ? await supabaseClient.auth.signUp({ email, password, options: { data: { name } } })
      : await supabaseClient.auth.signInWithPassword({ email, password });

  if (result.error) {
    state.authMessage = result.error.message || t("authError");
    renderAuth();
    return;
  }

  state.authUser = result.data.session?.user || null;
  state.authMessage = state.authUser ? t("authWelcome") : t("authCheckEmail");
  if (state.authUser) {
    await uploadLocalRegisteredEvents();
    await syncRegisteredEvents();
    els.authDialog.close();
  }
  render();
}

async function signOut() {
  if (supabaseClient) await supabaseClient.auth.signOut();
  state.authUser = null;
  state.authMessage = t("authSignedOut");
  state.registered = new Set(JSON.parse(localStorage.getItem("cc-registered") || "[]"));
  render();
}

document.getElementById("prevMonth").addEventListener("click", () => {
  state.month.setMonth(state.month.getMonth() - 1);
  renderCalendar();
  scheduleLayoutSync();
});

document.getElementById("nextMonth").addEventListener("click", () => {
  state.month.setMonth(state.month.getMonth() + 1);
  renderCalendar();
  scheduleLayoutSync();
});

els.filters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  state.activeCategory = button.dataset.category;
  renderFilters();
  renderCalendar();
  renderEventList();
  renderStats();
  scheduleLayoutSync();
});

document.querySelectorAll("[data-lang]").forEach((button) => {
  button.addEventListener("click", () => {
    state.lang = button.dataset.lang;
    localStorage.setItem("cc-lang", state.lang);
    render();
    if (els.dialog.open && state.activeEventId) openEvent(state.activeEventId);
  });
});

els.subjectSwitcher.addEventListener("click", (event) => {
  const button = event.target.closest("[data-subject]");
  if (!button || button.dataset.subject === state.subject) return;

  const previousSubject = state.subject;
  state.subject = button.dataset.subject;
  state.activeCategory = "all";
  state.registeredOnly = false;
  state.activeEventId = null;
  state.newsItems = currentFallbackNews();
  state.newsLastUpdated = null;
  state.newsUsesFallback = true;
  localStorage.setItem("cc-subject", state.subject);

  if (els.dialog.open) els.dialog.close();
  try {
    render();
    refreshNews();
  } catch (error) {
    console.error("Subject switch failed", error);
    state.subject = previousSubject;
    state.newsItems = currentFallbackNews();
    render();
  }
});

els.themeToggle.addEventListener("click", () => {
  state.theme = state.theme === "dark" ? "light" : "dark";
  localStorage.setItem("cc-theme", state.theme);
  renderTheme();
  scheduleLayoutSync();
});

els.showRegistered.addEventListener("click", () => {
  state.registeredOnly = !state.registeredOnly;
  renderEventList();
  renderCalendar();
  renderStats();
  scheduleLayoutSync();
});

document.getElementById("closeDialog").addEventListener("click", () => els.dialog.close());
els.dialog.addEventListener("click", (event) => {
  if (event.target === els.dialog) els.dialog.close();
});
els.registerButton.addEventListener("click", toggleRegistration);
els.authOpenButton.addEventListener("click", () => openAuthDialog("signin"));
els.signOutButton.addEventListener("click", signOut);
els.closeAuthDialog.addEventListener("click", () => els.authDialog.close());
els.authDialog.addEventListener("click", (event) => {
  if (event.target === els.authDialog) els.authDialog.close();
});
els.authModeToggle.addEventListener("click", () => {
  state.authMode = state.authMode === "signup" ? "signin" : "signup";
  state.authMessage = "";
  if (els.authPasswordSignIn) els.authPasswordSignIn.value = "";
  if (els.authPasswordSignUp && els.authPasswordSignUp !== els.authPasswordSignIn) els.authPasswordSignUp.value = "";
  renderAuth();
});
els.authEmail.addEventListener("input", renderEmailSuggestions);
els.authEmail.addEventListener("keydown", (event) => {
  if (event.key === "Tab") {
    const suggestion = emailGhostSuggestion(els.authEmail.value.trim());
    if (suggestion) {
      event.preventDefault();
      applyEmailSuggestion(suggestion);
    }
  }
});
els.authForm.addEventListener("submit", handleAuthSubmit);
window.addEventListener("resize", scheduleLayoutSync);
window.addEventListener("load", scheduleLayoutSync);

if (document.fonts?.ready) {
  document.fonts.ready.then(scheduleLayoutSync);
}

if ("ResizeObserver" in window) {
  const layoutObserver = new ResizeObserver(scheduleLayoutSync);
  layoutObserver.observe(els.calendarColumn);
  layoutObserver.observe(els.newsList);
}

render();
refreshNews();
setInterval(refreshNews, NEWS_REFRESH_INTERVAL);

if (supabaseClient) {
  supabaseClient.auth.getUser().then(async ({ data }) => {
    state.authUser = data.user;
    if (state.authUser) {
      await uploadLocalRegisteredEvents();
      await syncRegisteredEvents();
    }
    renderAuth();
  }).catch((error) => {
    console.error("Could not restore Supabase session", error);
  });
  supabaseClient.auth.onAuthStateChange(async (_event, session) => {
    state.authUser = session?.user || null;
    if (state.authUser) {
      await uploadLocalRegisteredEvents();
      await syncRegisteredEvents();
    }
    render();
  });
}
}
