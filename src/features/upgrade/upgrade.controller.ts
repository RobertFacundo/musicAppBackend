import { Request, Response, NextFunction } from 'express';
import * as UpgradeService from './upgrade.service';
import { AppError } from '../../shared/errors/AppError';

export const createChekoutSessionController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.userId;
        if (!userId) throw new AppError('userId not found', 404);

        const checkoutUrl = await UpgradeService.createCheckoutSession(userId);

        res.json({ checkoutUrl });
    } catch (error) {
        next(error)
    }
}  