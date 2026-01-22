import { Router } from "express";
import * as playerController from './player.controller'
import { authMiddleware } from "../../shared/middlewares/auth.middleware";

const router = Router();

router.post('/favorite', authMiddleware, playerController.toggleFavorite);
router.post('/history', authMiddleware, playerController.addHistory);

export default router;