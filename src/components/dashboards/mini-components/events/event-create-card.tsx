"iuse client";

// Importing utilities.
import { useState } from "react";
import makeFetch from "@/lib/makeFetch";

// Importing components.
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "lucide-react";
import { toast } from "sonner";

export default function EventCreateCard() {
    const [newEvent, setNewEvent] = useState({
        title: "",
        date: "",
        description: "",
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setNewEvent((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const addEvent = async () => {
        const tid = toast.loading("Creating event...");

        const res = await makeFetch("/api/event", {
            method: "POST",
            body: JSON.stringify(newEvent),
        });

        const data = await res.json();

        if (res.ok) {
            toast.success(data.message, {
                id: tid,
            });

            setNewEvent({
                title: "",
                date: "",
                description: "",
            });
        } else {
            data.errors.forEach((error: string) => {
                toast.error(error, {
                    id: tid,
                });
            });
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Create New Event</h2>
            <div className="space-y-2">
                <Input
                    name="title"
                    value={newEvent.title}
                    onChange={handleInputChange}
                    placeholder="Event Title"
                />
                <Input
                    type="date"
                    name="date"
                    value={newEvent.date}
                    onChange={handleInputChange}
                />
                <Textarea
                    name="description"
                    value={newEvent.description}
                    onChange={handleInputChange}
                    placeholder="Event Description"
                    rows={4}
                />
                <Button onClick={addEvent} className="w-full">
                    <Calendar className="mr-2 h-4 w-4" /> Add Event
                </Button>
            </div>
        </div>
    );
}
