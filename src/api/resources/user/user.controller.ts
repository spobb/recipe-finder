import { UserRepository } from "@user/user.repository";
import { NextFunction, Request, Response } from "express";
import { AuthController } from "@auth/auth.controller";
import { User } from "./user.entity";

class UserController {
    private constructor() { }

    private static instance: UserController;

    static get(): UserController {
        if (!UserController.instance) UserController.instance = new UserController();
        return UserController.instance
    }

    async get(req: Request, res: Response): Promise<void> {
        const response = await UserRepository.findOneBy({ id: Number(req.params.id as string) });
        if (!response) res.status(404);
        res.locals.data = response;
        res.send(response);
    }

    async getLoggedIn(req: Request, res: Response): Promise<void> {
        res.locals.data = AuthController.getUser;
    }

    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await UserRepository.findAndCount();
            res.locals.data = response;
            res.send(response);
        } catch (err) {
            throw new Error('No users found!');
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {

            const user = UserRepository.create(req.body);
            const response = await UserRepository.save(user);
            res.locals.data = response;
            res.send(response);
        } catch (err) {
            throw err;
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const user = await UserRepository.findOneBy({ id: Number(req.params.id as string) })
            UserRepository.merge(user, req.body);
            const response = await UserRepository.save(user);
            res.locals.data = response;
            res.send(response);
        } catch (err) {
            res.send(err);
            throw err;
        }

    }

    async delete(req: Request, res: Response): Promise<void> {
        const response = await UserRepository.delete({ id: Number(req.params.id as string) })
        res.locals.data = response;
        res.send(response);

    }
}

const userController = UserController.get();

export { userController as UserController }