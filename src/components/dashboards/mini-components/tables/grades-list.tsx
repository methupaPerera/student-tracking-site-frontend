import type { Grade } from "@/types/student";

// Importing components.
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function GradesList({ grades, onEdit, onDelete }: {
    grades: Grade[];
    onEdit: (grade: Grade) => void;
    onDelete: (grade: Grade) => void;
}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Marks</TableHead>
                    <TableHead>Term</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {grades.map((grade, index) => (
                    <TableRow key={index}>
                        <TableCell>{grade.subject}</TableCell>
                        <TableCell>{grade.marks}</TableCell>
                        <TableCell>{grade.term}</TableCell>
                        <TableCell>{grade.year}</TableCell>
                        <TableCell>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onEdit(grade)}
                                className="mr-2"
                            >
                                Edit
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => onDelete(grade)}
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
