import { notFound } from "next/navigation"

import ProjectDetail from "@/components/project-detail"
import { getProject, projects, categoryMeta } from "@/lib/data"

export function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(props) {
    const { slug } = await props.params
    const project = getProject(slug)

    if (!project) {
        return { title: "找不到作品", robots: { index: false } }
    }

    const cat = categoryMeta[project.category]?.label
    const description = `${project.tagline}${project.stack?.length ? `　技術：${project.stack.join("、")}。` : ""}${cat ? `　分類：${cat}。` : ""}`

    return {
        title: project.title,
        description,
        alternates: { canonical: `/projects/${project.slug}` },
        openGraph: {
            title: project.title,
            description,
            url: `/projects/${project.slug}`,
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
    const { slug } = await props.params
    const project = getProject(slug)

    if (!project) {
        notFound()
    }

    return <ProjectDetail project={project} />
}

export default ProjectDetailPage
