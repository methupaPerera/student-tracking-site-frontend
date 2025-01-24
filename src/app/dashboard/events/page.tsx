"use client";

import type { EventProp } from "@/types/dashboard";

// Importing components.
import { Card } from "@/components/ui/card";
import EventCreateCard from "@/components/dashboards/mini-components/event-create-card";
import EventsCarousel from "@/components/dashboards/mini-components/events-carousel";

export const events: EventProp[] = [
    {
        event_id: "1",
        image: "/event.jpg",
        title: "Live Music Night",
        date: "2025-02-10",
        description:
            "Enjoy an evening of live performances by local bands and artists at the downtown amphitheater.",
    },
    {
        event_id: "2",
        image: "/event.jpg",
        title: "Tech Innovations 2025",
        date: "2025-03-05",
        description:
            "Explore the latest advancements in technology with keynote speakers, demos, and networking opportunities.",
    },
    {
        event_id: "3",
        image: "/event.jpg",
        title: "Art & Design Expo",
        date: "2025-02-18",
        description:
            "Discover stunning artworks and interact with creators at this year’s Art & Design Expo.",
    },
    {
        event_id: "4",
        image: "/event.jpg",
        title: "Gourmet Food Festival",
        date: "2025-04-02",
        description:
            "Taste delicious cuisines from around the world, prepared by top chefs and food vendors.",
    },
    {
        event_id: "5",
        image: "/event.jpg",
        title: "Annual Charity Run",
        date: "2025-03-25",
        description:
            "Join us for a 5K run to support local charities and promote a healthy lifestyle.",
    },
    {
        event_id: "6",
        image: "/event.jpg",
        title: "Spring Book Fair",
        date: "2025-05-15",
        description:
            "Browse a wide selection of books from authors and publishers, and attend special author readings.",
    },
    {
        event_id: "7",
        image: "/event.jpg",
        title: "Outdoor Movie Screening",
        date: "2025-06-10",
        description:
            "Relax under the stars and watch a classic movie on the big screen with friends and family.",
    },
    {
        event_id: "8",
        image: "/event.jpg",
        title: "Startup Pitch Night",
        date: "2025-02-28",
        description:
            "Watch budding entrepreneurs pitch their innovative ideas to investors and industry leaders.",
    },
];

export default function EventsPage() {
    return (
        <div className="py-4 pr-4 pl-2">
            <div className="mb-3 flex justify-between items-center">
                <h2 className="text-lg font-medium">Upcoming Events</h2>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                    <EventsCarousel
                        events={events}
                        eventsCount={events.length}
                    />
                </div>

                <Card className="col-span-1 self-start h-auto">
                    <EventCreateCard />
                </Card>

                <div className="col-span-3">
                    <h2 className="text-lg font-medium mb-3">Past Events</h2>
                    <EventsCarousel
                        events={events}
                        eventsCount={events.length}
                    />
                </div>
            </div>
        </div>
    );
}
