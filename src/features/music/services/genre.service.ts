import axios from "axios";
import { AppError } from "../../../shared/errors/AppError";

const DEEZER_API = "https://api.deezer.com";

export type DeezerArtist = {
    id: number;
    name: string;
    picture_medium: string;
}

export type DeezerArtistResponse = {
    data: DeezerArtist[];
};

export const getArtistsByGenre = async (genreId: string) => {
    try {
        const response = await axios.get<DeezerArtistResponse>(
            `${DEEZER_API}/genre/${genreId}/artists`
        );
        return response.data;
    } catch (error) {
        throw new AppError('Genre artist not found', 404);
    }
}