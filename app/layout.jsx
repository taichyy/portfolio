import { Analytics } from "@vercel/analytics/next"

import "./globals.css"
import "../public/icomoon/style.css";
import ProviderAOS from "@/components/providers/provider-aos"
import NavResponsive from "@/components/navbar/nav-responsive"
import { ThemeProvider } from "@/components/providers/theme-provider"

export const metadata = {
    title: {
        default: "個人網站 | Tai",
        template: "%s | Tai",
    },
    description: 'Tai-Cheng, Yen － 個人介紹、作品集、履歷網頁',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="font-sans min-h-screen bg-background text-foreground">
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
