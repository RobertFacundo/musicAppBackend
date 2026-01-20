import { Request, Response, NextFunction } from "express";
import { getArtistsByGenre } from "../services/genre.service";

export const getArtistsByGenreController = async (req: Request, res: Response, next: NextFunction) => {
    const { genreId } = req.params;

    try {
        const artists = await getArtistsByGenre(genreId);
        return res.status(200).json(artists);
    } catch (error) {
        next(error);
    }
}