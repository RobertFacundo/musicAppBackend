import { Request, Response, NextFunction } from 'express';
import { musicProviderService } from '../services/music.service';
import { AppError } from '../../../shared/errors/AppError';

class MusicController {
    async getHomeArtists(req: Request, res: Response, next: NextFunction) {
        try {
            const artists = await musicProviderService.getHomeArtists();

            console.log('[MusicController] artists:', artists.length);

            res.status(200).json(artists);
        } catch (error) {
            next(
                new AppError('Failed to fetch home artists', 502)
            )
        }
    }

    async getHomeGenres(req: Request, res: Response, next: NextFunction) {
        try {
            const genres = await musicProviderService.getHomeGenres();
            res.status(200).json(genres);
        } catch (error) {
            next(
                new AppError('Failed to fetch home genres', 502)
            )
        }
    }

    async getHomePlaylists(req: Request, res: Response, next: NextFunction) {
        try {
            const playlists = await musicProviderService.getHomePlaylists();
            res.status(200).json(playlists);
        } catch (error) {
            next(
                new AppError('Failed to fetch home playlist', 502)
            )
        }
    }
}

export const musicController = new MusicController();