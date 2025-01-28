"use client";

import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GradesForm from "@/components/dashboards/mini-components/forms/grades-form";
import GradesList from "@/components/dashboards/mini-components/tables/grades-list";
import ActivitiesForm from "@/components/dashboards/mini-components/forms/activity-form";
import ActivitiesList from "@/components/dashboards/mini-components/tables/activities-list";
import { Activity, Grade, Student } from "@/types/student";
import makeFetch from "@/lib/makeFetch";
import { toast } from "sonner";

export default function StudentRecordsManager({
    params,
}: {
    params: Promise<{ studentId: string }>;
}) {
    const { studentId } = use(params);
    const [student, setStudent] = useState<Student | null>(null);

    // This area handles marks data...................................................................

    const [marksData, setMarksData] = useState<Grade[]>([]);
    const [editingGrade, setEditingGrade] = useState<Grade | null>(null);

    const saveGrades = async () => {
        const tid = toast.loading("Saving...");

        const res = await makeFetch(`/api/student/${studentId}/grades`, {
            method: "PUT",
            body: JSON.stringify({ grades: marksData }),
        });

        const data = await res.json();

        if (res.ok) {
            toast.success(data.message, { id: tid });
        } else {
            data.errors.forEach((error: string) =>
                toast.error(error, { id: tid })
            );
        }
    };

    const addGrade = (grade: Grade) => {
        const subjects = grade.subject.split(",").map((s) => s.trim());
        const marks = grade.marks.split(",").map((m) => m.trim());

        if (subjects.length !== marks.length) {
            toast.error("Number of subjects and marks must be the same.");
            return;
        }

        const gradesData = subjects.map((subject, index) => ({
            subject,
            marks: marks[index],
            term: grade.term,
            year: grade.year,
        }));

        setMarksData([...marksData, ...gradesData]);
    };

    const updateGrade = (updatedGrade: Grade) => {
        setMarksData(
            marksData.map((g) =>
                g.subject === updatedGrade.subject &&
                g.year === updatedGrade.year &&
                g.term === updatedGrade.term
                    ? updatedGrade
                    : g
            )
        );

        setEditingGrade(null);
    };

    const deleteGrade = (grade: Grade) => {
        setMarksData(
            marksData.filter(
                (g) =>
                    !(
                        g.subject === grade.subject &&
                        g.marks === grade.marks &&
                        g.year === grade.year &&
                        g.term === grade.term
                    )
            )
        );
    };

    // This area handles activities data...................................................................

    const [activities, setActivities] = useState<Activity[]>([]);
    const [editingActivity, setEditingActivity] = useState<Activity | null>(
        null
    );

    const saveActivities = async () => {
        const tid = toast.loading("Saving...");

        const res = await makeFetch(`/api/student/${studentId}/activities`, {
            method: "PUT",
            body: JSON.stringify({ activities: activities }),
        });

        const data = await res.json();

        if (res.ok) {
            toast.success(data.message, { id: tid });
        } else {
            data.errors.forEach((error: string) =>
                toast.error(error, { id: tid })
            );
        }
    };

    const addActivity = (activity: Activity) => {
        setActivities([...activities, activity]);
    };

    const updateActivity = (updatedActivity: Activity) => {
        setActivities(
            activities.map((a) =>
                a.activityName === updatedActivity.activityName
                    ? updatedActivity
                    : a
            )
        );

        setEditingActivity(null);
    };

    const deleteActivity = (activity: Activity) => {
        setActivities(
            activities.filter((a) => a.activityName !== activity.activityName)
        );
    };

    useEffect(() => {
        const fetchStudent = async () => {
            const res = await makeFetch(`/api/student/${studentId}`);
            const data: { student: Student } = await res.json();

            setStudent(data.student);
            setMarksData(data.student.academicRecords.grades);
            setActivities(data.student.activities);
        };

        fetchStudent();
    }, []);

    return (
        <Card className="border-none">
            <CardHeader>
                <CardTitle className="text-gray-800">Student Records Manager</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="grades">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="grades">Grades</TabsTrigger>
                        <TabsTrigger value="activities">Activities</TabsTrigger>
                    </TabsList>
                    <TabsContent value="grades">
                        <GradesForm
                            onSubmit={editingGrade ? updateGrade : addGrade}
                            initialData={editingGrade}
                        />

                        <GradesList
                            grades={marksData}
                            onEdit={(grade: Grade) => setEditingGrade(grade)}
                            onDelete={deleteGrade}
                        />
                        <div className="mt-2 flex justify-end">
                            <Button onClick={saveGrades}>Save Changes</Button>
                        </div>
                    </TabsContent>
                    <TabsContent value="activities">
                        <ActivitiesForm
                            onSubmit={
                                editingActivity ? updateActivity : addActivity
                            }
                            initialData={editingActivity}
                        />
                        <ActivitiesList
                            activities={activities}
                            onEdit={setEditingActivity}
                            onDelete={deleteActivity}
                        />
                        <div className="mt-2 flex justify-end">
                            <Button onClick={saveActivities}>
                                Save Changes
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
