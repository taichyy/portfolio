import Link from "next/link";
import Image from "next/image"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import TypeBox from "@/components/typebox";
import { badgeVariants } from "@/components/ui/badge"

export const metadata = {
    title: "關於我",
};

export default function About() {
    const data = {
        about_intro: "這是一頁我的個人介紹頁！\n若是想了解能力、背景、知識，\n請到：",
        about_sequence: [
            'MAKE IT REALITY!',
            1000,
            '將想法變成現實！',
            1000,
        ],
        about_accordion: [
            {
                acc_title: "技能",
                acc_title_en: "Skills",
                acc_data: [
                    {
                        data_title: "前端網頁設計",
                        data_skills: ["JavaScript", "TypeScript", "React", "Next.js", "jQuery", "HTML5", "CSS3"],
                        data_img: ["JS.png", "TS.png", "react.png", "NEXT.svg", "jQuery.png", "HTML5.png", "CSS3.png"]
                    },
                    {
                        data_title: "後端網頁設計",
                        data_skills: ["Next.js", "php"],
                        data_img: ["NEXT.svg", "PHP.png"]
                    },
                    {
                        data_title: "資料庫操作",
                        data_skills: ["MongoDB(NO-SQL)", "phpMyAdmin(MySQL)"],
                        data_img: ["MONGODB.png", "PHPMYADMIN.png"]
                    },
                    {
                        data_title: "其他技能",
                        data_skills: ["Git+GitHub", "CSS+tailwind"],
                        data_img: ["git.png", "tailwind.jpg"]
                    }
                ]
            },
            {
                acc_title: "性格",
                acc_title_en: "Personalities",
                acc_desc: "總是喜歡嘗試一些新鮮的事物！\n總是保持樂觀、善良！"
            },
            {
                acc_title: "興趣",
                acc_title_en: "Interests",
                acc_desc: "程式語言、攝影、檔車"
            }
        ]

    }

    return (
        <div className="h-screen flex justify-center items-center ">
            <div className="grid grid-cols-1 px-10 pt-10 pb-8 flex-grow gap-10 md:grid-cols-3 h-[70vh]">
                <aside className="relative h-full">
                    <Image
                        src="/images/about/bortwo.jpg"
                        alt="My pic"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 60vw"
                        className="object-cover h-0 md:h-full hover:opacity-80 duration-300"
                    />
                </aside>
                <main className="flex flex-col">
                    <div className="relative flex-grow h-56 md:h-full hidden md:block">
                        <Image
                            src="/images/about/bike.jpg"
                            alt="My pic"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 60vw"
                            className="object-cover hover:opacity-80 duration-300"
                        />
                    </div>
                    <h2 className="text-2xl md:text-3xl my-10 font-medium leading-relaxed tracking-wider">
                        <TypeBox sequence={data.about_sequence} />
                        <p className="mt-3 text-lg leading-tight whitespace-pre-line">
                            {data.about_intro}
                        </p>
                        <div className="space-x-2">
                            <Link href="/resume" className={badgeVariants({ variant: "" })}>
                                <span className="text-sm">
                                    個人簡歷
                                </span>
                            </Link>
                            <Link href="/portfolio" className={badgeVariants({ variant: "" })}>
                                <span className="text-sm">
                                    作 品 集
                                </span>
                            </Link>
                        </div>
                    </h2>
                </main>
                <article className="duration-200">
                    <Accordion type="single" collapsible defaultValue="item-1">
                        {data.about_accordion.map((item, index) => (
                            <AccordionItem key={index} value={`item-${index + 1}`}>
                                <AccordionTrigger className="font-bold text-lg">{item.acc_title}</AccordionTrigger>
                                <AccordionContent>
                                    {item.acc_data ? (
                                        <>
                                            {item.acc_data.map((data, index) => (
                                                <div key={index}>
                                                    <h3 className="text-base font-semibold">{data.data_title}</h3>
                                                    <div className="flex gap-2 py-1.5">
                                                        {data.data_skills.map((skill, index) => (
                                                            <div key={index} className="flex gap-1.5">
                                                                <Image
                                                                    src={`/images/about/${data.data_img[index]}`}
                                                                    alt={`${skill} Logo`}
                                                                    width={20}
                                                                    height={20}
                                                                    className="aspect-square"
                                                                />
                                                                <span>{skill}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        <>
                                            {item.acc_desc}
                                        </>
                                    )}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </article>
            </div>
        </div>
    )
}
