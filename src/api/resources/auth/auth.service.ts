import { Response } from "express";
import { IRequest } from "@interfaces";
import * as jwt from 'jsonwebtoken';

class AuthService {
    private static instance: AuthService;

    private constructor() { }

    static get(): AuthService {
        if (!AuthService.instance) AuthService.instance = new AuthService();
        return AuthService.instance;
    }

    async authenticateToken(req: IRequest, res: Response) {
        const header = req.headers['authorization']
        const token = header;
        if (!token) return res.status(401)

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(403);
            req.user = user;
        })
    }
}

const authService = AuthService.get();

export { authService as AuthService };