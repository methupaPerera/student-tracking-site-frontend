"use client";

import type { EventProp } from "@/types/dashboard";

import { useState } from "react";
import { motion } from "motion/react";

// Importing components.
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import EditEventModal from "./event-edit-modal";

export default function CarouselCard({
    event,
    delay,
}: {
    event: EventProp;
    delay: number;
}) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleEdit = () => {
        setIsEditModalOpen(true);
    };

    const handleDelete = () => {
        // pass
    };

    const handleSave = (updatedEvent: EventProp) => {
        // pass
    };

    return (
        <>
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: delay, duration: 0.5 }}
            >
                <Card className="relative overflow-hidden bg-none">
                    <Image
                        src={event.image}
                        className="w-full object-cover h-80"
                        width={100}
                        height={100}
                        alt="event"
                    />

                    <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-transparent z-10"></div>

                    <div className="absolute z-20 top-0 p-4">
                        <p className="text-white font-medium line-clamp-1">
                            {event.title}
                        </p>
                        <p className="mb-1 text-gray-300 text-[12px] bg-gray-700 text-center py-0.5 rounded-full w-24 -ml-0.5 mt-1">
                            {event.date}
                        </p>
                        <p className="line-clamp-3 text-sm text-gray-400">
                            {event.description}
                        </p>
                    </div>

                    <div className="absolute z-50 bottom-2 right-2">
                        <Button
                            size="sm"
                            variant="secondary"
                            onClick={handleEdit}
                        >
                            View Event
                        </Button>
                        <Button
                            size="sm"
                            variant="destructive"
                            className="ml-1"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </div>
                </Card>
            </motion.div>

            <EditEventModal
                event={event}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleSave}
            />
        </>
    );
}
