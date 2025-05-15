import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ColourfulText } from "@/components/colourful-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ReviewsTooltip } from "./reviews-tooltip";
import { Ripple } from "@/components/ripple-background";

export function Hero() {
    return (
        <div className="container w-full max-w-7xl mx-auto min-h-screen grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-10">
            <div className="relative flex h-full w-full flex-col items-center justify-center px-4 md:px-0 md:pl-6 overflow-hidden bg-background">
                <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8">
                    <Badge variant="secondary" className="tracking-widest text-md font-semibold text-primary">Framify</Badge>

                    <p className="text-md uppercase tracking-widest font-semibold text-muted-foreground">Your Memory Builder</p>

                    <h1 className="text-3xl md:text-4xl font-bold tracking-wide capitalize leading-tight">
                        Turn your moments into
                        <br />
                        <ColourfulText text="Masterpieces" />
                    </h1>

                    <p className="text-md max-w-3xl text-muted-foreground">Transform your favorite photos into stunning, ready-to-hang frames. Choose your style, upload your image, and let us craft a personalized piece of art—delivered to your doorstep.</p>

                    <ReviewsTooltip />

                    <div className="flex items-center justify-center md:justify-start gap-4">
                        <Button variant="outline">
                            Explore Frames
                        </Button>
                        <Button className="shadow-2xl rounded-full" asChild>
                            <Link href="/frames/build">
                                <span>Start Framing</span>
                                <ArrowRight className="animate-bounce w-6 h-4" />
                            </Link>
                        </Button>
                    </div>

                </div>
                <Ripple mainCircleOpacity={0.18} mainCircleSize={190} />
            </div>
            <div>
                <Image
                    src="/hero.png"
                    alt="Hero"
                    width={500}
                    height={500}
                    className="hidden md:block"
                />
            </div>
        </div>
    );
}