import ProjectRow from "@/components/project-row"
import { projectsByCategory } from "@/lib/data"

export const metadata = {
    title: "作品 Projects",
    description:
        "Tai Y 的軟體工程作品：商業化 ERP 系統、自己發起的產品、Zero-Knowledge 開源密碼管理器與各種工具。依實務作品、自有產品、開源與個人專案分類。",
    alternates: { canonical: "/projects" },
}

const Projects = () => {
    const groups = projectsByCategory

    return (
        <section className="mx-auto max-w-[1240px] px-6 pt-32 md:pt-40">
            <header className="max-w-2xl">
                <p className="label-mono">Projects</p>
                <h1 className="mt-5 font-serif text-4xl leading-[1.1] md:text-6xl">
                    我做過的東西
                </h1>
                <p className="mt-6 text-base leading-8 text-muted-foreground md:text-lg">
                    這些專案橫跨專業工作、自己發起的產品、開源與個人工具。
                    每個專案的頁面都寫成一份工程視角的說明：問題是什麼、我負責哪些部分、
                    技術上難在哪、我怎麼解決。
                </p>
            </header>

            <div className="mt-16 space-y-20">
                {groups.map((group) => (
                    <div key={group.id}>
                        <div className="mb-2 flex items-baseline gap-4">
                            <h2 className="font-serif text-xl">{group.label}</h2>
                            <span className="label-mono">{group.en}</span>
                            <span className="ml-auto font-mono text-xs text-muted-foreground/60 tabular-nums">
                                {String(group.items.length).padStart(2, "0")}
                            </span>
                        </div>
                        <div>
                            {group.items.map((project, i) => (
                                <ProjectRow key={project.slug} project={project} index={i} />
                            ))}
                            <div className="border-t border-line" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Projects
