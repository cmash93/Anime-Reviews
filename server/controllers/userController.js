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
}