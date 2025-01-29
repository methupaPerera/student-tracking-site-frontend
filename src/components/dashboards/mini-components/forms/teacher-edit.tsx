"use client";

import type { Teacher, TeacherData } from "@/types/teacher";

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

export default function TeacherEditForm({ teacher }: { teacher: Teacher }) {
    const [formData, setFormData] = useState<TeacherData>({
        email: teacher.email,
        name: teacher.name,
        inChargeOf: teacher.inChargeOf,
        phone: teacher.phone,
        subjects: teacher.subjects,
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

        const tid = toast.loading("Updating teacher...");

        const res = await makeFetch(`/api/teacher/${teacher.user_id}`, {
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
