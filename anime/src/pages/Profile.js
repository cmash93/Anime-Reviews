import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client'
import CardColumns from 'react-bootstrap/CardColumns';
import Jumbotron from 'react-bootstrap/Jumbotron';

import Auth from '../utils/auth';
import { removeAnimeId, saveAnimeId } from '../utils/localStorage';
import { GET_ME } from '../utils/queries';
import { REMOVE_ANIME } from '../utils/mutations';

const SavedAnime = () => {
    const { loading, data } = useQuery(GET_ME);
    const [deleteAnime] = useMutation(REMOVE_ANIME)

    const userData = data?.me || []

    const handleDeleteAnime = async (animeId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }



        try {
            await deleteAnime({
                variables: { animeId }
            });

            removeAnimeId(animeId);
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return <h2>LOADING...</h2>;
    }

    const savedAnimeIds = userData.savedAnime.map((anime) => anime.animeId);
    saveAnimeId(savedAnimeIds)

    return (
        <>
            <Jumbotron fluid className='text-light bg-dark'>
                <Container>
                    <h1>Viewing Saved Anime</h1>
                </Container>
            </Jumbotron>
            <Container>
                <h2>
                    {userData.savedAnime.length
                        ? `Viewing ${userData.savedAnime.length} saved ${userData.savedAnime.length === 1 ? 'anime title' : 'anime titles'}:`
                        : 'You have no saved anime!'}
                </h2>
                <CardColumns className='row'>
                    {userData.savedAnime.map((anime) => {
                        return (
                            <Card key={anime.animeId} border='dark'>
                                {anime.image ? <Card.Img src={anime.image} alt={`The cover for ${anime.title}`} /> : null}
                                <Card.Body>
                                    <Card.Title>{anime.title}</Card.Title>
                                    <p className='director'> {anime.directors}</p>
                                    <Card.Text>{anime.description}</Card.Text>
                                    <Button className='' onClick={() => handleDeleteAnime(anime.animeId)}>
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