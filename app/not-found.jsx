import Link from "next/link"

export const metadata = {
    title: "找不到頁面 404",
    robots: { index: false },
}

export default function NotFound() {
    return (
        <main className="mx-auto flex min-h-screen max-w-[1240px] flex-col justify-center px-6">
            <p className="font-mono text-sm text-signature">404</p>
            <h1 className="mt-5 font-serif text-4xl leading-tight md:text-6xl">
                這裡什麼都沒有。
            </h1>
            <p className="mt-5 max-w-md text-base leading-8 text-muted-foreground">
                你找的東西可能被搬走、改名，或還沒被我做出來。
            </p>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
                <Link
                    href="/"
                    className="border-b border-foreground pb-1 text-sm font-medium hover:border-signature hover:text-signature"
                >
                    回首頁
                </Link>
                <Link
                    href="/work"
                    className="font-mono text-sm text-muted-foreground hover:text-foreground"
                >
                    看作品
                </Link>
            </div>
        </main>
    )
}
