"use client";

import type { Student } from "@/types/student";

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FaPlus } from "react-icons/fa6";
import { toast } from "sonner";

interface StudentData {
    email: string;
    name: string;
    gender: "male" | "female";
    address: string;
    class: string;
    dateOfBirth: string;
    phone: string;
    guardianInfo: {
        guardianName: string;
        guardianContact: {
            email: string;
            phone: string;
        };
    };
}

export default function StudentEditForm({ student }: { student: Student }) {
    const [formData, setFormData] = useState<StudentData>({
        email: student.email,
        name: student.name,
        gender: student.gender,
        address: student.address,
        class: student.class,
        dateOfBirth: student.dateOfBirth,
        phone: student.phone,
        guardianInfo: {
            guardianName: student.guardianInfo.guardianName,
            guardianContact: {
                email: student.guardianInfo.guardianContact.email,
                phone: student.guardianInfo.guardianContact.phone,
            },
        },
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleGuardianInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            guardianInfo: {
                ...prevData.guardianInfo,
                [name]: value,
            },
        }));
    };

    const handleGuardianContactInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            guardianInfo: {
                ...prevData.guardianInfo,
                guardianContact: {
                    ...prevData.guardianInfo.guardianContact,
                    [name]: value,
                },
            },
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const tid = toast.loading("Updating student...");

        const res = await makeFetch(`/api/student/${student.user_id}`, {
            method: "PUT",
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
                <Button size="sm" variant="secondary">
                    Edit Details
                </Button>
            </SheetTrigger>
            <SheetContent className="overflow-auto">
                <SheetHeader>
                    <SheetTitle>Edit Student</SheetTitle>
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
                        <Label htmlFor="gender">Gender</Label>
                        <Select
                            name="gender"
                            value={formData.gender}
                            onValueChange={(value) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    gender: value as "male" | "female",
                                }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="address">Address</Label>
                        <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="class">Class</Label>
                        <Input
                            id="class"
                            name="class"
                            value={formData.class}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input
                            id="dateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="guardianName">Guardian Name</Label>
                        <Input
                            id="guardianName"
                            name="guardianName"
                            value={formData.guardianInfo.guardianName}
                            onChange={handleGuardianInputChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="guardianEmail">Guardian Email</Label>
                        <Input
                            id="guardianEmail"
                            name="email"
                            type="email"
                            value={formData.guardianInfo.guardianContact.email}
                            onChange={handleGuardianContactInputChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="guardianPhone">Guardian Phone</Label>
                        <Input
                            id="guardianPhone"
                            name="phone"
                            type="tel"
                            value={formData.guardianInfo.guardianContact.phone}
                            onChange={handleGuardianContactInputChange}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Save
                    </Button>
                </form>
            </SheetContent>
        </Sheet>
    );
}
