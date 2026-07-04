import { portfolio } from "@/lib/data";

const SITE_URL = "https://www.heytai.dev";

export default function sitemap() {
    const routes = [
        { path: "", priority: 1 },
        { path: "/portfolio", priority: 0.9 },
        { path: "/resume", priority: 0.9 },
        { path: "/about", priority: 0.8 },
        { path: "/contact", priority: 0.7 },
    ].map(({ path, priority }) => ({
        url: `${SITE_URL}${path}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority,
    }));

    const works = portfolio.map((item) => ({
        url: `${SITE_URL}/portfolio/${item.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
    }));

    return [...routes, ...works];
}
