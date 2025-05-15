import { Frame, FrameVariant } from "@/generated/prisma";

export type FormattedFrame = Omit<Frame, "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
};

export type FromattedFrameVariant = Omit<FrameVariant, "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
};


export type FormattedFrameWithVariants = FormattedFrame & {
    variants: FromattedFrameVariant[];
};