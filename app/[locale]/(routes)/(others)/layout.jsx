import SiteFooter from "@/components/site-footer"
import { resolveLocale } from "@/lib/i18n/config"

const OthersLayout = async (props) => {
    const { children } = props;
    const locale = resolveLocale((await props.params).locale);

    return (
        <div className="flex min-h-screen flex-col">
            <div className="flex-1">
                {children}
            </div>
            <SiteFooter locale={locale} />
        </div>
    );
}

export default OthersLayout;
