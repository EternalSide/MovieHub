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

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (error)
    return (
      <>
        <h2>Произошла ошибка!</h2>
        <p>
          Вероятнее всего у вас не включен VPN, так как сервис themoviedb.org не
          работает в России, рекомендуем установить: &nbsp;
          <a
            target="_blank"
            href="https://chrome.google.com/webstore/detail/free-vpn-for-chrome-vpn-p/majdfhpaihoncoakbjgbdhglocklcgno?hl=ru"
          >
            Free Vpn
          </a>
        </p>
      </>
    );
  return (
    <div>
      <MovieList movies={data} />
    </div>
  );
}

export default Movies;
