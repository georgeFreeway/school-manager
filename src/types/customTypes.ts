export type StudentType = {
    id?: number | null;
    firstname: string;
    lastname: string;
    email: string;
    role?: string;
    telephone: number;
    regNo: string;
    dateOfBirth: string,
    password: string;
    verificationCode?: string;
    passwordResetCode?: string | null;
    isVerified?: boolean; 
}

export type StudentSession = {
    id: number;
    valid: boolean;
}