import { number, object, string, TypeOf } from 'zod';

export const registerStudentSchema = object({
    body: object({
        firstname: string({
            required_error: "Firstname is required"
        }).min(3, "minimum of three letters"),
        lastname: string({
            required_error: "Lastname is required"
        }).min(3, "minimum of three letters"),
        email: string({
            required_error: "Email Address is required"
        }).email('Must be an email address'),
        telephone: number({
            required_error: "Telephone number is required"
        }).min(11, "minimum of 11 numbers"),
        dateOfBirth: string({
            required_error: "Input date of birth"
        }),
        password: string({
            required_error: "Password is required"
        }).min(8, "minimum of 8 characters"),
        passwordConfirm: string({
            required_error: "Password confirmation is required"
        }),
    }).refine((data) => data.password === data.passwordConfirm, {
        message: "passwords does not match",
        path: ["passwordConfirm"]
    }),
});

export const loginAuthSchema = object({
    body: object({
        regNo: string({
            required_error: "Registration Number is required"
        }),
        password: string({
            required_error: "Password is required"
        }),
    }),
});

export const verifyStudentSchema = object({
    params: object({
        student_uniqueId: string(),
        verificationCode: string()
    })
});

export const forgotPasswordSchema = object({
    body: object({
        email: string({
            required_error: "Email is required"
        }).email('Please input your email address')
    })
});

export const resetPasswordSchema = object({
    params: object({
        student_uniqueId: string(),
        passwordResetCode: string()
    }),
    body: object({
        password: string({
            required_error: "Please enter a password"
        }).min(6, 'Minimum of 6 characters')
    })
});

export type RegisterStudentInput = TypeOf<typeof registerStudentSchema>['body'];
export type LoginAuthInput = TypeOf<typeof loginAuthSchema>['body'];
export type VerifyStudentInput = TypeOf<typeof verifyStudentSchema>['params'];
export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>['body'];
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;