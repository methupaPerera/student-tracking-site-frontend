export type Teacher = {
    user_id: string;
    email: string;
    password: string;
    name: string;
    phone: string;
    inChargeOf: string;
    subjects: {
        subjectName: string;
        classes: string[];
    }[];
    createdAt: Date;
    updatedAt: Date;
};

export interface TeacherData {
    email: string;
    name: string;
    phone: string;
    inChargeOf: string;
    subjects: {
        subjectName: string;
        classes: string[];
    }[];
}
