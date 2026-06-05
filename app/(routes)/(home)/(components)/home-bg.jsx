"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const HomeBg = () => {
    const items = [
        // Hide in main page.
        // {
        //     title: "關於我",
        //     img: "/images/home/home_mainbgc.jpg",
        //     alt: "Home background image by Tai-Cheng, Yen",
        //     link: "/about"
        // },
        {
            title: "作品集",
            img: "/images/home/home_portfolio.jpg",
            alt: "Home background image for portfolio",
            link: "/portfolio"
        },
        // 1: {
        //     title: "個人履歷",
        //     img: "/images/home/home_resume.jpg",
        //     alt: "Home background image for resume",
        //     link: "/resume"
        // },
        {
            title: "聯絡方式",
            img: "/images/home/home_contact.jpg",
            alt: "Home background image for contact page",
            link: "/contact"
        }
    ]
    
    const [img, setImg] = useState(items[1].img)

    const handleHover = (item) => {
        setImg(items[item].img)
    }

    return (
        <main className='relative w-full flex items-end justify-end'>
            <Image
                src={img}
                alt="Main image of website"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 60vw"
                className='opacity-20 hover:opacity-50 duration-200 z-0 object-cover'
                loading="eager"
            />
            <nav className='mr-5 mb-10 text-2xl font-semibold z-10 md:mr-20 md:mb-20 md:text-4xl text-right duration-200' >
                <div className='flex flex-col gap-8'>
                    {items.map((item, i) => (
                        <span 
                            key={i} 
                            onMouseEnter={() => handleHover(i)} 
                            onMouseLeave={() => handleHover(0)}
                        >
                            <Link href={item.link}>
                                {item.title}
                            </Link>
                        </span>
                    ))}
                </div>
            </nav>
        </main>
    );
}


export default HomeBg;
