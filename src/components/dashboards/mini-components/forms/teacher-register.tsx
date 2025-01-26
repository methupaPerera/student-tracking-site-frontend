"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetContent,
    SheetDescription,
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
import makeFetch from "@/lib/makeFetch";
import { toast } from "sonner";

interface TeacherData {
    email: string;
    name: string;
    phone: string;
    inChargeOf: string;
    subjects: {
        subjectName: string;
        classes: string[];
    }[];
}

export default function TeacherRegistrationForm() {
    const [formData, setFormData] = useState<TeacherData>({
        email: "",
        name: "",
        inChargeOf: "",
        phone: "",
        subjects: [],
    });

    const [subjectName, setSubjectName] = useState("");
    const [classNames, setClassNames] = useState("");

    const handleAddSubject = () => {
        if (!subjectName.trim() || !classNames.trim()) return;

        setFormData((prevData) => ({
            ...prevData,
            subjects: [
                ...prevData.subjects,
                {
                    subjectName,
                    classes: classNames.split(",").map((c) => c.trim()),
                },
            ],
        }));

        setSubjectName("");
        setClassNames("");
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const tid = toast.loading("Registering teacher...");

        const res = await makeFetch("/api/teacher", {
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
                    <SheetTitle>Teacher Registration</SheetTitle>
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
                        <Label htmlFor="inChargeOf">In Charge Of</Label>
                        <Input
                            id="inChargeOf"
                            name="inChargeOf"
                            value={formData.inChargeOf}
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
                        <Label htmlFor="subjectName">Subject Name</Label>
                        <Input
                            id="subjectName"
                            name="subjectName"
                            value={subjectName}
                            onChange={(e) => setSubjectName(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="classNames">
                            Classes (comma-separated)
                        </Label>
                        <Input
                            id="classNames"
                            name="classNames"
                            value={classNames}
                            onChange={(e) => setClassNames(e.target.value)}
                        />
                    </div>

                    <Button type="button" onClick={handleAddSubject}>
                        Add Subject
                    </Button>

                    <ul>
                        {formData.subjects.map((subject, index) => (
                            <li key={index}>
                                {subject.subjectName} -{" "}
                                {subject.classes.join(", ")}
                            </li>
                        ))}
                    </ul>

                    <Button type="submit" className="w-full">
                        Register Teacher
                    </Button>
                </form>
            </SheetContent>
        </Sheet>
    );
}
