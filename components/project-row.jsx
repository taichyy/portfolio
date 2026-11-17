import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

import { projectHref } from "@/lib/data"
import { localeHref } from "@/lib/i18n/routing"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { Marked, NumberTab } from "@/components/editorial"

const ProjectRow = (props) => {
    const { project, locale } = props;
    const dict = getDictionary(locale);
    const thumb = project.img?.[0];

    return (
        <Link
            href={localeHref(locale, projectHref(project))}
            className="group grid grid-cols-[minmax(0,1fr)_6.5rem] gap-x-5 gap-y-4 border-t border-line py-8 outline-none md:grid-cols-[3.5rem_minmax(0,1fr)_9rem] md:gap-x-8 lg:grid-cols-[3.5rem_minmax(0,1fr)_12rem] lg:gap-x-10"
        >
            <div className="col-start-1 row-start-1 md:pt-2">
                <NumberTab n={project.number} />
            </div>

            <div className="col-span-2 col-start-1 row-start-2 min-w-0 md:col-span-1 md:col-start-2 md:row-start-1">
                <h3 className="font-display text-[1.75rem] font-bold leading-[1.15] md:text-[2.1rem]">
                    <span className="mark-hover"><Marked text={project.displayTitle || project.title} /></span>
                    <ArrowUpRight
                        aria-hidden
                        className="ml-2 inline h-5 w-5 -translate-y-0.5 text-subtle transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:translate-x-1 group-hover:text-foreground"
                    />
                </h3>

                <p className="mt-3 max-w-2xl text-[0.98rem] leading-[1.75] text-muted-foreground">
                    {project.tagline}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                    {project.role && <span className="label-mono">{project.role}</span>}
                    {project.year && (
                        <span className="font-mono text-[0.72rem] tabular-nums text-subtle">
                            {project.year}
                        </span>
                    )}
                    {project.stack?.length > 0 && (
                        <span className="font-mono text-[0.72rem] text-subtle">
                            {project.stack.slice(0, 4).join(" · ")}
                        </span>
                    )}
                    {project.openSource && (
                        <span className="bg-brand px-1.5 py-0.5 font-mono text-[0.65rem] uppercase leading-none tracking-[0.12em] text-brand-ink">
                            {dict.project.openSource}
                        </span>
                    )}
                </div>
            </div>

            {thumb && (
                <div className="relative col-start-2 row-start-1 aspect-[4/3] self-start overflow-hidden border border-line bg-muted md:col-start-3">
                    <Image
                        src={thumb}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 12rem, (min-width: 768px) 9rem, 6.5rem"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                </div>
            )}
        </Link>
    )
}

export default ProjectRow
