import React, { useState } from 'react';

import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
// Components and MUI
import { Actors, MovieInformation, Movies, Navbar, Profile } from './index';

function App() {
    //Темы
    const dark = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    const light = {
        palette: {
            mode: 'light',
        },
    };
    //Тема по дефолту белая
    const [isDarkTheme, setIsDarkTheme] = useState(true);
    //Сменить тему
    const changeTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };
    return (
        <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
            <div className="app">
                <BrowserRouter>
                    {/* CssBaseline - Global Reset */}
                    <CssBaseline />
                    <Navbar isDarkTheme={isDarkTheme} changeTheme={changeTheme} />
                    {/* Routing v6 */}
                    <main className="app__content">
                        <div className="app__toolbar" />
                        <Routes>
                            <Route path="/" element={<Movies />} />
                            <Route path="/profile/:id" element={<Profile />} />
                            <Route path="/movie/:id" element={<MovieInformation />} />
                            <Route path="/actors/:id" element={<Actors />} />
                            <Route path="*" element="Error 404" />\
                        </Routes>
                    </main>
                </BrowserRouter>
            </div>
        </ThemeProvider>
    );
}

export default App;
