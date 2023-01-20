const { Schema, model } = require('mongoose');

const animeSchema = new Schema (
    {
        description: {
            type: String,
            required: true
        },
        animeId: {
            type: String,
            required: true
        },
        image: {
            type: String,
        },
        link: {
            type: String
        },
        title: {
            type: String,
            required: true          
        }
    }
);

const Anime = model('Anime', animeSchema)

module.exports = Anime;