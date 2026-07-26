import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { projectHref } from "@/lib/data"

// Editorial index row — the repeated unit across Projects & the homepage.
// No card grid, no status dashboard: type, a factual line, and metadata.
const ProjectRow = (props) => {
    const { project, index } = props;
    const href = projectHref(project);

    return (
        <Link
            href={href}
            className="group relative block border-t border-line py-6 transition-all duration-300 hover:bg-accent/40 hover:px-3 hover:-mx-3"
        >
            <div className="flex items-start gap-4 md:gap-8">
                {typeof index === "number" && (
                    <span className="mt-1.5 font-mono text-xs text-muted-foreground/70 tabular-nums transition-colors group-hover:text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                    </span>
                )}

                <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-3">
                        <h3 className="font-serif text-2xl leading-tight transition-all duration-300 group-hover:text-signature group-hover:translate-x-1 md:text-3xl">
                            {project.title}
                        </h3>
                        <ArrowUpRight className="mt-1 hidden h-4 w-4 shrink-0 text-muted-foreground/50 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-signature sm:block" />
                    </div>

                    <p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground">
                        {project.tagline}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5">
                        {project.role && (
                            <span className="label-mono">{project.role}</span>
                        )}
                        {project.stack?.length > 0 && (
                            <span className="font-mono text-[0.7rem] text-muted-foreground/70">
                                {project.stack.slice(0, 4).join(" · ")}
                            </span>
                        )}
                        {project.openSource && (
                            <span className="label-mono text-signature">Open Source</span>
                        )}
                    </div>
                </div>

                <span className="shrink-0 pt-1.5 font-mono text-xs text-muted-foreground/70 tabular-nums">
                    {project.year || "—"}
                </span>
            </div>
        </Link>
    )
}

export default ProjectRow
