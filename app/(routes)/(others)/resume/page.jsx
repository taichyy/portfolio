import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";

import BigImg from "@/components/bigImg";
import JobBlock from "@/components/job-block";
import ResumePercent from "@/components/resume-percent/resume-percent";

export const metadata = {
    title: "個人簡歷",
};

const Resume = () => {
    const data = {
        resume_name: "嚴太成",
        resume_edu: [
            {
                edu_duration: ["2019/09", "2023/07"],
                edu_school: "國立高雄科技大學（第一校區）",
                edu_dept: "資訊管理系",
            },
        ],
        resume_exp: [
            {
                exp_duration: ["2024/04", ""],
                exp_title: "高級前端網頁工程師",
                exp_corporation: "誠諾工程技術股份有限公司",
                exp_desc:
                    "獨立開發公司 ERP 系統，負責 架構設計、前端開發、API 設計、資料庫前期規劃，技術範圍涵蓋 Next.js、TypeScript\n從 0 到 1 打造完整前端架構，開發超過 100+ 頁面、3 大模組（人資系統、倉儲管理、日常作業）\n超過萬行程式碼的系統設計與優化，確保系統穩定性與可維護性\n獨立負責 ERP 商業化專案，目前系統已正式運行並對外販售\n",
            },
            {
                exp_duration: ["2023/12", "2024/03"],
                exp_title: "軟體工程師",
                exp_corporation: "富有玩具有限公司（NX樂園）",
                exp_desc:
                    "開發海報自動生成系統，整合 Adobe AI 產生海報，降低 80% 製作時間，提升設計效率\n開發 Line LIFF 會員中心前端頁面，提升會員管理體驗\n",
            },
        ],
        resume_skills: [
            {
                skill_title: "前端網頁開發",
                skill_desc: [
                    {
                        skill_name: "HTML",
                        skill_percent: 90,
                    },
                    {
                        skill_name: "CSS + tailwindCSS",
                        skill_percent: 90,
                    },
                    {
                        skill_name: "JavaScript + NextJS",
                        skill_percent: 85,
                    },
                    {
                        skill_name: "JavaScript + ReactJS",
                        skill_percent: 75,
                    },
                    {
                        skill_name: "JavaScript + jQuery",
                        skill_percent: 70,
                    },
                ],
            },
            {
                skill_title: "後端網頁開發",
                skill_desc: [
                    {
                        skill_name: "JavaScript + NextJS",
                        skill_percent: 85,
                    },
                    {
                        skill_name: "php",
                        skill_percent: 80,
                    },
                    {
                        skill_name: "MySQL + phpMyAdmin",
                        skill_percent: 75,
                    },
                    {
                        skill_name: "NO-SQL + MongoDB",
                        skill_percent: 75,
                    },
                ],
            },
            {
                skill_title: "其他技能",
                skill_desc: [
                    {
                        skill_name: "Git + GitHub",
                        skill_percent: 80,
                    },
                    {
                        skill_name: "Linux + Ubuntu(CLI)",
                        skill_percent: 60,
                    },
                ],
            },
        ],
        resume_intro:
            "您好，我叫 嚴太成，是一名全端網頁工程師，主要使用 Next.js (React) 。\n\n我注重解決問題與打造穩健架構的能力。從高中開始學習網頁開發，大學期間開始接觸實務需求，並協助多家企業完成專案開發：\n\n#前端網頁開發\n=＞開發 10+ 個網站前端頁面與 UI 重構，包含已商業化的 ERP 系統\n=＞專注於可維護性、共用元件開發與效能優化\n\n#後端網頁開發\n=＞獨立開發 2 家企業的完整官方網站（含後台管理系統）\n=＞為 1 家企業打造 ERP 解決方案（包含前後端架構設計）\n\n#資料庫設計\n=＞設計 5 家企業的關聯式資料庫，確保數據一致性與擴展性\n\n只要有足夠的時間與自由度，我可以完成任何網頁開發需求。\n不論是前端 UI、後端 API，還是資料庫架構，我都能獨立開發並優化整體系統。",
        resume_freelance: [
            {
                freelance_src: "/images/resume/chinaSteel.png",
                freelance_alt: "China Steel Logo",
            },
        ],
        resume_certificates: [
            {
                certificate_title: "Google Cloud 學程結業證書",
                certificate_src: "/images/resume/google_cloud_certificate.png",
                certificate_alt: "Google Cloud Certificate",
            },
        ],
    };

    return (
        <div>
            {/* <BigImg
                bgc="/images/resume/big.jpeg"
                bgAlt="Main resume background image."
                name={data.resume_name}
                btn="md"
            />
            <Image
                src="/images/resume/headshot.jpg"
                alt="Personal headshot image"
                height={200}
                width={200}
                className="mr-auto ml-auto rounded-full mt-10 mb-10 md:mr-72 md:rounded-xl"
            />
            <main className="px-5 mb-10 gap-10 md:px-72 md:grid-cols-2 md:grid">
                <div>
                    <h2 className="bg-[#EBFF00] text-slate-800 text-lg w-fit px-6 py-2 tracking-wider font-semibold">
                        教育程度
                    </h2>
                    {data?.resume_edu?.map((edu, index) => (
                        <div className="pl-5 pt-3" key={index}>
                            <h3 className="text-muted-foreground">
                                {edu.edu_duration[0]} - {edu.edu_duration[1]}
                            </h3>
                            <h3 className="font-bold text-lg pt-3 text-foreground">
                                {edu.edu_school}
                            </h3>
                            <h4 className="text-sm text-muted-foreground">{edu.edu_dept}</h4>
                        </div>
                    ))}
                </div>
                <div>
                    <h2 className="bg-[#EBFF00] text-slate-800 text-lg w-fit px-6 mb-3 py-2 tracking-wider font-semibold">
                        工作經驗
                    </h2>
                    <div className="flex flex-col gap-5 mb-7">
                        {data?.resume_exp?.map((exp, index) => (
                            <JobBlock
                                key={index}
                                duration={exp.exp_duration}
                                title={exp.exp_title}
                                corporation={exp.exp_corporation}
                                jd={exp.exp_desc}
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className="bg-[#EBFF00] text-slate-800 text-lg w-fit px-6 py-2 tracking-wider font-semibold">
                        工作技能
                    </h2>
                    {data?.resume_skills?.map((skill, index) => (
                        <div className="pl-5 pt-3" key={index}>
                            <h3 className="font-bold text-lg pt-3 text-foreground">
                                {skill.skill_title}
                            </h3>
                            <div className="bg-card px-5 py-6 mt-2 mr-5 rounded-md">
                                <ul className="space-y-3">
                                    {skill.skill_desc.map((desc, index) => (
                                        <li key={index}>
                                            <h4>{desc.skill_name}</h4>
                                            <ResumePercent percent={desc.skill_percent} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <h2 className="bg-[#EBFF00] text-slate-800 text-lg w-fit px-6 py-2 tracking-wider font-semibold">
                        自我介紹
                    </h2>
                    <div className="pl-5 pt-3">
                        <p className="bg-card px-5 py-6 mt-2 mr-5 mb-6 whitespace-pre-line rounded-md">
                            {data.resume_intro}
                        </p>
                    </div>
                </div>
                <div>
                    <h2 className="bg-[#EBFF00] text-slate-800 text-lg w-fit px-6 py-2 tracking-wider font-semibold">
                        外語能力
                    </h2>
                    <div className="pl-5 pt-3">
                        <h3 className="font-bold text-lg pt-3 text-foreground">英語</h3>
                        <h4 className="text-sm text-muted-foreground">TOEIC多益 795分</h4>
                    </div>
                </div>
                <div>
                    <h2 className="bg-[#EBFF00] text-slate-800 text-lg w-fit px-6 py-2 tracking-wider font-semibold">
                        接案經驗
                    </h2>
                    <div className="pl-5 pt-3 grid grid-cols-2">
                        {data?.resume_freelance?.map((freelance, index) => (
                            <Image
                                key={index}
                                src={freelance.freelance_src}
                                alt={freelance.freelance_alt}
                                width={200}
                                height={200}
                                className="w-auto h-12 px-4 my-3 mr-auto ml-auto aspect-auto dark:invert"
                            />
                        ))}
                    </div>
                    <h3 className="text-sm text-right pr-4 pt-2 text-muted-foreground">
                        ......詳細請移至
                        <Link href="/portfolio" className="font-semibold text-foreground">
                            作品集頁面
                        </Link>
                    </h3>
                </div>
                <div>
                    <h2 className="bg-[#EBFF00] text-slate-800 text-lg w-fit px-6 py-2 tracking-wider font-semibold">
                        相關證照
                    </h2>
                    <div className="pl-5 pt-3">
                        {data?.resume_certificates?.map((certificate, index) => (
                            <Fragment key={index}>
                                <h3 className="font-bold text-lg pt-3 text-foreground">
                                    <Image
                                        src={certificate.certificate_src}
                                        alt={certificate.certificate_alt}
                                        width={640}
                                        height={75}
                                    />
                                </h3>
                                <h4 className="text-sm text-muted-foreground">
                                    {certificate.certificate_title}
                                </h4>
                            </Fragment>
                        ))}
                    </div>
                </div>
            </main> */}
        </div>
    );
};

export default Resume;
