import { notFound } from "next/navigation"

import { LOCALES, resolveLocale } from "@/lib/i18n/config"
import ProjectDetail from "@/components/project-detail"
import { localeAlternates } from "@/lib/i18n/seo"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { getProject, getCategoryMeta, projectSlugs } from "@/lib/data"

export function generateStaticParams() {
    return LOCALES.flatMap((locale) => projectSlugs.map(({ slug }) => ({ locale, slug })))
}

export async function generateMetadata(props) {
    const { locale: rawLocale, slug } = await props.params
    const locale = resolveLocale(rawLocale)
    const dict = getDictionary(locale)
    const project = getProject(slug, locale)

    if (!project) {
        return { title: dict.meta.projectNotFound, robots: { index: false } }
    }

    const cat = getCategoryMeta(locale)[project.category]?.label
    const stack = project.stack?.length
        ? project.stack.join(dict.meta.listSeparator)
        : ""
    const description = dict.meta.projectDescription(project.tagline, stack, cat)

    return {
        title: project.title,
        description,
        alternates: localeAlternates(locale, `/projects/${project.slug}`),
        openGraph: {
            title: project.title,
            description,
            url: `/${locale}/projects/${project.slug}`,
            type: "article",
            images: project.img?.[0] ? [{ url: project.img[0], alt: project.title }] : undefined,
        },
        twitter: {
            card: project.img?.[0] ? "summary_large_image" : "summary",
            title: project.title,
            description,
            images: project.img?.[0] ? [project.img[0]] : undefined,
        },
    }
}

const ProjectDetailPage = async (props) => {
    const { locale: rawLocale, slug } = await props.params
    const locale = resolveLocale(rawLocale)
    const project = getProject(slug, locale)

    if (!project) {
        notFound()
    }

    return <ProjectDetail project={project} />
}

export default ProjectDetailPage
