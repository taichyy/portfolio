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
            className="h-screen flex flex-col-reverse md:flex-row items-center justify-center md:ml-5" 
        >
            <div className="text-center">
                <h3 className="text-2xl font-bold uppercase">
                    contact me
                    <br />
                    聯絡我
                </h3>
                <h4 className="mt-5">
                    <span className="icon-gmail mr-2"></span>
                    {data.contact_mail}
                </h4>
            </div>
            <Image
                width={280}
                height={200}
                alt="personal logo"
                src="/images/contact/logo.png"
                className="ml w-48 mb-10 md:ml-5 md:w-72 md:mb-0"
            />
        </div>
    );
}

export default Contact;
