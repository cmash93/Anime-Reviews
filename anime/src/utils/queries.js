import { gql } from '@apollo/client';

export const GET_ME = gql`
{
    me {
        _id
        username
        email
        animeCount
        savedAnime {
            description
            animeId
            image
            link
            title
        }
    }
}
`