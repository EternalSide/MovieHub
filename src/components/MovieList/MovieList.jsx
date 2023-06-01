import React from "react";
import { Grid } from "@mui/material";
import "./MovieList.css";
import Movie from "../Movie/Movie";
import { useSelector } from "react-redux";
import Banner from "../Banner/Banner";
function MovieList({ movies, numberOfMovies, recommendations }) {
  const { genreName } = useSelector((state) => state.currentGenreOrCategory);

  return (
    <div>
      {!recommendations && (
        <h2 className="movielist__title">
          {genreName === "Главная" ? (
            "Популярные "
          ) : (
            <p>
              Результаты по запросу: <span className="category">{genreName} </span>{" "}
            </p>
          )}
        </h2>
      )}

      <div className="movielist">
        {movies?.results.length === 0 && <h3>Ничего не найдено :(</h3>}

        {movies?.results.slice(0, numberOfMovies).map((movie, i) => {
          return <Movie key={i} movie={movie} i={i} />;
        })}
      </div>
    </div>
  );
}

export default MovieList;
