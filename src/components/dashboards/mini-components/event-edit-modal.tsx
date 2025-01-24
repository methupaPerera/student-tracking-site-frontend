"use client";

import type { EventProp } from "@/types/dashboard";

import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface EditEventModalProps {
    event: EventProp;
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedEvent: EventProp) => void;
}

export default function EditEventModal({
    event,
    isOpen,
    onClose,
    onSave,
}: EditEventModalProps) {
    const [editedEvent, setEditedEvent] = useState<EventProp>(event);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setEditedEvent((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(editedEvent);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Event</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-2 py-4">
                        <div>
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                value={editedEvent.title}
                                onChange={handleInputChange}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <Label htmlFor="date" className="text-right">
                                Date
                            </Label>
                            <Input
                                id="date"
                                name="date"
                                type="date"
                                value={editedEvent.date}
                                onChange={handleInputChange}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={editedEvent.description}
                                onChange={handleInputChange}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <Label htmlFor="image" className="text-right">
                                Image URL
                            </Label>
                            <Input
                                id="image"
                                name="image"
                                value={editedEvent.image}
                                onChange={handleInputChange}
                                className="w-full"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
