import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator"
import { z } from "zod";

import { FrameSchema } from "@/schemas/frame";
import { db } from "@/lib/db";

export const frameRouter = new Hono()
    .post(
        "/",
        zValidator("json", FrameSchema),
        async (c) => {
            const body = await c.req.valid("json");

            try {
                const frame = await db.frame.findFirst({
                    where: {
                        name: body.name,
                    },
                })

                if (frame) {
                    return c.json({
                        success: false,
                        message: "Frame already exists.",
                    }, 409)
                }

                const totalStock = body.variants.reduce((acc, variant) => acc + Number(variant.stock), 0);

                await db.frame.create({
                    data: {
                        name: body.name,
                        description: body.description,
                        imageUrl: body.imageUrl,
                        stock: totalStock,
                        variants: {
                            createMany: {
                                data: body.variants.map((variant) => ({
                                    size: variant.size,
                                    color: variant.color,
                                    price: Number(variant.price),
                                    stock: Number(variant.stock),
                                })),
                            }
                        },
                    },
                })

                return c.json({
                    success: true,
                    message: "Frame created successfully.",
                }, 201)
            } catch (error) {
                console.log(`Error creating frame: ${error}`);
                return c.json({
                    success: false,
                    message: "Something went wrong. Please try again.",
                }, 500)
            }
        }
    )
    .put(
        "/:id",
        zValidator("param", z.object({
            id: z.string().min(1, "required"),
        })),
        zValidator("json", FrameSchema),
        async (c) => {
            const { id } = await c.req.valid("param");
            const body = await c.req.valid("json");

            try {
                const frame = await db.frame.findFirst({
                    where: {
                        id,
                    },
                    include: {
                        variants: true,
                    },
                })

                if (!frame) {
                    return c.json({
                        success: false,
                        message: "Frame not found.",
                    }, 404)
                }

                const totalStock = body.variants.reduce((acc, variant) => acc + Number(variant.stock), 0);

                await db.$transaction(async (tx) => (
                    await tx.frame.update({
                        where: {
                            id,
                        },
                        data: {
                            name: body.name,
                            description: body.description,
                            imageUrl: body.imageUrl,
                            stock: totalStock,
                        },
                    }),
                    body.variants.map(async (variant) => {
                        if (variant.frameId) {
                            await tx.frameVariant.update({
                                where: {
                                    id: variant.frameId,
                                },
                                data: {
                                    size: variant.size,
                                    color: variant.color,
                                    price: Number(variant.price),
                                    stock: Number(variant.stock),
                                },
                            })
                        }
                    })
                ))

                return c.json({
                    success: true,
                    message: "Frame updated successfully.",
                }, 200)
            } catch (error) {
                console.log(`Error updating frame: ${error}`);
                return c.json({
                    success: false,
                    message: "Something went wrong. Please try again.",
                }, 500)
            }
        }
    )
    .delete(
        "/:id",
        zValidator("param", z.object({
            id: z.string().min(1, "required"),
        })),
        async (c) => {
            const { id } = await c.req.valid("param");

            try {
                const frame = await db.frame.findFirst({
                    where: {
                        id,
                    },
                    include: {
                        variants: true,
                    },
                })

                if (!frame) {
                    return c.json({
                        success: false,
                        message: "Frame not found.",
                    }, 404)
                }

                await db.frame.delete({
                    where: {
                        id,
                    },
                })

                return c.json({
                    success: true,
                    message: "Frame deleted successfully.",
                }, 200)
            } catch (error) {
                console.log(`Error deleting frame: ${error}`);
                return c.json({
                    success: false,
                    message: "Something went wrong. Please try again.",
                }, 500)
            }
        }

    )
    .get(
        "/build",
        async (c) => {
            const frames = await db.frame.findMany({
                include: {
                    variants: true,
                },
            });

            return c.json({
                frames,
            }, 200)
        }
    )
    .get(
        "/",
        zValidator(
            "query",
            z.object({
                query: z.string().optional(),
                page: z.string().optional(),
                limit: z.string().optional(),
                sort: z.string().optional(),
            })
        ),
        async (c) => {
            const { query, page, limit, sort } = await c.req.valid("query");
            const pageNumber = parseInt(page || "1");
            const limitNumber = parseInt(limit || "5");

            const [frames, totalCount] = await Promise.all([
                db.frame.findMany({
                    where: {
                        ...(query && { name: { contains: query, mode: "insensitive" } }),
                    },
                    include: {
                        variants: {
                            select: {
                                id: true,
                                size: true,
                                color: true,
                                price: true,
                                stock: true,
                            }
                        }
                    },
                    orderBy: {
                        createdAt: sort === "asc" ? "asc" : "desc",
                    },
                    skip: (pageNumber - 1) * limitNumber,
                    take: limitNumber,
                }),
                db.frame.count({
                    where: {
                        ...(query && { name: { contains: query, mode: "insensitive" } }),
                    },
                }),
            ]);

            return c.json({
                frames,
                totalCount,
            }, 200)
        }
    )