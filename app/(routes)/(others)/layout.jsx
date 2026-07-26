import SiteFooter from "@/components/site-footer"

const OthersLayout = (props) => {
    const { children } = props;
    return (
        <div className="flex min-h-screen flex-col">
            <div className="flex-1">
                {children}
            </div>
            <SiteFooter />
        </div>
    );
}

export default OthersLayout;
