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
    const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/auth",
        {
            method: "GET",
            headers: {
                authorization: token,
                "Content-Type": "application/json",
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        return null;
    }

    return data;
}
