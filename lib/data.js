import {
    Brush,
    Code2,
    Computer,
    FileDown,
    LayoutGrid,
    ListChecks,
    RefreshCcw,
} from "lucide-react";

// ── Project categories (ordered; only non-empty groups render) ───────
export const categories = [
    { id: "professional", label: "實務作品", en: "Professional Work" },
    { id: "product", label: "自己的產品", en: "Own Products" },
    { id: "opensource", label: "開源專案", en: "Open Source" },
    { id: "personal", label: "個人專案", en: "Personal Projects" },
];

export const categoryMeta = Object.fromEntries(categories.map((c) => [c.id, c]));

// ── Projects ─────────────────────────────────────────────────────────
// Engineering case studies. `featured` + `priority` drive homepage order.
// Case-study fields (rendered only when present):
//   overview · context · contribution(MY ROLE) · challenge ·
//   implementation · decisions[] · result · retrospective · stack
// `data` holds optional deeper writeup blocks.
// Placeholders are written as（待補：…）— honest gaps, never invented facts.
export const projects = [
    // {
    //     id: 6,
    //     slug: "erp",
    //     category: "professional",
    //     featured: false,
    //     priority: 1,
    //     title: "企業 ERP 系統",
    //     company: "誠諾工程技術",
    //     role: "前端架構 · 獨立開發",
    //     year: "2024",
    //     tagline: "獨立負責一套商業化 ERP 的前端架構，從 0 到 1，最後上線販售。",
    //     stack: ["TypeScript", "Next.js", "REST API"],
    //     links: {},
    //     img: [],
    //     overview:
    //         "一套涵蓋人資、倉儲管理與日常作業三大模組的企業 ERP 系統。我負責整個前端的架構設計與實作。",
    //     context:
    //         "公司要把內部作業數位化，並把這套 ERP 當成商業產品對外銷售。因此需要的不只是能動的頁面，而是一個能長期維護、模組能持續擴充的前端架構。",
    //     contribution:
    //         "我獨立負責前端的部分：整體架構設計、前端開發、API 介面設計，以及資料庫的前期規劃。前端從無到有都是我建立的。",
    //     challenge:
    //         "真正的難題不是把功能寫出來，而是在需求持續變動的情況下，讓超過 100 個頁面、三大模組的程式碼還能維護、不失控。",
    //     implementation:
    //         "以共用元件與清楚的架構分層為核心，把重複出現的表單、表格與流程抽象成可重用的模組，讓新功能的開發成本維持在可控範圍。",
    //     decisions: [
    //         {
    //             title: "元件化與分層",
    //             text: "把 UI 與資料邏輯拆開，讓三大模組共用同一套基礎元件，避免各自重造輪子。",
    //         },
    //         {
    //             title: "為維護性而設計",
    //             text: "寧可前期多花時間把架構定清楚，換取後期需求改動時的低成本——這在一個會長期銷售的產品上特別重要。",
    //         },
    //     ],
    //     result: "系統正式上線，並作為商業產品對外販售。",
    // },

    // {
    //     id: 1,
    //     slug: "mold-tuning",
    //     category: "professional",
    //     featured: false,
    //     priority: 5,
    //     title: "模具調教數位功能模組",
    //     client: "中國鋼鐵 × 國立高雄科技大學",
    //     role: "前端 · 後端 · 資料庫規劃",
    //     year: "2023",
    //     tagline: "把工廠靠 Excel 硬撐的模具計算，做成一套用 JSON 設定檔驅動的計算系統。",
    //     stack: ["JavaScript", "Next.js", "MongoDB"],
    //     links: {},
    //     img: [
    //         "/images/portfolio/nkustmde/nkustmde1.jpg",
    //         "/images/portfolio/nkustmde/nkustmde2.png",
    //         "/images/portfolio/nkustmde/nkustmde3.png",
    //     ],
    //     overview:
    //         "一套提供模具調校數位功能的計算系統：使用者輸入量測值，系統自動完成三角函式與公式計算並保存紀錄，另附後台管理。",
    //     context:
    //         "現場原本用 Excel 做模具調校的計算與紀錄，資料量一大就難以負荷，也容易出錯、不好維護。這種重複又講究正確性的計算，本來就適合交給系統。",
    //     contribution:
    //         "我負責前端頁面、後端系統、No-SQL 資料庫規劃，以及後台的數據管理頁面。",
    //     challenge:
    //         "不同模座的版型、算式與圖片都不一樣，若每一種都寫死，之後維護與擴充會是災難。核心挑戰是把這些差異抽象出來。",
    //     implementation:
    //         "採用 JSON 設定檔統一管理範例圖、版面配置與計算公式。要支援新的模座需求時，只需要維護 JSON，而不必動繁瑣的頁面模板。",
    //     result: "系統交付並供實際單位使用。",
    //     data: [
    //         {
    //             title: "系統設計概述",
    //             content: [
    //                 {
    //                     type: "paragraph",
    //                     text: "此系統提供模具調校數位功能等模具專業知識數據的轉換與計算。",
    //                 },
    //                 {
    //                     type: "items",
    //                     items: [
    //                         {
    //                             icon: <RefreshCcw className="h-3.5 w-3.5" />,
    //                             title: "範例圖與說明文字配置",
    //                             description:
    //                                 "系統可以依據 JSON 設定檔，產生對應的圖片與說明文字配置，讓使用者更直覺操作與理解。",
    //                         },
    //                         {
    //                             icon: <GalleryVerticalEnd className="h-3.5 w-3.5" />,
    //                             title: "三角函式與算式計算",
    //                             description:
    //                                 "使用者在頁面輸入簡單的量測值，系統自動計算出需要的角度或其他結果，並且可以在頁面上直接取得結果。",
    //                         },
    //                         {
    //                             icon: <ListChecks className="h-3.5 w-3.5" />,
    //                             title: "計算紀錄管理",
    //                             description:
    //                                 "所有計算紀錄都會透過 MongoDB 資料庫儲存，讓管理者能夠後台查看並分析資料。",
    //                         },
    //                     ],
    //                 },
    //             ],
    //         },
    //         {
    //             title: "核心設計：JSON 設定檔驅動",
    //             content: [
    //                 {
    //                     type: "paragraph",
    //                     text: "系統的核心是能夠靈活切換不同模座需求，並避免重複開發。為此，採用 JSON 設定檔來統一管理範例圖、版面配置與計算公式。",
    //                 },
    //                 {
    //                     type: "img",
    //                     src: "/images/portfolio/nkustmde/nkustmde4.png",
    //                     alt: "JSON 設定檔範例",
    //                     caption: "JSON 設定檔範例",
    //                 },
    //                 {
    //                     type: "point",
    //                     title: "一次設計，無限延伸",
    //                     description: "只需要專注於維護 JSON，而非繁瑣的 HTML 模版。",
    //                 },
    //             ],
    //         },
    //     ],
    // },

    {
        id: 2,
        slug: "ichiban-poster",
        category: "professional",
        featured: false,
        priority: 6,
        title: "一番賞海報生成系統",
        client: "(玩具與娛樂產業公司)",
        role: "前端 · 後端 · Adobe Script",
        year: "2024",
        tagline: "讓後端直接產生可印刷的 Illustrator 海報，把製作時間降到原本的兩成。",
        stack: ["JavaScript", "Next.js", "Adobe Illustrator Script"],
        links: { live: "https://poster-generator-demo.heytai.dev/" },
        img: [
            "/images/portfolio/poster-generator/poster-generator1.png",
            "/images/portfolio/poster-generator/poster-generator2.png",
            "/images/portfolio/poster-generator/poster-generator3.png",
            "/images/portfolio/poster-generator/poster-generator4.png",
        ],
        background:
            "一番賞是源自日本、在動漫周邊店很常見的抽獎活動：付一次錢抽一次籤，依籤別拿到不同等級的獎品。每一套商品都配一張海報，玩家抽完會把籤紙貼回海報上，讓其他客人知道各獎項還剩幾個。所以海報不只是文宣，而是每上一套新商品就得重新製作、還要隨著抽獎進度更新的必需品。",
        overview:
            "一套自動生成一番賞海報的系統：讀取資料庫的商品資訊，套進四種版型，再透過 Adobe Script 產生可直接印刷的 .ai 檔案。",
        context:
            "店家每上一套一番賞，就要有人用 Illustrator 手工做一張海報，慢又容易出錯。而商品資料資料庫裡都有了，重畫一次其實是浪費。",
        contribution:
            "我負責前端微調介面、後端系統，以及與 Adobe Illustrator Script 的串接生成。",
        challenge:
            "在 Adobe Script 這種受限、非典型的環境裡做資料動態注入，跟一般網頁開發完全不同——要穩定產出符合印刷需求的檔案並不容易。",
        implementation:
            "後端讀取商品資料後，透過 Adobe Script 將資料注入版型並輸出可印刷的 .ai 檔；前端則提供拖曳微調圖片大小與位置的介面。",
        result: "海報製作時間降低約 80%，並提供公開的 DEMO 版本（使用假資料、移除實際 API 串接）。",
        data: [
            {
                title: "系統設計概述",
                content: [
                    {
                        type: "paragraph",
                        text: "系統可直接讀取資料庫中的商品資訊（例如獎項、價格、商品圖像），並套用到 4 種不同版型的海報設計中。",
                    },
                    {
                        type: "items",
                        items: [
                            {
                                icon: <LayoutGrid className="h-3.5 w-3.5" />,
                                title: "多版型支援",
                                description: "一次整合 4 種常見版型，滿足不同店鋪需求。",
                            },
                            {
                                icon: <Brush className="h-3.5 w-3.5" />,
                                title: "前端微調介面",
                                description:
                                    "可調整商品圖像的大小、位置，讓每張海報更符合實際需求。",
                            },
                            {
                                icon: <FileDown className="h-3.5 w-3.5" />,
                                title: "可印刷檔案輸出",
                                description:
                                    "系統生成後，直接輸出可供美工使用的 AI 檔案，無需二次編輯。",
                            },
                        ],
                    },
                ],
            },
        ],
    },

    // // ── Own products ─────────────────────────────────────────────────
    // {
    //     id: 7,
    //     slug: "zoofun",
    //     category: "product",
    //     featured: false,
    //     priority: 2,
    //     title: "ZooFun 租趣",
    //     role: "產品 · 全端開發 · 獨立",
    //     year: "",
    //     tagline: "一個租屋搜尋產品：把散落在各個社團的租屋資訊，整理成能好好搜尋的地方。",
    //     stack: [],
    //     links: {},
    //     img: [],
    //     overview:
    //         "一個我自己發起並打造的租屋搜尋產品，目標是讓「找一個住的地方」這件事，比在一堆社團裡翻找更順一點。",
    //     context:
    //         "我受不了租屋資訊散在一堆 Facebook 社團裡——同一間房、不同版本，資訊還都不齊。找房子這件事，應該可以比這個更好。",
    //     contribution:
    //         "這是我自己的產品，從產品定位、介面設計、前後端開發到部署，都是我一個人負責。",
    //     challenge:
    //         "（待補：例如如何整理非結構化的租屋資料、如何做出好用的搜尋——請補上實際遇到的技術難題。）",
    //     implementation:
    //         "（待補：實際的系統架構與技術選擇——先保留，之後補上真實內容。）",
    //     result: "（待補：目前的狀態與實際成效。）",
    // },

    // {
    //     id: 3,
    //     slug: "taiche",
    //     category: "product",
    //     featured: false,
    //     priority: 7,
    //     title: "太馳科技 Taiche Tech",
    //     role: "品牌 · 網站 · 前端",
    //     year: "2024",
    //     tagline: "我自己接案工作室的品牌與官方網站。",
    //     stack: ["TypeScript", "Next.js"],
    //     links: { live: "https://www.taiche.dev/" },
    //     img: [
    //         "/images/portfolio/taiche-tech/taiche-tech1.png",
    //         "/images/portfolio/taiche-tech/taiche-tech2.png",
    //         "/images/portfolio/taiche-tech/taiche-tech3.png",
    //     ],
    //     overview:
    //         "太馳科技的品牌與官方網站——首頁、服務、作品、關於、聯絡。它是我對外承接商業專案的窗口。",
    //     context:
    //         "我接的案子累積到需要一個正式的門面，於是把它做成一個可以長期經營的品牌與網站。",
    //     contribution: "品牌定位、網站設計與前端實作。",
    //     result: "上線運行中（www.taiche.dev）。",
    // },

    // ── Open source ──────────────────────────────────────────────────
    {
        id: 4,
        slug: "taidypass",
        category: "opensource",
        featured: false,
        priority: 3,
        openSource: true,
        title: "TaidyPass",
        role: "設計 · 全端 · 加密架構 · 獨立",
        year: "2024",
        tagline: "一套 Zero-Knowledge 架構的開源密碼管理器，密碼連伺服器都無法解讀。",
        stack: ["TypeScript", "Next.js", "MongoDB", "Zero-Knowledge"],
        links: { live: "https://taidypass.heytai.dev/zh-TW/" },
        img: [
            "/images/portfolio/taidypass/taidypass1.png",
            "/images/portfolio/taidypass/taidypass2.png",
            "/images/portfolio/taidypass/taidypass3.png",
        ],
        overview:
            "一款開源密碼管理器，採用 Zero-Knowledge 架構：加解密全部在瀏覽器端完成，伺服器只存放它自己也讀不懂的密文。支援多裝置、鑰匙圈分類與標籤。",
        context:
            "市面上的密碼管理器，只要帳密被盜用，還是會洩漏自己儲存的資訊。我想要一個更安全的東西，於是決定自己做，順便實踐 Zero-Knowledge 架構。",
        contribution:
            "從架構、前後端到加密設計都由我獨立完成，並以開源形式發布。",
        challenge:
            "把「安全」從一句口號變成實際的工程決策：金鑰怎麼產生、怎麼保管、使用者忘記了怎麼辦，每一個都是取捨。",
        implementation:
            "加解密只在用戶端進行，採用業界標準的 SHA-256；自訂鑰匙圈會產生僅提供一次的獨立金鑰，只有持有金鑰的人才能存取，即使伺服器外洩資料依然安全。",
        decisions: [
            {
                title: "用戶端加密優先",
                text: "所有敏感運算都放在瀏覽器端完成，讓伺服器對使用者的密碼「零知識」。",
            },
            {
                title: "獨立金鑰的取捨",
                text: "自訂鑰匙圈的金鑰只提供一次，安全性更高，代價是使用者必須自行保管——這是刻意的設計取捨。",
            },
        ],
        result: "已上線，也是我自己每天在用的工具，持續維護與安全修補。",
        data: [
            {
                title: "Zero-Knowledge 架構",
                content: [
                    {
                        type: "paragraph",
                        text: "預設鑰匙圈的資料使用使用者的登入帳號與密碼進行加密，加解密流程僅在用戶端完成，即使伺服器發生外洩，資料依然安全。",
                    },
                    {
                        type: "items",
                        items: [
                            {
                                icon: <Code2 className="h-3.5 w-3.5" />,
                                title: "SHA-256 業界標準加密",
                                description:
                                    "採用業界標準的 SHA-256 加密演算法，確保資料傳輸與儲存的安全性。",
                            },
                            {
                                icon: <ListChecks className="h-3.5 w-3.5" />,
                                title: "自訂鑰匙圈獨立金鑰",
                                description:
                                    "使用者建立自訂鑰匙圈時，系統產生獨立金鑰且僅提供一次，只有擁有金鑰的人才能存取該資料。",
                            },
                            {
                                icon: <Computer className="h-3.5 w-3.5" />,
                                title: "多設備無縫存取",
                                description:
                                    "支援無限制設備登入，隨時隨地都能安全取得你的密碼。",
                            },
                        ],
                    },
                    {
                        type: "point",
                        title: "你的資料，永遠屬於你",
                        description:
                            "平台無法閱讀、無法竊取，只能協助安全儲存和傳輸。對使用者隱私的存取性為 0%。",
                    },
                ],
            },
        ],
    },

    // ── Personal projects ────────────────────────────────────────────
    {
        id: 5,
        slug: "json-editor",
        category: "personal",
        featured: false,
        priority: 4,
        title: "Online JSON 編輯器",
        role: "純前端 · 獨立",
        year: "2025",
        tagline: "一個開分頁就能用、資料不離開瀏覽器的 JSON 編輯器。",
        stack: ["TypeScript", "Next.js"],
        links: { live: "https://json-editor.heytai.dev" },
        img: [
            "/images/portfolio/json-editor/json-editor1.png",
            "/images/portfolio/json-editor/json-editor2.png",
            "/images/portfolio/json-editor/json-editor3.png",
            "/images/portfolio/json-editor/json-editor4.png",
        ],
        overview:
            "一個完全在瀏覽器本地運行的 JSON 編輯器，支援 Tree / Table / Monaco / Diff 四種模式，可匯出成 JSON、純文字、JS 物件或 PHP 陣列。零登入、零上傳。",
        context:
            "工作上每天都在看、改 JSON，但線上工具不是要登入，就是介面很吵。我只想要一個打開就能用、又不會把資料上傳到別人伺服器的東西。",
        contribution: "從想法、設計到前端實作與部署，全部由我一人完成。",
        implementation:
            "所有解析與處理都在瀏覽器端完成（zero telemetry）；提供四種檢視模式與多種匯出格式，涵蓋日常處理 JSON 的各種情境。",
        result: "已上線，也是我自己每天在用的工具。",
        data: [
            {
                title: "四種檢視模式",
                content: [
                    {
                        type: "items",
                        items: [
                            {
                                icon: <LayoutGrid className="h-3.5 w-3.5" />,
                                title: "Tree View",
                                description:
                                    "以視覺化樹狀結構瀏覽巢狀 JSON，點擊任意值即可就地編輯。",
                            },
                            {
                                icon: <ListChecks className="h-3.5 w-3.5" />,
                                title: "Table View",
                                description:
                                    "物件陣列自動展開成類試算表的可編輯表格，批量處理更直覺。",
                            },
                            {
                                icon: <Code2 className="h-3.5 w-3.5" />,
                                title: "Monaco 編輯器",
                                description:
                                    "完整語法高亮、即時驗證與格式化，就像 VS Code 的體驗。",
                            },
                            {
                                icon: <RefreshCcw className="h-3.5 w-3.5" />,
                                title: "JSON Diff",
                                description: "並排比對兩份 JSON，所有差異一目瞭然。",
                            },
                        ],
                    },
                ],
            },
        ],
    },

    // {
    //     id: 8,
    //     slug: "symptoms-calling",
    //     category: "personal",
    //     featured: false,
    //     priority: 8,
    //     title: "症來電 Symptoms Calling",
    //     role: "",
    //     year: "",
    //     tagline: "（待補：用一句話說這個專案是什麼。）",
    //     stack: [],
    //     links: {},
    //     img: [],
    //     overview: "（待補：這個專案是什麼？）",
    //     context: "（待補：當初為什麼開始做？是什麼問題或好奇心？）",
    //     contribution: "（待補：我負責哪些部分？）",
    //     result: "（待補：目前的狀態？）",
    // },
];

// ── Derived collections & helpers ────────────────────────────────────
export const featuredProjects = projects
    .filter((p) => p.featured)
    .sort((a, b) => (a.priority || 99) - (b.priority || 99));

export const getProject = (slug) => projects.find((p) => p.slug === slug);

export const projectHref = (project) => `/projects/${project.slug}`;

export const projectsByCategory = categories
    .map((c) => ({
        ...c,
        items: projects
            .filter((p) => p.category === c.id)
            .sort((a, b) => (a.priority || 99) - (b.priority || 99)),
    }))
    .filter((c) => c.items.length > 0);
