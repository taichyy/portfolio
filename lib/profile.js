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
                "整併系統架構：移除已停用地區的程式碼、資料表與翻譯檔，只留北美市場；重整程式結構與資料庫命名，重建 migration，本機環境一個指令就能建好。",
                "Led a system consolidation and migration: removed the code, database tables and translation files for discontinued regions, keeping only the North American market. Restructured the codebase and database naming, and rebuilt the database migrations so the local development environment can be set up in one step, reducing maintenance complexity.",
            ),
            t(
                "導入統一的日誌（Logging）框架：請求追蹤 ID、敏感資料自動遮罩、分級規範，涵蓋 HTTP、排程與佇列。十餘個模組的舊日誌全部遷移，並在 CI 加上測試擋下舊寫法。",
                "Designed and introduced a unified logging framework with request trace IDs, automatic masking of sensitive data and log-level conventions, covering HTTP requests, scheduled tasks and queue jobs. Migrated the legacy logging in more than ten modules and wrote automated tests that block the old patterns in CI, making issues faster to trace and the system more stable.",
            ),
            t(
                "依弱點掃描報告修補 DOM XSS、補上 CSRF 驗證，並為第三方合作夥伴的串接加上安全驗證。",
                "Fixed DOM XSS vulnerabilities and added CSRF protection based on security scan reports, and added authentication to third-party partner integrations to strengthen system security.",
            ),
            t(
                "整合多種第三方支付（含先買後付 BNPL），串接訂單搜尋、退貨規則、報表與 EDI 匯出；加快付款對帳與銷售報表的速度。",
                "Owned the integration of several third-party payment providers, including buy now, pay later (BNPL), connecting them to order search, return rules, reports and EDI exports. Improved the performance of payment reconciliation and sales reports.",
            ),
            t(
                "開發門市取貨，以及自動建立退貨的排程，讓排程和前台走同一套退貨流程；擴充 EDI 文件格式，修復退款單缺漏、通知信排程錯誤等問題。",
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
                "一個人開發公司的 ERP 系統：架構設計、前端、API 設計，還有初期的資料庫規劃。",
                "Developed the company's ERP system independently, covering architecture, front-end development, API design and initial database planning.",
            ),
            t(
                "從零建立前端架構，完成 100 多個頁面，涵蓋人資、倉儲、日常作業三大模組。",
                "Built the front-end architecture from scratch, covering 100+ pages across three modules: HR, warehouse management and daily operations.",
            ),
            t(
                "已正式上線，並作為商業產品對外販售。",
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
        t("Tai，|軟體工程師。", "Tai, software engineer."),
        t("[[產品開發]]，", "I [[build web products]] from start to finish,"),
        t("從系統架構|到介面細節。", "from system architecture to interface details."),
    ],
    focus: "TypeScript · React · Next.js",

    intro: t(
        "主要用 TypeScript、React、Next.js 做全端網頁開發。也做自己的產品和開源工具，開發到上線都自己來。",
        "I work across the stack, mainly with TypeScript, React and Next.js. I've also developed and launched my own products and open-source tools.",
    ),

    summary: [
        t(
            `網頁開發 ${YEARS} 年以上，以前端為主，後端和資料庫也能處理。`,
            `I have over ${YEARS} years of experience in web development. My main focus is front-end work, but I also work on the back end and databases.`,
        ),
        t(
            "之前一個人負責一套商業 ERP 的前端，從架構到上線，做了 100 多個頁面。工作以外也做自己的產品和開源工具，包括一套 Zero-Knowledge 架構的密碼管理器。",
            "I previously led the front-end development of a commercial ERP system, taking it from architecture planning through development and launch. Outside work, I've built and released my own products and open-source tools, including a zero-knowledge password manager.",
        ),
        t(
            "做完之後，我會看它有沒有人用、有沒有解決原本的問題。",
            "I pay attention to how people use software and whether it solves the problem it was made for.",
        ),
    ],

    socials: SOCIALS,

    contact: {
        heading: t("有事，[[寫信]]給我", "Let's get in [[touch]]"),
        body: t(
            "接受軟體工程相關的工作邀約與合作。想聊技術、職缺或產品，直接寄信就好。",
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
            "獲選教育部青年發展署「青年百億海外圓夢基金計畫」，到加拿大 B.C. 省 Kamloops 待了一個月，上課、討論、發表全程英文，完成一份北美創業計畫。我負責市場研究，依加拿大政府統計和產業報告寫計畫，最後用英文上台發表，取得結業證書。",
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
        t("我是 Tai，[[軟體工程師]]。", "I'm Tai, a [[software engineer]]."),
        t(
            "喜歡把想法變成現實。",
            "I like to turn ideas into reality.",
        ),
    ],
    body: [
        {
            label: t("現在", "Now"),
            text: t(
                "目前是網頁軟體工程師，開發公司內部的產品與系統。",
                "Currently working as a web software engineer, developing internal products and systems.",
            ),
        },
        {
            label: t("做工程", "How I engineer"),
            text: t(
                "寫功能時，會先想之後怎麼維護、怎麼擴充。一個人扛過商業 ERP 的前端架構之後，更知道一開始的規劃有多重要。",
                "I think about how a system will be maintained as well as whether a feature works. Building the front end of a commercial ERP gave me first-hand experience with the cost of early architecture decisions.",
            ),
        },
        {
            label: t("產品這件事", "On products"),
            text: t(
                "我喜歡做產品，常自己找題目來做：確認需求、規劃功能、設計介面、開發、部署，都自己來。TaidyPass 和 MeetRent 就是這樣做出來的。",
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
