import { localeAlternates } from "@/lib/i18n/seo"
import { resolveLocale } from "@/lib/i18n/config"
import ContactView from "./(components)/contact-view"
import { getDictionary } from "@/lib/i18n/dictionaries"

export async function generateMetadata(props) {
    const locale = resolveLocale((await props.params).locale)
    const dict = getDictionary(locale)

    return {
        title: dict.meta.contact.title,
        description: dict.meta.contact.description,
        alternates: localeAlternates(locale, "/contact"),
    }
}

const Contact = () => <ContactView />

export default Contact
