import { projects, projectHref } from "@/lib/data";

const SITE_URL = "https://www.heytai.dev";

export default function sitemap() {
    const routes = [
        { path: "", priority: 1 },
        { path: "/projects", priority: 0.9 },
        { path: "/experience", priority: 0.9 },
        { path: "/about", priority: 0.8 },
        { path: "/contact", priority: 0.6 },
    ].map(({ path, priority }) => ({
        url: `${SITE_URL}${path}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority,
    }));

    const projectPages = projects.map((project) => ({
        url: `${SITE_URL}${projectHref(project)}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: project.featured ? 0.8 : 0.6,
    }));

    return [...routes, ...projectPages];
}
