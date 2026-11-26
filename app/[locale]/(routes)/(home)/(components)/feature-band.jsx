import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { ViewTransition } from "react"

import { projectHref } from "@/lib/data"
import { localeHref } from "@/lib/i18n/routing"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { Marked, NumberTab, SectionLabel } from "@/components/editorial"

const FeatureBand = (props) => {
    const { project, locale } = props;
    const dict = getDictionary(locale);
    const shot = project.img?.[0];
    const link = localeHref(locale, projectHref(project));

    return (
        <section className="on-brand bg-brand text-brand-ink">
            <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-x-12 gap-y-12 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-12 lg:items-center">
                {shot && (
                    <Link
                        href={link}
                        className="group order-1 block lg:order-2 lg:col-span-7"
                        aria-label={project.title}
                    >
                        <ViewTransition name={`project-shot-${project.slug}`} share="project-shot">
                            <div className="relative aspect-[16/10] overflow-hidden border border-brand-ink bg-white">
                                {/* The link already carries the title, so the image is decorative here. */}
                                <Image
                                    src={shot}
                                    alt=""
                                    fill
                                    sizes="(min-width: 1024px) 680px, 100vw"
                                    className="object-cover object-top transition-transform duration-700 motion-safe:group-hover:scale-[1.02]"
                                />
                            </div>
                        </ViewTransition>
                    </Link>
                )}

                <div className={shot ? "order-2 lg:order-1 lg:col-span-5" : "lg:col-span-8"}>
                    <div className="flex items-center gap-2">
                        <NumberTab n={project.number} tone="ink" />
                        <SectionLabel tone="ink" as="p">{dict.home.featured}</SectionLabel>
                    </div>

                    <h2 className="font-display mt-7 text-display-lg font-extrabold leading-[1.05]">
                        <Marked text={project.displayTitle || project.title} />
                    </h2>

                    <p className="mt-5 text-lg font-medium leading-[1.6]">
                        {project.tagline}
                    </p>

                    {project.overview && (
                        <p className="mt-5 text-[0.98rem] leading-[1.8] text-brand-ink/80">
                            {project.overview}
                        </p>
                    )}

                    <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-brand-ink/25 pt-5 text-sm">
                        {project.role && (
                            <div>
                                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-brand-ink/70">
                                    {dict.project.meta.role}
                                </dt>
                                <dd className="mt-1">{project.role}</dd>
                            </div>
                        )}
                        {project.stack?.length > 0 && (
                            <div className="col-span-2">
                                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-brand-ink/70">
                                    {dict.project.meta.technology}
                                </dt>
                                <dd className="mt-1 font-mono text-[0.78rem]">{project.stack.join(" · ")}</dd>
                            </div>
                        )}
                    </dl>

                    <Link
                        href={link}
                        className="link-mark mt-9 inline-flex items-center gap-2 text-base font-semibold"
                    >
                        {dict.home.readCaseStudy}
                        <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default FeatureBand
