import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { portfolio } from "@/lib/data";
import { Separator } from "@/components/ui/separator";

export const metadata = {
    title: "作品集",
};

const Portfolio = () => {
    const heading = "個人作品集";
    const description =
        "這些作品涵蓋了多種技術和框架，包括但不限於 JavaScript、TypeScript、php 及各式 No-SQL、SQL 資料庫。展示了我在網頁程式設計和開發方面的專業知識。";

    return (
        <div>
            <section className="py-20 md:py-32 bg-gradient-to-b from-background via-background to-secondary/5">
                <div className="container mx-auto px-4 flex flex-col items-start">
                    {/* Header */}
                    <div className="w-full max-w-6xl mx-auto mb-12 md:mb-16 mt-4 md:mt-0">
                        <h2
                            data-aos="fade-in"
                            data-aos-duration="1000"
                            className="mb-3 text-3xl font-bold text-pretty md:mb-4 md:text-4xl lg:mb-6 lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
                        >
                            {heading}
                        </h2>
                        <p
                            data-aos="fade-in"
                            data-aos-duration="1000"
                            data-aos-delay="200"
                            className="mb-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg leading-relaxed"
                        >
                            {description}
                        </p>
                    </div>

                    {/* Portfolio Grid */}
                    <div className="w-full max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {portfolio.map((item, index) => (
                                <Link key={index} href={`/portfolio/${item.id}`}>
                                    <Card
                                        data-aos="fade-up"
                                        data-aos-duration="1000"
                                        data-aos-delay={index * 150}
                                        className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:border-primary/50 cursor-pointer bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card flex flex-col"
                                    >
                                        {/* Image Container */}
                                        <div className="relative w-full h-48 overflow-hidden bg-muted">
                                            {item.img && item.img[0] ? (
                                                <Image
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    alt={`${item.title} Image`}
                                                    src={item.img[0]}
                                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                                                    <div className="text-muted-foreground text-sm">No image</div>
                                                </div>
                                            )}
                                            {/* Overlay Gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>

                                        {/* Content */}
                                        <CardHeader className="pb-3">
                                            {/* Badges */}
                                            {item.badges && item.badges.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {item.badges.map((badge, badgeIndex) => (
                                                        <Badge
                                                            key={badgeIndex}
                                                            variant="secondary"
                                                            className="text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20"
                                                        >
                                                            {badge}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            )}

                                            <CardTitle className="text-lg md:text-xl font-bold group-hover:text-primary transition-colors">
                                                {item.title}
                                            </CardTitle>
                                        </CardHeader>

                                        <CardContent className="pb-3 flex-grow">
                                            <CardDescription className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                                {item.subtitle}
                                            </CardDescription>

                                            {/* Tech Stack */}
                                            <div className="flex flex-wrap gap-2">
                                                {item.languages.slice(0, 3).map((lang, langIndex) => (
                                                    <span
                                                        key={langIndex}
                                                        className="text-xs px-2 py-1 rounded-full bg-secondary/60 text-secondary-foreground font-medium"
                                                    >
                                                        {lang}
                                                    </span>
                                                ))}
                                                {item.languages.length > 3 && (
                                                    <span className="text-xs px-2 py-1 rounded-full bg-secondary/60 text-secondary-foreground font-medium">
                                                        +{item.languages.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        </CardContent>

                                        {/* Footer */}
                                        <CardFooter className="pt-3 border-t border-border/50">
                                            <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                                                了解更多
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Portfolio;
