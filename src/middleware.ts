import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/utils";

export async function middleware(req: NextRequest) {
    const cookieStore = await cookies();
    const { pathname } = req.nextUrl;

    const token = cookieStore.get("token");
    const session = await verifyToken(token?.value as string);

    if (pathname === "/" && !session) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (pathname === "/" && session.user.userType === "teacher") {
        return NextResponse.redirect(
            new URL("/dashboard/students/attendance", req.url)
        );
    }

    if (pathname === "/" && session.user.userType === "admin") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (pathname === "/dashboard" && !session) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (pathname === "/dashboard" && session.user.userType === "teacher") {
        return NextResponse.redirect(
            new URL("/dashboard/students/attendance", req.url)
        );
    }

    if (pathname.includes("/dashboard") && !session) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/dashboard",
        "/dashboard/students/list",
        "/dashboard/students/attendance",
        "/dashboard/users/teachers/settings",
        "/dashboard/events",
        "/dashboard/users/students",
        "/dashboard/users/teachers",
        "/dashboard/users/admins",
        "/dashboard/settings",
    ],
};
