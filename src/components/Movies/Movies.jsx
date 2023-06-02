import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Box, CircularProgress } from '@mui/material';

import { useGetMoviesQuery } from '../../app/services/TMDDB';
import Error from '../Error';
import FeaturedMovie from '../FeaturedMovie/FeaturedMovie';
import MovieList from '../MovieList/MovieList';
import Pagination from '../Pagination/Pagination';

function Movies() {
    const [page, setPage] = useState(1);
    const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);

    const { data, error, isFetching } = useGetMoviesQuery({
        genreIdOrCategoryName,
        page,
        searchQuery,
    });
    console.log(data);
    if (isFetching) {
        return (
            <Box display="flex" justifyContent="center">
                <CircularProgress size="4rem" />
            </Box>
        );
    }

    if (error) return <Error />;
    return (
        <>
            <FeaturedMovie movie={data.results[0]} />

            <MovieList movies={data} numberOfMovies={19} deleteFirst />
            <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages} />
        </>
    );
}

export default Movies;
