import React, { useEffect } from "react";
import "./Sidebar.css";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
  ListItemButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useGetGenresQuery } from "../../app/services/TMDDB";
import genreIcons from "../../app/assets/genres/index";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
const categories = [
  {
    label: "Популярные",
    value: "popular",
  },
  {
    label: "Топ рейтинга",
    value: "top_rated",
  },
  {
    label: "Скоро",
    value: "upcoming",
  },
];

function Sidebar({ isDarkTheme }) {
  //Жанры
  const { data, isFetching } = useGetGenresQuery();

  const redLogo =
    "https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png";
  const blueLogo =
    "https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png";
  const dispatch = useDispatch();

  return (
    <>
      <Link to="/" className="sidebar__link">
        <img
          className="sidebar__image"
          src={isDarkTheme ? blueLogo : redLogo}
          alt="Лого MovieHub"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Категории</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link to="/" key={value} className="sidebar__links">
            <ListItemButton
              onClick={() => {
                dispatch(selectGenreOrCategory(value));
              }}
            >
              {/* <ListItemIcon>
                <img src={redLogo} className="sidebar__img" height={30} />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItemButton>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Жанры</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          data?.genres.map(({ name, id }) => (
            <Link to="/" key={id} className="sidebar__links">
              <ListItemButton
                onClick={() => {
                  dispatch(selectGenreOrCategory(id));
                }}
              >
                <ListItemIcon>
                  <img
                    src={genreIcons[name.toLowerCase()]}
                    className="sidebar__img"
                    height={30}
                  />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </Link>
          ))
        )}
      </List>
    </>
  );
}

export default Sidebar;
