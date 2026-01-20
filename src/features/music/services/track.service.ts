import axios from "axios";
import { AppError } from "../../../shared/errors/AppError";

const DEEZER_API = "https://api.deezer.com";

export type DeezerTrack = {
    id: number;
    title: string;
    duration: number;
    preview: string | null;
    artist: {
        id: number;
        name: string;
    };
    album: {
        id: number;
        title: string;
        cover_medium: string;
    };
};

export const getTrackById = async (trackId: string) => {
    try {
        const response = await axios.get(`${DEEZER_API}/track/${trackId}`);

        return response.data as DeezerTrack
    } catch (error) {
        throw new AppError('Track not found', 404);
    }
}