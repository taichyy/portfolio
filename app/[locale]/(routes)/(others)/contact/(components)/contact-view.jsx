import { ArrowUpRight } from "lucide-react"

import { getProfile } from "@/lib/profile"
import ThemeLogo from "@/components/theme-logo"
import { PageHeader } from "@/components/editorial"
import { getDictionary } from "@/lib/i18n/dictionaries"

const ContactRow = (props) => {
    const { label, value, href, external } = props;

    return (
        <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="group grid grid-cols-1 gap-x-10 gap-y-1 border-t border-line py-6 md:grid-cols-[9rem_minmax(0,1fr)_auto] md:items-center"
        >
            <span className="label-mono">{label}</span>
            <span className="font-display text-2xl font-bold md:text-[2rem]">
                <span className="mark-hover">{value}</span>
            </span>
            <ArrowUpRight
                aria-hidden
                className="hidden h-6 w-6 text-subtle transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground md:block"
            />
        </a>
    )
}

const ContactView = (props) => {
    const { locale } = props;
    const dict = getDictionary(locale)
    const profile = getProfile(locale)

    return (
        <section className="mx-auto max-w-[1240px] px-6 pt-32 md:px-10 md:pt-44">
            <div className="relative mb-8 h-14 w-14 md:h-16 md:w-16">
                <ThemeLogo sizes="64px" alt="HeyTai" priority />
            </div>

            <PageHeader
                eyebrow={dict.contact.eyebrow}
                title={profile.contact.heading}
                intro={profile.contact.body}
            />

            <div className="mt-16 max-w-4xl border-b border-line md:mt-20">
                <ContactRow
                    label={dict.contact.email}
                    value={profile.email}
                    href={`mailto:${profile.email}`}
                />
                {profile.socials
                    .filter((s) => s.label !== "Email")
                    .map((s) => (
                        <ContactRow
                            key={s.label}
                            label={s.label}
                            value={s.href.replace(/^https?:\/\//, "")}
                            href={s.href}
                            external
                        />
                    ))}
            </div>
        </section>
    )
}

export default ContactView
