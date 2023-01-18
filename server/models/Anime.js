const { Schema, Types, model } = require('mongoose');


const reviewSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => {
                let date = new Date(timestamp);
                return date.toLocaleString();
            },
        },
        user: {
            type: Schema.Types.objectId,
            required: true,
            ref: 'User'
        }
    },
    {
        toJSON:{
            virtuals: true,
            getters: true
        }
    }
);


const animeSchema = new Schema (
    {
        directors: [
            {
                type: String,
            }
        ],
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
        },
        reviews: [reviewSchema]
    }
);

const Anime = model('Anime', animeSchema)

module.exports = Anime;