import * as express from 'express';
import { UserController } from '@user/user.controller';

const router = express.Router();

router.route('/')
	.get(UserController.getAll)
	.post(UserController.create);

router.route('/:id')
	.get(UserController.get)
	.put(UserController.update)
	.delete(UserController.delete);

router.route('/profile')
	.get(UserController.getLoggedIn);

export default router;