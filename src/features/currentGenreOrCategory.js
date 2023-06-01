import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genreIdOrCategoryName: "",
  page: 1,
  searchQuery: "",
  genreName: "Главная",
};

export const genreOrCategory = createSlice({
  name: "genreOrCategory",
  initialState,
  reducers: {
    selectGenreOrCategory: (state, action) => {
      state.genreIdOrCategoryName = action.payload;
      state.genreName = "";
      state.searchQuery = "";
    },
    selectCategoryName: (state, action) => {
      state.genreName = action.payload;
    },
    searchMovie: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { selectGenreOrCategory, selectCategoryName, searchMovie } =
  genreOrCategory.actions;
export default genreOrCategory.reducer;
