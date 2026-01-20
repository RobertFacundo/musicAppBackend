import { Request, Response, NextFunction } from 'express';
import { getTrackById } from '../services/track.service';

export const getTrack = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const track = await getTrackById(id);
        return res.status(200).json(track);
    } catch (error) {
        next(error)
    }
}