const { Comment, User } = require('../models');

module.exports = {

// getComment, saveComment
    async getComments(req, res) {
        await Comment.find()
        .then((comments) => res.json(comments))
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    async getCommentById(req, res) {
        await Comment.findOne({ _id: req.params.commentId })
        .then((comment) =>
            !comment
            ? res.status(404).json({ message: 'No comment found with this ID' })
            : res.json(comment)
        )
        .catch((err) => res.status(500).json(err));
    },

    async createComment(req, res) {
        await Comment.create(req.body)
        .then((comment) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: {comments: comment._id } },
                { new: true }
            )
        })
        .then((user) =>
            !user
            ? res.status(404).json({ message: 'Comment created but no user found' })
            : res.json({ message: 'Comment successfully created' })
        )
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        });
    },

    async updateComment(req, res) {
        await Comment.findOneAndUpdate(
            { _id: req.params.commentId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((comment) => 
            !comment
            ? res.status(404).json({ message: 'No comment found' })
            : res.json(comment)
        )
        .catch((err) => res.status(500).json(err))
    },

    async deleteComment(req, res) {
        await Comment.findOneandDelete({ _id: req.params.commentId })
        .then((comment) => {
            if (!comment) {
                return res.status(404).json({ message: 'No comment found' })
            }
            return User.findOneAndUpdate(
                { comments: req.params.commentId },
                { $pull: {comments: req.params.commentId} },
                { new: true }
            )
        })
        .then((user) =>
            !user
            ? res.status(404).json({ message: 'No user found' })
            : res.json({ message: 'Comment succesfully deleted' })
        )
        .catch((err) => res.status(500).json(err))
    }

}