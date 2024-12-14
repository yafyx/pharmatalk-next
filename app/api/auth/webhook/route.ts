import { WebhookEvent } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
    const event = (await req.json()) as WebhookEvent

    if (event.type === 'user.created') {
        await prisma.user.create({
            data: {
                id: event.data.id,
                clerkId: event.data.id,
                email: event.data.email_addresses[0].email_address,
                name: `${event.data.first_name} ${event.data.last_name}`,
                image: event.data.image_url,
            },
        })
    }

    return new Response('Webhook received', { status: 200 })
}