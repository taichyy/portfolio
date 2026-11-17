import Image from "next/image"

// Swapped by the `dark` class, so there is no hydration flash. Needs a
// positioned, sized parent.
const ThemeLogo = (props) => {
    const { sizes, priority = false, alt = "" } = props;

    return (
        <>
            <Image
                src="/logo-dark.png"
                alt={alt}
                fill
                sizes={sizes}
                priority={priority}
                className="object-contain dark:hidden"
            />
            <Image
                src="/logo-white.png"
                alt={alt}
                fill
                sizes={sizes}
                className="hidden object-contain dark:block"
            />
        </>
    )
}

export default ThemeLogo
