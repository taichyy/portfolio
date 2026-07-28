import { notFound } from "next/navigation"
import { Analytics } from "@vercel/analytics/next"
import { Inter, Newsreader, JetBrains_Mono } from "next/font/google"

import "../globals.css"
import "../../public/icomoon/style.css"
import SiteNav from "@/components/site-nav"
import { getEducation } from "@/lib/profile"
import { getDictionary } from "@/lib/i18n/dictionaries"
import SmoothNavigate from "@/components/smooth-navigate"
import { SITE_URL, localeAlternates } from "@/lib/i18n/seo"
import I18nProvider from "@/components/providers/i18n-provider"
import { LOCALES, LOCALE_META, isLocale } from "@/lib/i18n/config"
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

export function generateStaticParams() {
    return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata(props) {
    const { locale } = await props.params

    if (!isLocale(locale)) return {}

    const dict = getDictionary(locale)

    return {
        metadataBase: new URL(SITE_URL),
        title: {
            default: dict.meta.title,
            template: dict.meta.titleTemplate,
        },
        description: dict.meta.description,
        keywords: dict.meta.keywords,
        authors: [{ name: "Tai", url: SITE_URL }],
        creator: "Tai",
        alternates: localeAlternates(locale),
        openGraph: {
            type: "website",
            locale: LOCALE_META[locale].ogLocale,
            url: `${SITE_URL}/${locale}`,
            siteName: "Tai",
            title: dict.meta.title,
            description: dict.meta.shortDescription,
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
            title: dict.meta.title,
            description: dict.meta.twitterDescription,
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
}

export const viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#f7f4ee" },
        { media: "(prefers-color-scheme: dark)", color: "#131210" },
    ],
}

const personJsonLd = (locale, dict, school) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tai",
    url: `${SITE_URL}/${locale}`,
    email: "mailto:tai@heytai.dev",
    image: `${SITE_URL}/images/contact/logo-whitebg.png`,
    jobTitle: dict.meta.jobTitle,
    alumniOf: {
        "@type": "CollegeOrUniversity",
        name: school,
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
})

const RootLayout = async (props) => {
    const { children } = props;
    const { locale } = await props.params;

    if (!isLocale(locale)) notFound();

    const dict = getDictionary(locale);

    return (
        <html
            lang={LOCALE_META[locale].htmlLang}
            suppressHydrationWarning
            className={`${sans.variable} ${serif.variable} ${mono.variable}`}
        >
            <body className="font-sans min-h-screen bg-background text-foreground antialiased">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(
                            personJsonLd(locale, dict, getEducation(locale)[0].school),
                        ),
                    }}
                />
                <I18nProvider locale={locale}>
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
                </I18nProvider>
            </body>
        </html>
    )
}

export default RootLayout
