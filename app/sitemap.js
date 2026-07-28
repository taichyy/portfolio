import { projectSlugs } from "@/lib/data";
import { LOCALES } from "@/lib/i18n/config";
import { SITE_URL, languageAlternates } from "@/lib/i18n/seo";

const entry = (path, priority) => ({
    url: `${SITE_URL}/${LOCALES[0]}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
    alternates: { languages: languageAlternates(path) },
});

export default function sitemap() {
    const routes = [
        { path: "", priority: 1 },
        { path: "/projects", priority: 0.9 },
        { path: "/experience", priority: 0.9 },
        { path: "/about", priority: 0.8 },
        { path: "/contact", priority: 0.6 },
    ].map(({ path, priority }) => entry(path, priority));

    const projectPages = projectSlugs.map(({ slug, featured }) =>
        entry(`/projects/${slug}`, featured ? 0.8 : 0.6),
    );

    return [...routes, ...projectPages];
}
