import { t, localize } from "@/lib/i18n/localize"

// Personal + professional facts for the portfolio. First person, factual.
// Real facts come from the existing résumé data in the repo. Anything not
// known is a clearly-marked（待補：…）/ (TODO: …) placeholder — never invented.
//
// Both languages sit side by side via t(zh, en) so they can't drift apart.
// Call the get*(locale) helpers below to read a single-language version.

const YEARS = new Date().getFullYear() - 2017;

const profileSource = {
    name: "Tai",
    latinName: "Tai",
    short: "Tai",
    title: t("軟體工程師", "Software Engineer"),
    currentRole: t(`網頁開發第 ${YEARS} 年`, `${YEARS} years in web development`),
    email: "tai@heytai.dev",
    location: t("台灣", "Taiwan"),

    // Homepage identity block
    intro: t(
        "我做全端網頁開發，主力是 TypeScript、React 與 Next.js。也自己從零打造並上線過產品與開源工具。",
        "I build full-stack web applications, mainly with TypeScript, React and Next.js. I also design, build and ship my own products and open-source tools from scratch.",
    ),

    // Concise professional summary (homepage §3). Factual, no slogans.
    summary: [
        t(
            `我是一名網頁工程師，擁有 ${YEARS} 年以上的相關經驗，是個更專注在前端的全端工程師。`,
            `I'm a web engineer with over ${YEARS} years of experience — a full-stack developer with a stronger focus on the front end.`,
        ),
        t(
            "在此之前曾獨立負責過一套商業化 ERP 系統的前端架構——從 0 到 1 建立整個前端，最後上線販售。也自己發起、設計並上線過產品與開源工具，包含一套 Zero-Knowledge 架構的密碼管理器。",
            "Before that I single-handedly owned the front-end architecture of a commercial ERP system — building the entire front end from zero to one, until it shipped and was sold. I've also started, designed and launched my own products and open-source tools, including a zero-knowledge password manager.",
        ),
        t(
            "我不只寫程式。我在意軟體怎麼被使用、解決了什麼問題。",
            "I don't just write code. I care about how software gets used, and what problem it actually solves.",
        ),
    ],

    socials: [
        { label: "GitHub", href: "https://github.com/taichyy", icon: "icon-github" },
        { label: "Email", href: "mailto:tai@heytai.dev", icon: "icon-gmail" },
    ],

    contact: {
        heading: t("歡迎與我聯絡", "Let's get in touch"),
        body: t(
            "對軟體工程相關的工作機會與合作保持開放。工作邀約、技術討論或產品合作都可以直接寄信給我。",
            "I'm open to software engineering roles and collaborations. Job offers, technical discussions or product partnerships — just send me an email.",
        ),
        email: "tai@heytai.dev",
    },
};

// ── Professional experience ──────────────────────────────────────────
// Dates and responsibilities taken from the existing résumé data.
const experienceSource = [
    {
        company: t("ASUS 華碩電腦股份有限公司", "ASUSTeK Computer Inc."),
        role: t("軟體研發工程師", "Software R&D Engineer"),
        period: `2025/08 – ${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, '0')}`,
        current: false,
        summary: t(
            "在研發單位進行內部產品與系統的軟體開發。",
            "Software development for internal products and systems within the R&D organisation.",
        ),
        points: [
            t(
                "（待補：可補上實際負責的系統類型、技術棧與職責範圍——先保留，避免捏造細節。）",
                "(TODO: add the actual systems, tech stack and scope of responsibility — left blank on purpose rather than invented.)",
            ),
        ],
        stack: [],
    },
    {
        // No published English company name — kept in Chinese rather than invented.
        company: t("誠諾工程技術股份有限公司", "Cheng-Nuo Engineering Technology CO., LTD."),
        role: t("高級前端網頁工程師", "Senior Front-End Web Engineer"),
        period: "2024/04 – 2024/07",
        summary: t(
            "獨立負責公司 ERP 系統的前端。",
            "Solely responsible for the front end of the company's ERP system.",
        ),
        points: [
            t(
                "獨立開發公司 ERP 系統，負責架構設計、前端開發、API 設計與資料庫前期規劃。",
                "Built the company's ERP system single-handedly: architecture design, front-end development, API design and early database planning.",
            ),
            t(
                "從 0 到 1 打造完整前端架構，開發 100+ 頁面、三大模組（人資系統、倉儲管理、日常作業）。",
                "Created the full front-end architecture from zero to one — 100+ pages across three major modules (HR, warehouse management and daily operations).",
            ),
            t(
                "系統正式上線，並作為商業產品對外販售。",
                "The system went live and is sold commercially as a product.",
            ),
        ],
        stack: ["TypeScript", "Next.js", "REST API"],
        projectSlug: "erp",
    },
    {
        company: t("(玩具與娛樂產業公司)", "(Toy & entertainment industry company)"),
        role: t("軟體工程師", "Software Engineer"),
        period: "2023/12 – 2024/03",
        summary: t(
            "開發自動化生產工具與會員系統前端。",
            "Built automated production tooling and the front end of a membership system.",
        ),
        points: [
            t(
                "開發海報自動生成系統，整合 Adobe Illustrator Script 產生可印刷海報，降低約 80% 製作時間。",
                "Developed an automated poster generation system integrating Adobe Illustrator Script to output print-ready posters, cutting production time by around 80%.",
            ),
            t(
                "開發 LINE LIFF 會員中心前端頁面。",
                "Built the front-end pages of a LINE LIFF membership centre.",
            ),
        ],
        stack: ["JavaScript", "Next.js", "Adobe Script", "LINE LIFF"],
        projectSlug: "ichiban-poster",
    },
];

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
// Grouped by actual role, not a badge wall. Only tech backed by real
// project or professional experience is listed.
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
            "Adobe Illustrator Script",
        ],
    },
];

const languagesSource = [
    { name: t("中文", "Chinese"), level: t("母語", "Native") },
    { name: t("英文", "English"), level: "TOEIC 795" },
];

// ── About page copy ──────────────────────────────────────────────────
const aboutSource = {
    intro: [
        t("我是 Tai，一名軟體工程師。", "I'm Tai, a software engineer."),
        t(
            "我做全端網頁開發，也自己打造產品。",
            "I build full-stack web applications, and my own products too.",
        ),
    ],
    body: [
        {
            label: t("現在", "Now"),
            text: t(
                "擔任網頁軟體工程師，處理實際會被使用的產品與系統。",
                "Working as a web software engineer on products and systems that people actually use.",
            ),
        },
        {
            label: t("我怎麼做工程", "How I engineer"),
            text: t(
                "我在意的不只是功能能不能動，而是這套系統之後好不好維護。我獨立負責過一套商業化 ERP 的前端架構，那段經驗讓我很清楚：前期把架構定好，遠比事後補救便宜。",
                "I care about more than whether a feature works — I care about whether the system will still be maintainable later. Owning the front-end architecture of a commercial ERP taught me one thing clearly: getting the architecture right up front is far cheaper than patching it up afterwards.",
            ),
        },
        {
            label: t("產品這件事", "On products"),
            text: t(
                "我對軟體、產品與商業之間的交界特別有興趣。我會自己發起產品——從釐清問題、設計、開發到部署。因為我想知道一個想法要真的變成有人用的東西，中間到底發生什麼事。TaidyPass 和 ZooFun 都是這樣來的。",
                "I'm especially interested in where software, product and business meet. I start products myself — framing the problem, designing, building and deploying. I want to know what actually happens between an idea and something people use. TaidyPass and ZooFun both came out of that.",
            ),
        },
        {
            label: t("持續在學", "Always learning"),
            text: t(
                "我習慣用真實的專案來學東西，而不是只看教學。最近特別花時間在 AI 輔助開發與自動化上，想知道這些工具能讓我做出哪些更酷的東西。",
                "I learn through real projects rather than tutorials. Lately I've been spending time on AI-assisted development and automation, to find out what cooler things those tools let me build.",
            ),
        },
    ],
};

// ── Locale-resolved accessors ────────────────────────────────────────
export const getProfile = (locale) => localize(profileSource, locale);
export const getExperience = (locale) => localize(experienceSource, locale);
export const getEducation = (locale) => localize(educationSource, locale);
export const getTechProfile = (locale) => localize(techProfileSource, locale);
export const getLanguages = (locale) => localize(languagesSource, locale);
export const getAbout = (locale) => localize(aboutSource, locale);

// Locale-independent bits used outside of rendering (metadata, JSON-LD).
export const contactEmail = profileSource.email;
export const socials = profileSource.socials;
