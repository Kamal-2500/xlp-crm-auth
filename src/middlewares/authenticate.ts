import { Request, NextFunction, Response } from "express";
import { UnauthorizedError } from "../utils";
import { JWTUtils } from "../utils/jwtUtils";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header("authorization");
    if (authHeader) {
        if (authHeader.startsWith("Bearer ")) {
            const token = authHeader.split(" ")[1];
            JWTUtils.verifyToken(token, (err, decode: any) => {
                if (err) {
                        throw new UnauthorizedError("Token is invalid or expired.");                
                }
                req.user = decode;
                next();
            });
        } else {
            throw new UnauthorizedError("Token is invalid.")
        }
    } else {
        throw new UnauthorizedError("No token provided.")
    }
}