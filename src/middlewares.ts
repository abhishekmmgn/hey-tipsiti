import { NextRequest, NextResponse } from "next/server";

import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

let locales = ['en', 'fr', 'de', 'es']

export function middleware(request: NextRequest) {
    // // Check if there is any supported locale in the pathname
    // const { pathname } = request.nextUrl
    // const pathnameHasLocale = locales.some(
    //     (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    // )

    // if (pathnameHasLocale) return

    // // Redirect if there is no locale
    // let headers = { 'accept-language': 'en,en;q=0.5' }
    // let languages = new Negotiator({ headers }).languages()
    // let defaultLocale = 'en'
    // const locale = match(languages, locales, defaultLocale) // -> 'en'

    // request.nextUrl.pathname = `/${locale}${pathname}`
    // // e.g. incoming request is /products
    // // The new URL is now /en/products
    return NextResponse.redirect(request.url)
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next).*)',
        // Optional: only run on root (/) URL
        // '/api'
    ],
}