import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services";

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    login = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await this.authService.login(req.body.email, req.body.password);
            res.json(response);
        } catch (error) {
            next(error);
        }
    }

    register = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const reponse = await this.authService.register(req.body);
            res.status(201).json(reponse);
        } catch (error) {
            next(error);
        }
    }

    forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            
        } catch (error) {
            next(error);
        }
    }
}