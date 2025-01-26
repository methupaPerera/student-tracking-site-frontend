"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import Loader from "@/components/loader";

const chartData = [
    { month: "Monday", present: 186, absent: 80 },
    { month: "Tuesday", present: 305, absent: 200 },
    { month: "Wednesday", present: 237, absent: 120 },
    { month: "Friday", present: 73, absent: 190 },
    { month: "Saturday", present: 209, absent: 130 },
    { month: "Sunday", present: 214, absent: 140 },
];

const chartConfig = {
    absent: {
        label: "Absent",
        color: "hsl(var(--chart-1))",
    },
    present: {
        label: "Present",
        color: "hsl(221.2 83.2% 53.3%)",
    },
} satisfies ChartConfig;

export default function WeeklyChart() {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <ChartContainer config={chartConfig}>
            <LineChart
                accessibilityLayer
                data={chartData}
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
    );
}
