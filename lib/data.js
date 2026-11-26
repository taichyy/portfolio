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
// `featured` + `priority` drive homepage order. Case-study fields render
// only when present; `data` holds the optional deep-dive blocks.
const projectsSource = [
    {
        id: 1,
        slug: "mold-tuning",
        category: "professional",
        featured: true,
        priority: 5,
        title: t("模具調教數位功能模組", "Mold Tuning Digital Function Module"),
        displayTitle: t("模具調教|數位功能模組", "Mold Tuning Digital Function Module"),
        role: t("前端 · 後端 · 資料庫規劃", "Front-end · Back-end · Database planning"),
        tagline: t(
            "將原本在 Excel 裡維護的複雜計算，改由 JSON 設定檔管理。",
            "Moving complex Excel calculations into a system managed through JSON configuration files.",
        ),
        stack: ["JavaScript", "Next.js", "MongoDB"],
        links: {},
        img: [
            "/images/portfolio/nkustmde/nkustmde1.jpg",
            "/images/portfolio/nkustmde/nkustmde2.png",
            "/images/portfolio/nkustmde/nkustmde3.png",
        ],
        overview: t(
            "這套系統用於模具調校計算。使用者輸入量測值後，系統會自動執行三角函式和其他公式，並保存計算紀錄；管理者也能透過後台查看資料。",
            "A calculation system for mold tuning. Users enter measurements, the system runs the required trigonometric and other calculations, and the results are saved for later review. It also includes an admin panel.",
        ),
        context: t(
            "現場原本以 Excel 計算模具調校數據和保存紀錄。隨著資料和計算項目增加，檔案越來越難整理，也不容易維護。",
            "The team originally used Excel for mold-tuning calculations and records. As the amount of data and the number of calculations grew, the files became harder to manage and maintain.",
        ),
        contribution: t(
            "我負責前端頁面、後端系統、NoSQL 資料庫規劃，以及後台資料管理功能。",
            "I worked on the front end, back end, NoSQL database planning and admin data-management pages.",
        ),
        challenge: t(
            "不同模座會用到不同的版型、公式和圖片。如果每種情況都個別寫在程式裡，之後新增或修改都會很麻煩。因此需要先整理出共通結構，再把各模座的差異獨立管理。",
            "Each mold base has its own layout, formulas and diagrams. Hard-coding every variation would make future changes difficult, so the challenge was to separate the shared structure from the parts that differ.",
        ),
        implementation: t(
            "我用 JSON 設定檔管理範例圖、版面配置和計算公式。新增模座時，修改對應的設定即可，不需要重新調整頁面模板。",
            "I used JSON configuration files to manage the sample images, page layouts and formulas. Adding support for another mold base then mainly involves updating its configuration rather than changing the page templates.",
        ),
        result: t("系統已交付，並由實際單位使用。", "Delivered and in use by the client."),
        data: [
            {
                title: t("系統設計概述", "System design overview"),
                content: [
                    {
                        type: "paragraph",
                        text: t(
                            "系統將模具調校相關的專業數據轉換成可操作的欄位，並依照設定執行計算。",
                            "The system organizes mold-tuning data and performs the required calculations.",
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
                                    "系統會讀取 JSON 設定檔，顯示對應的圖片、版面和說明文字，讓不同模座使用相應的操作畫面。",
                                    "The system reads the JSON configuration and displays the relevant diagrams, layout and instructions for each mold base.",
                                ),
                            },
                            {
                                icon: <GalleryVerticalEnd className="h-3.5 w-3.5" />,
                                title: t(
                                    "三角函式與算式計算",
                                    "Trigonometry and formula calculation",
                                ),
                                description: t(
                                    "使用者輸入量測值後，系統會自動計算所需角度和其他數值，並直接顯示結果。",
                                    "Users enter measurements, and the system calculates the required angles and other values on the page.",
                                ),
                            },
                            {
                                icon: <ListChecks className="h-3.5 w-3.5" />,
                                title: t("計算紀錄管理", "Calculation record management"),
                                description: t(
                                    "計算結果會存進 MongoDB，管理者可以從後台查詢和檢視紀錄。",
                                    "Calculation records are stored in MongoDB and can be reviewed in the admin panel.",
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
                            "為了支援不同模座，又不必為每種需求重寫頁面，我把範例圖、版面和計算公式集中放在 JSON 設定檔管理。",
                            "To support different mold bases without rebuilding the pages for each one, I put the sample images, layouts and formulas in JSON configuration files.",
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
                        title: t("透過設定支援不同模座", "Support more mold bases through configuration"),
                        description: t(
                            "後續要調整模座內容時，主要修改 JSON 設定，不必逐一改動 HTML 模板。",
                            "Most changes to mold-base content can be made in the JSON configuration, without editing the HTML templates.",
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
        displayTitle: t("一番賞|海報生成系統", "Ichiban Kuji Poster Generator"),
        role: t("前端 · 後端", "Front-end · Back-end"),
        tagline: t(
            "由後端自動產生可印刷的 Illustrator 海報，海報製作時間縮短約 80%。",
            "Generating print-ready Illustrator posters from the back end, reducing production time by around 80%.",
        ),
        stack: ["JavaScript", "Next.js", "Adobe Illustrator Script"],
        links: {
            live: "https://poster-generator-demo.heytai.dev/",
            github: "https://github.com/taichyy/poster-generator-demo",
        },
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
            "這套系統會讀取資料庫中的商品資訊，套用到 4 種海報版型，再透過 Adobe Script 輸出可印刷的 .ai 檔案。",
            "The system reads product information from the database, places it into one of four poster layouts, and uses Adobe Script to export a print-ready .ai file.",
        ),
        context: t(
            "每上一套新的一番賞，就要用 Illustrator 重做一張海報，費時又容易出錯。但商品資訊本來就在資料庫裡，沒必要再整理、排版一次。",
            "Whenever a new Ichiban Kuji set arrived, someone had to make its poster manually in Illustrator. It took time and left room for mistakes, even though the product information was already in the database.",
        ),
        contribution: t(
            "我負責前端的圖片微調介面、後端功能，以及串接 Adobe Illustrator Script 產生海報。",
            "I developed the front-end adjustment interface, the back end and the Adobe Illustrator Script integration.",
        ),
        challenge: t(
            "難的地方在於：要在 Adobe Script 的執行環境裡動態帶入資料，輸出的檔案還要能直接印刷。",
            "The unusual part was passing data into Adobe Script and making sure the generated files consistently met print requirements.",
        ),
        implementation: t(
            "後端會讀取商品資料，交給 Adobe Script 套入版型並輸出 .ai 檔。前端則讓使用者用拖曳方式調整商品圖片的大小和位置。",
            "The back end reads the product data and passes it to Adobe Script, which fills the selected layout and exports a .ai file. The front end lets users drag product images to adjust their size and position.",
        ),
        result: t(
            "海報製作時間縮短約 80%。另外也提供公開 DEMO，使用假資料，沒有串接正式 API。",
            "Poster production time was reduced by around 80%. A public demo is also available; it uses mock data and does not connect to the production API.",
        ),
        data: [
            {
                title: t("系統設計概述", "System design overview"),
                content: [
                    {
                        type: "paragraph",
                        text: t(
                            "系統會從資料庫讀取獎項、價格和商品圖片，再套用到 4 種海報版型。",
                            "The system gets prize tiers, prices and product images from the database, then places them into one of four poster layouts.",
                        ),
                    },
                    {
                        type: "items",
                        items: [
                            {
                                icon: <LayoutGrid className="h-3.5 w-3.5" />,
                                title: t("多版型支援", "Multiple layouts"),
                                description: t(
                                    "目前支援 4 種常用版型，可依店家的需求選擇。",
                                    "Includes 4 commonly used layouts for different store requirements.",
                                ),
                            },
                            {
                                icon: <Brush className="h-3.5 w-3.5" />,
                                title: t("前端微調介面", "Front-end fine-tuning"),
                                description: t(
                                    "可以直接調整商品圖片的大小和位置。",
                                    "Users can adjust the size and position of product images.",
                                ),
                            },
                            {
                                icon: <FileDown className="h-3.5 w-3.5" />,
                                title: t("可印刷檔案輸出", "Print-ready output"),
                                description: t(
                                    "完成後會輸出可供美編使用的 Illustrator 檔案。",
                                    "The system exports an Illustrator file that the design team can use.",
                                ),
                            },
                        ],
                    },
                ],
            },
        ],
    },

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
        tagline: t(
            "採用 Zero-Knowledge 架構的開源密碼管理器，伺服器無法讀取使用者儲存的密碼。",
            "An open-source password manager using zero-knowledge architecture. The server cannot read your stored passwords.",
        ),
        stack: ["TypeScript", "Next.js", "MongoDB", "Zero-Knowledge"],
        links: {
            live: "https://taidypass.heytai.dev/zh-TW/",
            github: "https://github.com/taichyy/taidy-pass",
        },
        img: [
            "/images/portfolio/taidypass/taidypass1.png",
            "/images/portfolio/taidypass/taidypass2.png",
            "/images/portfolio/taidypass/taidypass3.png",
        ],
        overview: t(
            "這是一套開源密碼管理器，採用 Zero-Knowledge 架構。資料在瀏覽器端加解密，伺服器只會保存密文，無法讀取原始內容。支援多裝置使用，也能用鑰匙圈和標籤整理密碼。",
            "An open-source password manager built with zero-knowledge architecture. Encryption and decryption happen in the browser; the server stores only ciphertext. It supports multiple devices, keyrings and tags.",
        ),
        context: t(
            "我想做一套就算伺服器資料外洩，密碼也不會跟著外洩的工具，所以自己實作了 Zero-Knowledge 架構。",
            "I wanted to build a password manager where a server-side data breach would not expose users' passwords. That led me to implement a zero-knowledge architecture.",
        ),
        contribution: t(
            "一個人完成系統架構、前後端與加密設計，並開源發布。",
            "I handled the architecture, front end, back end and encryption design, then released the project as open source.",
        ),
        challenge: t(
            "最花時間的是把安全需求變成具體設計：金鑰怎麼產生、存在哪裡，使用者弄丟金鑰時怎麼辦。",
            "The main challenge was making security decisions concrete: how keys are generated and stored, and what happens if a user loses one.",
        ),
        implementation: t(
            "加解密都在瀏覽器完成，使用 Web Crypto 的 AES-256-GCM。加密金鑰由登入密碼和每位使用者專屬的 salt，經 PBKDF2-SHA256 運算 310,000 次推導而來，只存在瀏覽器裡，不會送到伺服器。",
            "Encryption and decryption happen in the browser with AES-256-GCM via Web Crypto. The key is derived from the login password and a per-user salt using PBKDF2-SHA256 with 310,000 iterations. It stays in the browser and is never sent to the server.",
        ),
        decisions: [
            {
                title: t("用戶端加密優先", "Client-side encryption first"),
                text: t(
                    "敏感的加解密運算都在瀏覽器端完成，伺服器不會取得使用者的明文密碼。",
                    "All sensitive encryption and decryption work happens in the browser. The server never receives users' plain-text passwords.",
                ),
            },
            {
                title: t("獨立金鑰的取捨", "The trade-off of independent keys"),
                text: t(
                    "自訂鑰匙圈的金鑰在瀏覽器隨機產生，只暫存在這台裝置。換裝置或清除資料後，就要靠使用者自己保存的金鑰，平台無法幫忙還原。這是我在安全和方便之間做的取捨。",
                    "A custom keyring key is generated randomly in the browser and cached only on that device. On a new device, or after clearing browser data, users need the copy they saved themselves; the platform cannot recover it. That's the trade-off I chose between security and convenience.",
                ),
            },
            {
                title: t("伺服器端也加密", "Hardening the server side too"),
                text: t(
                    "帳號和 Email 在伺服器端用 AES-256-GCM 加密，查詢帳號改用 HMAC-SHA256。登入密碼以 bcrypt 驗證，帳號不存在時也會跑一次比對，讓回應時間一致，防止有人用時間差猜出帳號。",
                    "Usernames and emails are encrypted on the server with AES-256-GCM, and account lookups use an HMAC-SHA256 hash. Login passwords are checked with bcrypt, and a comparison runs even when the account doesn't exist, so response times can't be used to guess which accounts are registered.",
                ),
            },
        ],
        result: t(
            "目前已經上線，我自己也持續在使用和維護，並定期處理安全修補。",
            "It's live, and I use and maintain it myself, including ongoing security fixes.",
        ),
        data: [
            {
                title: t("Zero-Knowledge 架構", "Zero-knowledge architecture"),
                content: [
                    {
                        type: "paragraph",
                        text: t(
                            "預設鑰匙圈使用者的登入帳號與密碼加密資料，整個加解密流程都在用戶端進行。伺服器只保存加密後的資料。",
                            "The default keyring uses the user's login credentials for encryption. The entire encryption process runs on the client, and the server stores only encrypted data.",
                        ),
                    },
                    {
                        type: "items",
                        items: [
                            {
                                icon: <Code2 className="h-3.5 w-3.5" />,
                                title: t(
                                    "AES-256-GCM 與 PBKDF2",
                                    "AES-256-GCM and PBKDF2",
                                ),
                                description: t(
                                    "每筆資料用 AES-256-GCM 加密，每次使用新的隨機 IV，內容被竄改時也會被偵測到。金鑰由 PBKDF2 從登入密碼推導，伺服器拿不到。",
                                    "Each entry is encrypted with AES-256-GCM using a fresh random IV, so tampering is detected too. The key is derived from the login password with PBKDF2, and the server never has it.",
                                ),
                            },
                            {
                                icon: <ListChecks className="h-3.5 w-3.5" />,
                                title: t(
                                    "自訂鑰匙圈獨立金鑰",
                                    "Independent keys for custom keyrings",
                                ),
                                description: t(
                                    "建立自訂鑰匙圈時，瀏覽器會隨機產生一組 256-bit 金鑰，只暫存在本機。換裝置時需要使用者自己保存的金鑰，才能解開其中的資料。",
                                    "Creating a custom keyring generates a random 256-bit key in the browser, cached only on that device. On another device, the data can only be unlocked with the key the user saved.",
                                ),
                            },
                            {
                                icon: <Computer className="h-3.5 w-3.5" />,
                                title: t("多裝置登入", "Seamless across devices"),
                                description: t(
                                    "可在多台裝置登入，登入後即可存取自己的密碼資料。",
                                    "Sign in on multiple devices to access your password data.",
                                ),
                            },
                        ],
                    },
                    {
                        type: "point",
                        title: t("伺服器讀不到密碼", "Your data, under your control"),
                        description: t(
                            "平台只負責儲存和傳輸密文，無法讀取其中的密碼內容。",
                            "The platform stores and transfers encrypted data but cannot read the passwords inside.",
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
        tagline: t(
            "打開瀏覽器就能使用的 JSON 編輯器，資料不會上傳到伺服器。",
            "A browser-based JSON editor. Open a tab and start editing; your data stays in the browser.",
        ),
        stack: ["TypeScript", "Next.js"],
        links: {
            live: "https://json-editor.heytai.dev",
            github: "https://github.com/taichyy/json-editor",
        },
        img: [
            "/images/portfolio/json-editor/json-editor1.png",
            "/images/portfolio/json-editor/json-editor2.png",
            "/images/portfolio/json-editor/json-editor3.png",
            "/images/portfolio/json-editor/json-editor4.png",
        ],
        overview: t(
            "這是一個完全在瀏覽器本地執行的 JSON 編輯器，提供 Tree、Table、Monaco 和 Diff 四種模式，也能匯出成 JSON、純文字、JS 物件或 PHP 陣列。不需要登入，也不會上傳資料。",
            "A JSON editor that runs entirely in your browser. It has four modes: Tree, Table, Monaco and Diff. You can export to JSON, plain text, a JS object or a PHP array. No account or upload required.",
        ),
        context: t(
            "工作時常常需要查看和修改 JSON。我試過一些線上工具，有些需要登入，有些介面太複雜，所以就自己做了一個打開網頁就能用、資料也留在本機的工具。",
            "I work with JSON every day. Some online tools require an account, while others have more interface than I need. I wanted a simple editor that opens straight away and keeps the data in the browser.",
        ),
        contribution: t(
            "構想、設計、前端、部署，都是我一個人做的。",
            "I handled the idea, design, front-end development and deployment.",
        ),
        implementation: t(
            "JSON 的解析和編輯都在瀏覽器端完成，不會回傳使用資料（zero telemetry）。目前有四種檢視模式，也支援多種匯出格式。",
            "Parsing and editing happen in the browser, with zero telemetry. The editor includes four viewing modes and several export formats.",
        ),
        result: t(
            "工具已上線，我平常也會拿來處理 JSON。",
            "It's live, and I use it regularly myself.",
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
                                    "用樹狀結構查看巢狀 JSON，點選欄位就能直接修改。",
                                    "View nested JSON as a tree and edit values directly.",
                                ),
                            },
                            {
                                icon: <ListChecks className="h-3.5 w-3.5" />,
                                title: "Table View",
                                description: t(
                                    "物件陣列會整理成表格，可以直接編輯多筆資料。",
                                    "Arrays of objects are displayed in an editable table, making it easier to update multiple entries.",
                                ),
                            },
                            {
                                icon: <Code2 className="h-3.5 w-3.5" />,
                                title: t("Monaco 編輯器", "Monaco editor"),
                                description: t(
                                    "提供語法高亮、即時檢查和格式化功能，使用的是 Monaco 編輯器。",
                                    "Includes syntax highlighting, live validation and formatting, powered by the Monaco editor.",
                                ),
                            },
                            {
                                icon: <RefreshCcw className="h-3.5 w-3.5" />,
                                title: "JSON Diff",
                                description: t(
                                    "將兩份 JSON 並排顯示，方便查看內容差異。",
                                    "View two JSON documents side by side to compare their differences.",
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
        tagline: t(
            "以「未接來電」為概念，把常見症狀設計成角色，介紹相關健康知識。",
            "A health education project that presents common symptoms as characters calling your phone.",
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
            "「你有一通未接來電⋯⋯」症來電把身體的各種症狀設計成會打電話來的角色，再透過角色圖文介紹相關知識，讓健康議題更容易閱讀。",
            "\"You have one missed call…\" Symptoms Calling turns different bodily symptoms into characters that call you, then uses illustrations and stories to explain the related health topics.",
        ),
        overview: t(
            "專題以「未接來電」為主題，包含 Instagram 圖文連載、介紹影片、互動小遊戲和周邊商品，將常見症狀設計成不同角色。",
            "The project uses the missed-call concept across an illustrated Instagram series, feature videos, interactive mini-games and merchandise, with common symptoms presented as characters.",
        ),
        context: t(
            "健康資訊通常很長，年輕人不太會主動看。這個專題把症狀變成會打電話來的角色，用社群圖文呈現，試試看大家會不會比較願意看。",
            "Health information can be lengthy and difficult to approach, and young people may not seek it out themselves. The project explored whether presenting symptoms as characters through familiar social media formats would make the information easier to engage with and remember.",
        ),
    },
];

// ── Locale-resolved accessors ────────────────────────────────────────
const byPriority = (a, b) => (a.priority || 99) - (b.priority || 99);

export const getCategories = (locale) => localize(categoriesSource, locale);

export const getCategoryMeta = (locale) =>
    Object.fromEntries(getCategories(locale).map((category) => [category.id, category]));

// Stable catalogue number: the project's rank by priority.
const numbered = [...projectsSource]
    .sort(byPriority)
    .map((project, i) => ({ ...project, number: i + 1 }));

export const getProjects = (locale) => localize(numbered, locale);

export const getProject = (slug, locale) => {
    const project = numbered.find((p) => p.slug === slug);
    return project ? localize(project, locale) : undefined;
};


export const getProjectsByCategory = (locale) => {
    const projects = getProjects(locale);

    return getCategories(locale)
        .map((category) => ({
            ...category,
            items: projects.filter((p) => p.category === category.id).sort(byPriority),
        }))
        .filter((category) => category.items.length > 0);
};

export const projectSlugs = projectsSource.map((p) => ({
    slug: p.slug,
    featured: Boolean(p.featured),
}));

export const projectHref = (project) => `/projects/${project.slug}`;
