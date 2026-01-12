import { Request, Response, NextFunction } from 'express';
import * as AuthService from './auth.service';

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { username, email, password } = req.body;

        const result = await AuthService.register({
            username,
            email,
            password,
        })

        res.status(201).json(result)
    } catch (error) {
        next(error)
    }
};

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {
        const { email, password } = req.body;

        const result = await AuthService.login({
            email,
            password
        })

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
};

export const getMe = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const userId = req.userId;

        if (!userId) {
            throw new Error('Unauthorized')
        }

        const user = await AuthService.getMe(userId)

        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}