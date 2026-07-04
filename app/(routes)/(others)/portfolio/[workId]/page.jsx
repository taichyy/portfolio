import { notFound } from "next/navigation";

import { portfolio } from "@/lib/data";
import { Content } from "./(components)/content";

export function generateStaticParams() {
    return portfolio.map((item) => ({
        workId: String(item.id),
    }));
}

export async function generateMetadata({ params }) {
    const { workId } = await params;
    const work = portfolio.find(item => item.id == workId);

    if (!work) {
        return {
            title: "作品不存在",
            robots: { index: false },
        };
    }

    const description = `${work.subtitle.replace(/\n/g, "。")}。使用技術：${work.languages.join("、")}。`;

    return {
        title: `${work.title}｜作品集`,
        description,
        alternates: {
            canonical: `/portfolio/${work.id}`,
        },
        openGraph: {
            title: work.title,
            description,
            url: `/portfolio/${work.id}`,
            type: "article",
            images: work.img?.[0] ? [{ url: work.img[0], alt: work.title }] : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title: work.title,
            description,
            images: work.img?.[0] ? [work.img[0]] : undefined,
        },
    };
}

const WorkIdInPortfolioPage = async ({ params }) => {
    const { workId } = await params;
    const work = portfolio.find(item => item.id == workId);

    if (!work) {
        notFound();
    }

    return (
        <section className="py-32">
            <div className="container max-w-7xl">
                <Content work={work} />
            </div>
        </section>
    );
}

export default WorkIdInPortfolioPage;
