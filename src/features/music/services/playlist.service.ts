import axios from "axios";
import { AppError } from "../../../shared/errors/AppError";

const DEEZER_API = 'https://api.deezer.com';

export const getPlaylistById = async (playlistId: string) => {
    try {
        const response = await axios.get(`${DEEZER_API}/playlist/${playlistId}`);

        return response.data;
    } catch (error) {
        throw new AppError('Playlist not found', 404)
    }
}