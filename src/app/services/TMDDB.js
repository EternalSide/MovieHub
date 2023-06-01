import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

// const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NWQ3NTg2ZDI1Y2FkZmU5Y2ViOGQ2NTY5ZTIyZTAwMCIsInN1YiI6IjY0NzFmNzAyOWFlNjEzMDBhODA2Yzg5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.33ln0fY0KcGQqTyJZRBNP9m2rS4Buw6T94c6toEuTNk'
//     }
//   };

//   fetch('/movie/popular?language=en-US&page=1', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));
export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
    prepareHeaders: (headers, { getState }) => {
      headers.set("accept", "application/json");
      headers.set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDYzNGNmNTM5NTAzYzg0Y2Y2ZTFmMTUyYTgxNTY5ZCIsInN1YiI6IjY0Nzc1NzNjMTJjNjA0MDEzZWQ5MTUzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MiSpprUoEpd5WV-yv_In0zzCiXWm1otsrBinRQgloaw"
      );

      return headers;
    },
  }),
  endpoints: (builder) => ({
    //Получаем жанры
    getGenres: builder.query({
      query: () => `/genre/movie/list?language=ru`,
    }),

    // Популярные
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        //По названию (поиску)
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&language=ru-RU&page=${page}`;
        }

        //Фильмы по названию и категории
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === "string") {
          return `movie/${genreIdOrCategoryName}?language=ru-RU&page=${page}`;
        }
        //Фильмы по жанру
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === "number") {
          return `discover/movie?include_adult=false&include_video=false&language=ru-RU&page=${page}&sort_by=popularity.desc&with_genres=${genreIdOrCategoryName}`;
        }
        //Популярные
        return `/movie/popular?language=ru-RUpage=${page}`;
      },
    }),
    //Получить фильм для MovieInfo
    getMovie: builder.query({
      query: (id) => `movie/${id}?append_to_response=videos,credits&language=ru-RU&`,
    }),
    //Похожие фильмы
    getRecommendations: builder.query({
      query: ({ list, movieId }) => {
        return `/movie/${movieId}/${list}`;
      },
    }),
  }),
});

export const { useGetGenresQuery, useGetMoviesQuery, useGetMovieQuery, useGetRecommendationsQuery } = tmdbApi;
