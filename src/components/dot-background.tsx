import React from "react";

import { cn } from "@/lib/utils";

interface DotBackgroundProps {
    children: React.ReactNode;
    className?: string;
}

export function DotBackground({ children, className }: DotBackgroundProps) {
    return (
        <div className={cn("container relative flex w-full max-w-7xl mx-auto items-center justify-center", className)}>
            <div
                className={cn(
                    "absolute inset-0",
                    "[background-size:20px_20px]",
                    "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
                    "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
                )}
            />
            {/* Radial gradient for the container to give a faded look */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

            {children}
        </div>
    );
}
