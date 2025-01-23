"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    User,
    GraduationCap,
    Calendar,
    Award,
    Heart,
    Users,
    DollarSign,
    CheckCircle,
    MessageSquare,
    Settings,
} from "lucide-react";

const StudentDashboard = () => {
    const [student] = useState({
        personalInfo: {
            fullName: "Jane Smith",
            studentId: "ST123456",
            dateOfBirth: "1999-05-15",
            gender: "Female",
            address: "123 College Ave, Academic City, ST 12345",
            email: "jane.smith@university.edu",
            phone: "(555) 123-4567",
            nationality: "United States",
            emergencyContact: {
                name: "John Smith",
                relation: "Father",
                phone: "(555) 987-6543",
            },
        },
        academicInfo: {
            status: "Active",
            program: "Computer Science",
            major: "Software Engineering",
            minor: "Data Science",
            yearOfStudy: 3,
            gpa: 3.8,
            classRank: "Top 10%",
        },
    });

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
    }: {
        label: string;
        value: string | number;
    }) => (
        <div className="flex justify-between py-2 border-b">
            <span className="font-medium text-gray-600">{label}</span>
            <span>{value}</span>
        </div>
    );

    return (
        <div className="bg-white mx-auto p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">
                    {student.personalInfo.fullName}
                </h1>
                <div className="flex gap-4 text-gray-600">
                    <span>ID: {student.personalInfo.studentId}</span>
                    <span>•</span>
                    <span>{student.academicInfo.program}</span>
                    <span>•</span>
                    <span>Year {student.academicInfo.yearOfStudy}</span>
                </div>
            </div>

            {/* Main Content */}
            <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid grid-cols-5 gap-4 mb-8">
                    <TabsTrigger value="personal" className="flex gap-2">
                        <User size={16} />
                        Personal
                    </TabsTrigger>
                    <TabsTrigger value="academic" className="flex gap-2">
                        <GraduationCap size={16} />
                        Academic
                    </TabsTrigger>
                    <TabsTrigger value="attendance" className="flex gap-2">
                        <Calendar size={16} />
                        Attendance
                    </TabsTrigger>
                    <TabsTrigger value="activities" className="flex gap-2">
                        <Award size={16} />
                        Activities
                    </TabsTrigger>
                    <TabsTrigger value="health" className="flex gap-2">
                        <Heart size={16} />
                        Health
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="personal">
                    <div className="grid grid-cols-2 gap-6">
                        <TabContent title="Personal Information">
                            <InfoRow
                                label="Full Name"
                                value={student.personalInfo.fullName}
                            />
                            <InfoRow
                                label="Student ID"
                                value={student.personalInfo.studentId}
                            />
                            <InfoRow
                                label="Date of Birth"
                                value={student.personalInfo.dateOfBirth}
                            />
                            <InfoRow
                                label="Gender"
                                value={student.personalInfo.gender}
                            />
                            <InfoRow
                                label="Nationality"
                                value={student.personalInfo.nationality}
                            />
                        </TabContent>

                        <TabContent title="Contact Information">
                            <InfoRow
                                label="Email"
                                value={student.personalInfo.email}
                            />
                            <InfoRow
                                label="Phone"
                                value={student.personalInfo.phone}
                            />
                            <InfoRow
                                label="Address"
                                value={student.personalInfo.address}
                            />
                        </TabContent>

                        <TabContent title="Emergency Contact">
                            <InfoRow
                                label="Name"
                                value={
                                    student.personalInfo.emergencyContact.name
                                }
                            />
                            <InfoRow
                                label="Relationship"
                                value={
                                    student.personalInfo.emergencyContact
                                        .relation
                                }
                            />
                            <InfoRow
                                label="Phone"
                                value={
                                    student.personalInfo.emergencyContact.phone
                                }
                            />
                        </TabContent>
                    </div>
                </TabsContent>

                <TabsContent value="academic">
                    <div className="grid grid-cols-2 gap-6">
                        <TabContent title="Program Information">
                            <InfoRow
                                label="Status"
                                value={student.academicInfo.status}
                            />
                            <InfoRow
                                label="Program"
                                value={student.academicInfo.program}
                            />
                            <InfoRow
                                label="Major"
                                value={student.academicInfo.major}
                            />
                            <InfoRow
                                label="Minor"
                                value={student.academicInfo.minor}
                            />
                            <InfoRow
                                label="Year of Study"
                                value={student.academicInfo.yearOfStudy}
                            />
                        </TabContent>

                        <TabContent title="Academic Performance">
                            <InfoRow
                                label="GPA"
                                value={student.academicInfo.gpa}
                            />
                            <InfoRow
                                label="Class Rank"
                                value={student.academicInfo.classRank}
                            />
                        </TabContent>
                    </div>

                    <div className="mt-6">
                        <TabContent title="Current Courses">
                            <div className="grid grid-cols-3 gap-4">
                                {/* Placeholder for course cards */}
                                <Card className="p-4">
                                    <h3 className="font-semibold">
                                        Advanced Algorithms
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        CS401 • Mon/Wed 10:00 AM
                                    </p>
                                </Card>
                                <Card className="p-4">
                                    <h3 className="font-semibold">
                                        Database Systems
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        CS402 • Tue/Thu 2:00 PM
                                    </p>
                                </Card>
                                <Card className="p-4">
                                    <h3 className="font-semibold">
                                        Machine Learning
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        CS403 • Fri 1:00 PM
                                    </p>
                                </Card>
                            </div>
                        </TabContent>
                    </div>
                </TabsContent>

                {/* Additional tab contents would follow the same pattern */}
                <TabsContent value="attendance">
                    <TabContent title="Attendance Overview">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold">
                                    Overall Attendance Rate
                                </h3>
                                <span className="text-green-600 font-semibold">
                                    92%
                                </span>
                            </div>
                            {/* Placeholder for attendance charts/details */}
                        </div>
                    </TabContent>
                </TabsContent>

                <TabsContent value="activities">
                    <TabContent title="Extra-Curricular Activities">
                        <div className="space-y-4">
                            <h3 className="font-semibold">
                                Clubs & Organizations
                            </h3>
                            {/* Placeholder for activities */}
                        </div>
                    </TabContent>
                </TabsContent>

                <TabsContent value="health">
                    <TabContent title="Health Information">
                        <div className="space-y-4">
                            <h3 className="font-semibold">Health Records</h3>
                            {/* Placeholder for health information */}
                        </div>
                    </TabContent>
                </TabsContent>
            </Tabs>

            {/* Quick Actions */}
            <div className="fixed bottom-6 right-6 space-x-4">
                <Button variant="outline" className="bg-white">
                    Download Report
                </Button>
                <Button>Edit Profile</Button>
            </div>
        </div>
    );
};

export default StudentDashboard;
