import { Request, Response } from 'express';
import { LoginAuthInput, VerifyStudentInput } from '../schemas/student.schema';
import { findStudentByRegNo, findStudentByUniqueId, signAccessToken } from '../services/auth.services';
import * as argon from 'argon2';

export const loginAuthController = async (req: Request<{}, {}, LoginAuthInput>, res: Response) => {
    const body = req.body;

    const student = await findStudentByRegNo(body.regNo);
    if(!student){
        return res.status(404).send('No student found. Please check your details and try again');
    };

    if(student){
        const comparePassword = await argon.verify(student.password, body.password);
        if(comparePassword){
            const payload = student.toJSON();
            const accessToken = signAccessToken(payload);
            return res.status(200).json({accessToken, student});
        }else{
            return res.status(400).send('incorrect password');
        }
    }
}

export const verifyStudentController = async (req: Request<VerifyStudentInput, {}, {}>, res: Response) => {
    const id = req.params.student_uniqueId;
    const verificationCode = req.params.verificationCode;

    const student = await findStudentByUniqueId(id);
    if(!student){
        return res.status(401).send('could not verify student');
    }

    if(student.isVerified){
        return res.status(200).send('you are already verified 😅');
    }

    if(student.verificationCode === verificationCode){
        student.isVerified = true;
        await student.save();

        return res.status(200).send('verification successful 😅');
    }
}
