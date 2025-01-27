"use client";

import type { DashboardProp } from "@/types/dashboard";

// Importing utilities.
import { useEffect, useState } from "react";
import makeFetch from "@/lib/makeFetch";

// Importing components.
import { EventsTable } from "./mini-components/events/events-table";
import AdminDashboardCards from "./mini-components/admin-dashboard-cards";
import AttendanceChart from "./mini-components/attendance-chart";
import { Button } from "../ui/button";
import Loader from "../loader";
import { MdOutlineFileDownload } from "react-icons/md";

export default function Admin() {
    const [dashboardData, setDashboardData] = useState<DashboardProp | null>(
        null
    );

    const fetchDashboardData = async () => {
        const res = await makeFetch("/api/admin/dashboard");
        const data = await res.json();

        setDashboardData(data.data);
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    console.log(dashboardData);

    if (!dashboardData) return <Loader />;

    return (
        <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <AdminDashboardCards
                    studentAttendance={dashboardData.studentAttendance}
                    totalStudents={dashboardData.totalStudents}
                    totalTeachers={dashboardData.totalTeachers}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AttendanceChart chartData={dashboardData.weeklyAttendance} />
                <EventsTable eventsData={dashboardData.events} />
            </div>

            <div className="mt-4 flex justify-end">
                <Button>
                    Download Report <MdOutlineFileDownload />
                </Button>
            </div>
        </div>
    );
}
