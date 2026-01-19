import { Router } from "express";
import { musicController } from "./music.controller";
import { getArtist } from "./artist.controller";

const router = Router();

router.get('/home/artists', musicController.getHomeArtists);
router.get('/home/genres', musicController.getHomeGenres);
router.get('/home/playlists', musicController.getHomePlaylists);

router.get('/artist/:id', getArtist)

export default router;  