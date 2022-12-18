import { Request, Response } from 'express';
import { RegisterStudentInput } from '../schemas/student.schema';
import { registerStudents, findStudentByEmail, findStudentByPhone } from '../services/student.services';

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

        const student = await registerStudents(body)
        .then(() => {
            res.status(200).send('registration successful');
        }).catch((error) => {
            console.log(error)
        });
        //sendmail
    }catch(error: any){
        return res.status(400).send(`${error} : Registration failed`);
    }
    
}