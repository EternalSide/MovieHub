import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FavoriteBorderOutlined } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LanguageIcon from '@mui/icons-material/Language';
import MovieIcon from '@mui/icons-material/Movie';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import RemoveIcon from '@mui/icons-material/Remove';
import TheatersIcon from '@mui/icons-material/Theaters';
import { Box, Button, ButtonGroup, CircularProgress, Grid, Modal, Rating, Typography, useMediaQuery } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';

import { Link, UseParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import genreIcons from '../../app/assets/genres/index';
import { useGetMovieQuery } from '../../app/services/TMDDB';
import { useGetRecommendationsQuery } from '../../app/services/TMDDB';
import { selectCategoryName, selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import Error from '../Error';
import MovieList from '../MovieList/MovieList';

import './MovieInformation.css';

function MovieInformation() {
    const { id } = useParams();
    const { data, isFetching, error } = useGetMovieQuery(id);
    const { data: recommendations, isFetching: isRecommendationsFetching } = useGetRecommendationsQuery({
        list: '/recommendations',
        movieId: id,
    });

    const isMovieFavourited = true;
    const isMovieWatchListed = false;
    const addToFavourites = () => {};
    const addToWatchList = () => {};
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    //Загрузка данных
    if (isFetching) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress size="8rem" />
            </Box>
        );
    }
    //Ошибка
    if (error) {
        return <Error />;
    }

    return (
        <Grid container className="movieinfo" alignItems="space-around">
            <Grid item sm={12} lg={4} style={{ display: 'flex', alignItems: 'center' }}>
                <img className="movieinfo__poster" alt={data?.title} src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`} />
            </Grid>
            <Grid item container direction="column" lg={7}>
                <Typography variant="h3" align="center" gutterBottom>
                    {data?.title} ({data.release_date.split('-')[0]})
                </Typography>
                <Typography variant="h5" align="center" gutterBottom>
                    {data?.tagline}
                </Typography>
                <div className="movieinfo__rating">
                    <div className="movie__info-rating-left">
                        <Rating readOnly value={data.vote_average / 2} />
                        <p>{data?.vote_average} / 10</p>
                    </div>
                    <div className="movie__info-rating-right">
                        <p>
                            {data?.runtime} минут | {data?.spoken_languages[0].name}
                        </p>
                    </div>
                </div>
                <div className="movieinfo__genres">
                    {data?.genres.map((genre, i) => {
                        return (
                            <Link
                                key={i}
                                to="/"
                                className="movieinfo__link"
                                onClick={() => {
                                    dispatch(selectGenreOrCategory(genre.id));
                                    dispatch(selectCategoryName(genre.name));
                                }}
                            >
                                <Typography className="movieinfo__category-link">{genre?.name}</Typography>
                            </Link>
                        );
                    })}
                </div>
                <Typography gutterBottom variant="h5" style={{ marginTop: '10px' }}>
                    Описание:
                </Typography>
                <Typography style={{ marginBottom: '2rem' }}>{data?.overview}</Typography>
                <Typography variant="h5" gutterBottom>
                    Актеры:
                </Typography>
                <Grid item container spacing={2}>
                    {data &&
                        data.credits.cast
                            .map(
                                (character, i) =>
                                    character.profile_path && (
                                        <Grid
                                            key={i}
                                            item
                                            xs={4}
                                            md={2}
                                            component={Link}
                                            to={`/actors/${character.id}`}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <img
                                                className="movieinfo__actor-img"
                                                alt={character.name}
                                                src={`https://image.tmdb.org/t/p/w500${character?.profile_path}`}
                                            />
                                            <Typography color="textPrimary">{character?.name} </Typography>
                                            <Typography color="textSecondary">{character?.character.split('/')}</Typography>
                                        </Grid>
                                    ),
                            )
                            .slice(0, 6)}
                    <Grid item container style={{ marginTop: '2rem' }}>
                        <div className="movieinfo__button-container">
                            <Grid item xs={12} sm={6} className="movieinfo__button-container">
                                <ButtonGroup size="small" variant="outlined">
                                    <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<LanguageIcon />}>
                                        WEBSITE
                                    </Button>
                                    <Button
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={`https://www.imdb.com/title/${data?.imdb_id}`}
                                        endIcon={<MovieIcon />}
                                    >
                                        IMDB
                                    </Button>
                                    <Button onClick={() => setOpen(true)} href="#" endIcon={<TheatersIcon />}>
                                        Trailer
                                    </Button>
                                </ButtonGroup>
                            </Grid>
                            <Grid item xs={12} sm={6} className="movieinfo__button-container">
                                <ButtonGroup size="medium" variant="outlined">
                                    <Button
                                        onClick={addToFavourites}
                                        endIcon={isMovieFavourited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                    >
                                        {isMovieFavourited ? 'Unfavorite' : 'Favourite'}
                                    </Button>
                                    <Button onClick={addToWatchList} endIcon={isMovieWatchListed ? <RemoveIcon /> : <PlusOneIcon />}>
                                        Watchlist
                                    </Button>
                                    <Button endIcon={<ArrowBackIcon />} sx={{ borderColor: 'primary.main' }}>
                                        <Typography
                                            style={{ textDecoration: 'none' }}
                                            component={Link}
                                            to="/"
                                            color="inherit"
                                            variant="subtitle2"
                                        >
                                            Back
                                        </Typography>
                                    </Button>
                                </ButtonGroup>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
            <Box marginTop="5rem" width="100%">
                <Typography variant="h3" gutterBottom align="center">
                    Похожие фильмы:
                </Typography>
                {recommendations ? (
                    <MovieList movies={recommendations} numberOfMovies={12} recommendations />
                ) : (
                    <Box>Ничего не найдено </Box>
                )}
            </Box>
            <Modal closeAfterTransition className="movieinfo__modal" open={open} onClose={() => setOpen(false)}>
                <DialogContent className="movieinfo__modal">
                    {data?.videos.results.length > 0 && (
                        <iframe
                            autoPlay
                            className="movieinfo__iframe"
                            title="Trailer"
                            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
                            allow="autoplay"
                        />
                    )}
                </DialogContent>
            </Modal>
        </Grid>
    );
}

export default MovieInformation;
