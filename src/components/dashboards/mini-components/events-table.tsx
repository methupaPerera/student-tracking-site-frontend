import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Link from "next/link";

// Sample data for recent events
const recentEvents = [
    {
        id: 1,
        event: "New user registration",
        user: {
            name: "Alice Johnson",
            email: "alice@example.com",
            avatar: "/placeholder.svg?height=32&width=32",
        },
        status: "success",
        timestamp: "2 minutes ago",
    },
    {
        id: 2,
        event: "Failed login attempt",
        user: {
            name: "Bob Smith",
            email: "bob@example.com",
            avatar: "/placeholder.svg?height=32&width=32",
        },
        status: "error",
        timestamp: "10 minutes ago",
    },
    {
        id: 3,
        event: "Product purchase",
        user: {
            name: "Carol Davis",
            email: "carol@example.com",
            avatar: "/placeholder.svg?height=32&width=32",
        },
        status: "success",
        timestamp: "1 hour ago",
    },
    {
        id: 4,
        event: "Password reset",
        user: {
            name: "David Wilson",
            email: "david@example.com",
            avatar: "/placeholder.svg?height=32&width=32",
        },
        status: "warning",
        timestamp: "2 hours ago",
    },
];

export function EventsTable() {
    return (
        <Card className="mt-4">
            <CardHeader className="py-4 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium">
                    Upcoming Events
                </CardTitle>
                <Link href="/dashboard/events">
                    <Button variant="link" size="sm">
                        View all
                    </Button>
                </Link>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-3">
                <Card>
                    <CardHeader className="pb-1.5 pt-0 flex flex-row items-center justify-between bg-gray-50">
                        <p className="text-base font-semibold text-gray-800">
                            Sample event
                        </p>
                        <p className="text-sm text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-full">
                            2024/02/05
                        </p>
                    </CardHeader>
                    <CardContent className="pt-1 pb-2 text-gray-600 text-sm">
                        <p className="line-clamp-2">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Aut, cum asperiores officia temporibus
                            accusantium veritatis facilis? Molestias magni omnis
                            dolorum.
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="py-0 flex flex-row items-center justify-between bg-gray-50">
                        <p className="text-base font-semibold text-gray-800">
                            Sample event
                        </p>
                        <p className="text-sm text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-full">
                            2024/02/05
                        </p>
                    </CardHeader>
                    <CardContent className="pt-1 pb-2 text-gray-600 text-sm">
                        <p className="line-clamp-2">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Aut, cum asperiores officia temporibus
                            accusantium veritatis facilis? Molestias magni omnis
                            dolorum.
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="py-0 flex flex-row items-center justify-between bg-gray-50">
                        <p className="text-base font-semibold text-gray-800">
                            Sample event
                        </p>
                        <p className="text-sm text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-full">
                            2024/02/05
                        </p>
                    </CardHeader>
                    <CardContent className="pt-1 pb-2 text-gray-600 text-sm">
                        <p className="line-clamp-2">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Aut, cum asperiores officia temporibus
                            accusantium veritatis facilis? Molestias magni omnis
                            dolorum.
                        </p>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}
