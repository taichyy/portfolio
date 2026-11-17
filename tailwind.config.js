const sansStack = ["PingFang TC", "Microsoft JhengHei", "Noto Sans CJK TC", "ui-sans-serif", "system-ui", "sans-serif"]

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./components/**/*.{js,jsx}",
        "./app/**/*.{js,jsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-latin)", ...sansStack],
                display: ["var(--font-latin)", ...sansStack],
                mono: ["var(--font-mono)", "PingFang TC", "Microsoft JhengHei", "Noto Sans CJK TC", "ui-monospace", "SFMono-Regular", "monospace"],
            },
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                line: "hsl(var(--line))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                subtle: "hsl(var(--subtle))",
                brand: {
                    DEFAULT: "rgb(var(--brand) / <alpha-value>)",
                    ink: "rgb(var(--brand-ink) / <alpha-value>)",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            maxWidth: {
                prose: "68ch",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}
