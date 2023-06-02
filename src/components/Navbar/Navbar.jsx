import { useState } from 'react';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import {
    AppBar,
    Avatar,
    Button,
    Drawer,
    IconButton,
    Toolbar,
    useMediaQuery,
} from '@mui/material';

import { Link } from 'react-router-dom';

import Search from '../Search/Search';
import Sidebar from '../Sidebar/Sidebar';

import './Navbar.css';

function Navbar({ isDarkTheme, changeTheme }) {
    const isMobile = useMediaQuery('(max-width:660px)');
    const isAuthenticated = false;
    const [mobileOpen, setMobileOpen] = useState(false);
    return (
        <>
            <AppBar className="navbar" position="fixed">
                <Toolbar className="navbar__toolbar">
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            edge="start"
                            style={{ outline: 'none' }}
                            onClick={() =>
                                setMobileOpen((prevMobileOpen) => !prevMobileOpen)
                            }
                            className="navbar__menu-button"
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

                    <IconButton
                        onClick={() => changeTheme()}
                        color="inherit"
                        sx={{ ml: 1 }}
                    >
                        {isDarkTheme ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                    {!isMobile && <Search />}
                    <div>
                        {!isAuthenticated ? (
                            <Button className="navbar__login-button" color="inherit">
                                Войти
                            </Button>
                        ) : (
                            <Button
                                component={Link}
                                to={`/profile/:id`}
                                onClick={() => {}}
                                color="inherit"
                                className="navbar__profile-button"
                            >
                                {!isMobile && <>Мои фильмы &nbsp;</>}
                                <Avatar
                                    style={{ width: 30, height: 30 }}
                                    alt="Profile"
                                    src="https://i.pinimg.com/564x/f0/64/94/f064946a8b0bc0d06dc4fdbca4ede142.jpg"
                                />
                            </Button>
                        )}
                    </div>
                    {isMobile && <Search />}
                </Toolbar>
            </AppBar>
            <div>
                <nav className="nav">
                    {isMobile ? (
                        <Drawer
                            variant="temporary"
                            anchor="left"
                            open={mobileOpen}
                            onClose={() =>
                                setMobileOpen((prevMobileOpen) => !prevMobileOpen)
                            }
                            className="nav__drawer"
                            classes={{ paper: 'nav__drawer-paper' }}
                            ModalProps={{ keepMounted: true }}
                        >
                            <Sidebar
                                className="sidebar"
                                isDarkTheme={isDarkTheme}
                                setMobileOpen={setMobileOpen}
                            />
                        </Drawer>
                    ) : (
                        <Drawer
                            classes={{ paper: 'nav__drawer-paper' }}
                            variant="permanent"
                            open
                        >
                            <Sidebar
                                isDarkTheme={isDarkTheme}
                                setMobileOpen={setMobileOpen}
                            />
                        </Drawer>
                    )}
                </nav>
            </div>
        </>
    );
}

export default Navbar;
