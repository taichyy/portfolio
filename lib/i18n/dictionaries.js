import { DEFAULT_LOCALE } from "./config"

// UI chrome only. Everything that is *content* (profile, experience,
// projects) lives in `lib/profile.js` / `lib/data.js` as `t(zh, en)` pairs.
const dictionaries = {
    "zh-TW": {
        meta: {
            title: "Tai｜軟體工程師",
            titleTemplate: "%s｜Tai",
            description:
                "Tai 的個人作品集。專注於 TypeScript、React、Next.js 的全端網頁開發，曾獨立打造商業化 ERP 系統前端架構，並自行開發上線產品與開源工具。",
            shortDescription:
                "專注於 TypeScript、React、Next.js 的全端網頁開發，曾獨立打造商業化 ERP 系統，並自行開發上線產品與開源工具。",
            twitterDescription: "全端網頁開發，主力 TypeScript、React、Next.js。",
            keywords: [
                "Tai",
                "heytai",
                "軟體工程師",
                "Software Engineer",
                "TaidyPass",
                "個人網站",
                "作品集",
                "Next.js",
                "React",
                "TypeScript",
                "Indie Hacker",
                "Taiwan",
            ],
            jobTitle: "軟體研發工程師",
            about: {
                title: "關於",
                description:
                    "我是 Tai，一名軟體工程師。我做全端網頁開發，也自己發起並打造產品。我在意軟體怎麼被使用、能不能被交付與維護。",
            },
            experience: {
                title: "經歷",
                description:
                    "Tai 的專業經歷：曾獨立負責商業化 ERP 系統前端架構，並開發自動化生產工具與會員系統。國立高雄科技大學資訊管理系。",
            },
            projects: {
                title: "作品",
                description:
                    "Tai 的軟體工程作品：商業化 ERP 系統、自己發起的產品、Zero-Knowledge 開源密碼管理器與各種工具。依實務作品、自有產品、開源與個人專案分類。",
            },
            contact: {
                title: "聯絡",
                description: "與 Tai 聯絡：工作邀約、技術討論或產品合作都歡迎來信。",
            },
            projectNotFound: "找不到作品",
            projectDescription: (tagline, stack, category) =>
                `${tagline}${stack ? `　技術：${stack}。` : ""}${category ? `　分類：${category}。` : ""}`,
            listSeparator: "、",
            notFound: "找不到頁面 404",
        },
        nav: {
            home: "首頁",
            experience: "經歷",
            projects: "作品",
            about: "關於",
            contact: "聯絡",
            openMenu: "開啟選單",
            closeMenu: "關閉選單",
            switchLanguage: "切換語言",
            toLight: "切換淺色主題",
            toDark: "切換深色主題",
        },
        home: {
            role: "軟體工程師",
            currently: "目前",
            viewExperience: "查看經歷",
            viewProjects: "查看作品",
            scrollDown: "往下",
            scrollDownAria: "往下捲動",
            profile: "簡介",
            selectedWork: "精選作品",
            allProjects: "全部作品",
            experience: "工作經歷",
            fullExperience: "完整經歷",
            techProfile: "技術能力",
            contact: "聯絡",
        },
        about: {
            eyebrow: "關於",
            facts: {
                education: "學歷",
                languages: "語言",
                stack: "常用",
                location: "所在",
                links: "連結",
            },
            closing: {
                lead: "想更了解我做過的東西？看看我的",
                projects: "作品",
                and: "與",
                experience: "經歷",
                end: "。",
            },
            contactCta: "聯絡我",
        },
        experience: {
            eyebrow: "經歷",
            heading: "專業經歷",
            intro: "我做過的專業工作，以及我在每段經歷中實際負責的部分。",
            current: "現職",
            relatedProject: "相關作品",
            education: "學歷",
            languages: "語言",
            techProfile: "技術能力",
        },
        projects: {
            eyebrow: "作品",
            heading: "我做過的東西",
            intro:
                "這些專案橫跨專業工作、自己發起的產品、開源與個人工具。每個專案的頁面都寫成一份工程視角的說明：問題是什麼、我負責哪些部分、技術上難在哪、我怎麼解決。",
        },
        project: {
            back: "所有作品",
            source: "原始碼",
            visit: "前往網站",
            openSource: "開源",
            fallbackCategory: "專案",
            meta: {
                category: "分類",
                role: "擔任角色",
                year: "年份",
                client: "客戶",
                company: "公司",
                technology: "使用技術",
                links: "連結",
            },
            liveLink: "線上連結",
            repoLink: "Github",
            sections: {
                background: "背景",
                overview: "專案概述",
                context: "為什麼需要它",
                contribution: "我負責的部分",
                challenge: "技術挑戰",
                implementation: "怎麼實作的",
                decisions: "關鍵工程決策",
                result: "成果",
                retrospective: "如果重做",
            },
            deepDive: "細節",
            zoomImage: "放大檢視圖片",
            zoomImageAt: (index) => `放大檢視第 ${index} 張`,
            goToImage: (index) => `第 ${index} 張`,
        },
        contact: {
            eyebrow: "聯絡",
            email: "Email",
        },
        footer: {
            tagline: "Tai — 軟體工程師",
        },
        lightbox: {
            title: "圖片檢視",
            close: "關閉",
            image: (index) => `圖片 ${index}`,
        },
        notFound: {
            heading: "這裡什麼都沒有。",
            body: "你找的東西可能被搬走、改名，或還沒被我做出來。",
            home: "回首頁",
            projects: "看作品",
        },
    },

    en: {
        meta: {
            title: "Tai｜Software Engineer",
            titleTemplate: "%s｜Tai",
            description:
                "Tai's portfolio. Full-stack web development with TypeScript, React and Next.js. Built the front-end architecture of a commercial ERP system single-handedly, and ships his own products and open-source tools.",
            shortDescription:
                "Full-stack web development with TypeScript, React and Next.js. Built a commercial ERP system single-handedly, and ships his own products and open-source tools.",
            twitterDescription:
                "Full-stack web development, mainly TypeScript, React and Next.js.",
            keywords: [
                "Tai",
                "heytai",
                "Software Engineer",
                "Web Developer",
                "TaidyPass",
                "Portfolio",
                "Next.js",
                "React",
                "TypeScript",
                "Indie Hacker",
                "Taiwan",
            ],
            jobTitle: "Software R&D Engineer",
            about: {
                title: "About",
                description:
                    "I'm Tai, a software engineer. I build full-stack web applications and start my own products. I care about how software gets used, and whether it can be shipped and maintained.",
            },
            experience: {
                title: "Experience",
                description:
                    "Tai's professional experience: owned the front-end architecture of a commercial ERP system, and built automated production tooling and membership systems. B.B.A. in Information Management, National Kaohsiung University of Science and Technology.",
            },
            projects: {
                title: "Projects",
                description:
                    "Tai's engineering work: a commercial ERP system, self-started products, a zero-knowledge open-source password manager and assorted tools — grouped into professional work, own products, open source and personal projects.",
            },
            contact: {
                title: "Contact",
                description:
                    "Get in touch with Tai — job offers, technical discussions and product collaborations are all welcome.",
            },
            projectNotFound: "Project not found",
            projectDescription: (tagline, stack, category) =>
                `${tagline}${stack ? ` Stack: ${stack}.` : ""}${category ? ` Category: ${category}.` : ""}`,
            listSeparator: ", ",
            notFound: "Page not found 404",
        },
        nav: {
            home: "Home",
            experience: "Experience",
            projects: "Projects",
            about: "About",
            contact: "Contact",
            openMenu: "Open menu",
            closeMenu: "Close menu",
            switchLanguage: "Switch language",
            toLight: "Switch to light theme",
            toDark: "Switch to dark theme",
        },
        home: {
            role: "Software Engineer",
            currently: "Currently",
            viewExperience: "View experience",
            viewProjects: "View projects",
            scrollDown: "Scroll",
            scrollDownAria: "Scroll down",
            profile: "Profile",
            selectedWork: "Selected Work",
            allProjects: "All projects",
            experience: "Experience",
            fullExperience: "Full experience",
            techProfile: "Technical Profile",
            contact: "Contact",
        },
        about: {
            eyebrow: "About",
            facts: {
                education: "Education",
                languages: "Languages",
                stack: "Stack",
                location: "Location",
                links: "Links",
            },
            closing: {
                lead: "Want to see more of what I've built? Take a look at my ",
                projects: "projects",
                and: " and ",
                experience: "experience",
                end: ".",
            },
            contactCta: "Get in touch",
        },
        experience: {
            eyebrow: "Experience",
            heading: "Professional experience",
            intro: "The professional work I've done, and what I was actually responsible for in each role.",
            current: "Current",
            relatedProject: "Related project",
            education: "Education",
            languages: "Languages",
            techProfile: "Technical Profile",
        },
        projects: {
            eyebrow: "Projects",
            heading: "Things I've built",
            intro:
                "These projects span professional work, products I started myself, open source and personal tools. Each project page is written from an engineering point of view: what the problem was, what I owned, where the difficulty was, and how I solved it.",
        },
        project: {
            back: "All projects",
            source: "Source",
            visit: "Visit",
            openSource: "Open Source",
            fallbackCategory: "Project",
            meta: {
                category: "Category",
                role: "Role",
                year: "Year",
                client: "Client",
                company: "Company",
                technology: "Technology",
                links: "Links",
            },
            liveLink: "Live site",
            repoLink: "Github",
            sections: {
                background: "Background",
                overview: "Overview",
                context: "Why it was needed",
                contribution: "My role",
                challenge: "Technical challenge",
                implementation: "Implementation",
                decisions: "Engineering decisions",
                result: "Result",
                retrospective: "What I'd do differently",
            },
            deepDive: "Details",
            zoomImage: "View larger image",
            zoomImageAt: (index) => `View image ${index} larger`,
            goToImage: (index) => `Go to image ${index}`,
        },
        contact: {
            eyebrow: "Contact",
            email: "Email",
        },
        footer: {
            tagline: "Tai — Software Engineer",
        },
        lightbox: {
            title: "Image viewer",
            close: "Close",
            image: (index) => `Image ${index}`,
        },
        notFound: {
            heading: "There's nothing here.",
            body: "What you're looking for may have moved, been renamed, or not been built by me yet.",
            home: "Back home",
            projects: "See projects",
        },
    },
};

export const getDictionary = (locale) => dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
