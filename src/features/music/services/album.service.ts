import axios from "axios";
import { AppError } from "../../../shared/errors/AppError";

const DEEZER_API = "https://api.deezer.com";

export type DeezerAlbum = {
    id: number;
    title: string;
    cover_medium: string;
    release_date: string;
    artist: {
        id: number;
        name: string;
    };
    tracks: {
        data: {
            id: number;
            title: string;
            duration: number;
            preview: string;
            artist: {
                id: number;
                name: string;
            };
        }[];
    };
}

export const getAlbumById = async (albumId: string) => {
    try {
        const response = await axios.get(`${DEEZER_API}/album/${albumId}`);
        return response.data as DeezerAlbum;
    } catch (error) {
        throw new AppError('ALBUM NOT found', 404)
    }
}