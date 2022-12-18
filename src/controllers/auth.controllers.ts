import { Request, Response } from 'express';
import { LoginAuthInput } from '../schemas/student.schema';

//first create a login controller
export const loginAuthController = (req: Request<{}, {}, LoginAuthInput>, res: Response) => {
    const body = req.body;

    
}