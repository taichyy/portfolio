/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            // Old portfolio index → new projects index
            { source: "/portfolio", destination: "/projects", permanent: true },
            // Old numeric portfolio detail URLs → new slug URLs (preserve SEO)
            { source: "/portfolio/1", destination: "/projects/mold-tuning", permanent: true },
            { source: "/portfolio/2", destination: "/projects/ichiban-poster", permanent: true },
            { source: "/portfolio/3", destination: "/projects/taiche", permanent: true },
            { source: "/portfolio/4", destination: "/projects/taidypass", permanent: true },
            { source: "/portfolio/5", destination: "/projects/json-editor", permanent: true },
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
