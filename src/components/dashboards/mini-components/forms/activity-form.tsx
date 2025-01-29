import type { Activity } from "@/types/student";

// Importing utilities.
import { useState, useEffect } from "react";

// Importing components.
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function ActivitiesForm({
    onSubmit,
    initialData = null,
}: {
    onSubmit: (data: any) => void;
    initialData: Activity | null;
}) {
    const [formData, setFormData] = useState<Activity>({
        activityName: initialData?.activityName || "",
        description: initialData?.description || "",
        date: initialData?.date || "",
        activityType: initialData?.activityType || "academic",
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
            activityName: "",
            description: "",
            date: "",
            activityType: "academic",
        });
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="activityName">Activity Name</Label>
                <Input
                    id="activityName"
                    name="activityName"
                    value={formData.activityName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <Label htmlFor="date">Date</Label>
                <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <Label htmlFor="activityType">Activity Type</Label>
                <Select
                    name="activityType"
                    value={formData.activityType}
                    onValueChange={(value: "academic" | "extracurricular") =>
                        setFormData({ ...formData, activityType: value })
                    }
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select activity type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="academic">Academic</SelectItem>
                        <SelectItem value="extracurricular">
                            Extracurricular
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex justify-end">
                <Button type="submit">
                    {initialData ? "Update" : "Add"} Activity
                </Button>
            </div>
        </form>
    );
}
