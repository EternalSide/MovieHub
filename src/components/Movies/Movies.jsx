import React, { useState, useEffect } from "react";
import { Box, CircularProgress, useMediaQuery, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useGetMoviesQuery } from "../../app/services/TMDDB";
import MovieList from "../MovieList/MovieList";
import Error from "../Error";
import Banner from "../Banner/Banner";
import Pagination from "../Pagination/Pagination";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
function Movies() {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);

  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });

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
      {/* <Banner /> */}

      <MovieList movies={data} numberOfMovies={18} />
      <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages} />
    </>
  );
}

export default Movies;
