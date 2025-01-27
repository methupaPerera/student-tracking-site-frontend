import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EventProp } from "@/types/dashboard";
import Link from "next/link";

export function EventsTable({ eventsData }: { eventsData: EventProp[] }) {
    return (
        <Card className="mt-4">
            <CardHeader className="py-4 flex flex-row items-center justify-between">
                <CardTitle className="text-base font-medium">
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
                    <Card key={event.event_id}>
                        <CardHeader className="py-1 flex flex-row items-center justify-between bg-gray-50">
                            <p className="text-base font-semibold text-gray-800">
                                {event.title}
                            </p>
                            <p className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-full">
                                {new Date(event.date).toLocaleDateString(
                                    "en-CA"
                                )}
                            </p>
                        </CardHeader>
                        <CardContent className="pt-1 pb-2 text-gray-600 text-sm">
                            <p className="line-clamp-2">{event.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </CardContent>
        </Card>
    );
}
