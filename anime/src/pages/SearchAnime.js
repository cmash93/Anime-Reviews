import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/auth';
import { searchAnimeApi } from '../utils/API';
import { saveAnimeIds, getSavedAnimeIds } from '../utils/localStorage';

import { SAVE_ANIME } from '../utils/mutations';
import { useMutation } from '@apollo/client'

const SearchAnimes = () => {
    const [searchedAnimes, setSearchedAnimes] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [savedAnimeIds, setSavedAnimeIds] = useState(getSavedAnimeIds());
    const [saveAnime] = useMutation(SAVE_ANIME)

    useEffect(() => {
        return () => saveAnimeIds(savedAnimeIds);
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }

        try {
            const response = await searchAnimeApi(searchInput);

            if (!response.ok) {
                throw new Error('something went wrong');
            }

            const { items } = await response.json();

            const animeData = items.map((anime) => ({
                animeId: anime.id,
                title: anime.volumeInfo.title,
                description: anime.volumeInfo.description,
                image: anime.volumeInfo.imageLinks?.thumbnail || '',
            }));
            // WE WILL NEED TO UPDATE BASED ON THE API 

            setSearchedAnimes(animeData);
            setSearchInput('');
        } catch (err) {
            console.error(err);
        }
    };

    const handleSaveAnime = async (anime) => {
        const animeToSave = searchedAnimes.find((anime) => anime.animeId === animeId);

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false
        }

        try {
            await saveAnime({
                variables: { input: animeToSave }
            });

            setSavedAnimeIds([...savedAnimeIds, animeToSave.animeId]);
        } catch (err) {
            console.log(err)
        }
    };


    return (
        <>
            <Jumbotron class='searchAnimeHeader'>
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
                                    placeholder='Search for a book'
                                />
                            </Col>
                            <Col xs={12} md={4}>
                                <Button type='submit'>
                                    Submit Search
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
                <CardColumns>
                    {searchedAnimes.map((anime) => {
                        return (
                            <Card key={anime.animeId}>
                                {anime.image ? (
                                    <Card.Img src={anime.image} alt={`The thumbnail for ${anime.title}`} />
                                ) : null}
                                <Card.Body>
                                    <Card.Title>{anime.title}</Card.Title>
                                    <Card.Text>{anime.description}</Card.Text>
                                    {Auth.loggedIn() && (
                                        <Button
                                            disabled={savedAnimeIds?.some((savedAnimeId) => savedAnimeId === anime.animeId)}
                                            className='searchAnimeBtn'
                                            onClick={() => handleSaveAnime(anime.animeId)}>
                                            {savedAnimeIds?.some((savedAnimeId) => savedAnimeId === anime.animeId)
                                                ? 'This Anime has already been saved!'
                                                : 'Save this Anime!'}
                                        </Button>
                                    )}
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