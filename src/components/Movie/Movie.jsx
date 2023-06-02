import React from 'react';

import { Grid, Grow, Rating, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

import { Link } from 'react-router-dom';

import './Movie.css';

function Movie({ movie, i, isDarkTheme }) {
    const tes = () => {
        if (movie?.vote_average >= 7) {
            return 'green';
        } else if (movie?.vote_average < 7 && movie?.vote_average > 4.5) {
            return 'yellow';
        } else {
            return 'red';
        }
    };
    return (
        <>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className="movie">
                {movie?.vote_average >= 8.5 && (
                    <img
                        className="movie__top-icon"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Red_star.svg/630px-Red_star.svg.png?20221019235056"
                    />
                )}
                <Grow in key={i} timeout={(i + 1) * 125}>
                    <Link to={`/movie/${movie.id}`} className="movie__links">
                        <img
                            alt={movie.title}
                            className="movie__image"
                            src={
                                movie.poster_path
                                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                                    : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgh749ko3iX1rOZH2XlXJAZ8dVA20L-w3lbSWXWaPHBQbZNLZfcomrkvhreZ96C3wPlBQ&usqp=CAU`
                            }
                        />
                        <Typography className="movie__title" variant="h5">
                            {movie.title}
                        </Typography>
                        <Tooltip
                            disableTouchListener
                            title={`${movie.vote_average} / 10`}
                        >
                            <div>
                                <Rating
                                    readOnly
                                    value={movie.vote_average / 2}
                                    precision={0.1}
                                />
                                <Typography variant="h6" color={tes}>
                                    {movie.vote_average} / 10
                                </Typography>
                            </div>
                        </Tooltip>
                    </Link>
                </Grow>
            </Grid>
        </>
    );
}

export default Movie;
