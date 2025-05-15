import { Hono } from "hono";
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'

import { db } from "@/lib/db";

export const webhookRouter = new Hono()
    .post('/clerk', async (c) => {
        try {
            const evt = await verifyWebhook(c.req.raw as NextRequest)

            const { id } = evt.data
            const eventType = evt.type

            console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
            console.log('Webhook payload:', evt.data)

            if (eventType === "user.created") {
                await db.user.create({
                    data: {
                        clerkId: evt.data.id,
                        name: `${evt.data.first_name} ${evt.data.last_name}`,
                        email: evt.data.email_addresses[0].email_address,
                        avatar: evt.data.image_url,
                    }
                })
            }

            if (eventType === "user.updated") {
                await db.user.update({
                    where: { clerkId: evt.data.id },
                    data: {
                        name: `${evt.data.first_name} ${evt.data.last_name}`,
                        avatar: evt.data.image_url,
                    }
                })
            }

            if (eventType === "user.deleted") {
                if (id) {
                    await db.user.delete({ where: { clerkId: id } })
                }
            }

            return c.text('Webhook received', 200)
        } catch (err) {
            console.error('Error verifying webhook:', err)
            return c.text('Error verifying webhook', 400)
        }
    })