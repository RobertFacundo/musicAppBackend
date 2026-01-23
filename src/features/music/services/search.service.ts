import axios from "axios";

const DEEZER_API_BASE = 'https://api.deezer.com';

export type SearchArtist = {
    id: number;
    name: string;
    image: string;
};

export type SearchTrack = {
    id: number;
    title: string;
    artist: string;
    image: string;
};

export type SearchAlbum = {
    id: number;
    title: string;
    artist: string;
    image: string;
};

export type SearchPlaylist = {
    id: number;
    title: string;
    image: string;
};

export type SearchResult = {
    artists: SearchArtist[];
    tracks: SearchTrack[];
    albums: SearchAlbum[];
    playlists: SearchPlaylist[];
};

class SearchService {
    async search(query: string): Promise<SearchResult> {
        const [artists, tracks, albums, playlists] = await Promise.all([
            axios.get(`${DEEZER_API_BASE}/search/artist?q=${query}&limit=3`),
            axios.get(`${DEEZER_API_BASE}/search/track?q=${query}&limit=5`),
            axios.get(`${DEEZER_API_BASE}/search/album?q=${query}&limit=3`),
            axios.get(`${DEEZER_API_BASE}/search/playlist?q=${query}&limit=3`)
        ]);

        return {
            artists: artists.data.data.map((a: any) => ({
                id: a.id,
                name: a.name,
                image: a.picture_medium
            })),
            tracks: tracks.data.data.map((t: any) => ({
                id: t.id,
                title: t.title,
                artist: t.artist.name,
                image: t.album.cover_medium
            })),
            albums: albums.data.data.map((a: any) => ({
                id: a.id,
                title: a.title,
                artist: a.artist.name,
                image: a.cover_medium
            })),
            playlists: playlists.data.data.map((p: any) => ({
                id: p.id,
                title: p.title,
                image: p.picture_medium
            }))
        };
    }
}
export const searchService = new SearchService();