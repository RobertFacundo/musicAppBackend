import { Request, Response, NextFunction } from "express";
import { MusicService } from "./artist.service";
import { AppError } from "../../shared/errors/AppError";

const musicService = new MusicService();

export const getArtist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Artist idis required' });
        }

        const data = await musicService.getArtistById(id);

        res.json(data);
    } catch (error) {
        next(
            new AppError('Failed to get Artist', 502)
        )
    }
}