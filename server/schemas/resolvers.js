const { User, Anime } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
            const userData = await User.findOne({ _id: context.user._id })
                .select("-__v -password")
                .populate("anime");

            return userData;
            }

            throw new AuthenticationError("Not logged in");
        },
        anime: async () => {
            return Anime.find({});
        },
    },
    Mutation: {
        addUser: async (parent, args) => {
            try {
            const user = await User.create(args);

            const token = signToken(user);
            return { token, user };
            } catch (err) {
            console.log(err);
            }
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
            throw new AuthenticationError("Incorrect credentials");
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
            throw new AuthenticationError("Incorrect credentials");
            }

            const token = signToken(user);
            return { token, user };
        },
        saveAnime: async (parent, args, context) => {
            if (context.user) {
            const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                // take the input type to replace "body" as the arguement
                { $addToSet: { savedAnime: args.input } },
                { new: true, runValidators: true }
            );

            return updatedUser;
            }

            throw new AuthenticationError("You need to be logged in!");
        },
        removeAnime: async (parent, args, context) => {
            if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedAnime: { animeId: args.animeId } } },
                { new: true }
            );

            return updatedUser;
            }

            throw new AuthenticationError("You need to be logged in!");
        },
    },
};

module.exports = resolvers;