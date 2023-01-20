const { Anime } = require('../models');


module.exports = {

    async getAnime(req, res) {
        const allAnime = await Anime.find({})
        if (!allAnime) {
            return res.status(400).json({ message: 'Cannot find any Anime at all mannn' });
        }
        res.json(allAnime);
    },

    async getAnimeById(req, res) {
        const singleAnime = await Anime.findById(req.params.id)

        if (!singleAnime) {
            return res.status(400).json({ message: 'Cannot find any Anime with this Id, its a fake, gonna have to confiscate it, sorry'});
        }
        res.json(singleAnime);
    }
};