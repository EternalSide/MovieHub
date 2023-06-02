import { useState } from 'react';

import { useGetActorsDetailsQuery } from '../../app/services/TMDDB.js';
import { useGetMoviesByActorIdQuery } from '../../app/services/TMDDB.js';
import Error from '../Error';
import MovieList from '../MovieList/MovieList';
import Pagination from '../Pagination/Pagination';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';

import { useNavigate, useParams } from 'react-router-dom';

import './Actors.css';

function Actors() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const { data, isFetching, error } = useGetActorsDetailsQuery(id);
    const { data: movies } = useGetMoviesByActorIdQuery({ id, page });
    console.log(data);
    if (isFetching) {
        return (
            <Box display="flex" justifyContent="center">
                <CircularProgress size="8rem" />
            </Box>
        );
    }

    if (error) return <Error />;
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item lg={5} xl={4}>
                    <img
                        className="actor__image"
                        src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
                        alt={data.name}
                    />
                </Grid>
                <Grid
                    item
                    lg={7}
                    xl={8}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <Typography variant="h2" gutterBottom>
                        {data?.name}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Дата рождения: {new Date(data?.birthday).toDateString()}
                    </Typography>
                    <Typography variant="body1" align="justify" paragraph>
                        {data?.biography ||
                            'К сожалению информация отсутствует.'}
                    </Typography>
                    <Box
                        marginTop="2rem"
                        display="flex"
                        justifyContent="space-around"
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            target="_blank"
                            href={`https://www.imdb/com/name/${data?.imdb_id}`}
                        >
                            IMDB
                        </Button>
                        <Button
                            startIcon={
                                <ArrowBackIcon
                                    color="primary"
                                    onClick={() => {
                                        navigate(-1);
                                    }}
                                />
                            }
                        ></Button>
                    </Box>
                </Grid>
            </Grid>
            <Box margin="2rem 0">
                <Typography variant="h2" gutterBottom align="center">
                    {movies && (
                        <MovieList
                            numberOfMovies={18}
                            movies={movies}
                            recommendations
                        />
                    )}
                </Typography>
                <Pagination
                    currentPage={page}
                    setPage={setPage}
                    totalPages={movies?.total_pages}
                />
            </Box>
        </div>
    );
}

export default Actors;
