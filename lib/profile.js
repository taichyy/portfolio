import { EMAIL, SOCIALS } from "@/lib/site"
import { t, localize } from "@/lib/i18n/localize"

// Unknown facts are marked (TODO) / （待補）, never invented.

// Freelance counts from here up to the first full-time job.
const FREELANCE_START = "2019-09";

// null means the current month.
const monthIndex = (ym) => {
    if (!ym) {
        const now = new Date();
        return now.getFullYear() * 12 + now.getMonth();
    }
    const [y, m] = ym.split("-").map(Number);
    return y * 12 + (m - 1);
};

const formatMonth = (ym) => {
    const i = monthIndex(ym);
    return `${Math.floor(i / 12)}/${String((i % 12) + 1).padStart(2, "0")}`;
};

// ── Professional experience ──────────────────────────────────────────
const experienceSource = [
    {
        company: t("ASUS 華碩電腦股份有限公司", "ASUSTeK Computer Inc."),
        role: t("軟體工程師", "Software R&D Engineer"),
        start: "2025-08",
        end: null,
        current: false,
        summary: t(
            "負責北美電商平台的後端開發與維護。",
            "Back-end development and maintenance for a North American e-commerce platform.",
        ),
        points: [
            t(
                "主導系統架構整併與遷移：移除已停用地區的程式碼、資料表與翻譯檔，只保留北美市場；重整程式結構與資料庫命名，並重建資料庫 migration，讓本機開發環境可一鍵建置，降低維護複雜度。",
                "Led a system consolidation and migration: removed the code, database tables and translation files for discontinued regions, keeping only the North American market. Restructured the codebase and database naming, and rebuilt the database migrations so the local development environment can be set up in one step, reducing maintenance complexity.",
            ),
            t(
                "設計並導入統一的日誌（Logging）框架，包含請求追蹤 ID、敏感資料自動遮罩與分級規範，涵蓋 HTTP、排程與佇列工作；將十餘個模組的舊式日誌全面遷移，並撰寫自動化測試在 CI 阻擋舊寫法，提升問題追蹤效率與系統穩定度。",
                "Designed and introduced a unified logging framework with request trace IDs, automatic masking of sensitive data and log-level conventions, covering HTTP requests, scheduled tasks and queue jobs. Migrated the legacy logging in more than ten modules and wrote automated tests that block the old patterns in CI, making issues faster to trace and the system more stable.",
            ),
            t(
                "依資安弱點掃描報告修補 DOM XSS 漏洞並補上 CSRF 驗證，同時為第三方合作夥伴整合加入安全驗證機制，強化系統資安。",
                "Fixed DOM XSS vulnerabilities and added CSRF protection based on security scan reports, and added authentication to third-party partner integrations to strengthen system security.",
            ),
            t(
                "負責多種第三方支付（含先買後付 BNPL）的整合，串接訂單搜尋、退貨規則、報表與 EDI 匯出；優化付款對帳與銷售報表效能。",
                "Owned the integration of several third-party payment providers, including buy now, pay later (BNPL), connecting them to order search, return rules, reports and EDI exports. Improved the performance of payment reconciliation and sales reports.",
            ),
            t(
                "開發門市取貨功能與自動建立退貨的排程，統一排程與前台的退貨流程；擴充 EDI 電子資料交換文件格式，並修復退款單缺漏、錯誤通知信排程等營運問題。",
                "Built in-store pickup and a scheduled job that creates returns automatically, unifying the return flow between scheduled jobs and the storefront. Extended the EDI (electronic data interchange) document formats, and fixed operational issues such as missing refund records and misfiring notification email schedules.",
            ),
        ],
        stack: ["PHP", "Laravel", "MySQL"],
    },
    {
        company: t("誠諾工程技術股份有限公司", "Cheng-Nuo Engineering Technology CO., LTD."),
        role: t("高級前端網頁工程師", "Senior Front-End Web Engineer"),
        start: "2024-04",
        end: "2024-07",
        summary: t(
            "獨立負責公司 ERP 系統的前端開發。",
            "Independently responsible for front-end development of the company's ERP system.",
        ),
        points: [
            t(
                "獨立開發公司 ERP 系統，工作包含架構設計、前端開發、API 設計，以及初期資料庫規劃。",
                "Developed the company's ERP system independently, covering architecture, front-end development, API design and initial database planning.",
            ),
            t(
                "從零建立完整的前端架構，完成 100+ 個頁面，涵蓋人資、倉儲管理和日常作業三大模組。",
                "Built the front-end architecture from scratch, covering 100+ pages across three modules: HR, warehouse management and daily operations.",
            ),
            t(
                "系統已正式上線，並以商業產品形式對外販售。",
                "The system launched and is now sold as a commercial product.",
            ),
        ],
        stack: ["TypeScript", "Next.js", "REST API"],
    },
    {
        company: t("(玩具與娛樂產業公司)", "(Toy & entertainment industry company)"),
        role: t("軟體工程師", "Software Engineer"),
        start: "2023-12",
        end: "2024-03",
        summary: t(
            "負責自動化生產工具，以及會員系統的前端開發。",
            "Developed production automation tools and the front end of a membership system.",
        ),
        points: [
            t(
                "開發海報自動生成系統，串接 Adobe Illustrator Script 輸出可印刷的海報，將製作時間縮短約 80%。",
                "Developed an automated poster generator with Adobe Illustrator Script to produce print-ready posters, reducing production time by around 80%.",
            ),
            t(
                "開發 LINE LIFF 會員中心的前端頁面。",
                "Developed the front end of a LINE LIFF member centre.",
            ),
        ],
        stack: ["JavaScript", "Next.js", "Adobe Script", "LINE LIFF"],
    },
];

// Full-time months exclude gaps between jobs; spans are inclusive.
// Total = full-time + freelance, so the homepage numbers always add up.
const computeTenure = () => {
    const span = (start, end) => monthIndex(end) - monthIndex(start) + 1;
    const fullTimeMonths = experienceSource.reduce((sum, job) => sum + span(job.start, job.end), 0);
    const firstJob = Math.min(...experienceSource.map((job) => monthIndex(job.start)));
    const freelanceMonths = firstJob - monthIndex(FREELANCE_START);

    return { fullTimeMonths, freelanceMonths, totalMonths: fullTimeMonths + freelanceMonths };
};

const YEARS = Math.floor(computeTenure().totalMonths / 12);

const profileSource = {
    name: "Tai",
    latinName: "Tai",
    short: "Tai",
    title: t("軟體工程師", "Software Engineer"),
    currentRole: t(`網頁開發 ${YEARS} 年以上`, `${YEARS}+ years in web development`),
    email: EMAIL,
    location: t("台灣", "Taiwan"),

    // Homepage headline, one entry per line. [[words]] get the brand mark;
    // "|" is an allowed line break (Chinese breaks nowhere else).
    headline: [
        t("Tai，|一名軟體工程師。", "Tai, software engineer."),
        t("我做|[[網頁產品的開發]]，", "I [[build web products]] from start to finish,"),
        t("從系統架構|到介面細節。", "from system architecture to interface details."),
    ],
    focus: "TypeScript · React · Next.js",

    intro: t(
        "我主要使用 TypeScript、React 和 Next.js 開發全端網頁應用，也做過自己的產品和開源工具，從開發到正式上線都自己處理。",
        "I work across the stack, mainly with TypeScript, React and Next.js. I've also developed and launched my own products and open-source tools.",
    ),

    summary: [
        t(
            `我有 ${YEARS} 年以上的網頁開發經驗，主要做前端，也能處理後端與資料庫相關工作。`,
            `I have over ${YEARS} years of experience in web development. My main focus is front-end work, but I also work on the back end and databases.`,
        ),
        t(
            "之前我曾獨立負責一套商業化 ERP 系統的前端，從架構規劃、開發到上線，完成 100 多個頁面。工作之外，我也做過自己的產品和開源工具，其中包括一套採用 Zero-Knowledge 架構的密碼管理器。",
            "I previously led the front-end development of a commercial ERP system, taking it from architecture planning through development and launch. Outside work, I've built and released my own products and open-source tools, including a zero-knowledge password manager.",
        ),
        t(
            "我也會關心產品實際怎麼被使用，以及它有沒有解決原本的問題。",
            "I pay attention to how people use software and whether it solves the problem it was made for.",
        ),
    ],

    socials: SOCIALS,

    contact: {
        heading: t("歡迎與我[[聯絡]]", "Let's get in [[touch]]"),
        body: t(
            "目前歡迎軟體工程相關的工作邀約與合作。如果你想聊技術、工作機會或產品，也可以直接寄信給我。",
            "I'm open to software engineering opportunities and collaborations. Feel free to email me about a role, a technical discussion or a product idea.",
        ),
    },
};


const educationSource = [
    {
        school: t(
            "國立高雄科技大學",
            "National Kaohsiung University of Science and Technology",
        ),
        dept: t("資訊管理系", "Department of Information Management"),
        period: "2019/09 – 2023/07",
    },
];

// ── Technical profile ────────────────────────────────────────────────
const techProfileSource = [
    {
        id: "primary",
        label: t("主力", "Primary"),
        items: ["TypeScript", "JavaScript", "React", "Next.js", "Node.js", "Tailwind CSS"],
    },
    {
        id: "backend",
        label: t("資料庫與後端", "Backend & Data"),
        items: [
            "MongoDB (NoSQL)",
            "MySQL",
            "PHP",
            t("REST API 設計", "REST API design"),
        ],
    },
    {
        id: "tools",
        label: t("工具與部署", "Tools & Infra"),
        items: ["Git / GitHub", "Vercel", "Linux (Ubuntu CLI)"],
    },
    {
        id: "also",
        label: t("也在使用", "Also working with"),
        items: [
            t("AI 輔助開發", "AI-assisted development"),
            t("自動化流程", "Automation"),
        ],
    },
];

const trainingSource = [
    {
        program: t("Entrepreneurs of the Future 未來創業家計畫", "Entrepreneurs of the Future Program"),
        org: t(
            "加拿大湯普森河大學（TRU）",
            "Thompson Rivers University, Canada",
        ),
        period: "2026/09 – 2026/10",
        text: t(
            "獲選教育部青年發展署「青年百億海外圓夢基金計畫」，在加拿大 B.C. 省 Kamloops 市待了一個月，上課、討論和發表全程使用英文、完成一份北美創業計畫。我負責市場研究，並根據加拿大政府統計和產業報告為基礎完成計畫，最後使用英文上台發表，並取得結業證書。",
            "Selected for the Youth Development Administration's overseas program (Ministry of Education, Taiwan). I spent a month in Kamloops, British Columbia, where all classes, discussions and presentations were in English, and completed a business plan for the North American market. I was responsible for the market research and based the plan on Canadian government statistics and industry reports. I presented it in English at the end of the program and received a certificate of completion.",
        ),
    },
];

const languagesSource = [
    { name: t("中文", "Chinese"), level: t("母語", "Native") },
    { name: t("英文", "English"), level: t("TOEIC 795 · 加拿大全英文課程 1 個月", "TOEIC 795 · 1 month of English-taught study in Canada") },
];

// ── About page copy ──────────────────────────────────────────────────
const aboutSource = {
    intro: [
        t("我是 Tai，一名[[軟體工程師]]。", "I'm Tai, a [[software engineer]]."),
        t(
            "喜歡把想法變成現實。",
            "I like to turn ideas into reality.",
        ),
    ],
    body: [
        {
            label: t("現在", "Now"),
            text: t(
                "目前擔任網頁軟體工程師，負責公司內部產品與系統的開發。",
                "Currently working as a web software engineer, developing internal products and systems.",
            ),
        },
        {
            label: t("做工程", "How I engineer"),
            text: t(
                "寫功能時，我也會考慮後續要怎麼維護和擴充。之前獨立負責商業化 ERP 的前端架構，讓我實際碰過這類問題，也更重視一開始的架構規劃。",
                "I think about how a system will be maintained as well as whether a feature works. Building the front end of a commercial ERP gave me first-hand experience with the cost of early architecture decisions.",
            ),
        },
        {
            label: t("產品這件事", "On products"),
            text: t(
                "我對產品開發很有興趣，也會自己找題目做產品。從確認需求、規劃功能、設計介面，到開發和部署，我都會參與。TaidyPass 和 MeetRent 就是這樣開始的。",
                "I'm interested in product development, and I often start projects of my own. I work through the problem, plan the features, design the interface, write the code and deploy it. TaidyPass and MeetRent started this way.",
            ),
        },
    ],
};

// ── Locale-resolved accessors ────────────────────────────────────────
export const getProfile = (locale) => localize(profileSource, locale);

export const getExperience = (locale) =>
    localize(experienceSource, locale).map((job) => ({
        ...job,
        period: `${formatMonth(job.start)} – ${formatMonth(job.end)}`,
    }));

export const getTenure = computeTenure;
export const getEducation = (locale) => localize(educationSource, locale);
export const getTechProfile = (locale) => localize(techProfileSource, locale);
export const getTraining = (locale) => localize(trainingSource, locale);
export const getLanguages = (locale) => localize(languagesSource, locale);
export const getAbout = (locale) => localize(aboutSource, locale);
