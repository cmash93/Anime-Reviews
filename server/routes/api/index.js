const router = require('express').Router();
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const animeRoutes = require('./animeRoutes')

router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/watchlist', animeRoutes);

module.exports = router;