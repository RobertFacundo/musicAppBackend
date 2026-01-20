import { Request, Response, NextFunction } from "express";
import * as playlistService from '../services/playlist.service';

export const getPlaylist = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const playlist = await playlistService.getPlaylistById(id);
        res.status(200).json(playlist);
    } catch (error) {
        next(error)
    }
}