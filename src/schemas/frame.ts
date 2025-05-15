import { z } from "zod";

export const FrameVariantSchema = z.object({
    frameId: z.string().optional(),
    size: z.string().min(1, "required"),
    color: z.string().min(1, "required"),
    price: z.string().min(1, "required"),
    stock: z.string().min(1, "required"),
});

export const FrameSchema = z.object({
    name: z.string().min(1, "required"),
    description: z.string().min(1, "required"),
    imageUrl: z.string().min(1, "required"),

    variants: z.array(FrameVariantSchema).min(1, "required"),
});

export type FrameVariantType = z.infer<typeof FrameVariantSchema>;
export type FrameType = z.infer<typeof FrameSchema>;