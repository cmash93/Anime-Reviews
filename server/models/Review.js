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


const Review = model('review', reviewSchema);

module.exports = Review;