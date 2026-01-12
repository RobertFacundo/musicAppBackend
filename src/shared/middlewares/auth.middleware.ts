import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { AppError } from '../errors/AppError';

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new AppError('Missing authorization header', 401);
        }

        const [type, token] = authHeader.split(' ');

        if (type !== 'Bearer' || !token) {
            throw new AppError('Invalid authorization format', 401);
        }

        const payload = verifyToken(token);

        req.userId = payload.userId;

        next();
    } catch (error) {
        next(error)
    }
}