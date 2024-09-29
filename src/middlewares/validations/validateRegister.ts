import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../../utils";

export const validateRegister = [
    body("name")
        .notEmpty().withMessage("Name is required.")
        .bail().isString().withMessage("Name must be string.")
        .bail().isLength({ max: 255 }).withMessage("Name cannot exceed 255 characters."),

    body("email")
        .notEmpty().withMessage("Email is required.")
        .bail().isString().withMessage("Email must be string.")
        .bail().isEmail().withMessage("Invalid email format.")
        .bail().isLength({ max: 255 }).withMessage("Email cannot exceed 255 characters."),

    body("mobile_number")
        .optional()
        .isString().withMessage("Mobile number must be string.")
        .isLength({ max: 30 }).withMessage("Mobile number cannot exceed 255 characters."),

    body("role_id")
        .optional()
        .isString().withMessage("Role Id must be string.")
        .isLength({ max: 255 }).withMessage("Role ID cannot exceed 255 characters."),

    body("password")
        .notEmpty().withMessage("Password is required.")
        .isString().withMessage("Password must be string.")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long.")
        .isLength({ max: 255 }).withMessage("Password cannot exceed 255 characters."),

    body("avatar")
        .optional()
        .isString().withMessage('Avatar must be a string.')
        .isLength({ max: 255 }).withMessage("Avatar URL cannot exceed 255 characters."),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new BadRequestError(errors.array()[0].msg);
        }
        next();
    }
];