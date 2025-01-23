"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useState } from "react";

export default function EventsPage() {
    const [newEvent, setNewEvent] = useState({
        title: "",
        date: "",
        location: "",
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

    const addEvent = () => {};

    return (
        <div className="p-4 grid grid-cols-3">
            <div className="col-span-2"></div>

            <Card className="col-span-1">
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
                        <Input
                            name="location"
                            value={newEvent.location}
                            onChange={handleInputChange}
                            placeholder="Location"
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
            </Card>
        </div>
    );
}
