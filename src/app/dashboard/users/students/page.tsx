"use client";

import type { Student } from "@/types/student";

import { useEffect, useState } from "react";
import makeFetch from "@/lib/makeFetch";

import StudentsTable from "@/components/dashboards/mini-components/tables/student-table";
import Loader from "@/components/loader";

export default function StudentsPage() {
    const [studentData, setStudentData] = useState<Student[] | null>(null);

    useEffect(() => {
        const fetchStudents = async () => {
            const res = await makeFetch("/api/student");
            const data = await res.json();

            setStudentData(data.students);
        };

        fetchStudents();
    }, []);

    if (!studentData) return <Loader />;

    return (
        <div className="pr-4 py-4 pl-2">
            <StudentsTable data={studentData} />
        </div>
    );
}
