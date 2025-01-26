import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getToken() {
    return Cookies.get("token");
}

export function setToken(token: string) {
    Cookies.set("token", token);
}

export function removeToken() {
    Cookies.remove("token");
}

export async function verifyToken(token: string) {
    const url = "https://student-tracking-site-backend.vercel.app" + "/api/auth";
    
    const response = await fetch(url, {
        method: "GET",
        headers: {
            authorization: token,
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    if (!response.ok) {
        return null;
    }

    return data;
}
