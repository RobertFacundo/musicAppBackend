import express from 'express';
import authRoutes from './features/auth/auth.routes';
import { errorMiddleware } from './shared/middlewares/error.middleware';

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.use('/auth', authRoutes);
app.use(errorMiddleware)

export default app;