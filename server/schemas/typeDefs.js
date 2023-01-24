const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type Anime {
        description: String
        animeId: String
        image: String
        link: String
        title: String
    }
    type User {
        _id: ID
        username: String!
        email: String!
        animeCount: Int
        savedAnime: [Anime]
    }
    type Auth {
        token: ID!
        user: User
    }
    input SavedAnimeInput {
        description: String
        animeId: Int
        image: String
        link: String
        title: String
    }
    type Query {
        me: User
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveAnime(input: SavedAnimeInput): User
        removeAnime(animeId: String!): User
    }
`;

module.exports = typeDefs;