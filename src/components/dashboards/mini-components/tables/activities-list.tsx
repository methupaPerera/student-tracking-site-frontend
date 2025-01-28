import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Activity } from "@/types/student";

export default function ActivitiesList({
    activities,
    onEdit,
    onDelete,
}: {
    activities: Activity[];
    onEdit: (activity: Activity) => void;
    onDelete: (activity: Activity) => void;
}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Activity Name</TableHead>
                    <TableHead className="w-[50px]">Description</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {activities.map((activity, index) => (
                    <TableRow key={index}>
                        <TableCell>{activity.activityName}</TableCell>
                        <TableCell>{activity.description}</TableCell>
                        <TableCell>{activity.date}</TableCell>
                        <TableCell>
                            <span
                                className={`capitalize inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                                    activity.activityType === "academic"
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-green-100 text-green-800"
                                }`}
                            >
                                {activity.activityType}
                            </span>
                        </TableCell>
                        <TableCell>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onEdit(activity)}
                                className="mr-2"
                            >
                                Edit
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => onDelete(activity)}
                            >
                                Delete
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
