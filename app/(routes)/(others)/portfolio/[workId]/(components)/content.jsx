"use client";

import {
    AlignLeft,
    ArrowLeft,
    ArrowRight,
    Lightbulb,
    ListChecks,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Content = ({
    work,
}) => {
    // For on this page section navigation
    const [activeSection, setActiveSection] = useState(null);
    const sectionRefs = useRef({});

    const linkAvailable = (work?.link && work.link !== "");

    useEffect(() => {
        const sections = Object.keys(sectionRefs.current);

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        let observer = new IntersectionObserver(
            observerCallback,
            {
                root: null,
                rootMargin: "0px",
                threshold: 1,
            },
        );

        sections.forEach((sectionId) => {
            const element = sectionRefs.current[sectionId];
            if (element) {
                observer?.observe(element);
            }
        });

        return () => {
            observer?.disconnect();
            observer = null;
        };
    }, []);

    const addSectionRef = (id, ref) => {
        if (ref) {
            sectionRefs.current[id] = ref;
        }
    };

    // For image gallery
    const [num, setNum] = useState(0)
    const [imgOpacity, setImgOpacity] = useState('opacity-100')

    const handleClick = (status) => {
        if (status == true) {
            if (num != work.img.length - 1) {
                setNum(prev => prev + 1)
                setImgOpacity('opacity-0')
                setTimeout(() => {
                    setImgOpacity('opacity-100')
                }, 300)
            }
        } else {
            if (num != 0) {
                setNum(prev => prev - 1)
                setImgOpacity('opacity-0')
                setTimeout(() => {
                    setImgOpacity('opacity-100')
                }, 300)
            }
        }
    }

    return (

        <div className="mt-2 relative grid-cols-3 gap-20 lg:grid text-foreground leading-8">
            <div className="lg:col-span-2">
                <div>
                    <div className="flex justify-between items-center -mt-1 mb-4">
                        <Link href="/portfolio">
                            <Button
                                type="button"
                                variant="outline"
                                data-aos="fade-in"
                            >
                                <ArrowLeft className="mr-2" size={14} />
                                返回
                            </Button>
                        </Link>
                        <a 
                            href={linkAvailable ? work.link : ""} 
                            target={linkAvailable ? "_blank" : "_self"}
                            data-aos="fade-in"
                        >
                            <Button
                                type="button"
                                variant={linkAvailable ? "default" : "secondary"}
                            >
                                {linkAvailable
                                    ? "作品連結"
                                    : "暫無連結"
                                }
                            </Button>
                        </a>
                    </div>

                    {work?.badges && !!work.badges.length && work.badges.map((badge, index) => (
                        <Badge variant="outline" key={index} data-aos="fade-in" >
                            {badge}
                        </Badge>
                    ))}

                    {work?.title && (
                        <h1 className="mt-3 text-3xl font-extrabold" data-aos="fade-in">
                            {work.title}
                        </h1>
                    )}

                    {work?.subtitle && (
                        <h2 className="mt-2 text-lg text-muted-foreground whitespace-pre-line" data-aos="fade-in">
                            {work.subtitle}
                        </h2>
                    )}
                    {work?.languages && (
                        <p className="mt-2 text-sm text-muted-foreground" data-aos="fade-in">
                            {work.languages.join(" / ")}
                        </p>
                    )}
                    <div className="md:mx-3 my-16" data-aos="fade-up">
                        <Image
                            src={work.img[num]}
                            alt={`${work.img[num].split('/')[work.img[num].split('/').length - 1]} Image`}
                            width={1920}
                            height={1080}
                            className={cn(
                                "aspect-video w-full hover:opacity-95 duration-300 mx-auto mb-2",
                                imgOpacity
                            )}
                        />
                        <div className="flex justify-between mt-1">
                            <ArrowLeft className={`cursor-pointer duration-100 ${num == 0 && 'opacity-0 cursor-default'}`} size={30} onClick={() => handleClick(false)} />
                            <ArrowRight className={`cursor-pointer duration-100 ${num == work.img.length - 1 && 'opacity-0 cursor-default'}`} size={30} onClick={() => handleClick(true)} />
                        </div>
                    </div>
                </div>
                {work?.data && work.data.map((section, sectionIndex) => (
                    <section
                        key={sectionIndex}
                        id={`section${sectionIndex + 1}`}
                        ref={(ref) => addSectionRef(`section${sectionIndex + 1}`, ref)}
                        data-aos="fade-up"
                        className="prose mb-8"
                    >
                        {/* 區塊標題 */}
                        {section?.title && (
                            <h2 className="text-xl font-semibold my-2">{section.title}</h2>
                        )}

                        {/* 遍歷每個區塊 */}
                        {section?.content && section.content.map((block, blockIndex) => {
                            if (block.type === "paragraph") {
                                return (
                                    <p key={blockIndex} className="mt-4">{block.text}</p>
                                );
                            }

                            if (block.type === "items" && block.items?.length) {
                                return (
                                    <div key={blockIndex}>
                                        {block.items.map((item, itemIndex) => (
                                            <div className="ml-3.5" key={itemIndex}>
                                                <div className="relative flex items-start pb-2">
                                                    <div className="absolute top-[2.75rem] h-[calc(100%-2.75rem)] w-px bg-border/70"></div>
                                                    <div className="absolute ml-[-14px] py-2">
                                                        <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted">
                                                            {item.icon || <ListChecks className="h-3.5 w-3.5" />}
                                                        </div>
                                                    </div>
                                                    <div className="pl-12">
                                                        <h3 className="mt-2 text-base font-semibold">
                                                            {item.title || "--"}
                                                        </h3>
                                                        <p>
                                                            {item.description || "--"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                );
                            }

                            if (block.type === "img" && block.src) {
                                return (
                                    <div className="mt-4" key={blockIndex}>
                                        <Image
                                            src={block.src}
                                            alt={block.alt || "Image"}
                                            width={1000}
                                            height={700}
                                            className="w-full rounded-lg"
                                        />
                                        {block?.caption && (
                                            <p className="mt-2 text-sm text-right text-muted-foreground">
                                                {block.caption}
                                            </p>
                                        )}
                                    </div>
                                );
                            }

                            if (block.type === "point") {
                                return (
                                    <Alert className="mt-4" key={blockIndex}>
                                        <Lightbulb className="h-4 w-4" />
                                        <AlertTitle>{block.title}</AlertTitle>
                                        <AlertDescription>{block.description}</AlertDescription>
                                    </Alert>
                                );
                            }

                            return null;
                        })}
                        <Separator className="mt-6 mb-24" />
                    </section>
                ))}
            </div>
            <div className="sticky top-8 hidden h-fit lg:block">
                <span className="flex items-center gap-2 text-sm">
                    <AlignLeft className="h-4 w-4" />
                    本頁面內容
                </span>
                <nav className="mt-2 text-sm">
                    <ul>
                        {work?.data && !!work.data.length && work.data.map((section, index) => (
                            <li key={index}>
                                <a
                                    href={`#section${index + 1}`}
                                    className={cn(
                                        "block py-1 transition-colors duration-200",
                                        activeSection === `section${index + 1}`
                                            ? "font-medium text-primary"
                                            : "text-muted-foreground hover:text-primary",
                                    )}
                                >
                                    {section.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export { Content };
