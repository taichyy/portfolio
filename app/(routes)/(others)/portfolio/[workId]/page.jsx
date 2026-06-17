import { portfolio } from "@/lib/data";
import { Content } from "./(components)/content";

const WorkIdInPortfolioPage = async ({ params }) => {
    const { workId } = await params;
    const work = portfolio.find(item => item.id == workId);

    return (
        <section className="py-32">
            <div className="container max-w-7xl">
                {work ? (
                    <div className="">
                        <Content work={work} />
                    </div>
                ) : (
                    <div className="text-center flex flex-col items-center justify-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <h1 className="text-2xl font-bold">作品不存在</h1>
                        <p className="mt-4 text-muted-foreground">您所查詢的作品不存在或已被刪除。</p>
                        <p className="mt-2">
                            <a href="/portfolio" className="text-primary hover:underline">返回作品集</a>
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default WorkIdInPortfolioPage;