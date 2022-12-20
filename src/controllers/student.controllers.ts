import { Request, Response } from 'express';
import { ForgotPasswordInput, RegisterStudentInput, ResetPasswordInput } from '../schemas/student.schema';
import { registerStudents, findStudentByEmail, findStudentByPhone } from '../services/student.services';
import { findStudentByUniqueId } from '../services/auth.services';
import * as argon from 'argon2';
import log from '../utils/logger';
import { v4 as uuidv4 } from 'uuid';

export const registerStudentController = async (req: Request<{}, {}, RegisterStudentInput>, res: Response) => {
    const body = req.body;
    const email = req.body.email;
    const telephone = req.body.telephone;

    try{
        const emailExists = await findStudentByEmail(email);
        if(emailExists){
            return res.status(400).send('Email already taken!');
        };

        const phoneExists = await findStudentByPhone(telephone);
        if(phoneExists){
            return res.status(400).send('Phone number already taken!');
        };
        
        const student = await registerStudents(body);
        //send mail with verificationCode
        res.status(200).send('Registration successful!');
    }catch(error: any){
        return res.status(400).send(`${error} : Registration failed`);
    }
    
}

export const forgotPasswordController = async (req: Request<{}, {}, ForgotPasswordInput>, res: Response) => {
    const email = req.body.email;
    const message = 'Please check your Email Address for Your Password Reset Code';

    const student = await findStudentByEmail(email);

    if(!student){
        log.debug('Student not found 😑');
        return res.status(401).send(message);
    }

    if(!student?.isVerified){
        return res.status(401).send('Please verify your student account');
    }

    const passwordResetCode = uuidv4();
    student.passwordResetCode = passwordResetCode;

    await student.save();
    //send password reset code to mail
    res.status(200).send(message);
}

export const resetPasswordController = async (req: Request<ResetPasswordInput['params'], {}, ResetPasswordInput['body']>, res: Response) => {
    const student_uniqueId = req.params.student_uniqueId;
    const passwordResetCode = req.params.passwordResetCode;
    const password = req.body.password;

    const student = await findStudentByUniqueId(student_uniqueId);

    if(!student || !student.passwordResetCode || student.passwordResetCode === passwordResetCode){
        return res.send('could not reset password 😑');
    }

    const hash = await argon.hash(password);
    student.password = hash;
    student.passwordResetCode = null;

    await student.save();

    res.status(200).send('Password reset successful')
}

// {
//     "firstname":"george",
//     "lastname": "okafo",
//     "email": "george2@gmail.com",
//     "telephone": 2348165916785,
//     "password": "Test12345",
//     "passwordConfirm": "Test12345",
//     "dateOfBirth": "04/10/1991"
// }