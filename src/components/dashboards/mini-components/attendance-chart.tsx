"use client";

import type { DashboardAttendanceProp } from "@/types/dashboard";

// Importing components.
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WeeklyChart from "./charts/weekly-chart";

export default function AttendanceChart({
    chartData,
}: {
    chartData: DashboardAttendanceProp[];
}) {
    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <p>Attendance</p>
                    <div className="flex flex-col gap-1">
                        <p className="bg-yellow-100 text-xs text-yellow-600 rounded-full w-20 pt-1 text-center pb-[3px]">
                            Students
                        </p>
                        <p className="bg-gray-100 text-xs text-gray-600 rounded-full w-20 pt-1 text-center pb-[3px]">
                            This Week
                        </p>
                    </div>
                </CardTitle>
            </CardHeader>

            <CardContent>
                <WeeklyChart chartData={chartData} />
            </CardContent>
        </Card>
    );
}
