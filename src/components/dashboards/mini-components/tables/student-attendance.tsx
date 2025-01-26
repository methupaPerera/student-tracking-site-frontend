"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Attendance } from "@/types/student";
import { cn } from "@/lib/utils";
import AttendanceChart from "../charts/attendance-chart";

const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
];

export default function StudentAttendance({
    attendanceData,
}: {
    attendanceData: Attendance | undefined;
}) {
    const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

    const [totalSchoolDays, setTotalSchoolDays] = useState(0);
    const [totalPresentDays, setTotalPresentDays] = useState(0);
    const [attendancePercentage, setAttendancePercentage] = useState(0);

    if (!attendanceData) return null;
    if (Object.keys(attendanceData).length === 0) {
        return (
            <span className="mt-6 text-center text-gray-400 col-span-2">
                No Data
            </span>
        );
    }

    useEffect(() => {
        const months = Object.keys(attendanceData);

        // Calculate total school days
        const totalDays = months.reduce(
            (total, key) => total + attendanceData[key].length,
            0
        );

        const presentDays = months.reduce(
            (total, month) =>
                total +
                attendanceData[month].reduce(
                    (total, { status }) =>
                        status === "present" ? total + 1 : total,
                    0
                ),
            0
        );

        const percentage = totalDays > 0 ? (presentDays / totalDays) * 100 : 0;

        setTotalSchoolDays(totalDays);
        setTotalPresentDays(presentDays);
        setAttendancePercentage(percentage);
    }, [attendanceData]);

    return (
        <>
            <div>
                <div className="flex justify-between items-center mb-4">
                    <Button
                        variant="link"
                        size="sm"
                        onClick={() => setCurrentMonthIndex((prev) => prev - 1)}
                        disabled={currentMonthIndex === 0}
                    >
                        <ChevronLeft className="h-4 w-4" /> Previous
                    </Button>

                    <h2 className="text-xl font-semibold capitalize">
                        {months[currentMonthIndex]}
                    </h2>

                    <Button
                        variant="link"
                        size="sm"
                        onClick={() => setCurrentMonthIndex((prev) => prev + 1)}
                        disabled={
                            currentMonthIndex ===
                            Object.keys(attendanceData).length - 1
                        }
                    >
                        Next <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>

                <MonthCard
                    monthData={attendanceData[months[currentMonthIndex]]}
                />
            </div>

            <AttendanceChart
                chartData={attendanceData}
                totalPresentDays={totalPresentDays}
                totalSchoolDays={totalSchoolDays}
                attendancePercentage={attendancePercentage}
            />
        </>
    );
}

function MonthCard({
    monthData,
}: {
    monthData: {
        date: string;
        status: "present" | "absent";
    }[];
}) {
    const [totalDays, setTotalDays] = useState(0);
    const [presentDays, setPresentDays] = useState(0);
    const [absentDays, setAbsentDays] = useState(0);

    useEffect(() => {
        if (!monthData || monthData.length === 0) return;

        const total = monthData.length;
        const present = monthData.filter(
            ({ status }) => status === "present"
        ).length;
        const absent = total - present;

        setTotalDays(total);
        setPresentDays(present);
        setAbsentDays(absent);
    }, [monthData]);

    console.log(monthData);

    return (
        <Card>
            <CardContent className="h-[365px] overflow-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="h-[180px]">
                        {monthData.map((record) => (
                            <TableRow key={record.date}>
                                <TableCell>{record.date}</TableCell>
                                <TableCell>
                                    <span
                                        className={`capitalize inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                                            record.status === "present"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {record.status.charAt(0).toUpperCase() +
                                            record.status.slice(1)}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>

            <CardContent className="py-0">
                <div className="border-t flex justify-between items-center text-sm text-gray-700 my-0 py-4">
                    <p>Total: {totalDays}</p>
                    <p className="text-green-500">Present: {presentDays}</p>
                    <p className="text-red-500">Absent: {absentDays}</p>
                </div>
            </CardContent>
        </Card>
    );
}
