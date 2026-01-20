import express from 'express';
import authRoutes from './features/auth/auth.routes';
import musicRoutes from './features/music/routes/music.routes'
import { errorMiddleware } from './shared/middlewares/error.middleware';
import cors from 'cors'

const app = express();

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    })
)

app.use(express.json());

app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.use('/auth', authRoutes);
app.use('/api/music', musicRoutes);
app.use(errorMiddleware)

export default app;