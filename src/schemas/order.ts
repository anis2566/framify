import { z } from "zod";

export const OrderSchema = z.object({
    quantity: z.string().min(1, "required"),
    shippingCharge: z.string().min(1, "required"),
    name: z.string().min(1, "required"),
    phone: z.string().min(1, "required"),
    address: z.string().min(1, "required"),
    city: z.string().min(1, "required"),
    frameId: z.string().min(1, "required"),
    variantId: z.string().min(1, "required"),
});

export type OrderType = z.infer<typeof OrderSchema>;
