"use client";

import type { Teacher } from "@/types/teacher";

// Importing utilities.
import { useState, useEffect, use } from "react";
import makeFetch from "@/lib/makeFetch";

// Importing components.
import Loader from "@/components/loader";
import { Book, CalendarClock, Mail, Phone, User } from "lucide-react";

export default function TeacherInfoAdmin({
    params,
}: {
    params: Promise<{ teacherId: string }>;
}) {
    const { teacherId } = use(params);
    const [teacher, setTeacher] = useState<Teacher | null>(null);

    const fetchTeacher = async () => {
        const response = await makeFetch(`/api/teacher/${teacherId}`);
        const data = await response.json();

        setTeacher(data.teacher);
    };

    useEffect(() => {
        fetchTeacher();
    }, [teacherId]);

    if (!teacher) return <Loader />;

    return (
        <div className="bg-white mt-12 shadow-lg rounded-lg p-6 max-w-md mx-auto">
            <div className="flex items-center mb-6">
                <div className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center mr-4">
                    <User size={32} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-800">
                        {teacher.name}
                    </h2>
                    <p className="text-gray-600 text-sm">
                        In Charge Of: {teacher.inChargeOf}
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center">
                    <Mail className="mr-3 text-gray-500" size={20} />
                    <span>{teacher.email}</span>
                </div>

                <div className="flex items-center">
                    <Phone className="mr-3 text-gray-500" size={20} />
                    <span>{teacher.phone}</span>
                </div>

                <div className="mt-4">
                    <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                        <Book className="mr-2 text-gray-500" size={20} />
                        Subjects
                    </h3>
                    {teacher.subjects.map((subject, index) => (
                        <div key={index} className="mb-2 ml-7">
                            <p className="font-medium">{subject.subjectName}</p>
                            <p className="text-sm text-gray-600">
                                Classes: {subject.classes.join(", ")}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="flex items-center text-sm text-gray-500 mt-4">
                    <CalendarClock className="mr-2" size={16} />
                    Joined:{" "}
                    {new Date(teacher.createdAt).toLocaleDateString("en-CA")}
                </div>
            </div>
        </div>
    );
}
