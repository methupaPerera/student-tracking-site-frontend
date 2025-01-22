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
}

export const config = {
    matcher: ["/"],
};
