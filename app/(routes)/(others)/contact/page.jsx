"use client"

import Image from "next/image"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"

import { profile } from "@/lib/profile"

const Contact = () => {
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <section className="mx-auto flex min-h-[70vh] max-w-[1240px] flex-col justify-center px-6 pt-32 pb-12 md:pt-40">
            {/* Logo */}
            {mounted && (
                <div className="relative mb-6 h-16 w-16 animate-fade-up md:h-20 md:w-20">
                    <Image
                        src={resolvedTheme === 'dark' ? '/logo-white.png' : '/logo-dark.png'}
                        alt="Tai Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            )}

            <p className="label-mono">Contact</p>
            <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.15] md:text-6xl">
                {profile.contact.heading}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
                {profile.contact.body}
            </p>

            <div className="mt-12 max-w-xl divide-y divide-line border-y border-line">
                <a
                    href={`mailto:${profile.contact.email}`}
                    className="group flex items-center justify-between py-5"
                >
                    <span>
                        <span className="label-mono block">Email</span>
                        <span className="mt-1 block font-mono text-lg transition-colors group-hover:text-signature">
                            {profile.contact.email}
                        </span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signature" />
                </a>

                {profile.socials
                    .filter((s) => s.label !== "Email")
                    .map((s) => (
                        <a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between py-5"
                        >
                            <span>
                                <span className="label-mono block">{s.label}</span>
                                <span className="mt-1 block font-mono text-lg transition-colors group-hover:text-signature">
                                    {s.href.replace(/^https?:\/\//, "")}
                                </span>
                            </span>
                            <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signature" />
                        </a>
                    ))}
            </div>
        </section>
    )
}

export default Contact
