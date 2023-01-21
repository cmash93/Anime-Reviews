import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
        }
    }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
            email
        }
    }
}
`;

export const SAVE_ANIME = gql`
mutation saveAnime($input: savedAnime!) {
    saveAnime (input: $input) {
        _id
        username
        email
        animeCount
        savedAnime {
            #_id
            description
            animeId
            image
            link
            title
        }
    }
}
`;

export const REMOVE_ANIME = gql`
mutation removeAnime($animeId: ID!) {
    removeAnime (animeId: $animeId) {
        _id
        username
        email
        animeCount
        savedAnime {
            #_id
            description
            animeId
            image
            link
            title
        }
    }
}
`;