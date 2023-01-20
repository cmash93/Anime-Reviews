import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedAnime = () => {
    const [userData, setUserData] = useState({});

    const userDataLength = Object.keys(userData).length;

    useEffect(() => {
        const getUserData = async () => {
            try {
                const token = Auth.loggedIn() ? Auth.getToken() : null;

                if (!token) {
                    return false;
                }

                const response = await getMe(token);

                if (!response.ok) {
                    throw new Error('something went wrong!');
                }

                const user = await response.json();
                setUserData(user);
            } catch (err) {
                console.error(err);
            }
        };
        getUserData();
    }, [userDataLength]);

    const handleDeleteAnime = async (bookId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const response = await deleteBook(bookId, token);

            if (!response.ok) {
                throw new Error('something went wrong!');
            }

            const updateUser = await response.json();
            setUserData(updatedUser);
            removeBookId(bookId);
        } catch (err) {
            console.error(err);
        }
    };

    if (!userDataLength) {
        return <h2>LOADING...</h2>;
    }

    return (
        <>
            <Jumbotron class='savedAnimeHeader'>
                <Container>
                    <h1>Viewing Saved Anime</h1>
                </Container>
            </Jumbotron>
            <Container>
                <h2>
                    {userData.savedAnime.length
                     ? `Viewing ${userData.savedAnime.length} saved ${userData.savedAnime.length === 1 ? 'anime' : 'animes'}:`
                     : 'You have no saved animes!'}
                </h2>
                <CardColumns>
                    {userData.savedAnime.map((anime) => {
                        return (
                            <Card key={anime.animeId}>
                                {anime.image ? <Card.Img src={anime.image} alt={`The cover for ${anime.title}`} /> : null}
                                <Card.Body>
                                    <Card.Title>{anime.title}</Card.Title>
                                    <p class='director'> {anime.directors}</p>
                                    <Card.Text>{anime.description}</Card.Text>
                                    <Button class='' onClick={() => handleDeleteAnime(anime.animeId)}>
                                        Delete this Anime!
                                    </Button>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </CardColumns>
            </Container>
        </>
    );

};

export default SavedAnime;