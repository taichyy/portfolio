import {
    Brush,
    Code2,
    Computer,
    FileDown,
    LayoutGrid,
    ListChecks,
    RefreshCcw,
    GalleryVerticalEnd
} from "lucide-react";

import { t, localize } from "@/lib/i18n/localize";

// ── Project categories (ordered; only non-empty groups render) ───────
const categoriesSource = [
    { id: "professional", label: t("實務作品", "Professional Work") },
    { id: "product", label: t("自己的產品", "Own Products") },
    { id: "opensource", label: t("開源專案", "Open Source") },
    { id: "personal", label: t("個人專案", "Personal Projects") },
];

// ── Projects ─────────────────────────────────────────────────────────
// Engineering case studies. `featured` + `priority` drive homepage order.
// Case-study fields (rendered only when present):
//   overview · context · contribution(MY ROLE) · challenge ·
//   implementation · decisions[] · result · retrospective · stack
// `data` holds optional deeper writeup blocks.
// Placeholders are written as（待補：…）/ (TODO: …) — honest gaps, never
// invented facts. Every piece of prose is a t(zh, en) pair.
const projectsSource = [
    // {
    //     id: 6,
    //     slug: "erp",
    //     category: "professional",
    //     featured: false,
    //     priority: 1,
    //     title: t("企業 ERP 系統", "Enterprise ERP System"),
    //     company: t("誠諾工程技術股份有限公司", "Cheng-Nuo Engineering Technology CO., LTD."),
    //     role: t("前端架構 · 獨立開發", "Front-end architecture · Solo build"),
    //     year: "2024",
    //     tagline: t(
    //         "獨立負責一套商業化 ERP 的前端架構，從 0 到 1，最後上線販售。",
    //         "Owned the front-end architecture of a commercial ERP from zero to one, until it shipped and was sold.",
    //     ),
    //     stack: ["TypeScript", "Next.js", "REST API"],
    //     links: {},
    //     img: [],
    // },

    {
        id: 1,
        slug: "mold-tuning",
        category: "professional",
        featured: true,
        priority: 5,
        title: t("模具調教數位功能模組", "Mold Tuning Digital Function Module"),
        client: t(
            "中國鋼鐵 × 國立高雄科技大學",
            "China Steel Corporation × National Kaohsiung University of Science and Technology",
        ),
        role: t("前端 · 後端 · 資料庫規劃", "Front-end · Back-end · Database planning"),
        year: "2023",
        tagline: t(
            "把 Excel 難以維護、複雜的計算，做成一套用 JSON 設定檔驅動的計算系統。",
            "Turning unmaintainable, complex Excel calculations into a system driven by JSON config files.",
        ),
        stack: ["JavaScript", "Next.js", "MongoDB"],
        links: {},
        img: [
            "/images/portfolio/nkustmde/nkustmde1.jpg",
            "/images/portfolio/nkustmde/nkustmde2.png",
            "/images/portfolio/nkustmde/nkustmde3.png",
        ],
        overview: t(
            "一套提供模具調校數位功能的計算系統：使用者輸入量測值，系統自動完成三角函式與公式計算並保存紀錄，另附後台管理。",
            "A calculation system for digital mold tuning: users enter measured values, the system runs the trigonometry and formulas automatically, stores every record, and ships with an admin back office.",
        ),
        context: t(
            "現場原本用 Excel 做模具調校的計算與紀錄，資料量一大就難以負荷，也容易出錯、不好維護。",
            "The calculations and records were kept in Excel on site. Once the data grew it couldn't keep up — error-prone and hard to maintain.",
        ),
        contribution: t(
            "前端頁面、後端系統、No-SQL 資料庫規劃，以及後台的數據管理頁面。",
            "The front-end pages, the back-end system, the NoSQL database design, and the admin data-management pages.",
        ),
        challenge: t(
            "不同模座的版型、算式與圖片都不一樣，若每一種都寫死，之後維護與擴充會是災難。核心挑戰是把這些差異抽象出來。",
            "Every mold base has its own layout, formulas and diagrams. Hard-coding each one would have made maintenance and extension a nightmare. The core challenge was abstracting those differences away.",
        ),
        implementation: t(
            "採用 JSON 設定檔統一管理範例圖、版面配置與計算公式。要支援新的模座需求時，只需要維護 JSON，而不必動繁瑣的頁面模板。",
            "A single JSON config file drives the sample images, layout and calculation formulas. Supporting a new mold base means maintaining JSON — never touching the fiddly page templates.",
        ),
        result: t("系統交付並供實際單位使用。", "Delivered and in use by the client."),
        data: [
            {
                title: t("系統設計概述", "System design overview"),
                content: [
                    {
                        type: "paragraph",
                        text: t(
                            "此系統提供模具調校數位功能等模具專業知識數據的轉換與計算。",
                            "The system converts and computes specialist mold data such as digital mold-tuning values.",
                        ),
                    },
                    {
                        type: "items",
                        items: [
                            {
                                icon: <RefreshCcw className="h-3.5 w-3.5" />,
                                title: t(
                                    "範例圖與說明文字配置",
                                    "Configurable diagrams and copy",
                                ),
                                description: t(
                                    "系統可以依據 JSON 設定檔，產生對應的圖片與說明文字配置，讓使用者更直覺操作與理解。",
                                    "The system renders the matching diagrams and explanatory text from the JSON config, so the interface stays intuitive to operate and understand.",
                                ),
                            },
                            {
                                icon: <GalleryVerticalEnd className="h-3.5 w-3.5" />,
                                title: t(
                                    "三角函式與算式計算",
                                    "Trigonometry and formula calculation",
                                ),
                                description: t(
                                    "使用者在頁面輸入簡單的量測值，系統自動計算出需要的角度或其他結果，並且可以在頁面上直接取得結果。",
                                    "Users type in simple measured values and the system works out the required angles and other results, shown directly on the page.",
                                ),
                            },
                            {
                                icon: <ListChecks className="h-3.5 w-3.5" />,
                                title: t("計算紀錄管理", "Calculation record management"),
                                description: t(
                                    "所有計算紀錄都會透過 MongoDB 資料庫儲存，讓管理者能夠後台查看並分析資料。",
                                    "Every calculation is stored in MongoDB so administrators can review and analyse the data from the back office.",
                                ),
                            },
                        ],
                    },
                ],
            },
            {
                title: t("核心設計：JSON 設定檔驅動", "Core design: driven by JSON config"),
                content: [
                    {
                        type: "paragraph",
                        text: t(
                            "系統的核心是能夠靈活切換不同模座需求，並避免重複開發。為此，採用 JSON 設定檔來統一管理範例圖、版面配置與計算公式。",
                            "The heart of the system is switching between mold-base requirements without rebuilding anything. A single JSON config file therefore governs the sample images, layout and calculation formulas.",
                        ),
                    },
                    {
                        type: "img",
                        src: "/images/portfolio/nkustmde/nkustmde4.png",
                        alt: t("JSON 設定檔範例", "JSON config file example"),
                        caption: t("JSON 設定檔範例", "JSON config file example"),
                    },
                    {
                        type: "point",
                        title: t("一次設計，無限延伸", "Design once, extend forever"),
                        description: t(
                            "只需要專注於維護 JSON，而非繁瑣的 HTML 模版。",
                            "You only ever maintain the JSON, never the fiddly HTML templates.",
                        ),
                    },
                ],
            },
        ],
    },

    {
        id: 2,
        slug: "ichiban-poster",
        category: "professional",
        featured: false,
        priority: 6,
        title: t("一番賞海報生成系統", "Ichiban Kuji Poster Generator"),
        client: t("(玩具與娛樂產業公司)", "(Toy & entertainment industry company)"),
        role: t("前端 · 後端", "Front-end · Back-end"),
        year: "2024",
        tagline: t(
            "讓後端直接產生可印刷的 Illustrator 海報，把製作時間降到原本的兩成。",
            "Generating print-ready Illustrator posters straight from the back end, cutting production time to a fifth.",
        ),
        stack: ["JavaScript", "Next.js", "Adobe Illustrator Script"],
        links: { live: "https://poster-generator-demo.heytai.dev/" },
        img: [
            "/images/portfolio/poster-generator/poster-generator1.png",
            "/images/portfolio/poster-generator/poster-generator2.png",
            "/images/portfolio/poster-generator/poster-generator3.png",
            "/images/portfolio/poster-generator/poster-generator4.png",
        ],
        bgHeading: t("什麼是一番賞？", "What is Ichiban Kuji?"),
        background: t(
            "一番賞是源自日本、在動漫周邊店很常見的抽獎活動：付一次錢抽一次籤，依籤別拿到不同等級的獎品。每一套商品都配一張海報，玩家抽完會把籤紙貼回海報上，讓其他客人知道各獎項還剩幾個。所以海報不只是文宣，而是每上一套新商品就得重新製作、還要隨著抽獎進度更新的必需品。",
            "Ichiban Kuji is a Japanese lottery format you'll find in almost any anime merchandise store: you pay once, draw a ticket, and receive a prize according to its tier. Every set comes with a poster, and players stick their used tickets back onto it so other customers can see how many prizes are left in each tier. The poster isn't just marketing — it has to be remade for every new set and kept up to date as the draw progresses.",
        ),
        overview: t(
            "一套自動生成一番賞海報的系統：讀取資料庫的商品資訊，套進四種版型，再透過 Adobe Script 產生可直接印刷的 .ai 檔案。",
            "A system that generates Ichiban Kuji posters automatically: it reads product data from the database, drops it into one of four layouts, and uses Adobe Script to output a print-ready .ai file.",
        ),
        context: t(
            "店家每上一套一番賞，就要有人用 Illustrator 手工做一張海報，慢又容易出錯。而商品資料資料庫裡都有了，重畫一次其實是浪費。",
            "Every new set meant someone hand-building a poster in Illustrator — slow and easy to get wrong. All the product data was already in the database, so redrawing it by hand was pure waste.",
        ),
        contribution: t(
            "我負責前端微調介面、後端系統，以及與 Adobe Illustrator Script 的串接生成。",
            "I built the front-end fine-tuning interface, the back-end system, and the Adobe Illustrator Script integration that generates the files.",
        ),
        challenge: t(
            "在 Adobe Script 這種受限、非典型的環境裡做資料動態注入，跟一般網頁開發完全不同——要穩定產出符合印刷需求的檔案並不容易。",
            "Injecting data dynamically inside Adobe Script — a constrained, unusual runtime — is nothing like normal web development. Producing files that reliably meet print requirements was the hard part.",
        ),
        implementation: t(
            "後端讀取商品資料後，透過 Adobe Script 將資料注入版型並輸出可印刷的 .ai 檔；前端則提供拖曳微調圖片大小與位置的介面。",
            "The back end reads the product data, then Adobe Script injects it into the chosen layout and exports a print-ready .ai file. The front end provides a drag-to-adjust interface for image size and position.",
        ),
        result: t(
            "海報製作時間降低約 80%，並提供公開的 DEMO 版本（使用假資料、移除實際 API 串接）。",
            "Poster production time dropped by around 80%. A public demo is available, running on mock data with the real API integration removed.",
        ),
        data: [
            {
                title: t("系統設計概述", "System design overview"),
                content: [
                    {
                        type: "paragraph",
                        text: t(
                            "系統可直接讀取資料庫中的商品資訊（例如獎項、價格、商品圖像），並套用到 4 種不同版型的海報設計中。",
                            "The system reads product information straight from the database — prize tiers, pricing, product imagery — and applies it to four different poster layouts.",
                        ),
                    },
                    {
                        type: "items",
                        items: [
                            {
                                icon: <LayoutGrid className="h-3.5 w-3.5" />,
                                title: t("多版型支援", "Multiple layouts"),
                                description: t(
                                    "一次整合 4 種常見版型，滿足不同店鋪需求。",
                                    "Four common layouts in one system, covering what different stores need.",
                                ),
                            },
                            {
                                icon: <Brush className="h-3.5 w-3.5" />,
                                title: t("前端微調介面", "Front-end fine-tuning"),
                                description: t(
                                    "可調整商品圖像的大小、位置，讓每張海報更符合實際需求。",
                                    "Product images can be resized and repositioned so every poster fits its actual needs.",
                                ),
                            },
                            {
                                icon: <FileDown className="h-3.5 w-3.5" />,
                                title: t("可印刷檔案輸出", "Print-ready output"),
                                description: t(
                                    "系統生成後，直接輸出可供美工使用的 AI 檔案，無需二次編輯。",
                                    "The generated AI file goes straight to the designer — no second round of editing needed.",
                                ),
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
    //     title: t("ZooFun 租趣", "ZooFun"),
    //     role: t("產品 · 全端開發 · 獨立", "Product · Full-stack · Solo"),
    //     year: "",
    //     tagline: t(
    //         "一個租屋搜尋產品：把散落在各個社團的租屋資訊，整理成能好好搜尋的地方。",
    //         "A rental search product: pulling listings scattered across groups into one place you can actually search.",
    //     ),
    //     stack: [],
    //     links: {},
    //     img: [],
    // },

    // {
    //     id: 3,
    //     slug: "taiche",
    //     category: "product",
    //     featured: false,
    //     priority: 7,
    //     title: t("太馳科技 Taiche Tech", "Taiche Tech"),
    //     role: t("品牌 · 網站 · 前端", "Brand · Website · Front-end"),
    //     year: "2024",
    //     tagline: t(
    //         "我自己接案工作室的品牌與官方網站。",
    //         "The brand and official website of my own freelance studio.",
    //     ),
    //     stack: ["TypeScript", "Next.js"],
    //     links: { live: "https://www.taiche.dev/" },
    //     img: [],
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
        role: t(
            "前端 · 後端 · 加密架構 · 獨立",
            "Front-end · Back-end · Crypto architecture · Solo",
        ),
        year: "2024",
        tagline: t(
            "一套 Zero-Knowledge 架構的開源密碼管理器，密碼連伺服器都無法解讀。",
            "An open-source, zero-knowledge password manager — not even the server can read your passwords.",
        ),
        stack: ["TypeScript", "Next.js", "MongoDB", "Zero-Knowledge"],
        links: { live: "https://taidypass.heytai.dev/zh-TW/" },
        img: [
            "/images/portfolio/taidypass/taidypass1.png",
            "/images/portfolio/taidypass/taidypass2.png",
            "/images/portfolio/taidypass/taidypass3.png",
        ],
        overview: t(
            "一款開源密碼管理器，採用 Zero-Knowledge 架構：加解密全部在瀏覽器端完成，伺服器只存放它自己也讀不懂的密文。支援多裝置、鑰匙圈分類與標籤。",
            "An open-source password manager built on a zero-knowledge architecture: all encryption and decryption happens in the browser, and the server only ever holds ciphertext it cannot read. Supports multiple devices, keyring grouping and tags.",
        ),
        context: t(
            "市面上的密碼管理器，只要帳密被盜用，還是會洩漏自己儲存的資訊。我想要一個更安全的東西，於是決定自己做，順便實踐 Zero-Knowledge 架構。",
            "With most password managers, a stolen account still leaks everything you stored. I wanted something safer, so I built it myself — and used it to put a zero-knowledge architecture into practice.",
        ),
        contribution: t(
            "從架構、前後端到加密設計都由我獨立完成，並以開源形式發布。",
            "Architecture, front end, back end and the encryption design were all done by me, and released as open source.",
        ),
        challenge: t(
            "把「安全」從一句口號變成實際的工程決策：金鑰怎麼產生、怎麼保管、使用者忘記了怎麼辦，每一個都是取捨。",
            "Turning \"secure\" from a slogan into real engineering decisions: how keys are generated, how they're kept, what happens when a user forgets one — every answer is a trade-off.",
        ),
        implementation: t(
            "加解密只在用戶端進行，採用業界標準的 SHA-256；自訂鑰匙圈會產生僅提供一次的獨立金鑰，只有持有金鑰的人才能存取，即使伺服器外洩資料依然安全。",
            "Encryption and decryption run client-side only, using the industry-standard SHA-256. Custom keyrings generate their own key, shown exactly once — only the key holder can open them, so a server breach still exposes nothing.",
        ),
        decisions: [
            {
                title: t("用戶端加密優先", "Client-side encryption first"),
                text: t(
                    "所有敏感運算都放在瀏覽器端完成，讓伺服器對使用者的密碼「零知識」。",
                    "All sensitive computation happens in the browser, leaving the server with zero knowledge of the user's passwords.",
                ),
            },
            {
                title: t("獨立金鑰的取捨", "The trade-off of independent keys"),
                text: t(
                    "自訂鑰匙圈的金鑰只提供一次，安全性更高，代價是使用者必須自行保管——這是刻意的設計取捨。",
                    "A custom keyring's key is shown only once. That's more secure, at the cost of the user having to keep it safe — a deliberate design trade-off.",
                ),
            },
        ],
        result: t(
            "已上線，也是我自己每天在用的工具，持續維護與安全修補。",
            "Live, and a tool I use every day myself — still maintained and patched.",
        ),
        data: [
            {
                title: t("Zero-Knowledge 架構", "Zero-knowledge architecture"),
                content: [
                    {
                        type: "paragraph",
                        text: t(
                            "預設鑰匙圈的資料使用使用者的登入帳號與密碼進行加密，加解密流程僅在用戶端完成，即使伺服器發生外洩，資料依然安全。",
                            "The default keyring is encrypted with the user's own login credentials, and the whole encryption flow stays on the client. Even if the server is breached, the data remains safe.",
                        ),
                    },
                    {
                        type: "items",
                        items: [
                            {
                                icon: <Code2 className="h-3.5 w-3.5" />,
                                title: t(
                                    "SHA-256 業界標準加密",
                                    "SHA-256, an industry standard",
                                ),
                                description: t(
                                    "採用業界標準的 SHA-256 加密演算法，確保資料傳輸與儲存的安全性。",
                                    "The industry-standard SHA-256 algorithm secures the data both in transit and at rest.",
                                ),
                            },
                            {
                                icon: <ListChecks className="h-3.5 w-3.5" />,
                                title: t(
                                    "自訂鑰匙圈獨立金鑰",
                                    "Independent keys for custom keyrings",
                                ),
                                description: t(
                                    "使用者建立自訂鑰匙圈時，系統產生獨立金鑰且僅提供一次，只有擁有金鑰的人才能存取該資料。",
                                    "Creating a custom keyring generates a dedicated key, shown exactly once — only whoever holds it can open that data.",
                                ),
                            },
                            {
                                icon: <Computer className="h-3.5 w-3.5" />,
                                title: t("多設備無縫存取", "Seamless across devices"),
                                description: t(
                                    "支援無限制設備登入，隨時隨地都能安全取得你的密碼。",
                                    "Log in from as many devices as you like and reach your passwords securely, anywhere.",
                                ),
                            },
                        ],
                    },
                    {
                        type: "point",
                        title: t("你的資料，永遠屬於你", "Your data stays yours"),
                        description: t(
                            "平台無法閱讀、無法竊取，只能協助安全儲存和傳輸。對使用者隱私的存取性為 0%。",
                            "The platform can't read it and can't take it — it only stores and transports it safely. Access to user privacy: 0%.",
                        ),
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
        title: t("Online JSON 編輯器", "Online JSON Editor"),
        role: t("前端 · 獨立", "Front-end · Solo"),
        year: "2026",
        tagline: t(
            "一個開分頁就能用、資料不離開瀏覽器的 JSON 編輯器。",
            "A JSON editor you can use the moment you open a tab — and your data never leaves the browser.",
        ),
        stack: ["TypeScript", "Next.js"],
        links: { live: "https://json-editor.heytai.dev" },
        img: [
            "/images/portfolio/json-editor/json-editor1.png",
            "/images/portfolio/json-editor/json-editor2.png",
            "/images/portfolio/json-editor/json-editor3.png",
            "/images/portfolio/json-editor/json-editor4.png",
        ],
        overview: t(
            "一個完全在瀏覽器本地運行的 JSON 編輯器，支援 Tree / Table / Monaco / Diff 四種模式，可匯出成 JSON、純文字、JS 物件或 PHP 陣列。零登入、零上傳。",
            "A JSON editor that runs entirely in the browser, with four modes — Tree, Table, Monaco and Diff — and export to JSON, plain text, a JS object or a PHP array. No sign-in, no uploads.",
        ),
        context: t(
            "工作上每天都在看、改 JSON，但線上工具不是要登入，就是介面很吵。我只想要一個打開就能用、又不會把資料上傳到別人伺服器的東西。",
            "I read and edit JSON every working day, but the online tools either demand a login or drown you in interface. I just wanted something that opens and works, without shipping my data to someone else's server.",
        ),
        contribution: t(
            "從想法、設計到前端實作與部署，全部由我一人完成。",
            "Idea, design, front-end implementation and deployment — all mine.",
        ),
        implementation: t(
            "所有解析與處理都在瀏覽器端完成（zero telemetry）；提供四種檢視模式與多種匯出格式，涵蓋日常處理 JSON 的各種情境。",
            "All parsing and processing happens client-side with zero telemetry. Four view modes and several export formats cover the everyday ways you end up handling JSON.",
        ),
        result: t(
            "已上線，也是我自己每天在用的工具。",
            "Live, and a tool I use every day myself.",
        ),
        data: [
            {
                title: t("四種檢視模式", "Four view modes"),
                content: [
                    {
                        type: "items",
                        items: [
                            {
                                icon: <LayoutGrid className="h-3.5 w-3.5" />,
                                title: "Tree View",
                                description: t(
                                    "以視覺化樹狀結構瀏覽巢狀 JSON，點擊任意值即可就地編輯。",
                                    "Browse nested JSON as a visual tree, and click any value to edit it in place.",
                                ),
                            },
                            {
                                icon: <ListChecks className="h-3.5 w-3.5" />,
                                title: "Table View",
                                description: t(
                                    "物件陣列自動展開成類試算表的可編輯表格，批量處理更直覺。",
                                    "Arrays of objects expand into an editable, spreadsheet-like table — far more intuitive for bulk edits.",
                                ),
                            },
                            {
                                icon: <Code2 className="h-3.5 w-3.5" />,
                                title: t("Monaco 編輯器", "Monaco editor"),
                                description: t(
                                    "完整語法高亮、即時驗證與格式化，就像 VS Code 的體驗。",
                                    "Full syntax highlighting, live validation and formatting — the VS Code experience.",
                                ),
                            },
                            {
                                icon: <RefreshCcw className="h-3.5 w-3.5" />,
                                title: "JSON Diff",
                                description: t(
                                    "並排比對兩份 JSON，所有差異一目瞭然。",
                                    "Compare two JSON documents side by side, with every difference laid bare.",
                                ),
                            },
                        ],
                    },
                ],
            },
        ],
    },

    {
        id: 8,
        slug: "symptoms-calling",
        category: "personal",
        featured: false,
        priority: 8,
        title: t("症來電 Symptoms Calling", "Symptoms Calling"),
        role: t("前端", "Front-end"),
        year: "2023",
        tagline: t(
            "把冷冰冰的醫療症狀，變成一通通打來的「未接來電」。一個讓健康知識變好讀的科普專題。",
            "Turning cold medical symptoms into a string of \"missed calls\", a health literacy project that makes the subject readable.",
        ),
        stack: ["TypeScript", "Next.js"],
        links: { live: "https://symptoms-calling.heytai.dev" },
        img: [
            "/images/portfolio/symptoms-calling/symptoms-calling1.png",
            "/images/portfolio/symptoms-calling/symptoms-calling2.png",
            "/images/portfolio/symptoms-calling/symptoms-calling3.png",
            "/images/portfolio/symptoms-calling/symptoms-calling4.png",
        ],
        bgHeading: t("什麼是症來電？", "What is Symptoms Calling?"),
        background: t(
            "「你有一通未接來電⋯⋯」——症來電把身體的各種症狀，擬人化成一通通打進來的電話。與其正經地衛教，不如讓症狀自己「來電」，用角色和圖文把生硬的健康知識變得親近、好記。",
            "\"You have one missed call…\" — Symptoms Calling personifies the body's symptoms as incoming phone calls. Rather than lecturing people about health, it lets the symptoms ring you up, using characters and illustrated stories to make dry medical knowledge approachable and memorable.",
        ),
        overview: t(
            "一個健康科普品牌。團隊以「未接來電」為核心概念，透過 Instagram 圖文連載、專題介紹影片、互動小遊戲與周邊商品，把常見症狀包裝成有趣的角色與故事。",
            "A health literacy brand. Built around the idea of the missed call, the team packaged common symptoms as characters and stories through an illustrated Instagram series, feature videos, interactive mini-games and merchandise.",
        ),
        context: t(
            "健康與醫療知識常常又長又難親近，年輕人尤其不會主動去看。我們想驗證一件事：如果把症狀變成會「打電話來」的角色，並用大家每天都在滑的社群形式呈現，是不是就更容易被接受、被記住。",
            "Health and medical information tends to be long and unapproachable, and young people rarely seek it out. We wanted to test one idea: if symptoms became characters that call you, delivered in the social formats people scroll through every day, would they land — and stick?",
        ),
    },
];

// ── Locale-resolved accessors ────────────────────────────────────────
const byPriority = (a, b) => (a.priority || 99) - (b.priority || 99);

export const getCategories = (locale) => localize(categoriesSource, locale);

export const getCategoryMeta = (locale) =>
    Object.fromEntries(getCategories(locale).map((category) => [category.id, category]));

export const getProjects = (locale) => localize(projectsSource, locale);

export const getProject = (slug, locale) => {
    const project = projectsSource.find((p) => p.slug === slug);
    return project ? localize(project, locale) : undefined;
};

export const getFeaturedProjects = (locale) =>
    getProjects(locale).filter((p) => p.featured).sort(byPriority);

export const getProjectsByCategory = (locale) => {
    const projects = getProjects(locale);

    return getCategories(locale)
        .map((category) => ({
            ...category,
            items: projects.filter((p) => p.category === category.id).sort(byPriority),
        }))
        .filter((category) => category.items.length > 0);
};

// Locale-independent: routing, static params and the sitemap only need slugs.
export const projectSlugs = projectsSource.map((p) => ({
    slug: p.slug,
    featured: Boolean(p.featured),
}));

export const projectHref = (project) => `/projects/${project.slug}`;
