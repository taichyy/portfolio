import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import "./globals.css"
import "../public/icomoon/style.css";
import ProviderAOS from "@/components/providers/provider-aos"

export const metadata = {
    title: {
        default: "個人網站 | Tai",
        template: "%s | Tai",
    },
    description: 'Tai-Cheng, Yen － 個人介紹、作品集、履歷網頁',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="font-sans min-h-screen bg-[#F3F3F3]">
                <Analytics />
                <SpeedInsights />
                <ProviderAOS>
                    {children}
                </ProviderAOS>
            </body>
        </html>
    )
}
