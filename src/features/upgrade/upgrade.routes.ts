import express,{ Router} from "express";
import { createChekoutSessionController } from "./upgrade.controller";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";
import { webhook } from "./webhook.controller";

const router = Router();

router.post(
    '/create-checkout-session',
    authMiddleware,
    createChekoutSessionController
);

router.post('/webhook', express.raw({ type: 'application/json' }), webhook);

export default router;