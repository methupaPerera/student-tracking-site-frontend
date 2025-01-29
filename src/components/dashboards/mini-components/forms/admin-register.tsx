"use client";

// Importing utilities.
import { useState } from "react";
import makeFetch from "@/lib/makeFetch";

// Importing components.
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { FaPlus } from "react-icons/fa6";

export default function AdminRegistrationForm() {
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        phone: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const tid = toast.loading("Registering admin...");

        const res = await makeFetch("/api/admin", {
            method: "POST",
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (res.ok) {
            toast.success(data.message, { id: tid });
        } else {
            data.errors.forEach((error: string) => {
                toast.error(error, { id: tid });
            });
        }
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button>
                    Register <FaPlus />
                </Button>
            </SheetTrigger>
            <SheetContent className="overflow-auto">
                <SheetHeader>
                    <SheetTitle>Admin Registration</SheetTitle>
                </SheetHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Register Admin
                    </Button>
                </form>
            </SheetContent>
        </Sheet>
    );
}
