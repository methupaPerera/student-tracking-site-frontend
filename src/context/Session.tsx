"use client";

import type { Children } from "@/types";

import { createContext, useContext, useState, useEffect } from "react";
import makeFetch from "@/lib/makeFetch";
import { getToken } from "@/lib/utils";
import { UserType } from "@/types/auth";

type Session = {
    user: {
        name: string;
        email: string;
        userType: UserType;
    };
};

const SessionContext = createContext<Session | null>(null);

export const useSession = () => {
    return useContext(SessionContext);
};

export default function SessionProvider({ children }: Children) {
    const [session, setSession] = useState(null);

    const getSession = async (token: string) => {
        const response = await makeFetch("/api/auth", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (!response.ok) {
            setSession(null);
            return;
        }

        setSession(data);
    };

    useEffect(() => {
        const token = getToken();

        if (token) {
            getSession(token);
            return;
        }

        setSession(null);
    }, []);

    return (
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>
    );
}
