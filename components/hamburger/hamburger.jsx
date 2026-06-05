import Link from "next/link";

import styles from "./hamburger.module.css";

export default function Hamburger() {
    // This component, instead of using Tailwind css, uses a css module.
    // Because this pure CSS hamburger is downloaded from codepen.io, and it was originally written in CSS, not Tailwind CSS.
    
    // Unfortunately, I can not find the author of this hamburger. If you know the author, please let me. 
    
    const navLinks = [
        {
            text: "回首頁",
            href: "/"
        },
        {
            text: "關於我",
            href: "/about"
        },
        {
            text: "作品集",
            href: "/portfolio"
        },
        // {
        //     text: "個人履歷",
        //     href: "/resume"
        // },
        {
            text: "聯絡方式",
            href: "/contact"
        }
    ]

    return (
        <nav role="navigation" className={styles.nav}>
            <div className={styles.menuToggle}>
                {/* A fake / hidden checkbox is used as click receiver, so you can use the :checked selector on it. */}
                <input type="checkbox" />
                {/* Some spans to act as a hamburger. They are acting like a real hamburger, not that McDonalds stuff. */}
                <span></span>
                <span></span>
                <span></span>
                {/* Too bad the menu has to be inside of the button. But hey, it's pure CSS magic. */}
                <ul className={styles.menu}>
                    {navLinks.map((link, index) => (
                        <Link key={index} href={link.href}>
                            <li>
                                <h4 style={index == 0 ? { fontWeight: "800" } : {}}>{link.text}</h4>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </nav>
    )
}