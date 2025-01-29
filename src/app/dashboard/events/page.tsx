"use client";

import type { EventProp } from "@/types/dashboard";

// Importing utilities.
import { useEffect, useState } from "react";
import makeFetch from "@/lib/makeFetch";

// Importing components.
import { Card } from "@/components/ui/card";
import EventCreateCard from "@/components/dashboards/mini-components/events/event-create-card";
import EventsCarousel from "@/components/dashboards/mini-components/carousel/events-carousel";
import Loader from "@/components/loader";

export default function EventsPage() {
    const [events, setEvents] = useState<EventProp[]>([]);

    useEffect(() => {
        makeFetch("/api/event")
            .then((res) => res.json())
            .then((data) => setEvents(data.events));
    }, []);

    return (
        <div className="p-4">
            <div className="mb-3 flex justify-between items-center">
                <h2 className="text-lg font-medium">Upcoming Events</h2>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-2/3">
                    {events.length > 0 ? (
                        <EventsCarousel
                            events={events}
                            eventsCount={events.length}
                        />
                    ) : (
                        <Loader />
                    )}
                </div>

                <Card className="w-full md:w-1/3 self-start h-auto">
                    <EventCreateCard />
                </Card>
            </div>

            <div>
                <h2 className="text-lg font-medium my-3">Past Events</h2>
                {events.length > 0 ? (
                    <EventsCarousel
                        events={events}
                        eventsCount={events.length}
                    />
                ) : (
                    <Loader />
                )}
            </div>
        </div>
    );
}
