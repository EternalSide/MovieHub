import React from 'react';

import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

import { Link } from 'react-router-dom';

import './FeaturedMovie.css';

function FeaturedMovie({ movie }) {
    if (!movie) return null;
    console.log(movie.backdrop_path);
    return (
        <Box component={Link} to={`/movie/${movie.id}`} className="featuredmovie">
            <Card
                className="featuredmovie__card"
                classes={{ root: 'featuredmovie__cardRoot' }}
            >
                <CardMedia
                    title={movie.title}
                    className="featuredmovie__card-img"
                    media="picture"
                    alt={movie.title}
                    image={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                />
                <Box padding="20px" className="tes">
                    <CardContent
                        className="featuredmovie__info"
                        classes={{ root: 'featuredmovie__info-root}' }}
                    >
                        <Typography variant="h5" gutterBottom>
                            {movie.title}
                        </Typography>
                        <Typography className="movie__info-text" variant="body2">
                            {movie.overview}
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
        </Box>
    );
}

export default FeaturedMovie;
