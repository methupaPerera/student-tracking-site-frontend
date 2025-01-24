export type Student = {
    id: string;
    user_id: string;
    email: string;
    name: string;
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
        grades: {
            subject: string;
            grade: string;
            term: string;
        }[];
        attendance: {
            date: string;
            status: "Present" | "Absent" | "Late";
        }[];
    };
    extracurricularActivities: {
        activityName: string;
        position: string;
        year: number;
    }[];
    achievements: {
        title: string;
        description: string;
        date: string;
    }[];
    createdAt: string;
    updatedAt: string;
};
