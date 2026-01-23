import { Router } from "express";
import { musicController } from "../controllers/music.controller";
import { getArtist, getArtistAlbums } from "../controllers/artist.controller";
import { getPlaylist } from "../controllers/playlist.controller";
import { getArtistsByGenreController } from "../controllers/genre.controller";
import { getTrack } from "../controllers/track.controller";
import { getAlbum } from "../controllers/album.controller";
import { searchController } from "../controllers/search.controller";

const router = Router();

router.get('/home/artists', musicController.getHomeArtists);
router.get('/home/genres', musicController.getHomeGenres);
router.get('/home/playlists', musicController.getHomePlaylists);

router.get('/artist/:id', getArtist);
router.get('/artist/:id/albums', getArtistAlbums);

router.get('/playlist/:id', getPlaylist);

router.get('/:genreId/artists', getArtistsByGenreController);

router.get('/track/:id', getTrack);

router.get('/album/:id', getAlbum)

router.get('/search', searchController.search)

export default router;  