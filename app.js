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
      meetup: "Митапы"
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
      meetup: "Meetups"
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

const categories = [
  { id: "hackathon", color: "#0f766e" },
  { id: "olympiad", color: "#c2410c" },
  { id: "ai", color: "#7c3aed" },
  { id: "conference", color: "#2563eb" },
  { id: "workshop", color: "#9333ea" },
  { id: "meetup", color: "#be123c" }
];

const events = [
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
  { id: "belchonok-info-2026", category: "olympiad", date: "2026-10-01", url: "https://olimpiada.ru/activity/398" },
  { id: "mos-inf-2026", category: "olympiad", date: "2026-10-05", url: "https://mos-inf.olimpiada.ru/" },
  { id: "ai-summit-2026", category: "ai", date: "2026-10-07", url: "https://aisummit.ru/" },
  { id: "spbu-engineering-2026", category: "olympiad", date: "2026-10-25", url: "https://olimpiada.ru/activity/5345" },
  { id: "innopolis-open-info-2026", category: "olympiad", date: "2026-11-01", url: "https://olimpiada.ru/activity/5283" },
  { id: "open-programming-2026", category: "olympiad", date: "2026-11-19", url: "https://olimpiada.ru/activity/23" },
  { id: "team-programming-2026", category: "olympiad", date: "2026-12-01", url: "https://olimpiada.ru/activity/4326" }
];

const newsItems = [
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
];

const NEWS_REFRESH_INTERVAL = 5 * 60 * 60 * 1000;
const HN_NEWS_URL = "https://hn.algolia.com/api/v1/search_by_date?tags=story&hitsPerPage=18";
const newsColors = ["#0f766e", "#2563eb", "#be123c", "#c2410c", "#7c3aed", "#9333ea", "#0e7490", "#a16207"];

const state = {
  lang: localStorage.getItem("cc-lang") || "ru",
  theme: localStorage.getItem("cc-theme") || "light",
  month: new Date(2026, 6, 1),
  activeCategory: "all",
  registeredOnly: false,
  registered: new Set(JSON.parse(localStorage.getItem("cc-registered") || "[]")),
  activeEventId: null,
  newsItems,
  newsLastUpdated: null,
  newsUsesFallback: true
};

const els = {
  html: document.documentElement,
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
  themeIcon: document.getElementById("themeIcon")
};

function t(path) {
  return path.split(".").reduce((acc, key) => acc?.[key], translations[state.lang]);
}

function eventCopy(event) {
  return translations[state.lang].events[event.id];
}

function eventCategory(event) {
  return categories.find((category) => category.id === event.category);
}

function filteredEvents() {
  return events.filter((event) => {
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
}

function renderFilters() {
  const filterItems = [{ id: "all", color: "var(--text)" }, ...categories];
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
      const copy = item.live ? item.copy[state.lang] : translations[state.lang].news[item.id];
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
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(HN_NEWS_URL, { signal: controller.signal });
    if (!response.ok) throw new Error(`News request failed: ${response.status}`);

    const data = await response.json();
    const liveItems = mapHackerNewsItems(data.hits || []);
    if (liveItems.length < 4) throw new Error("Not enough live news items");

    state.newsItems = liveItems;
    state.newsLastUpdated = new Date();
    state.newsUsesFallback = false;
    renderNews();
    scheduleLayoutSync();
  } catch {
    state.newsItems = newsItems;
    state.newsUsesFallback = true;
    renderNews();
    scheduleLayoutSync();
  } finally {
    clearTimeout(timeoutId);
  }
}

function renderStats() {
  els.registeredCount.textContent = state.registered.size;
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
  const event = events.find((item) => item.id === id);
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

function toggleRegistration() {
  if (!state.activeEventId) return;
  if (state.registered.has(state.activeEventId)) {
    state.registered.delete(state.activeEventId);
  } else {
    state.registered.add(state.activeEventId);
  }
  localStorage.setItem("cc-registered", JSON.stringify([...state.registered]));
  updateRegisterButton();
  renderCalendar();
  renderEventList();
  renderStats();
  scheduleLayoutSync();
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
