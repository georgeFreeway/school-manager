import express from 'express';
import { loginAuthSchema, verifyStudentSchema } from '../schemas/student.schema';
import validateData from '../middlewares/validateData';
import { loginAuthController, verifyStudentController } from '../controllers/auth.controllers';

const authRouter = express.Router();

authRouter.post('/students/session/login', validateData(loginAuthSchema), loginAuthController);
authRouter.post('/students/:student_uniqueId/:verificationCode', validateData(verifyStudentSchema), verifyStudentController);

export default authRouter;