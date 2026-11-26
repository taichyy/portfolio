import { DEFAULT_LOCALE } from "./config"

// UI strings only; content lives in lib/profile.js and lib/data.js.
const dictionaries = {
    "zh-TW": {
        meta: {
            title: "Tai｜軟體工程師",
            titleTemplate: "%s｜Tai",
            description:
                "Tai 的個人作品集，介紹使用 TypeScript、React 和 Next.js 開發全端網頁應用的經驗，以及商業化 ERP 系統、個人產品和開源工具。",
            shortDescription:
                "用 TypeScript、React、Next.js 做全端網頁開發。曾一個人負責商業 ERP 的前端，也做自己的產品與開源工具。",
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
                    "我是 Tai，做全端網頁開發，也自己做產品。這裡是我的經歷和做過的專案。",
            },
            experience: {
                title: "經歷",
                description:
                    "Tai 的工作經歷包含商業化 ERP 系統前端、自動化生產工具和 LINE LIFF 會員系統。畢業於國立高雄科技大學資訊管理系。",
            },
            projects: {
                title: "作品",
                description:
                    "Tai 的軟體工程作品，包含商業專案、個人產品、Zero-Knowledge 開源密碼管理器和實用工具。",
            },
            contact: {
                title: "聯絡",
                description: "工作邀約、技術交流、產品合作，寫信給 Tai。",
            },
            projectNotFound: "找不到作品",
            projectDescription: (tagline, stack, category) =>
                `${tagline}${stack ? `　技術：${stack}。` : ""}${category ? `　分類：${category}。` : ""}`,
            listSeparator: "、",
            notFound: "找不到頁面 404",
        },
        nav: {
            home: "首頁",
            main: "主選單",
            footer: "頁尾連結",
            experience: "經歷",
            projects: "作品",
            about: "關於",
            contact: "聯絡",
            openMenu: "開啟選單",
            closeMenu: "關閉選單",
            switchLanguage: "切換語言",
            toLight: "切換淺色主題",
            toDark: "切換深色主題",
            skipToContent: "跳到主要內容",
        },
        home: {
            viewExperience: "查看經歷",
            viewProjects: "查看作品",
            profile: "簡介",
            selectedWork: "精選作品",
            allProjects: "全部作品",
            experience: "工作經歷",
            fullExperience: "完整經歷",
            techProfile: "技術能力",
            contact: "聯絡",
            featured: "精選",
            readCaseStudy: "閱讀完整案例",
            facts: {
                currently: "目前",
                focus: "專長",
                based: "所在",
                elsewhere: "其他",
            },
            tenure: {
                fullTime: "正職",
                freelance: "接案",
                more: "查看年資明細",
                yearsMonths: (months) => `${Math.floor(months / 12)} 年 ${months % 12} 個月`,
                years: (months) => `${Math.floor(months / 12)} 年`,
            },
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
                lead: "做過的東西，在這裡：",
                projects: "作品",
                and: "與",
                experience: "經歷",
                end: "。",
            },
            contactCta: "聯絡我",
        },
        experience: {
            eyebrow: "經歷",
            heading: "[[專業]]經歷",
            intro: "做過的工作，和每一段負責的事。",
            current: "現職",
            relatedProject: "相關作品",
            education: "學歷",
            training: "海外培訓",
            languages: "語言",
            techProfile: "技術能力",
        },
        projects: {
            eyebrow: "作品",
            heading: "我[[做過]]的東西",
            intro:
                "工作上的專案、自己的產品、開源專案和小工具。每個專案頁會寫背景、我負責的部分，以及遇到的問題和怎麼解決。",
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
        carousel: {
            prev: "上一張",
            next: "下一張",
            label: "專案截圖",
            slide: (index, total) => `第 ${index} 張，共 ${total} 張`,
            markers: "選擇圖片",
        },
        notFound: {
            heading: "找不到這個頁面。",
            body: "頁面可能搬走、改名，或不存在。",
            home: "回首頁",
            projects: "看作品",
        },
    },

    en: {
        meta: {
            title: "Tai｜Software Engineer",
            titleTemplate: "%s｜Tai",
            description:
                "Tai's portfolio, featuring full-stack web development with TypeScript, React and Next.js, work on a commercial ERP system, and independently developed products and open-source tools.",
            shortDescription:
                "Full-stack web development with TypeScript, React and Next.js. Experience with a commercial ERP system, personal products and open-source tools.",
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
                    "I'm Tai, a software engineer working across the stack. I also develop products of my own. This site brings together my work experience and projects.",
            },
            experience: {
                title: "Experience",
                description:
                    "Tai's experience includes front-end development for a commercial ERP system, production automation tools and a LINE LIFF membership system. He studied Information Management at National Kaohsiung University of Science and Technology.",
            },
            projects: {
                title: "Projects",
                description:
                    "Tai's software projects include a commercial ERP system, personal products, a zero-knowledge open-source password manager and other tools.",
            },
            contact: {
                title: "Contact",
                description:
                    "Contact Tai about software engineering roles, technical discussions or product collaborations.",
            },
            projectNotFound: "Project not found",
            projectDescription: (tagline, stack, category) =>
                `${tagline}${stack ? ` Stack: ${stack}.` : ""}${category ? ` Category: ${category}.` : ""}`,
            listSeparator: ", ",
            notFound: "Page not found 404",
        },
        nav: {
            home: "Home",
            main: "Main",
            footer: "Footer",
            experience: "Experience",
            projects: "Works",
            about: "About",
            contact: "Contact",
            openMenu: "Open menu",
            closeMenu: "Close menu",
            switchLanguage: "Switch language",
            toLight: "Switch to light theme",
            toDark: "Switch to dark theme",
            skipToContent: "Skip to main content",
        },
        home: {
            viewExperience: "View experience",
            viewProjects: "View projects",
            profile: "Profile",
            selectedWork: "Selected Work",
            allProjects: "All projects",
            experience: "Experience",
            fullExperience: "Full experience",
            techProfile: "Technical Profile",
            contact: "Contact",
            featured: "Featured",
            readCaseStudy: "Read the case study",
            facts: {
                currently: "Currently",
                focus: "Focus",
                based: "Based in",
                elsewhere: "Elsewhere",
            },
            tenure: {
                fullTime: "Full-time",
                freelance: "Freelance",
                more: "Show tenure breakdown",
                yearsMonths: (months) => {
                    const y = Math.floor(months / 12);
                    const m = months % 12;
                    return `${y} yr${y === 1 ? "" : "s"} ${m} mo${m === 1 ? "" : "s"}`;
                },
                years: (months) => {
                    const y = Math.floor(months / 12);
                    return `${y} yr${y === 1 ? "" : "s"}`;
                },
            },
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
                lead: "To see more of my work, take a look at my ",
                projects: "projects",
                and: " and ",
                experience: "experience",
                end: ".",
            },
            contactCta: "Get in touch",
        },
        experience: {
            eyebrow: "Experience",
            heading: "Professional [[experience]]",
            intro: "A look at my work experience and the responsibilities I had in each role.",
            current: "Current",
            relatedProject: "Related project",
            education: "Education",
            training: "Overseas training",
            languages: "Languages",
            techProfile: "Technical Profile",
        },
        projects: {
            eyebrow: "Projects",
            heading: "Things I've [[built]]",
            intro:
                "This collection includes work projects, products of my own, open-source projects and personal tools. Each page covers the project's background, my role, and the technical problems I worked through.",
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
        carousel: {
            prev: "Previous slide",
            next: "Next slide",
            label: "Project screenshots",
            slide: (index, total) => `${index} of ${total}`,
            markers: "Choose an image",
        },
        notFound: {
            heading: "Page not found.",
            body: "This page may have moved, been renamed or no longer exists.",
            home: "Back home",
            projects: "See projects",
        },
    },
};

export const getDictionary = (locale) => dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
