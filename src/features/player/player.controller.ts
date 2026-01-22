import { Request, Response, NextFunction } from 'express';
import * as playerService from './player.service';
import { AppError } from '../../shared/errors/AppError';

export const toggleFavorite = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { trackId } = req.body;
        const userId = req.userId;

        if (!trackId) {
            throw new AppError('trackId is required', 400);
        }

        if (!userId) {
            throw new AppError('Unauthorized', 401);
        }

        const user = await playerService.toggleFavorite(userId, trackId);
        console.log(user, 'log del togglefavorite controller')

        res.json(user)
    } catch (error) {
        next(error)
    }
}

export const addHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId;
        const { type, deezerId, title, image } = req.body;

        if (!userId) throw new AppError('unauthorized', 401);

        const user = await playerService.addHistory(userId, {
            type,
            deezerId,
            title,
            image,
        });

        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}