import Hamburger from "@/components/hamburger/hamburger";
import ButtonBackToTop from "@/components/button-back-to-top";

export default function PortfolioLayout({ children }) {
    return (
        <>
            {/* Not importing in the outer layout since it's a pure CSS burger, 
                need to import it here to close the hamburger menu when link is changed. */}
            <Hamburger />
            {children}
            <ButtonBackToTop />
        </>
    );
}