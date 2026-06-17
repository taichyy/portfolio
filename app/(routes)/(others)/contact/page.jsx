import Image from "next/image";

export const metadata = {
    title: "聯絡方式",
};

const Contact = () => {
    const data = {
        contact_mail: "tai@heytai.dev",
    }
    
    return (
        <div 
            data-aos="fade-in" 
            className="h-screen flex flex-col-reverse md:flex-row items-center justify-center" 
        >
            <Image
                width={150}
                height={150}
                alt="personal logo"
                src="/images/contact/logo-whitebg.png"
                className="ml w-32 mb-10 md:ml-5 md:w-48 md:mb-0 block dark:hidden"
            />
            <Image
                width={150}
                height={150}
                alt="personal logo"
                src="/images/contact/logo-blackbg.png"
                className="ml w-32 mb-10 md:ml-5 md:w-48 md:mb-0 hidden dark:block"
            />
            <div className="text-center ml-8">
                <h3 className="text-2xl font-bold uppercase text-foreground">
                    contact me
                    <br />
                    聯絡我
                </h3>
                <h4 className="mt-5 text-muted-foreground">
                    <span className="icon-gmail mr-2"></span>
                    {data.contact_mail}
                </h4>
            </div>
        </div>
    );
}

export default Contact;
