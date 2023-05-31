import React from "react";
import { Grid } from "@mui/material";
import "./MovieList.css";
import Movie from "../Movie/Movie";
function MovieList({ movies }) {
  return (
    <Grid container className="movielist">
      {movies?.results.map((movie, i) => {
        return <Movie key={i} movie={movie} i={i} />;
      })}
    </Grid>
  );
}

export default MovieList;
