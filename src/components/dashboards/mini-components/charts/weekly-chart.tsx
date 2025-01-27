"use client";

import type { DashboardAttendanceProp } from "@/types/dashboard";

// Importing components.
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import Loader from "@/components/loader";

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

export default function WeeklyChart({
    chartData,
}: {
    chartData: DashboardAttendanceProp[];
}) {
    if (!chartData) return <Loader />;

    return (
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
                    dataKey="day"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) =>
                        value[0].toUpperCase() + value.slice(1, 3)
                    }
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
