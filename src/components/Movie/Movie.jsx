import React from "react";
import "./Movie.css";
import { Typography, Grid, Grow, ToolTip, Rating } from "@mui/material";
import { Link } from "react-router-dom";
function Movie({ movie, i }) {
  console.log(movie, i);
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className="movie">
      <Typography className="movie__title" variant="h5">
        {movie.title}
      </Typography>
    </Grid>
  );
}

export default Movie;
