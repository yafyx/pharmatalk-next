import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isDashboardRoute = createRouteMatcher(['/dashboard(.*)'])
const isAdminRoute = createRouteMatcher(['/admin(.*)'])
const isRootRoute = createRouteMatcher(['/'])

export default clerkMiddleware(async (auth, req) => {
    const { userId } = await auth()

    if (isRootRoute(req) && userId) {
        const url = new URL('/dashboard', req.url)
        return NextResponse.redirect(url)
    }

    // Restrict admin route to users with admin role
    if (isAdminRoute(req)) await auth.protect({ role: 'org:admin' })

    // Restrict dashboard routes to signed in users
    if (isDashboardRoute(req)) await auth.protect()
})

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}