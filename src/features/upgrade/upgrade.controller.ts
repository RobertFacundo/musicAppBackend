import { Request, Response, NextFunction } from 'express';
import * as UpgradeService from './upgrade.service';
import { AppError } from '../../shared/errors/AppError';
import { stripe } from '../../shared/config/stripe';

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
};

export const getSessionController = async (req: Request, res: Response, next: NextFunction) => {
      try {
    const sessionId = req.params.sessionId;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Devolver solo lo que te interesa
    return res.json({
      payment_status: session.payment_status,
      customer_email: session.customer_email,
      metadata: session.metadata,
    });
  } catch (error) {
    next(error);
  }
}