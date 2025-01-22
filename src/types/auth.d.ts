export type UserType = "admin" | "teacher" | "student";

export type LoginData = {
    userType: UserType;
    email: string;
    password: string;
};
