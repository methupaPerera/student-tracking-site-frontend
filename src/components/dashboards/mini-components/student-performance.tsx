"use client";

import { useState } from "react";
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

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { Grade } from "@/types/student";

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
}: {
    performanceData: Grade[] | undefined;
}) {
    const [selectedTerm, setSelectedTerm] = useState("term1");

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
                    <div className="-mb-1 flex flex-row justify-between items-center">
                        <CardTitle>
                            Term {selectedTerm[selectedTerm.length - 1]}{" "}
                        </CardTitle>

                        <Select
                            onValueChange={setSelectedTerm}
                            defaultValue={selectedTerm}
                        >
                            <SelectTrigger className="h-6 w-[180px]">
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
                    <CardDescription>
                        Subject-wise marks for the selected term.
                    </CardDescription>
                </CardHeader>

                <CardContent>
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
                                ?.filter((item) => item.term === selectedTerm)
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
