import { User } from "@user/user.entity";
import { UserRepository } from "@user/user.repository";
import { AppDataSource } from "@src/app.datasource";
import { Request, Response } from "express";

class AuthController {
    private constructor() { }

    private static instance: AuthController;

    static get(): AuthController {
        if (!AuthController.instance) AuthController.instance = new AuthController();
        return AuthController.instance
    }

    async register(req: Request, res: Response): Promise<void> {
        const repository = AppDataSource.getRepository(User);
        const user = new User(req.body);
        await repository.insert(user);
        res.locals.data = { user }
    }

    async login(req: Request, res: Response): Promise<void | Error> {
        try {
            const user: User = await UserRepository.findOneBy({ email: req.params.email });
            if (!user) throw new Error('No account found with this email!');
            res.locals.data = user;
        } catch (err) {
            return err as Error;
        }
    }
}


const authController = AuthController.get();

export { authController as AuthController }