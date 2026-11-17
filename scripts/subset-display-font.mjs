// Subsets Noto Sans TC 800 to the CJK characters used in the source (prebuild).
// On download failure the existing file is kept so the build still succeeds.

import fs from "node:fs"
import path from "node:path"

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..")
const SOURCE_DIRS = ["app", "components", "lib"]
const OUTPUT = path.join(ROOT, "app/fonts/noto-sans-tc-800-subset.woff2")

const CJK = /[⺀-⿟　-〿㐀-䶿一-鿿豈-﫿︰-﹏＀-￯]/g

// A current desktop browser UA makes Google serve WOFF2.
const USER_AGENT =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"

const walk = (dir) =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const full = path.join(dir, entry.name)
        return entry.isDirectory() ? walk(full) : [full]
    })

const collectCharacters = () => {
    const files = SOURCE_DIRS
        .flatMap((dir) => walk(path.join(ROOT, dir)))
        .filter((file) => /\.(js|jsx|mjs)$/.test(file))

    const chars = new Set(files.flatMap((file) => fs.readFileSync(file, "utf8").match(CJK) || []))
    return [...chars].sort().join("")
}

const download = async (text) => {
    const cssUrl =
        "https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@800&display=swap&text=" +
        encodeURIComponent(text)

    const cssResponse = await fetch(cssUrl, { headers: { "User-Agent": USER_AGENT } })
    if (!cssResponse.ok) throw new Error(`CSS request failed: ${cssResponse.status}`)

    const css = await cssResponse.text()
    const fontUrl = css.match(/src:\s*url\((https:[^)]+)\)/)?.[1]
    if (!fontUrl) throw new Error("No font URL in the Google Fonts response")

    const fontResponse = await fetch(fontUrl)
    if (!fontResponse.ok) throw new Error(`Font request failed: ${fontResponse.status}`)

    return Buffer.from(await fontResponse.arrayBuffer())
}

const main = async () => {
    const text = collectCharacters()

    try {
        const font = await download(text)
        fs.mkdirSync(path.dirname(OUTPUT), { recursive: true })
        fs.writeFileSync(OUTPUT, font)
        console.log(`[subset-display-font] ${text.length} characters, ${Math.round(font.length / 1024)} KB`)
    } catch (error) {
        if (fs.existsSync(OUTPUT)) {
            console.warn(`[subset-display-font] ${error.message}; keeping the existing subset.`)
            return
        }
        console.error(`[subset-display-font] ${error.message}; no existing subset to fall back to.`)
        process.exit(1)
    }
}

main()
