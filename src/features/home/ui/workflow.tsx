import { Camera, Frame, Paintbrush, Tv } from "lucide-react";
import Link from "next/link";

import { DotBackground } from "@/components/dot-background";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

const features = [
    {
        title: "Upload Your Photo",
        description: "Select your favorite digital photos and upload them to our secure platform.",
        icon: <Camera />,
    },
    {
        title: "Choose Your Frame",
        description: "Browse our collection of handcrafted frames and select the perfect match.",
        icon: <Frame />,
    },
    {
        title: "Preview & Customize",
        description: "See how your framed photo will look and adjust to your preferences.",
        icon: <Paintbrush />,
    },
    {
        title: "Receive & Display",
        description: "Your professionally framed photo arrives ready to hang and enjoy.",
        icon: <Tv />,
    },
];

export const Workflow = () => {
    return (
        <DotBackground className="py-10 z-10">
            <div className="z-10 px-2 md:px-0">
                <h1 className="text-4xl font-bold tracking-wide text-center capitalize leading-tight text-gray-700 dark:text-white">How it works</h1>
                <p className="text-sm text-center text-muted-foreground">From digital to display-ready in four simple steps. No hassle, just beautiful frames.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 max-w-7xl mx-auto">
                    {features.map((feature, index) => (
                        <Feature key={feature.title} {...feature} index={index} />
                    ))}
                </div>

                <Button asChild variant="default" className="mt-10 mx-auto flex w-full max-w-fit mx-auto">
                    <Link href="/frames/build">Start Framing</Link>
                </Button>
            </div>
        </DotBackground>
    )
}


const Feature = ({
    title,
    description,
    icon,
    index,
}: {
    title: string;
    description: string;
    icon: React.ReactNode;
    index: number;
}) => {
    return (
        <div
            className={cn(
                "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
                (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
                index < 4 && "lg:border-b dark:border-neutral-800"
            )}
        >
            {index < 4 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
            )}
            {index >= 4 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
            )}
            <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
                {icon}
            </div>
            <div className="text-lg font-bold mb-2 relative z-10 px-10">
                <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
                <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
                    {title}
                </span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
                {description}
            </p>
        </div>
    );
};