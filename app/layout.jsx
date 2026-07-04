import { Analytics } from "@vercel/analytics/next"

import "./globals.css"
import "../public/icomoon/style.css";
import ProviderAOS from "@/components/providers/provider-aos"
import NavResponsive from "@/components/navbar/nav-responsive"
import { ThemeProvider } from "@/components/providers/theme-provider"

const SITE_URL = "https://www.heytai.dev";

export const metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: "Tai 嚴太成｜全端網頁工程師 Full-Stack Web Developer",
        template: "%s｜Tai 嚴太成",
    },
    description: "嚴太成（Tai-Cheng Yen）的個人網站與作品集。專注於 Next.js、React、TypeScript 的全端網頁工程師，具備 ERP 系統開發與商業化經驗。Full-stack web developer portfolio featuring Next.js, React, and TypeScript projects.",
    keywords: [
        "嚴太成",
        "Tai-Cheng Yen",
        "全端工程師",
        "前端工程師",
        "網頁工程師",
        "作品集",
        "Next.js",
        "React",
        "TypeScript",
        "Full-Stack Developer",
        "Frontend Developer",
        "Web Developer",
        "Portfolio",
        "Taiwan",
    ],
    authors: [{ name: "嚴太成 Tai-Cheng Yen", url: SITE_URL }],
    creator: "嚴太成 Tai-Cheng Yen",
    openGraph: {
        type: "website",
        locale: "zh_TW",
        url: SITE_URL,
        siteName: "Tai 嚴太成｜個人網站與作品集",
        title: "Tai 嚴太成｜全端網頁工程師 Full-Stack Web Developer",
        description: "專注於 Next.js、React、TypeScript 的全端網頁工程師。個人介紹、作品集、履歷。",
        images: [
            {
                url: "/images/contact/logo-whitebg.png",
                width: 765,
                height: 710,
                alt: "HEYTAI.DEV - Build, Design, Solve",
            },
        ],
    },
    twitter: {
        card: "summary",
        title: "Tai 嚴太成｜全端網頁工程師 Full-Stack Web Developer",
        description: "專注於 Next.js、React、TypeScript 的全端網頁工程師。個人介紹、作品集、履歷。",
        images: ["/images/contact/logo-whitebg.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
}

export const viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#080c18" },
    ],
}

const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "嚴太成",
    alternateName: "Tai-Cheng Yen",
    url: SITE_URL,
    email: "mailto:tai@heytai.dev",
    image: `${SITE_URL}/images/contact/logo-whitebg.png`,
    jobTitle: "全端網頁工程師 Full-Stack Web Developer",
    worksFor: {
        "@type": "Organization",
        name: "華碩電腦 ASUS",
    },
    alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "國立高雄科技大學",
    },
    knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "JavaScript",
        "Node.js",
        "MongoDB",
        "Tailwind CSS",
        "PHP",
        "MySQL",
    ],
    sameAs: [
        "https://github.com/taichyy",
        "https://www.taiche.dev",
    ],
};

export default function RootLayout({ children }) {
    return (
        <html lang="zh-Hant" suppressHydrationWarning>
            <body className="font-sans min-h-screen bg-background text-foreground">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
                />
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem={false}
                    disableTransitionOnChange={false}
                >
                    <Analytics />
                    <NavResponsive />
                    <ProviderAOS>
                        {children}
                    </ProviderAOS>
                </ThemeProvider>
            </body>
        </html>
    )
}
