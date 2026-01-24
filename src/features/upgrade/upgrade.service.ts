import { stripe } from "../../shared/config/stripe";

export const createCheckoutSession = async (userId: string) => {
    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Premium Plan',
                    },
                    unit_amount: 999,
                },
                quantity: 1,
            },
        ],
        success_url: 'https://music-app-f.vercel.app/checkout/success',
        cancel_url: 'https://music-app-f.vercel.app/upgrade',
        metadata: {
            userId
        }
    });

    return session.url;
}