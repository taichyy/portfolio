import { Analytics } from "@vercel/analytics/react"

import "./globals.css"
import "../public/icomoon/style.css";
import ProviderAOS from "@/components/providers/provider-aos"

export const metadata = {
    title: "Tai | HOME",
    description: 'Tai-Cheng, Yen － 個人介紹、作品集、履歷網頁',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="font-sans min-h-screen bg-[#F3F3F3]">
                <Analytics />
                <ProviderAOS>
                    {children}
                </ProviderAOS>
            </body>
        </html>
    )
}
