import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { NextResponse } from 'next/server';
import {
    DEFAULT_LOGIN_REDIRECT,
    publicRoutes,
    apiAuthPrefix,
    authRoutes
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.some(route => {
        if (typeof route === 'string') {
            return nextUrl.pathname === route;
        } else if (route instanceof RegExp) {
            return route.test(nextUrl.pathname);
        }
        return false;
    });

    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return NextResponse.next();
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return NextResponse.next();
    }

    if (!isLoggedIn && !isPublicRoute) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
            callbackUrl += nextUrl.search;
        }
        const encodedUrlComponent = encodeURIComponent(callbackUrl);

        return NextResponse.redirect(new URL(
            `/auth/login?callbackUrl=${encodedUrlComponent}`,
            nextUrl
        ));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
