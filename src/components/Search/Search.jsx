import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';

import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { searchMovie } from '../../features/currentGenreOrCategory';
import { selectCategoryName } from '../../features/currentGenreOrCategory';

import './Search.css';

function Search() {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            //Перекинем на главную и отправим запрос, чтобы был доступен в любом месте
            navigate('/');
            dispatch(searchMovie(query));
            dispatch(selectCategoryName(query));
        }
    };
    if (location.pathname !== '/') return null;
    return (
        <div className="search">
            <TextField
                onKeyPress={handleKeyPress}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                variant="standard"
                placeholder="Поиск"
                InputProps={{
                    className: 'search__input',
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
}

export default Search;
