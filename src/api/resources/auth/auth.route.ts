import * as express from 'express';
import { AuthController } from '@auth/auth.controller';

const router = express.Router();

router.route('/login')
    .post(AuthController.login)

router.route('/register')
    .post(AuthController.register);

export default router;