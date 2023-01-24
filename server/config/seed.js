const db = require('../config/connection');
const { Anime } = require('../models');


db.once('open', async () => {

  const technologies = await Anime.insertMany([{ description: 'This cool anime', animeId: 1234, image: 'some link', link: 'another link', title: 'Wooo Anime' }]);

  console.log('Anime seeded!');
  process.exit(0);
});