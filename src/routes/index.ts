import express from 'express';
import studentRouter from './student.routes';
import authRouter from './auth.routes';

const router = express.Router();

router.get('/healthcheck', (_, res) => res.send('going well'));
router.use(studentRouter);
router.use(authRouter);

export default router;
