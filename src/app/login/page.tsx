"use client";

import type { UserType } from "@/types/auth";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { setToken } from "@/lib/utils";
import makeFetch from "@/lib/makeFetch";

// Importing components.
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { BlurFade } from "@/components/ui/blur-fade";

export default function LoginForm() {
    const router = useRouter();

    const userTypeRef = useRef<UserType>("student");
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const email = emailRef?.current?.value;
        const password = passwordRef?.current?.value;
        const userType = userTypeRef?.current;

        if (!userType || !email || !password) {
            toast.error("Please fill in all the fields.");
            return;
        }

        const res = await makeFetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userType, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            data.errors.forEach((error: string) => {
                toast.error(error);
            });
            return;
        }

        setToken(data.token);
        toast.success(data.message);

        setTimeout(() => {
            router.push("/dashboard");
        }, 1000);
    };

    return (
        <>
            <BackgroundBeams />

            <BlurFade>
                <div className="relative z-50 min-h-screen flex items-center justify-center">
                    <Card className="w-11/12 sm:w-96 shadow-[0_0.5rem_1rem] shadow-gray-200">
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold">
                                Learn{" "}
                                <span className="text-primary">Sphere</span>.
                            </CardTitle>
                            <CardDescription>
                                The next generation student tracking system.
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={handleLogin} className="space-y-5">
                                <div className="space-y-3">
                                    <Select
                                        defaultValue={"student"}
                                        onValueChange={(userType: UserType) =>
                                            (userTypeRef.current = userType)
                                        }
                                    >
                                        <SelectTrigger id="userType">
                                            <SelectValue placeholder="Select user type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="student">
                                                Student
                                            </SelectItem>
                                            <SelectItem value="teacher">
                                                Teacher
                                            </SelectItem>
                                            <SelectItem value="admin">
                                                Admin
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        ref={emailRef}
                                        value={emailRef?.current?.value}
                                    />

                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        ref={passwordRef}
                                        value={passwordRef?.current?.value}
                                    />
                                </div>

                                <Button type="submit" className="w-full">
                                    Login
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </BlurFade>
        </>
    );
}
