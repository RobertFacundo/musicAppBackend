import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { error } from 'node:console';

export const errorMiddleware = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    console.error('💥 UNEXPECTED ERROR', err);

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
}