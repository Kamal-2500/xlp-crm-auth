import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../../utils";

export const validateForgotPassword = [
    body("email")
        .notEmpty().withMessage("Email is required.")
        .bail().isString().withMessage("Email must be string.")
        .bail().isEmail().withMessage("Invalid email format.")
        .bail().isLength({ max: 255 }).withMessage("Email cannot exceed 255 characters."),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new BadRequestError(errors.array()[0].msg);
        }
        next();
    }
];