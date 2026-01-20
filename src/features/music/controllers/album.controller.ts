import { Request, Response, NextFunction } from 'express';
import { getAlbumById } from '../services/album.service';

export const getAlbum = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const album = await getAlbumById(id);
        return res.status(200).json(album);
    } catch (error) {
        next(error)
    }
}