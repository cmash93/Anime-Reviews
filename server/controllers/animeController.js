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
    },

    async createReview(req, res) {
        const { rating, comment } = req.body

        const anime = await Anime.findById(req.params.id)

        if (anime) {
            const alreadyReviewed = anime.reviews.find(
                (r) => r.user.toString() === req.user._id.toString()
            )

    

            if (alreadyReviewed) {
                return res.status(400).json({ message: 'Cannot find any Anime with this Id, its a fake, gonna have to confiscate it, sorry'});
            }
            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                user: req.user_id,
            }

            anime.reviews.push(review)

            anime.numReviews = anime.reviews.length

            anime.rating =
                anime.reviews.reduce((acc, item) => item.rating + acc, 0) /
                anime.reviews.length

            await anime.save()
            res.status(201).json({ message: 'Glad you feel entitled enough that everyone needs to hear your opinion. Review added.'})
        } else {
            return res.status(400).json({ message: 'Anime not found'});

        }
    
    },

    

};