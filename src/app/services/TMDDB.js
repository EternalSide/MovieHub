import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
const page = 1;
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
      query: () => {
        return `/movie/popular?language=ru-RUpage=${page}`;
      },
    }),
  }),
});

export const { useGetGenresQuery, useGetMoviesQuery } = tmdbApi;
