import express,{ Router} from "express";
import { createChekoutSessionController, getSessionController } from "./upgrade.controller";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";

const router = Router();

router.post(
    '/create-checkout-session',
    authMiddleware,
    createChekoutSessionController
);

router.get('/session/:sessionId', authMiddleware, getSessionController)

export default router;