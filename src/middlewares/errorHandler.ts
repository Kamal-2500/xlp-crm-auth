import { NextFunction, Request, Response } from "express";
import { BadRequestError, ConflictError, ForbiddenError, NotFoundError, UnauthorizedError } from "../utils";

export const errorHandler = (err: BadRequestError | ForbiddenError | NotFoundError | UnauthorizedError | ConflictError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = statusCode !=500 ? err.message : "Something went wrong";

    res.status(statusCode).json({
        message
    });
}