import HomeBg from "./(components)/home-bg";

export const metadata = {
    description: "我是 Tai（嚴太成），專注於 Next.js、擅長前端架構設計的全端網頁工程師。具備完整系統開發與商業化經驗，曾打造並成功上線 ERP 產品。",
    alternates: {
        canonical: "/",
    },
};

export default function HomePage() {
    const data = {
        home_intro: "我是 Tai，華碩電腦網頁軟體工程師。\n\n專注於 Next.js、擅長前端架構設計的全端工程師。\n\n具備完整系統開發與商業化經驗，曾打造並成功上線 ERP 產品。",
        home_mail: "tai@heytai.dev"
    }

    return (
        <div className="h-dvh bg-background flex flex-row text-foreground">
            <h1 className="sr-only">Tai 嚴太成－全端網頁工程師 Full-Stack Web Developer</h1>
            <aside className='bg-card flex flex-col gap-10 px-[1.5rem] pt-[9rem]'>
                <div className=' flex flex-col gap-8' data-aos="fade-up" data-aos-duration="1000">
                    <div className='flex flex-col gap-3'>
                        <h3 className='text-muted-foreground'>INTRO.</h3>
                        <p className='leading-8 text-justify whitespace-pre-line'>
                            {data.home_intro}
                        </p>
                    </div>
                    <div className='text-sm flex flex-col gap-3'>
                        <h3 className='text-muted-foreground'>CONTACT.</h3>
                        <div className='flex flex-col gap-1'>
                            <div className='break-all'>
                                <span className='icon-gmail pr-2' />
                                {data.home_mail}
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
            <HomeBg />
        </div>
    )
}

