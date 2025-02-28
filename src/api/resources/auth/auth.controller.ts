import { User } from "@user/user.entity";
import { UserRepository } from "@user/user.repository";
import { AppDataSource } from "@src/app.datasource";
import { Response } from "express";
import { AuthService } from "@auth/auth.service";
import { IRequest } from "@src/api/types/interfaces";

class AuthController {
    private constructor() { }

    private static instance: AuthController;

    static get(): AuthController {
        if (!AuthController.instance) AuthController.instance = new AuthController();
        return AuthController.instance
    }

    async register(req: IRequest, res: Response): Promise<void> {
        const repository = AppDataSource.getRepository(User);
        const user = new User(req.body);
        await repository.insert(user);

        const token = user.generateToken();
        res.locals.data = { user, token }
    }

    async login(req: IRequest, res: Response): Promise<void> {
        console.log(req.body);
        const user: User = await UserRepository.findOneBy({ email: req.body.email });
        if (!user) throw new Error('No account found with this email!');
        if (!user.comparePassword(req.body.password)) throw new Error('Password does not match!');
        AuthService.authenticateToken;
        res.locals.data = user;
        res.status(200).redirect('/');
    }

    async getUser(req: IRequest, res: Response): Promise<void> {
        res.locals.data = new User(req.user);
    }
}


const authController = AuthController.get();

export { authController as AuthController }