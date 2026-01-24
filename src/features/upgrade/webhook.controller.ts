import { stripe } from "../../shared/config/stripe";
import { UserModel } from "../../shared/models/user.model";
import { Request, Response } from 'express';

export const webhook = async (req: Request, res: Response) => {
    console.log('Webhook hit!', {
        headers: req.headers,
        body: req.body,
    });

    const sig = req.headers['stripe-signature'] as string;
    console.log('Stripe signature:', sig);

    try {
        const event = stripe.webhooks.constructEvent(
            req.body as Buffer,
            sig!,
            process.env.STRIPE_WEBHOOK_SECRET!
        );

        console.log('Event type:', event.type);

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object as any;
            const userId = session.metadata.userId;

            console.log('Session completed', {
                userId,
                sessionId: session.id,
                paymentStatus: session.payment_status,
            });

            const updatedUser = await UserModel.findByIdAndUpdate(userId, {
                isPremium: true,
            });

            console.log('Updated user:', updatedUser);
        }

        return res.status(200).json({ received: true });
    } catch (err: any) {
        console.log('Webhook error:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
}