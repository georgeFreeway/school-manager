export type StudentType = {
    id?: number;
    firstname: string;
    lastname: string;
    email: string;
    role?: string;
    telephone: number;
    regNo?: string;
    dateOfBirth: string,
    password: string;
    verificationCode?: string;
    passwordResetCode?: string | null;
    isVerified?: boolean; 
    student_uniqueId?: string;
}