"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useState } from "react";
import WeeklyChart from "./charts/weekly-chart";

export default function AttendanceChart() {
    const [selectedChart, setSelectedChart] = useState<string>("weekly");

    return (
        <Card className="mt-4">
            <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle className="flex flex-col">
                    <p>Attendance</p>
                    <p className="mt-1 border bg-yellow-500 text-[12px] text-white rounded-full w-20 pt-1 text-center pb-[3px]">
                        Students
                    </p>
                </CardTitle>

                <Select
                    defaultValue="weekly"
                    onValueChange={(value: string) => setSelectedChart(value)}
                >
                    <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Weekly" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="6-months">6 Months</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>

            <CardContent>
                {selectedChart === "weekly" && <WeeklyChart />}
            </CardContent>
        </Card>
    );
}
