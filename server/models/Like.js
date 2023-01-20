const { Schema } = require('mongoose');

const likeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    commentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }
},
{ timestamps: true });

const Like = model('Like', likeSchema);

module.exports = { Like }