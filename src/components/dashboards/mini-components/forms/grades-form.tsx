import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function GradesForm({
    onSubmit,
    initialData = null,
}: {
    onSubmit: (data: any) => void;
    initialData: any;
}) {
    const [formData, setFormData] = useState({
        subject: initialData?.subject || "",
        marks: initialData?.marks || "",
        term: initialData?.term || "",
        year: initialData?.year || new Date().getFullYear(),
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);

        setFormData({
            subject: formData.subject,
            marks: "",
            term: formData.term,
            year: new Date().getFullYear(),
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="subject">Subjects (Comma-seperated)</Label>
                <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <Label htmlFor="marks">Marks</Label>
                <Input
                    id="marks"
                    name="marks"
                    type="text"
                    value={formData.marks}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <Label htmlFor="term">Term</Label>
                <Input
                    id="term"
                    name="term"
                    value={formData.term}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <Label htmlFor="year">Year</Label>
                <Input
                    id="year"
                    name="year"
                    type="number"
                    value={formData.year}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="flex justify-end">
                <Button type="submit">
                    {initialData ? "Update" : "Add"} Grade
                </Button>
            </div>
        </form>
    );
}
