import axios from "axios";

const DEEZER_API_BASE = 'https://api.deezer.com';

export class MusicService {
    async getArtistById(artistId: string) {
        const [artistRes, tracksRes] = await Promise.all([
            axios.get(`${DEEZER_API_BASE}/artist/${artistId}`),
            axios.get(`${DEEZER_API_BASE}/artist/${artistId}/top?limit=5`)
        ]);

        const artist = artistRes.data;
        const tracks = tracksRes.data.data;

        return {
            artist: {
                id: artist.id,
                name: artist.name,
                image: artist.picture_xl,
                fans: artist.nb_fan,
                albums: artist.nb_album,
            },
            topTracks: tracks.map((track: any) => ({
                id: track.id,
                title: track.title,
                duration: track.duration,
                preview: track.preview,
                album: {
                    id: track.album.id,
                    title: track.album.title,
                    image: track.album.cover_medium,
                }
            }))
        };
    }

    async getArtistAlbums(artistId: string) {
        const res = await axios.get(`${DEEZER_API_BASE}/artist/${artistId}/albums`);
        const albums = res.data.data;

        return albums.map((album: any) => ({
            id: album.id,
            title: album.title,
            image: album.cover_medium,
            releaseDate: album.release_date,
            recordType: album.record_type
        }))
    }
}