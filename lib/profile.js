// Personal + professional facts for the portfolio. First person, factual.
// Real facts come from the existing résumé data in the repo. Anything not
// known is a clearly-marked（待補：…）placeholder — never invented.

export const profile = {
    name: "Tai",
    latinName: "Tai",
    short: "Tai",
    title: "軟體工程師 · Software Engineer",
    currentRole: `${new Date().getFullYear() - 2017}th year of experience in web development`,
    email: "tai@heytai.dev",
    location: "Taiwan",

    // Homepage identity block
    intro:
        "我做全端網頁開發，主力是 TypeScript、React 與 Next.js。也自己從零打造並上線過產品與開源工具。",

    // Concise professional summary (homepage §3). Factual, no slogans.
    summary: [
        `我是一名網頁工程師，擁有 ${new Date().getFullYear() - 2017} 年以上的相關經驗，是個更專注在前端的全端工程師。`,
        "在此之前曾獨立負責過一套商業化 ERP 系統的前端架構——從 0 到 1 建立整個前端，最後上線販售。也自己發起、設計並上線過產品與開源工具，包含一套 Zero-Knowledge 架構的密碼管理器。",
        "我不只寫程式。我在意軟體怎麼被使用、解決了什麼問題。",
    ],

    socials: [
        { label: "GitHub", href: "https://github.com/taichyy", icon: "icon-github" },
        { label: "Email", href: "mailto:tai@heytai.dev", icon: "icon-gmail" },
    ],

    contact: {
        heading: "歡迎與我聯絡",
        body: "對軟體工程相關的工作機會與合作保持開放。工作邀約、技術討論或產品合作都可以直接寄信給我。",
        email: "tai@heytai.dev",
    },
};

// ── Professional experience ──────────────────────────────────────────
// Dates and responsibilities taken from the existing résumé data.
export const experience = [
    {
        company: "ASUS 華碩電腦股份有限公司",
        role: "軟體研發工程師 · Software R&D Engineer",
        period: `2025/08 – ${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, '0')}`,
        current: false,
        summary: "在研發單位進行內部產品與系統的軟體開發。",
        points: [
            "（待補：可補上實際負責的系統類型、技術棧與職責範圍——先保留，避免捏造細節。）",
        ],
        stack: [],
    },
    {
        company: "誠諾工程技術股份有限公司",
        role: "高級前端網頁工程師",
        period: "2024/04 – 2024/07",
        summary: "獨立負責公司 ERP 系統的前端。",
        points: [
            "獨立開發公司 ERP 系統，負責架構設計、前端開發、API 設計與資料庫前期規劃。",
            "從 0 到 1 打造完整前端架構，開發 100+ 頁面、三大模組（人資系統、倉儲管理、日常作業）。",
            "系統正式上線，並作為商業產品對外販售。",
        ],
        stack: ["TypeScript", "Next.js", "REST API"],
        projectSlug: "erp",
    },
    {
        company: "(玩具與娛樂產業公司)",
        role: "軟體工程師",
        period: "2023/12 – 2024/03",
        summary: "開發自動化生產工具與會員系統前端。",
        points: [
            "開發海報自動生成系統，整合 Adobe Illustrator Script 產生可印刷海報，降低約 80% 製作時間。",
            "開發 LINE LIFF 會員中心前端頁面。",
        ],
        stack: ["JavaScript", "Next.js", "Adobe Script", "LINE LIFF"],
        projectSlug: "ichiban-poster",
    },
];

export const education = [
    {
        school: "國立高雄科技大學",
        dept: "資訊管理系",
        period: "2019/09 – 2023/07",
    },
];

// ── Technical profile ────────────────────────────────────────────────
// Grouped by actual role, not a badge wall. Only tech backed by real
// project or professional experience is listed.
export const techProfile = [
    {
        group: "主力",
        en: "Primary",
        items: ["TypeScript", "JavaScript", "React", "Next.js", "Node.js", "Tailwind CSS"],
    },
    {
        group: "資料庫與後端",
        en: "Backend & Data",
        items: ["MongoDB (NoSQL)", "MySQL", "PHP", "REST API 設計"],
    },
    {
        group: "工具與部署",
        en: "Tools & Infra",
        items: ["Git / GitHub", "Vercel", "Linux (Ubuntu CLI)"],
    },
    {
        group: "也在使用",
        en: "Also working with",
        items: ["AI 輔助開發", "自動化流程", "Adobe Illustrator Script"],
    },
];

export const languages = [
    { name: "中文", level: "母語" },
    { name: "English", level: "TOEIC 795" },
];

// ── About page copy ──────────────────────────────────────────────────
export const about = {
    intro: [
        "我是 Tai，一名軟體工程師。",
        "我做全端網頁開發，也自己打造產品。",
    ],
    body: [
        {
            label: "現在",
            text: "擔任網頁軟體工程師，處理實際會被使用的產品與系統。",
        },
        {
            label: "我怎麼做工程",
            text: "我在意的不只是功能能不能動，而是這套系統之後好不好維護。我獨立負責過一套商業化 ERP 的前端架構，那段經驗讓我很清楚：前期把架構定好，遠比事後補救便宜。",
        },
        {
            label: "產品這件事",
            text: "我對軟體、產品與商業之間的交界特別有興趣。我會自己發起產品——從釐清問題、設計、開發到部署。因為我想知道一個想法要真的變成有人用的東西，中間到底發生什麼事。TaidyPass 和 ZooFun 都是這樣來的。",
        },
        {
            label: "持續在學",
            text: "我習慣用真實的專案來學東西，而不是只看教學。最近特別花時間在 AI 輔助開發與自動化上，想知道這些工具能讓我做出哪些更酷的東西。",
        },
    ],
};
