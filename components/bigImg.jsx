import Image from 'next/image';

export default function BigImg({ bgc, bgAlt, name, height }) {

    return (
        <div className={`relative ${height == "full" ? "h-screen" : "h-[80vh]"}`}>
            <Image
                src={bgc}
                alt={bgAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 60vw"
                className='object-cover'
            />
            <div className="
                absolute top-1/3 md:top-1/2 left-[12.5%] md:left-1/4
                flex items-center
                px-4 py-4 md:px-16 md:py-16
                w-3/4 md:w-1/2 min-h-fit
                font-extrabold duration-300
            ">
                {/* bgc */}
                <div className='bg-white dark:bg-slate-800 opacity-30 w-full h-full absolute top-0 left-0 hover:opacity-40 duration-200' />
                {/* content */}
                <div className='text-foreground text-2xl w-full'>
                    <div className="flex justify-between items-center pb-5 mb-3 border-b-2 border-border">
                        <h2>
                            個人履歷
                        </h2>
                        <h5 className='text-base'>
                            Resume
                        </h5>
                    </div>
                    <div className='mt-5'>
                        <h3>
                            {name}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
