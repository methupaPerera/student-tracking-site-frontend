"use client";

import type { Teacher } from "@/types/teacher";

// Importing utilities.
import makeFetch from "@/lib/makeFetch";
import { useEffect, useState } from "react";

// Importing components.
import TeachersTable from "@/components/dashboards/mini-components/tables/teacher-table";
import Loader from "@/components/loader";

export default function TeachersPage() {
    const [teacherData, setTeacherData] = useState<Teacher[] | null>(null);

    const fetchTeachers = async () => {
        const res = await makeFetch("/api/teacher");
        const data = await res.json();
        setTeacherData(data.teachers);
    };
    
    useEffect(() => {
        fetchTeachers();
    }, []);

    if (!teacherData) return <Loader />;

    return (
        <div className="p-4">
            <TeachersTable data={teacherData} />
        </div>
    );
}
