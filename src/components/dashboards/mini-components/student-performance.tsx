"use client";

import type { Grade } from "@/types/student";

// Importing utilities.
import { useEffect, useState } from "react";
import makeFetch from "@/lib/makeFetch";

// Importing components.
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

const chartData = [
    { term: "Term 1", marks: 186 },
    { term: "Term 2", marks: 305 },
    { term: "Term 3", marks: 237 },
];

const chartConfig = {
    marks: {
        label: "All Marks",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

export default function StudentPerformance({
    performanceData,
    studentId,
}: {
    performanceData: Grade[] | undefined;
    studentId: string;
}) {
    const [selectedTerm, setSelectedTerm] = useState("term1");
    const [places, setPlaces] = useState<{
        [key: string]: {
            rank: number;
            totalMarks: number;
        };
    }>({});

    const processChartData = (grades: Grade[] | undefined) => {
        if (!grades) return [];

        const termTotals: Record<string, number> = {};

        grades.forEach(({ term, marks, year }) => {
            if (year != new Date().getFullYear()) return;

            if (!termTotals[term]) {
                termTotals[term] = 0;
            }

            termTotals[term] += Number(marks);
        });

        const chartData = Object.entries(termTotals).map(([term, total]) => ({
            term: `Term ${term}`,
            marks: total,
        }));

        return chartData;
    };

    const chartData = processChartData(performanceData);

    useEffect(() => {
        const fetchPlaces = async () => {
            const res = await makeFetch(`/api/student/${studentId}/places`);
            const data = await res.json();
            setPlaces(data.rankings);
        };

        fetchPlaces();
    }, []);
    
    return (
        <div className="grid grid-cols-1 gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>Overall Performance</CardTitle>
                    <CardDescription>
                        Average scores across all terms.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <LineChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                left: 20,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="term"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Line
                                dataKey="marks"
                                type="linear"
                                stroke="var(--color-marks)"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card className="h-[300px] overflow-auto">
                <CardHeader>
                    <CardTitle className="text-gray-800">
                        Marks of Term {selectedTerm[selectedTerm.length - 1]}{" "}
                    </CardTitle>
                    <CardDescription className="mb-2">
                        Subject-wise marks for the selected term.
                    </CardDescription>

                    <div className="flex justify-between items-center pt-2">
                        <div className="font-medium bg-blue-100 px-3 py-1 rounded-full text-blue-600">
                            <span>
                                Total:{" "}
                                {
                                    chartData.filter(
                                        (item) =>
                                            item.term[item.term.length - 1] ===
                                            selectedTerm[
                                                selectedTerm.length - 1
                                            ]
                                    )[0]?.marks
                                }
                            </span>
                        </div>

                        <div className="font-medium text-red-600 bg-red-100 px-3 py-1 rounded-full">
                            Place:{" "}
                            {
                                places?.[
                                    "Term " +
                                        selectedTerm[selectedTerm.length - 1]
                                ]?.rank
                            }
                        </div>

                        <Select
                            onValueChange={setSelectedTerm}
                            defaultValue={selectedTerm}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select term" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem key="term1" value="term1">
                                    Term 1
                                </SelectItem>
                                <SelectItem key="term2" value="term2">
                                    Term 2
                                </SelectItem>
                                <SelectItem key="term3" value="term3">
                                    Term 3
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>

                <CardContent className="-mt-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Subject</TableHead>
                                <TableHead className="text-right">
                                    Marks
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {performanceData
                                ?.filter(
                                    (item) =>
                                        item.term ===
                                        selectedTerm[selectedTerm.length - 1]
                                )
                                .map((item) => (
                                    <TableRow key={item.subject}>
                                        <TableCell>{item.subject}</TableCell>
                                        <TableCell className="text-right">
                                            {item.marks}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
