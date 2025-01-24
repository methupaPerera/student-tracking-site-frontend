export type Teacher = {
    user_id: string;
    email: string;
    password: string;
    name: string;
    phone: string;
    subjects: {
        subjectName: string;
        gradeLevels: number[];
    }[];
    createdAt: Date;
    updatedAt: Date;
};
