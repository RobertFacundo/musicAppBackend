import { stripe } from "../../shared/config/stripe";
import { UserModel } from "../../shared/models/user.model";
import { Request, Response } from 'express';

export const webhook = async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'] as string;

    const event = stripe.webhooks.constructEvent(
        req.body as Buffer,
        sig!,
        process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as any;
        const userId = session.metadata.userId;

        await UserModel.findByIdAndUpdate(userId, {
            isPremium: true,
        });
    }

    res.json({ received: true })
}