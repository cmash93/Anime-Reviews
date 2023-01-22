const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type Query {
        me: User
        anime: [Anime]

    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveAnime(input: savedAnime!): User
        removeAnime(animeId: ID!): User
    }
    type User {
        _id: ID!
        username: String
        email: String
        animeCount: Int
        savedAnime: [Anime]
    }
    type Anime {
        description: String
        animeId: String
        image: String
        link: String
        title: String
    }
    input savedAnime {
        description: String
        animeId: String
        image: String
        link: String
        title: String
    }

    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs;