const SITE_URL = "https://www.heytai.dev";

export default function robots() {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
