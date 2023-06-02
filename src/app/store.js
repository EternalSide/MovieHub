import genreOrCategory from '../features/currentGenreOrCategory';
import { tmdbApi } from './services/TMDDB';
import { configureStore } from '@reduxjs/toolkit';

//В сторе лежит текущий жанр фильмов
export default configureStore({
    reducer: {
        [tmdbApi.reducerPath]: tmdbApi.reducer,
        currentGenreOrCategory: genreOrCategory,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(tmdbApi.middleware),
});
