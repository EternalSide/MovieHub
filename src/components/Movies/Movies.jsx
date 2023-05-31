import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useGetMoviesQuery } from "../../app/services/TMDDB";
import MovieList from "../MovieList/MovieList";
function Movies() {
  //RTQ QUERY
  const { data, error, isFetching } = useGetMoviesQuery();
  console.log(data);
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }
  if (!data.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          По вашему запросу ничего не найдено.
          <br />
          Попробуйте найти что-нибудь другое
        </Typography>
      </Box>
    );
  }
  if (error) return "Ой! Что-то не так, мы скоро это поправим :)";
  return (
    <div>
      <MovieList movies={data} />
    </div>
  );
}

export default Movies;
