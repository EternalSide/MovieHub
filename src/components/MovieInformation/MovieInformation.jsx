import { useState } from 'react';
import { useDispatch } from 'react-redux';
import MovieIcon from '@mui/icons-material/Movie';
import TheatersIcon from '@mui/icons-material/Theaters';
import {
    Box,
    ButtonGroup,
    CircularProgress,
    Grid,
    Modal,
    Rating,
    Typography,
} from '@mui/material';
import DialogContent from '@mui/material/DialogContent';

import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useGetMovieQuery } from '../../app/services/TMDDB';
import { useGetRecommendationsQuery } from '../../app/services/TMDDB';
import {
    selectCategoryName,
    selectGenreOrCategory,
} from '../../features/currentGenreOrCategory';
import Error from '../Error';
import MovieList from '../MovieList/MovieList';

import './MovieInformation.css';

function MovieInformation() {
    const { id } = useParams();
    const { data, isFetching, error } = useGetMovieQuery(id);
    const { data: recommendations, isFetching: isRecommendationsFetching } =
        useGetRecommendationsQuery({
            list: '/recommendations',
            movieId: id,
        });


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

    if (error) {
        return <Error />;
    }

    return (
        <Grid container className="movieinfo" alignItems="space-around">
            <Grid
                item
                sm={12}
                lg={4}
                style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
            >
                <img
                    className="movieinfo__poster"
                    alt={data?.title}
                    src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
                />
                <button className="movieinfo__watch-button">Смотреть</button>
                <button className="movieinfo__watch-button">В избранное</button>
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
                                <Typography
                                    className="movieinfo__category-link"
                                    variant="h6"
                                >
                                    {genre?.name}
                                </Typography>
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
                                            <Typography color="textPrimary">
                                                {character?.name}{' '}
                                            </Typography>
                                            <Typography color="textSecondary">
                                                {character?.character.split('/')}
                                            </Typography>
                                        </Grid>
                                    ),
                            )
                            .slice(0, 6)}
                    <Grid item container style={{ marginTop: '2rem' }}>
                        <div className="movieinfo__button-container">
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                className="movieinfo__button-container"
                            >
                                <ButtonGroup
                                    size="small"
                                    variant="outlined"
                                    style={{ gap: '25px' }}
                                >
                                    <button
                                        className="movieinfo__button-top"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={`https://www.imdb.com/title/${data?.imdb_id}`}
                                        endIcon={<MovieIcon />}
                                    >
                                        Кинопоиск
                                    </button>
                                    <button
                                        className="movieinfo__button-top"
                                        onClick={() => setOpen(true)}
                                        href="#"
                                        endIcon={<TheatersIcon />}
                                    >
                                        Трейлер
                                    </button>
                                    <button
                                        className="movieinfo__button-top"
                                        onClick={() => setOpen(true)}
                                        href="#"
                                        endIcon={<TheatersIcon />}
                                    >
                                        Буду смотреть
                                    </button>
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
                    <MovieList
                        movies={recommendations}
                        numberOfMovies={12}
                        recommendations
                    />
                ) : (
                    <Box>Ничего не найдено </Box>
                )}
            </Box>
            <Modal
                closeAfterTransition
                className="movieinfo__modal"
                open={open}
                onClose={() => setOpen(false)}
            >
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
            <script src="//kinoplayer.top/top.js"></script>
        </Grid>
    );
}

export default MovieInformation;
