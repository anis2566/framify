import { FrameCard } from "@/components/frame-card";

export const PopularFrames = () => {
    return (
        <div className="container w-full max-w-7xl mx-auto py-20 flex flex-col items-center gap-10">
            <div>
                <h1 className="text-4xl font-bold tracking-wide text-center capitalize leading-tight text-gray-700 dark:text-white">Popular Frames</h1>

                <p className="text-sm text-center text-muted-foreground max-w-xl mx-auto">
                    Discover our most popular frames, each designed to elevate your memories to masterpiece status.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <FrameCard />
                <FrameCard />
                <FrameCard />
                <FrameCard />
            </div>
        </div>
    )
}

