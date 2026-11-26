/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        // Lets React <ViewTransition> animate client-side navigations.
        viewTransition: true,
    },
    images: {
        formats: ["image/avif", "image/webp"],
        // The lightbox renders at quality 90; Next 16 only allows listed values.
        qualities: [75, 90],
    },
    async redirects() {
        return [
            // Old portfolio index → new projects index
            { source: "/portfolio", destination: "/projects", permanent: true },
            // Old numeric portfolio detail URLs → new slug URLs (preserve SEO)
            { source: "/portfolio/1", destination: "/projects/mold-tuning", permanent: true },
            { source: "/portfolio/2", destination: "/projects/ichiban-poster", permanent: true },
            // The Taiche studio project was removed from the portfolio.
            { source: "/portfolio/3", destination: "/projects", permanent: true },
            { source: "/portfolio/4", destination: "/projects/taidypass", permanent: true },
            { source: "/portfolio/5", destination: "/projects/json-owl", permanent: true },
            // JSON Editor was renamed to JSON Owl
            { source: "/projects/json-editor", destination: "/projects/json-owl", permanent: true },
            { source: "/:locale(zh-TW|en)/projects/json-editor", destination: "/:locale/projects/json-owl", permanent: true },
            // Interim redesign routes → projects
            { source: "/work", destination: "/projects", permanent: false },
            { source: "/work/:slug", destination: "/projects/:slug", permanent: false },
            { source: "/experiments", destination: "/projects", permanent: false },
            { source: "/experiments/:slug", destination: "/projects/:slug", permanent: false },
            // Résumé is folded into Experience now
            { source: "/resume", destination: "/experience", permanent: true },
        ]
    },
}

module.exports = nextConfig
