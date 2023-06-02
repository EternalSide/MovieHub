import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    Box,
    CircularProgress,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
} from '@mui/material';

import { Link } from 'react-router-dom';

import genreIcons from '../../app/assets/genres/index';
import { useGetGenresQuery } from '../../app/services/TMDDB';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import { selectCategoryName } from '../../features/currentGenreOrCategory';
import logo from '../../images/logo.png';

import './Sidebar.css';

const categories = [
    {
        label: 'Популярные',
        value: 'popular',
    },
    {
        label: 'Топ рейтинга',
        value: 'top_rated',
    },
    {
        label: 'Скоро',
        value: 'upcoming',
    },
];

function Sidebar({ isDarkTheme, setMobileOpen }) {
    //Жанры RTQ
    const { data, isFetching } = useGetGenresQuery();
    const { genreIdOrCategoryName } = useSelector(
        (state) => state.currentGenreOrCategory,
    );
    useEffect(() => {
        setMobileOpen(false);
    }, [genreIdOrCategoryName]);
    const redLogo =
        'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
    const blueLogo =
        'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';
    const dispatch = useDispatch();

    return (
        <div className="sidebar">
            <Link
                to="/"
                className="sidebar__link"
                onClick={() => {
                    dispatch(selectGenreOrCategory('popular'));
                    dispatch(selectCategoryName('Главная'));
                }}
            >
                <img
                    className="sidebar__image"
                    src={isDarkTheme ? logo : logo}
                    alt="Лого MovieHub"
                />
            </Link>
            <Divider />
            <List>
                <ListSubheader>Категории</ListSubheader>
                {categories.map(({ label, value }) => (
                    <Link to="/" key={value} className="sidebar__links">
                        <ListItemButton
                            sx={isDarkTheme ? { color: 'white' } : { color: 'black' }}
                            onClick={() => {
                                dispatch(selectGenreOrCategory(value));
                                dispatch(selectCategoryName(label));
                            }}
                        >
                            {label === 'Топ рейтинга' && (
                                <ListItemIcon>
                                    <img
                                        src={genreIcons['топ']}
                                        className="sidebar__img"
                                        height={30}
                                    />
                                </ListItemIcon>
                            )}
                            {!(label === 'Топ рейтинга') && (
                                <ListItemIcon>
                                    <img
                                        src={genreIcons[label.toLowerCase()]}
                                        className="sidebar__img"
                                        height={30}
                                    />
                                </ListItemIcon>
                            )}
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
                    data?.genres.map(({ name, id }) => {
                        if (name === 'телевизионный фильм') {
                            return (
                                <Link to="/" key={id} className="sidebar__links">
                                    <ListItemButton
                                        sx={
                                            isDarkTheme
                                                ? { color: 'white' }
                                                : { color: 'black' }
                                        }
                                        className="sidebar__menu-button"
                                        onClick={() => {
                                            dispatch(selectGenreOrCategory(id));
                                            dispatch(selectCategoryName('телевизионные'));
                                        }}
                                    >
                                        <ListItemIcon>
                                            <img
                                                src={genreIcons['телевизионные']}
                                                className="sidebar__img"
                                                height={30}
                                            />
                                        </ListItemIcon>
                                        <ListItemText
                                            className="sidebar__menu-item"
                                            primary={'Телевизионные'}
                                        />
                                    </ListItemButton>
                                </Link>
                            );
                        }
                        return (
                            <Link to="/" key={id} className={'sidebar__links'}>
                                <ListItemButton
                                    sx={
                                        isDarkTheme
                                            ? { color: 'white' }
                                            : { color: 'black' }
                                    }
                                    className="sidebar__menu-button"
                                    onClick={() => {
                                        dispatch(selectGenreOrCategory(id));
                                        dispatch(selectCategoryName(name));
                                    }}
                                >
                                    <ListItemIcon>
                                        <img
                                            src={genreIcons[name.toLowerCase()]}
                                            className="sidebar__img"
                                            height={30}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        className="sidebar__menu-item"
                                        primary={name}
                                    />
                                </ListItemButton>
                            </Link>
                        );
                    })
                )}
            </List>
        </div>
    );
}

export default Sidebar;
