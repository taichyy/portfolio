import fs from "node:fs/promises"
import path from "node:path"
import { ImageResponse } from "next/og"

import { getProfile } from "@/lib/profile"
import { LOCALES, resolveLocale } from "@/lib/i18n/config"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Tai — Software Engineer"

const BRAND = "#FEFF0D"
const INK = "#171717"
const SUBTLE = "#737373"
const LINE = "#E8E8E8"

export function generateStaticParams() {
    return LOCALES.map((locale) => ({ locale }))
}

// Fetches a TrueType subset holding only `text` (the renderer can't read WOFF2).
const loadFont = async (family, weight, text) => {
    const url = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`
    const css = await (await fetch(url)).text()
    const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1]
    if (!src) throw new Error(`Could not load font ${family}`)
    return (await fetch(src)).arrayBuffer()
}

// "[[words]]" become marked segments; "|" break hints are dropped.
const segments = (line) =>
    line
        .replaceAll("|", "")
        .split(/(\[\[.+?\]\])/)
        .filter(Boolean)
        .map((part) =>
            part.startsWith("[[") ? { text: part.slice(2, -2), mark: true } : { text: part, mark: false },
        )
        // The renderer trims spaces at the edges of each segment; keep them.
        .map((seg) => ({ ...seg, text: seg.text.replace(/^ | $/g, "\u00A0") }))

const OpengraphImage = async (props) => {
    const locale = resolveLocale((await props.params).locale)
    const profile = getProfile(locale)
    const isZh = locale === "zh-TW"

    const lines = profile.headline.map(segments)
    const footer = `${profile.title} · ${profile.focus}`
    const allText = ["HeyTai", "heytai.dev", "Portfolio", footer, ...lines.flat().map((s) => s.text)].join("")

    const [latin, cjk, logo] = await Promise.all([
        loadFont("Bricolage+Grotesque", 800, allText),
        loadFont("Noto+Sans+TC", 800, allText),
        fs.readFile(path.join(process.cwd(), "public/logo-dark.png")),
    ])
    const logoSrc = `data:image/png;base64,${logo.toString("base64")}`

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    background: "#FFFFFF",
                    color: INK,
                    padding: "64px 72px",
                    fontFamily: "Bricolage, NotoTC",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <img src={logoSrc} width={62} height={40} alt="" />
                        <span style={{ fontSize: 34 }}>HeyTai</span>
                    </div>
                    <span style={{ fontSize: 26, color: SUBTLE }}>heytai.dev</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: isZh ? 10 : 4 }}>
                    {lines.map((line, i) => (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                fontSize: isZh ? 76 : 64,
                                lineHeight: 1.12,
                                letterSpacing: isZh ? "0.01em" : "-0.035em",
                            }}
                        >
                            {line.map((seg, j) => (
                                <span
                                    key={j}
                                    style={seg.mark ? { background: BRAND, padding: "0 6px" } : {}}
                                >
                                    {seg.text}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderTop: `2px solid ${INK}`,
                        paddingTop: 22,
                        fontSize: 26,
                    }}
                >
                    <span>{footer}</span>
                    <span style={{ display: "flex", background: BRAND, padding: "4px 12px", fontSize: 22 }}>
                        Portfolio
                    </span>
                </div>
            </div>
        ),
        {
            ...size,
            fonts: [
                { name: "Bricolage", data: latin, weight: 800, style: "normal" },
                { name: "NotoTC", data: cjk, weight: 800, style: "normal" },
            ],
        },
    )
}

export default OpengraphImage
