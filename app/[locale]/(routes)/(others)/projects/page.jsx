import ProjectRow from "@/components/project-row"
import { localeAlternates } from "@/lib/i18n/seo"
import { resolveLocale } from "@/lib/i18n/config"
import { getProjectsByCategory } from "@/lib/data"
import { getDictionary } from "@/lib/i18n/dictionaries"

export async function generateMetadata(props) {
    const locale = resolveLocale((await props.params).locale)
    const dict = getDictionary(locale)

    return {
        title: dict.meta.projects.title,
        description: dict.meta.projects.description,
        alternates: localeAlternates(locale, "/projects"),
    }
}

const Projects = async (props) => {
    const locale = resolveLocale((await props.params).locale)
    const dict = getDictionary(locale)
    const groups = getProjectsByCategory(locale)

    return (
        <section className="mx-auto max-w-[1240px] px-6 pt-32 md:pt-40">
            <header className="max-w-2xl">
                <p className="label-mono">{dict.projects.eyebrow}</p>
                <h1 className="mt-5 font-serif text-4xl leading-[1.1] md:text-6xl">
                    {dict.projects.heading}
                </h1>
                <p className="mt-6 text-base leading-8 text-muted-foreground md:text-lg">
                    {dict.projects.intro}
                </p>
            </header>

            <div className="mt-16 space-y-20">
                {groups.map((group) => (
                    <div key={group.id}>
                        <div className="mb-2 flex items-baseline gap-4">
                            <h2 className="font-serif text-xl">{group.label}</h2>
                            <span className="ml-auto font-mono text-xs text-muted-foreground/60 tabular-nums">
                                {String(group.items.length).padStart(2, "0")}
                            </span>
                        </div>
                        <div>
                            {group.items.map((project, i) => (
                                <ProjectRow key={project.slug} project={project} index={i} />
                            ))}
                            <div className="border-t border-line" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Projects
