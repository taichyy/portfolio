import Image from "next/image"

// Swapped by the `dark` class, so there is no hydration flash. Needs a
// positioned, sized parent. `eager` skips lazy loading for above-the-fold
// logos without raising their fetch priority over the page's LCP image.
const ThemeLogo = (props) => {
    const { sizes, eager = false, alt = "" } = props;
    const loading = eager ? "eager" : "lazy";

    return (
        <>
            <Image
                src="/logo-dark.png"
                alt={alt}
                fill
                sizes={sizes}
                loading={loading}
                className="object-contain dark:hidden"
            />
            <Image
                src="/logo-white.png"
                alt={alt}
                fill
                sizes={sizes}
                loading={loading}
                className="hidden object-contain dark:block"
            />
        </>
    )
}

export default ThemeLogo
