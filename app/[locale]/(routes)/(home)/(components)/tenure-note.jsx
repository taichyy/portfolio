"use client"

import { useEffect, useRef } from "react"

const TIP_ID = "tenure-note"

// popover="hint" is newer than popover="auto". Where it is missing the
// attribute falls back to "manual" (no Esc, no light dismiss), so switch to
// "auto" there.
const supportsHint = () => {
    const probe = document.createElement("div")
    probe.setAttribute("popover", "hint")
    return probe.popover === "hint"
}

const TenureNote = (props) => {
    const { label, moreLabel, rows } = props;
    const triggerRef = useRef(null)
    const tipRef = useRef(null)

    useEffect(() => {
        const tip = tipRef.current
        const trigger = triggerRef.current
        if (!tip || !trigger) return

        if (!supportsHint()) tip.setAttribute("popover", "auto")

        // The popover is the source of truth: Esc, light dismiss and the
        // trigger can all change it. "toggle" does not bubble.
        const sync = (e) => trigger.setAttribute("aria-expanded", String(e.newState === "open"))
        tip.addEventListener("toggle", sync)
        return () => tip.removeEventListener("toggle", sync)
    }, [])

    return (
        <>
            <button
                ref={triggerRef}
                type="button"
                interestfor={TIP_ID}
                popoverTarget={TIP_ID}
                popoverTargetAction="show"
                aria-expanded="false"
                className="tenure-trigger cursor-help text-left underline decoration-subtle decoration-dotted decoration-1 underline-offset-[0.3em]"
            >
                {label}
                <span className="sr-only">, {moreLabel}</span>
            </button>
            <div
                ref={tipRef}
                id={TIP_ID}
                popover="hint"
                role="tooltip"
                className="tenure-tip bg-foreground px-3 py-2.5 font-mono text-[0.72rem] leading-relaxed text-background"
            >
                {rows.map((row) => (
                    <span key={row.k} className="flex gap-3">
                        <span className="text-brand">{row.k}</span>
                        <span>{row.v}</span>
                    </span>
                ))}
            </div>
        </>
    )
}

export default TenureNote
