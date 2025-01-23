import { cn } from "@/lib/utils";

import { DotPattern } from "@/components/ui/dot-pattern";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { Users } from "lucide-react";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdSsidChart } from "react-icons/md";

export default function AdminDashboardCards() {
    return (
        <>
            <Card className="relative overflow-hidden">
                <CardHeader className="relative z-50 pb-0 flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                        Total Students
                    </CardTitle>
                    <div className="bg-primary/20 p-2 rounded-full">
                        <Users size={24} className="text-primary" />
                    </div>
                </CardHeader>
                <CardContent className="z-50 relative pt-4 flex justify-between items-center">
                    <p className="text-3xl font-medium pb-0.5">1,254</p>
                    <Link href="/dashboard/users/students">
                        <Button size="sm">Manage</Button>
                    </Link>
                </CardContent>
                <DotPattern
                    width={20}
                    height={20}
                    x={-10}
                    y={10}
                    cx={1}
                    cy={1}
                    cr={1}
                    className={cn(
                        "[mask-image:linear-gradient(to_bottom_right,white,transparent)] "
                    )}
                />
            </Card>

            <Card className="relative overflow-hidden">
                <CardHeader className="relative z-50 pb-0 flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                        Total Teachers
                    </CardTitle>
                    <div className="bg-orange-500/20 p-2 rounded-full">
                        <FaChalkboardTeacher
                            size={24}
                            className="text-orange-500"
                        />
                    </div>
                </CardHeader>
                <CardContent className="z-50 relative pt-4 flex justify-between items-center">
                    <p className="text-3xl font-medium pb-0.5">160</p>
                    <Link href="/dashboard/users/teachers">
                        <Button
                            className="bg-orange-500 hover:bg-orange-500/90"
                            size="sm"
                        >
                            Manage
                        </Button>
                    </Link>
                </CardContent>
                <DotPattern
                    width={20}
                    height={20}
                    x={-10}
                    cx={1}
                    cy={10}
                    cr={1}
                    className={cn(
                        "[mask-image:linear-gradient(to_bottom_right,white,transparent)] "
                    )}
                />
            </Card>

            <Card className="relative overflow-hidden">
                <CardHeader className="relative z-50 pb-0 flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                        Student Attendance
                    </CardTitle>
                    <div className="bg-green-500/20 p-2 rounded-full">
                        <MdSsidChart size={24} className="text-green-500" />
                    </div>
                </CardHeader>
                <CardContent className="relative z-50 pt-2">
                    <p className="text-3xl font-medium pb-0.5">96%</p>
                    <p className="text-sm flex items-center gap-2 text-gray-500">
                        <span className="text-green-600 font-bold flex gap-1">
                            20% <FaArrowTrendUp className="mt-[2px]" />
                        </span>{" "}
                        than last month
                    </p>
                </CardContent>
                <DotPattern
                    width={20}
                    height={20}
                    x={-10}
                    y={10}
                    cx={1}
                    cy={1}
                    cr={1}
                    className={cn(
                        "[mask-image:linear-gradient(to_bottom_right,white,transparent)] "
                    )}
                />
            </Card>
        </>
    );
}
