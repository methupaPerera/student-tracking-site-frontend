"use client";

import type { Student } from "@/types/student";

// Importing utilities.
import React from "react";
import makeFetch from "@/lib/makeFetch";
import { use, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Importing components.
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import StudentAttendance from "@/components/dashboards/mini-components/tables/student-attendance";
import StudentPerformance from "@/components/dashboards/mini-components/student-performance";
import Loader from "@/components/loader";
import { User, GraduationCap, Calendar } from "lucide-react";

export default function Students({
    params,
}: {
    params: Promise<{ studentId: string }>;
}) {
    const { studentId } = use(params);
    const [student, setStudent] = useState<Student | null>(null);

    const fetchStudent = async () => {
        const res = await makeFetch(`/api/student/${studentId}`);
        const data = await res.json();

        setStudent({ ...data.student });
    };

    useEffect(() => {
        fetchStudent();
    }, []);

    const TabContent = ({
        title,
        children,
    }: {
        title: string;
        children: React.ReactNode;
    }) => (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );

    const InfoRow = ({
        label,
        value,
        className,
    }: {
        label: string;
        value: string | undefined;
        className?: string;
    }) => (
        <div className="flex justify-between py-2 px-4 bg-muted my-2 rounded-xl">
            <span className="font-medium text-gray-600">{label}</span>
            <span className={cn(className)}>{value}</span>
        </div>
    );

    if (!student) return <Loader />;

    return (
        <div className="p-4">
            <div className="mb-4">
                <h1 className="text-2xl font-bold mb-2">{student?.name}</h1>
                <div className="flex gap-4 text-gray-600">
                    <span>ID: {student?.user_id}</span>
                    <span>•</span>
                    <span>Class: {student?.class}</span>
                </div>
            </div>

            <Tabs defaultValue="performance" className="w-full">
                <TabsList className="grid grid-cols-3 gap-2 mb-4">
                    <TabsTrigger value="personal" className="flex gap-2 px-2">
                        <User size={16} />
                        <span className="text-sm">Personal</span>
                    </TabsTrigger>

                    <TabsTrigger
                        value="performance"
                        className="flex gap-2 px-2"
                    >
                        <GraduationCap size={16} />
                        <span className="text-sm">Performance</span>
                    </TabsTrigger>

                    <TabsTrigger value="attendance" className="flex gap-2 px-2">
                        <Calendar size={16} />
                        <span className="text-sm">Attendance</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="personal">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TabContent title="Personal Information">
                            <InfoRow label="Full Name" value={student?.name} />
                            <InfoRow
                                label="Student ID"
                                value={student?.user_id}
                            />
                            <InfoRow
                                label="Date of Birth"
                                value={new Date(
                                    student?.dateOfBirth
                                ).toLocaleDateString("en-CA")}
                            />
                            <InfoRow
                                label="Gender"
                                value={student?.gender}
                                className="capitalize"
                            />
                        </TabContent>

                        <TabContent title="Contact Information">
                            <InfoRow label="Email" value={student?.email} />
                            <InfoRow label="Phone" value={student?.phone} />
                            <InfoRow label="Address" value={student?.address} />
                            <InfoRow
                                label="Guardian Contact"
                                value={
                                    student?.guardianInfo.guardianContact.phone
                                }
                            />
                        </TabContent>
                    </div>
                </TabsContent>

                <TabsContent value="performance">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <StudentPerformance
                            performanceData={student?.academicRecords.grades}
                            studentId={student?.user_id}
                        />

                        <div className="ml-24">
                            <h2 className="-ml-[92px] text-2xl font-semibold pt-2 pb-6">
                                Academic & Extra Curricular
                            </h2>

                            <div className="relative border-l-4 border-gray-300 pl-4">
                                {student?.activities.map((activity, index) => (
                                    <div key={index} className="mb-6 relative">
                                        <div className="absolute -left-[26px] top-2 w-4 h-4 bg-white border-4 border-blue-500 rounded-full">
                                            <span className="absolute -left-[88px] top-[-4px] text-sm text-gray-600">
                                                {activity.date}
                                            </span>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                {activity.activityName}
                                            </h3>
                                            <p className="mt-2 text-gray-700">
                                                {activity.description}
                                            </p>
                                            <span
                                                className={`capitalize inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                                                    activity.activityType ===
                                                    "academic"
                                                        ? "bg-blue-100 text-blue-800"
                                                        : "bg-green-100 text-green-800"
                                                }`}
                                            >
                                                {activity.activityType}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="attendance">
                    <div className="grid grid-cols-2 gap-4">
                        <StudentAttendance
                            attendanceData={student?.academicRecords.attendance}
                        />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
