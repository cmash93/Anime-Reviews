const { User } = require('../models');

const { signToken } = require('../utils/auth');

module.exports = {

    async getSingleUser({user = null, params }, res) {
        const foundUser = await User.findOne({
            $or: [{_id: user ? user._id : params.id}, {username: params.username }],
        });

        if (!foundUser) {
            return res.status(400).json({ message: 'Cannot find any user with this id' });
        }
        res.json(foundUser);
    },

    async createUser({ body}, res) {
        const user = await User.create(body);

        if (!user) {
            return res.status(400).json({message: 'Something is so incredibly wrong :('});
        }
        const token = signToken(user);
        res.json({ token, user});
    },

    async login({ body}, res) {
        const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
        if (!user) {
            return res.status(400).json({ message: "Can't find this user bruh" });
        }

        const correctPw = await user.isCorrectPassword(body.password);

        if (!correctPw) {
            return res.status(400).json({ message: 'Wrong password, good guess doe' });
        }
        const token = signToken(user);
        res.json({ token, user });
    },

    async saveAnime({ user, body}, res) {
        console.log(user);
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $addToSet: { savedAnime: body } },
                { new: true, runValidators: true }
            );
            return res.json(updatedUser);
        }   catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },

    async deleteAnime({ user, params }, res) {
        const updatedUser = await User.findOneAndUpdate(
            { _id: user._id },
            { $pull: { savedAnime: { animeId: params.animeId } } },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "Couldn't find a user with this Id" });
        }
        return res.json(updatedUser);
    },
};