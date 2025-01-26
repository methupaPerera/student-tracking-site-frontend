export type Student = {
    user_id: string;
    email: string;
    name: string;
    gender: "male" | "female";
    address: string;
    class: string;
    dateOfBirth: string;
    phone: string;
    guardianInfo: {
        guardianName: string;
        guardianContact: {
            email: string;
            phone: string;
        };
    };
    academicRecords: {
        grades: Grade[];
        attendance: Attendance;
    };
    activities: {
        activityName: string;
        description: string;
        date: string;
        activityType: "academic" | "extracurricular";
    }[];
    createdAt: string;
    updatedAt: string;
};

export type Attendance = {
    [month: string]: {
        date: string;
        status: "present" | "absent";
    }[];
};

export type Grade = {
    subject: string;
    marks: number;
    term: string;
    year: number;
};
