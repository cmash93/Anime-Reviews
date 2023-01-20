const router = require('express').Router();
const { getAnime, getAnimeById } = require('../../controllers/animeController');

router.route('/')
.get(getAnime);

router.route('/:animeId')
.get(getAnimeById);

module.exports = router;