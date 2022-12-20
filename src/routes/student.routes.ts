import express from 'express';
import { forgotPasswordSchema, registerStudentSchema, resetPasswordSchema } from '../schemas/student.schema';
import validateData from '../middlewares/validateData';
import { registerStudentController, forgotPasswordController, resetPasswordController } from '../controllers/student.controllers';

const studentRouter = express.Router();

studentRouter.post('/students/register', validateData(registerStudentSchema), registerStudentController);
studentRouter.post('/students/forgot-password', validateData(forgotPasswordSchema), forgotPasswordController);
studentRouter.post('/students/reset-password', validateData(resetPasswordSchema), resetPasswordController);

export default studentRouter;