import ButtonBackToTop from "@/components/button-back-to-top";

export default function PortfolioLayout({ children }) {
    return (
        <>
            {children}
            <ButtonBackToTop />
        </>
    );
}
