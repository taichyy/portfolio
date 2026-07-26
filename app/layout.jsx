import { Analytics } from "@vercel/analytics/next"
import { Inter, Newsreader, JetBrains_Mono } from "next/font/google"

import "./globals.css"
import "../public/icomoon/style.css"
import SiteNav from "@/components/site-nav"
import SmoothNavigate from "@/components/smooth-navigate"
import { ThemeProvider } from "@/components/providers/theme-provider"

const sans = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap",
})

const serif = Newsreader({
    subsets: ["latin"],
    style: ["normal", "italic"],
    variable: "--font-serif",
    display: "swap",
})

const mono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
    display: "swap",
})

const SITE_URL = "https://www.heytai.dev";

export const metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: "Tai｜軟體工程師 Software Engineer",
        template: "%s｜Tai",
    },
    description:
        "Tai 的個人作品集。專注於 TypeScript、React、Next.js 的全端網頁開發，曾獨立打造商業化 ERP 系統前端架構，並自行開發上線產品與開源工具。",
    keywords: [
        "Tai",
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
    authors: [{ name: "Tai", url: SITE_URL }],
    creator: "Tai",
    openGraph: {
        type: "website",
        locale: "zh_TW",
        url: SITE_URL,
        siteName: "Tai",
        title: "Tai｜軟體工程師 Software Engineer",
        description:
            "專注於 TypeScript、React、Next.js 的全端網頁開發，曾獨立打造商業化 ERP 系統，並自行開發上線產品與開源工具。",
        images: [
            {
                url: "/images/contact/logo-whitebg.png",
                width: 765,
                height: 710,
                alt: "Tai",
            },
        ],
    },
    twitter: {
        card: "summary",
        title: "Tai｜軟體工程師 Software Engineer",
        description:
            "全端網頁開發，主力 TypeScript、React、Next.js。",
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
        { media: "(prefers-color-scheme: light)", color: "#f7f4ee" },
        { media: "(prefers-color-scheme: dark)", color: "#131210" },
    ],
}

const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tai",
    alternateName: ["Tai"],
    url: SITE_URL,
    email: "mailto:tai@heytai.dev",
    image: `${SITE_URL}/images/contact/logo-whitebg.png`,
    jobTitle: "軟體研發工程師 Software R&D Engineer",
    alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "國立高雄科技大學",
    },
    knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "MongoDB",
        "Web Development",
        "Product Building",
        "AI Coding Agents",
        "Automation",
    ],
    sameAs: [
        "https://github.com/taichyy",
        "https://www.taiche.dev",
    ],
};

export default function RootLayout(props) {
    const { children } = props;

    return (
        <html
            lang="zh-Hant"
            suppressHydrationWarning
            className={`${sans.variable} ${serif.variable} ${mono.variable}`}
        >
            <body className="font-sans min-h-screen bg-background text-foreground antialiased">
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
                    <SmoothNavigate />
                    <SiteNav />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}
