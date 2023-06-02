import React from 'react';
import { useSelector } from 'react-redux';

import Movie from '../Movie/Movie';

import './MovieList.css';

function MovieList({
    movies,
    numberOfMovies,
    recommendations,
    deleteFirst,
    isDarkTheme,
}) {
    const { genreName } = useSelector((state) => state.currentGenreOrCategory);
    const startFrom = deleteFirst ? 1 : 0;
    return (
        <div className="movies">
            {!recommendations && (
                <h2 className="movielist__title">
                    {genreName === 'Главная' || genreName === 'Популярные' ? (
                        'Популярные'
                    ) : (
                        <p>
                            Результаты по запросу:{' '}
                            <span className="category">{genreName} </span>{' '}
                        </p>
                    )}
                </h2>
            )}

            <div className="movielist">
                {movies?.results.length === 0 && <h3>Ничего не найдено :(</h3>}

                {movies?.results.slice(startFrom, numberOfMovies).map((movie, i) => {
                    return (
                        <Movie isDarkTheme={isDarkTheme} key={i} movie={movie} i={i} />
                    );
                })}
            </div>
        </div>
    );
}

export default MovieList;
