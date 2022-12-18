import express from 'express';
import { loginAuthSchema } from '../schemas/student.schema';
import validateData from '../middlewares/validateData';
import { loginAuthController } from '../controllers/auth.controllers';

const authRouter = express.Router();

authRouter.post('/users/session', validateData(loginAuthSchema), loginAuthController);

export default authRouter;