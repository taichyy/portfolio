import ProjectRow from "@/components/project-row"
import { localeAlternates } from "@/lib/i18n/seo"
import { resolveLocale } from "@/lib/i18n/config"
import { getProjectsByCategory } from "@/lib/data"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { PageHeader, SectionLabel } from "@/components/editorial"

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
        <section className="mx-auto max-w-[1240px] px-6 pt-32 md:px-10 md:pt-44">
            <PageHeader
                eyebrow={dict.projects.eyebrow}
                title={dict.projects.heading}
                intro={dict.projects.intro}
            />

            <div className="mt-20 space-y-24 md:mt-28">
                {groups.map((group) => (
                    <div key={group.id}>
                        <SectionLabel
                            className="mb-6"
                            aside={
                                <span className="font-mono text-xs tabular-nums text-subtle">
                                    {String(group.items.length).padStart(2, "0")}
                                </span>
                            }
                        >
                            {group.label}
                        </SectionLabel>
                        <div className="border-b border-line">
                            {group.items.map((project) => (
                                <ProjectRow key={project.slug} project={project} locale={locale} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Projects
