import Image from "next/image";
import Link from "next/link";

const sections = [
    {
        title: "Product",
        links: [
            { name: "Overview", href: "#" },
            { name: "Pricing", href: "#" },
            { name: "Marketplace", href: "#" },
            { name: "Features", href: "#" },
        ],
    },
    {
        title: "Company",
        links: [
            { name: "About", href: "#" },
            { name: "Team", href: "#" },
            { name: "Blog", href: "#" },
            { name: "Careers", href: "#" },
        ],
    },
    {
        title: "Resources",
        links: [
            { name: "Help", href: "#" },
            { name: "Sales", href: "#" },
            { name: "Advertise", href: "#" },
            { name: "Privacy", href: "#" },
        ],
    },
];

interface Footer7Props {
    logo?: {
        url: string;
        src: string;
        alt: string;
        title: string;
    };
}
export const Footer = ({
    logo = {
        url: "https://www.shadcnblocks.com",
        src: "https://shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg",
        alt: "logo",
        title: "Shadcnblocks.com",
    },
}: Footer7Props) => {
    return (
        <section className="pt-32 pb-6">
            <div className="container">
                <div className="flex w-full flex-col items-center justify-between gap-10 text-center lg:flex-row lg:items-start lg:text-left">
                    <div className="flex w-full flex-col items-center justify-between gap-6 lg:items-start">
                        <div className="flex items-center gap-2 lg:justify-start">
                            <Link href="/">
                                <Image
                                    src={logo.src}
                                    alt={logo.alt}
                                    width={30}
                                    height={30}
                                />
                            </Link>
                            <h2 className="text-xl font-semibold">Framify</h2>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Discover our most popular frames, each designed to elevate your memories to masterpiece status.
                        </p>
                        {/* <ul className="flex items-center space-x-6 text-muted-foreground">
                            <li className="font-medium hover:text-primary">
                                <a href="#">
                                    <Instagra className="size-6" />
                                </a>
                            </li>
                            <li className="font-medium hover:text-primary">
                                <a href="#">
                                    <FaFacebook className="size-6" />
                                </a>
                            </li>
                            <li className="font-medium hover:text-primary">
                                <a href="#">
                                    <FaTwitter className="size-6" />
                                </a>
                            </li>
                            <li className="font-medium hover:text-primary">
                                <a href="#">
                                    <FaLinkedin className="size-6" />
                                </a>
                            </li>
                        </ul> */}
                    </div>
                    <div className="grid w-full grid-cols-3 gap-6 lg:gap-20">
                        {sections.map((section, sectionIdx) => (
                            <div key={sectionIdx}>
                                <h3 className="mb-6 font-bold">{section.title}</h3>
                                <ul className="space-y-4 text-sm text-muted-foreground">
                                    {section.links.map((link, linkIdx) => (
                                        <li
                                            key={linkIdx}
                                            className="font-medium hover:text-primary"
                                        >
                                            <a href={link.href}>{link.name}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-8 flex flex-col justify-between gap-4 border-t pt-8 text-center text-sm font-medium text-muted-foreground lg:flex-row lg:items-center lg:text-left">
                    <p>© {new Date().getFullYear()} Framify.com. All rights reserved.</p>
                    <ul className="flex justify-center gap-4 lg:justify-start">
                        <li className="hover:text-primary">
                            <a href="#"> Terms and Conditions</a>
                        </li>
                        <li className="hover:text-primary">
                            <a href="#"> Privacy Policy</a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};