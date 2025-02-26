import { Request, Response } from "express";

class Session {

    private static instance: Session;

    private constructor() { }

    static get(): Session {
        if (!Session.instance) Session.instance = new Session();
        return Session.instance;
    }
}