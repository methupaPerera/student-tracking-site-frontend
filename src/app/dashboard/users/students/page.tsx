import StudentsTable from "@/components/dashboards/mini-components/tables/student-table";
import type { Student } from "@/types/student";

const studentData: Student[] = [
    {
        id: "1",
        user_id: "U12345",
        email: "john.doe@example.com",
        name: "John Doe",
        class: "11B",
        dateOfBirth: "2008-05-14",
        phone: "123-456-7890",
        guardianInfo: {
            guardianName: "Jane Doe",
            guardianContact: {
                email: "jane.doe@example.com",
                phone: "987-654-3210",
            },
        },
        academicRecords: {
            grades: [
                { subject: "Math", grade: "A", term: "Term 1" },
                { subject: "Science", grade: "B+", term: "Term 1" },
                { subject: "English", grade: "A-", term: "Term 1" },
            ],
            attendance: [
                { date: "2025-01-10", status: "Present" },
                { date: "2025-01-11", status: "Late" },
                { date: "2025-01-12", status: "Absent" },
            ],
        },
        extracurricularActivities: [
            {
                activityName: "Basketball",
                position: "Team Captain",
                year: 2024,
            },
            { activityName: "Debate Club", position: "Member", year: 2023 },
        ],
        achievements: [
            {
                title: "Math Olympiad Winner",
                description: "Won the regional Math Olympiad competition.",
                date: "2024-11-20",
            },
            {
                title: "Science Fair Participant",
                description: "Presented a project on renewable energy.",
                date: "2023-05-15",
            },
        ],
        createdAt: "2023-08-01T08:30:00Z",
        updatedAt: "2025-01-20T12:45:00Z",
    },
    {
        id: "2",
        user_id: "U12346",
        email: "emily.smith@example.com",
        name: "Emily Smith",
        class: "12A",
        dateOfBirth: "2009-03-22",
        phone: "123-987-6543",
        guardianInfo: {
            guardianName: "Robert Smith",
            guardianContact: {
                email: "robert.smith@example.com",
                phone: "321-456-7890",
            },
        },
        academicRecords: {
            grades: [
                { subject: "Math", grade: "B", term: "Term 1" },
                { subject: "Science", grade: "A", term: "Term 1" },
                { subject: "English", grade: "B+", term: "Term 1" },
            ],
            attendance: [
                { date: "2025-01-10", status: "Present" },
                { date: "2025-01-11", status: "Present" },
                { date: "2025-01-12", status: "Late" },
            ],
        },
        extracurricularActivities: [
            { activityName: "Art Club", position: "President", year: 2024 },
            { activityName: "Drama Club", position: "Lead Actor", year: 2023 },
        ],
        achievements: [
            {
                title: "Art Competition Winner",
                description: "Won the city-level painting competition.",
                date: "2024-10-05",
            },
            {
                title: "Best Performer",
                description: "Received Best Performer award in drama club.",
                date: "2023-12-15",
            },
        ],
        createdAt: "2023-09-01T10:00:00Z",
        updatedAt: "2025-01-21T14:30:00Z",
    },
    {
        id: "3",
        user_id: "U12347",
        email: "michael.brown@example.com",
        name: "Michael Brown",
        class: "11B",
        dateOfBirth: "2007-11-05",
        phone: "456-123-7890",
        guardianInfo: {
            guardianName: "Laura Brown",
            guardianContact: {
                email: "laura.brown@example.com",
                phone: "654-987-1234",
            },
        },
        academicRecords: {
            grades: [
                { subject: "Math", grade: "A-", term: "Term 1" },
                { subject: "Science", grade: "A", term: "Term 1" },
                { subject: "English", grade: "B", term: "Term 1" },
            ],
            attendance: [
                { date: "2025-01-10", status: "Absent" },
                { date: "2025-01-11", status: "Present" },
                { date: "2025-01-12", status: "Present" },
            ],
        },
        extracurricularActivities: [
            { activityName: "Robotics Club", position: "Member", year: 2024 },
            { activityName: "Science Club", position: "Secretary", year: 2023 },
        ],
        achievements: [
            {
                title: "Robotics Championship",
                description:
                    "Part of the team that won the regional robotics championship.",
                date: "2024-06-18",
            },
        ],
        createdAt: "2023-07-15T09:00:00Z",
        updatedAt: "2025-01-22T16:00:00Z",
    },
];

export default function StudentsPage() {
    return (
        <div className="pr-4 py-4 pl-2">
            <StudentsTable data={studentData} />
        </div>
    );
}
