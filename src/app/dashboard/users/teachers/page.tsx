import TeachersTable from "@/components/dashboards/mini-components/tables/teacher-table";
import type { Teacher } from "@/types/teacher";

export const teacherData: Teacher[] = [
    {
        user_id: "T12345",
        email: "alice.johnson@example.com",
        password: "hashedPassword123",
        name: "Alice Johnson",
        phone: "123-456-7890",
        subjects: [
            {
                subjectName: "Mathematics",
                gradeLevels: [6, 7, 8],
            },
            {
                subjectName: "Physics",
                gradeLevels: [9, 10],
            },
        ],
        createdAt: new Date("2023-08-01T08:30:00Z"),
        updatedAt: new Date("2025-01-20T12:45:00Z"),
    },
    {
        user_id: "T12346",
        email: "robert.smith@example.com",
        password: "hashedPassword456",
        name: "Robert Smith",
        phone: "987-654-3210",
        subjects: [
            {
                subjectName: "English Literature",
                gradeLevels: [10, 11, 12],
            },
        ],
        createdAt: new Date("2023-09-01T10:00:00Z"),
        updatedAt: new Date("2025-01-21T14:30:00Z"),
    },
    {
        user_id: "T12347",
        email: "emma.brown@example.com",
        password: "hashedPassword789",
        name: "Emma Brown",
        phone: "321-654-9870",
        subjects: [
            {
                subjectName: "Biology",
                gradeLevels: [8, 9],
            },
            {
                subjectName: "Chemistry",
                gradeLevels: [10, 11],
            },
        ],
        createdAt: new Date("2023-07-15T09:00:00Z"),
        updatedAt: new Date("2025-01-22T16:00:00Z"),
    },
    {
        user_id: "T12348",
        email: "michael.williams@example.com",
        password: "hashedPassword321",
        name: "Michael Williams",
        phone: "456-789-1230",
        subjects: [
            {
                subjectName: "History",
                gradeLevels: [6, 7],
            },
            {
                subjectName: "Geography",
                gradeLevels: [8, 9],
            },
        ],
        createdAt: new Date("2023-06-01T07:45:00Z"),
        updatedAt: new Date("2025-01-23T10:00:00Z"),
    },
];

export default function TeachersPage() {
    return (
        <div className="p-4">
            <TeachersTable data={teacherData} />
        </div>
    );
}
