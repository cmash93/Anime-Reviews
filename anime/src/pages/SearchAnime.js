import React, { useState, useEffect } from 'react';
import { Container, Col, Form, Button, Card } from 'react-bootstrap';
import CardColumns from 'react-bootstrap/CardColumns';
import Jumbotron from 'react-bootstrap/Jumbotron';

import Auth from '../utils/auth';
// import { searchAnimeApi } from '../utils/api';
import { saveAnimeId, getSavedAnimeIds } from '../utils/localStorage';

import { SAVE_ANIME } from '../utils/mutations';
import { useMutation } from '@apollo/client'

const SearchAnime = () => {
    const [searchedAnimes, setSearchedAnimes] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [savedAnimeIds, setSavedAnimeIds] = useState(getSavedAnimeIds());

    useEffect(() => {
        return () => saveAnimeId(savedAnimeIds);
    });

    const [saveAnime, { error }] = useMutation(SAVE_ANIME)

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }
        console.log(searchInput)

        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime?q=${searchInput}&limit=20`);

            if (!response.ok) {
                throw new Error('something went wrong');
            }

            const resData = await response.json();

            const animeData = resData.data.map((anime) => ({
                animeId: anime.mal_id,
                title: anime.title,
                description: anime.synopsis,
                image: anime.images.jpg.large_image_url || '',
            }));
            // WE WILL NEED TO UPDATE BASED ON THE API 

            setSearchedAnimes(animeData);
            setSearchInput('');
        } catch (err) {
            console.error(err);
        }
    };

    const handleSaveAnime = async (animeId) => {
        const animeToSave = searchedAnimes.find((anime) => anime.animeId === animeId);

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false
        }

        try {
            const response = await saveAnime({
                variables: {
                    input: animeToSave,
                },
            });

            if (!response) {
                throw new Error('Something went wrong!')
            }

            setSavedAnimeIds([...savedAnimeIds, animeToSave.animeId]);
        } catch (err) {
            console.log(err)
        }
    };


    return (
        <>
            <Jumbotron fluid className='text-light bg-dark'>
                <Container>
                    <h1>Wanna search for some Anime? well, you'll do it right here, right below where all this is written! Crazy stuff am I right??</h1>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Row>
                            <Col xs={12} md={8}>
                                <Form.Control
                                    name='searchInput'
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    type='text'
                                    size='lg'
                                    placeholder='Search for an Anime'
                                />
                            </Col>
                            <Col xs={12} md={4}>
                                <Button type='submit' variant='success' size='lg'>
                                    Search
                                </Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </Container>
            </Jumbotron>

            <Container>
                <h2>
                    {searchedAnimes.length
                        ? `Viewing ${searchedAnimes.length} results:`
                        : 'Search for an Anime to begin'}
                </h2>
                <CardColumns className='row'>
                    {searchedAnimes.map((anime) => {
                        return (
                            <Card key={anime.animeId} border='dark'>
                                {anime.image ? (
                                    <Card.Img src={anime.image} alt={`The thumbnail for ${anime.title}`} variant='top' />
                                ) : null}
                                <Card.Body>
                                    <Card.Title>{anime.title}</Card.Title>
                                    <Card.Text>{anime.description}</Card.Text>
                                    <Card.Footer>
                                        {Auth.loggedIn() && (
                                            <Button
                                                disabled={savedAnimeIds?.some((savedAnimeId) => savedAnimeId === anime.animeId)}
                                                className='btn-block btn-info'
                                                onClick={() => handleSaveAnime(anime.animeId)}>
                                                {savedAnimeIds?.some((savedAnimeId) => savedAnimeId === anime.animeId)
                                                    ? 'This Anime has already been saved!'
                                                    : 'Save this Anime!'}
                                            </Button>
                                        )}
                                    </Card.Footer>

                                </Card.Body>
                            </Card>
                        );
                    })}
                </CardColumns>
            </Container>
        </>
    );
};

export default SearchAnime;