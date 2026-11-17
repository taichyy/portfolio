import { cn } from "@/lib/utils"

const MARK_PATTERN = /(\[\[.+?\]\])/g

// "|" in copy is an allowed line break (Chinese uses word-break: keep-all).
const withBreaks = (text, keyPrefix) =>
    text.split("|").flatMap((chunk, i) =>
        i === 0 ? [chunk] : [<wbr key={`${keyPrefix}-${i}`} />, chunk],
    )

// [[words]] in copy get the brand highlighter mark.
export const Marked = (props) => {
    const { text } = props;
    if (!text) return null;

    return text.split(MARK_PATTERN).map((part, i) => {
        if (part.startsWith("[[") && part.endsWith("]]")) {
            return (
                <mark key={i} className="mark">
                    {part.slice(2, -2)}
                </mark>
            )
        }
        return withBreaks(part, i)
    })
}

export const NumberTab = (props) => {
    const { n, tone = "brand", className } = props;

    return (
        <span
            className={cn(
                "inline-flex items-center px-1.5 py-0.5 font-mono text-[0.7rem] font-medium leading-none tabular-nums tracking-normal",
                tone === "brand" ? "bg-brand text-brand-ink" : "bg-foreground text-background",
                className,
            )}
        >
            {String(n).padStart(2, "0")}
        </span>
    )
}

export const SectionLabel = (props) => {
    const { children, tone = "brand", className, aside, as: Tag = "h2" } = props;

    return (
        <div className={cn("flex items-center gap-4", className)}>
            <Tag
                className={cn(
                    "inline-block px-2 py-1 font-mono text-[0.7rem] font-medium uppercase leading-none tracking-[0.16em]",
                    tone === "brand" ? "bg-brand text-brand-ink" : "bg-brand-ink text-brand",
                )}
            >
                {children}
            </Tag>
            {aside && <div className="ml-auto">{aside}</div>}
        </div>
    )
}

export const PageHeader = (props) => {
    const { eyebrow, title, intro, className } = props;

    return (
        <header className={cn("max-w-3xl", className)}>
            <p className="label-mono">{eyebrow}</p>
            <h1 className="font-display mt-6 text-[2.6rem] font-extrabold leading-[1.05] md:text-7xl md:leading-[1]">
                <Marked text={title} />
            </h1>
            {intro && (
                <p className="mt-7 max-w-2xl text-base leading-[1.8] text-muted-foreground md:text-lg">
                    {intro}
                </p>
            )}
        </header>
    )
}
