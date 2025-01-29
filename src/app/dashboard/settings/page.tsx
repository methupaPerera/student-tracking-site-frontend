"use client";

// Importing utilities.
import React, { useEffect, useState } from "react";
import makeFetch from "@/lib/makeFetch";

// Importing components.
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function AdminSettings() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        const fetchAdmin = async () => {
            const res = await makeFetch("/api/admin/user", {
                method: "GET",
            });

            const data = await res.json();
            setFormData(data);
        };

        fetchAdmin();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const tid = toast.loading("Updating...");

        const res = await makeFetch("/api/admin", {
            method: "PUT",
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (res.ok) {
            toast.success(data.message, { id: tid });
            setFormData((prev) => ({
                ...prev,
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            }));
        } else {
            data.errors.forEach((error: string) => {
                toast.error(error, { id: tid });
            });
        }
    };

    return (
        <Card className="border-none p-0">
            <CardHeader>
                <CardTitle className="text-2xl">Personal Settings</CardTitle>
            </CardHeader>

            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Personal Information
                        </h3>

                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Change Password
                        </h3>

                        <div className="space-y-2">
                            <Label htmlFor="currentPassword">
                                Current Password
                            </Label>
                            <Input
                                id="currentPassword"
                                name="currentPassword"
                                type="password"
                                // value={formData.currentPassword}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                // value={formData.newPassword}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">
                                Confirm New Password
                            </Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                // value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex justify-end space-x-4">
                    <Button type="submit">Save Changes</Button>
                </CardFooter>
            </form>
        </Card>
    );
}
