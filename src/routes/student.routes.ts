import express from 'express';
import { registerStudentSchema } from '../schemas/student.schema';
import validateData from '../middlewares/validateData';
import { registerStudentController } from '../controllers/student.controllers';

const studentRouter = express.Router();

studentRouter.post('/students/register', validateData(registerStudentSchema), registerStudentController);

export default studentRouter;