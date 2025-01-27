"use client";

import type { Attendance } from "@/types/student";

// Importing components.
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
    absent: {
        label: "Absent",
        color: "#ef4444",
    },
    present: {
        label: "Present",
        color: "#22c55e",
    },
} satisfies ChartConfig;

export default function AttendanceChart({
    chartData,
    totalSchoolDays,
    totalPresentDays,
    attendancePercentage,
}: {
    chartData: Attendance;
    totalSchoolDays: number;
    totalPresentDays: number;
    attendancePercentage: number;
}) {
    const convertToChartData = (attendanceData: Attendance) => {
        return Object.keys(attendanceData).map((month) => {
            const totalPresent = attendanceData[month].filter(
                ({ status }) => status === "present"
            ).length;

            const totalAbsent = attendanceData[month].filter(
                ({ status }) => status === "absent"
            ).length;

            return {
                month: month[0].toUpperCase() + month.slice(1),
                present: totalPresent,
                absent: totalAbsent,
            };
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Student Attendance</CardTitle>
                <CardDescription>
                    Showing attendance information for the year.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={convertToChartData(chartData)}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        <Line
                            dataKey="present"
                            type="monotone"
                            stroke="var(--color-present)"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="absent"
                            type="monotone"
                            stroke="var(--color-absent)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>

            <CardFooter className="rounded-b-lg grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center border-r">
                    <p className="text-sm text-gray-500">Total School Days</p>
                    <span className="text-xl font-bold text-blue-600">
                        {totalSchoolDays}
                    </span>
                </div>
                <div className="flex flex-col items-center border-r">
                    <p className="text-sm text-gray-500">Days Present</p>
                    <span className="text-xl font-bold text-green-600">
                        {totalPresentDays}
                    </span>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-sm text-gray-500">Attendance Rate</p>
                    <span className="text-xl font-bold text-indigo-600">
                        {attendancePercentage.toFixed(2)}%
                    </span>
                </div>
            </CardFooter>
        </Card>
    );
}
