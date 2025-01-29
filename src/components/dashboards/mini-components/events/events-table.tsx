"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EventProp } from "@/types/dashboard";
import Link from "next/link";

export function EventsTable({ eventsData }: { eventsData: EventProp[] }) {
    return (
        <Card className="mt-4">
            <CardHeader className="py-4 flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold">
                    Upcoming Events
                </CardTitle>
                <Link href="/dashboard/events">
                    <Button variant="link" size="sm">
                        View all
                    </Button>
                </Link>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-3">
                {eventsData.map((event) => (
                    <Card key={event.event_id} className="pb-2.5">
                        <CardHeader className="pt-3 pb-2 bg-gray-50">
                            <p className="-mb-1 text-base font-semibold text-gray-800">
                                {event.title}
                            </p>
                            <p className="-ml-1 w-fit text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-full">
                                {new Date(event.date).toLocaleDateString(
                                    "en-CA"
                                )}
                            </p>
                        </CardHeader>
                        <CardContent className="py-2 text-gray-600 text-sm">
                            <p className="line-clamp-2">{event.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </CardContent>
        </Card>
    );
}
