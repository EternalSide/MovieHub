// Сервис был полностью переписан на kinopoisk.dev API
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://api.themoviedb.org/3';
export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers, { getState }) => {
            headers.set('accept', 'application/json');
            headers.set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDYzNGNmNTM5NTAzYzg0Y2Y2ZTFmMTUyYTgxNTY5ZCIsInN1YiI6IjY0Nzc1NzNjMTJjNjA0MDEzZWQ5MTUzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MiSpprUoEpd5WV-yv_In0zzCiXWm1otsrBinRQgloaw',
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
                //Поиск (запрос на стрингу)
                if (searchQuery) {
                    return `/search/movie?query=${searchQuery}&language=ru-RU&page=${page}`;
                } //Фильмы по названию и категории
                if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
                    return `movie/${genreIdOrCategoryName}?language=ru-RU&page=${page}`;
                }
                //Фильмы по жанру
                if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
                    return `discover/movie?include_adult=false&include_video=false&language=ru-RU&page=${page}&sort_by=popularity.desc&with_genres=${genreIdOrCategoryName}`;
                }
                //Популярные
                return `/movie/popular?language=ru-RUpage=${page}`;
            },
        }),
        //Вся информация о фильме
        getMovie: builder.query({
            query: (id) =>
                `movie/${id}?append_to_response=videos,credits&language=ru-RU&`,
        }),

        //Похожие фильмы
        getRecommendations: builder.query({
            query: ({ list, movieId }) => {
                return `/movie/${movieId}/${list}`;
            },
        }),
        //Инфо об Актере
        getActorsDetails: builder.query({
            query: (actorId) => `/person/${actorId}?language=ru-RU`,
        }),
        //Фильмы в которых снимался Актер
        getMoviesByActorId: builder.query({
            query: ({ id, page }) => `/discover/movie?with_cast=${id}&page=${page}`,
        }),
    }),
});

export const {
    useGetGenresQuery,
    useGetMoviesQuery,
    useGetMovieQuery,
    useGetRecommendationsQuery,
    useGetActorsDetailsQuery,
    useGetMoviesByActorIdQuery,
} = tmdbApi;
