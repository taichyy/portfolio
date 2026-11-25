import SiteFooter from "@/components/site-footer"
import { resolveLocale } from "@/lib/i18n/config"

const OthersLayout = async (props) => {
    const { children } = props;
    const locale = resolveLocale((await props.params).locale);

    return (
        <div className="flex min-h-dvh flex-col">
            <main id="content" tabIndex={-1} className="flex-1 focus:outline-none">
                {children}
            </main>
            <SiteFooter locale={locale} />
        </div>
    );
}

export default OthersLayout;
