import axios from 'axios';

const DEEZER_API_BASE = 'https://api.deezer.com';

export type HomeArtist = {
    id: number;
    name: string;
    image: string;
};

export type HomeGenre = {
    id: number;
    name: string;
    image: string
};

export type HomePlaylist = {
    id: number;
    title: string;
    image: string;
}

class MusicProviderService {
    async getHomeArtists(): Promise<HomeArtist[]> {
        const artistId = [27, 52, 92, 35];

        const response = await Promise.all(
            artistId.map(id => axios.get(`${DEEZER_API_BASE}/artist/${id}`))
        );

        return response.map(res => ({
            id: res.data.id,
            name: res.data.name,
            image: res.data.picture_medium
        }))
    }

    async getHomeGenres(): Promise<HomeGenre[]> {
        const { data } = await axios.get(`${DEEZER_API_BASE}/genre`);

        return data.data
            .filter((genre: any) => genre.id !== 0)
            .slice(6, 10)
            .map((genre: any) => ({
                id: genre.id,
                name: genre.name,
                image: genre.picture_medium
            }));
    }

    async getHomePlaylists(): Promise<HomePlaylist[]> {
        const playlistIds = [982609217, 1111141961, 12643878043, 3155776842,];

        const response = await Promise.allSettled(
            playlistIds.map(id => axios.get(`${DEEZER_API_BASE}/playlist/${id}`))
        );

        return response
            .filter(r => r.status === "fulfilled")
            .map((r: any) => ({
                id: r.value.data.id,
                title: r.value.data.title,
                image: r.value.data.picture_medium,
            }));
    }
}

export const musicProviderService = new MusicProviderService();