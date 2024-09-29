import { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from '../utils';

export const authorize = (requiredRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;

        if (!user || !user.role) {
            throw new ForbiddenError("No user role provided");
        }

        if (!requiredRoles.includes(user.role)) {
            throw new ForbiddenError("Insufficient role.")
        }

        next();
    };
};
