"use client";

import TeachersTable from "@/components/dashboards/mini-components/tables/teacher-table";
import Loader from "@/components/loader";
import makeFetch from "@/lib/makeFetch";
import type { Teacher } from "@/types/teacher";
import { useEffect, useState } from "react";

export default function TeachersPage() {
    const [teacherData, setTeacherData] = useState<Teacher[] | null>(null);

    useEffect(() => {
        const fetchTeachers = async () => {
            const res = await makeFetch("/api/teacher");
            const data = await res.json();
            setTeacherData(data.teachers);
        };

        fetchTeachers();
    }, []);

    if (!teacherData) return <Loader />;

    return (
        <div className="p-4">
            <TeachersTable data={teacherData} />
        </div>
    );
}
