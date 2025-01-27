export type EventProp = {
    event_id: string;
    title: string;
    date: string;
    description: string;
};

export type DashboardProp = {
    events: EventProp[];
    totalStudents: number;
    totalTeachers: number;
    studentAttendance: string;
    weeklyAttendance: DashboardAttendanceProp[];
};

export type DashboardAttendanceProp = {
    day: string;
    present: number;
    absent: number;
};