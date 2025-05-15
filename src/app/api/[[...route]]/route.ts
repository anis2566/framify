import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { createRouteHandler } from 'uploadthing/server';

import { uploadRouter } from "@/lib/uploadthing";
import { frameRouter } from "@/server/frame/route";

const handlers = createRouteHandler({
    router: uploadRouter,
});


const app = new Hono().basePath('/api')
    .all("/uploadthing", (c) => handlers(c.req.raw))
    .route("/frames", frameRouter)

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)

export type AppType = typeof app