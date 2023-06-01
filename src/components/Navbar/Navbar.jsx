import { useState } from "react";
import "./Navbar.css";
//MUI
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import Sidebar from "../Sidebar/Sidebar";
import { fetchToken } from "../../app/utils";
//ROUTER
import { Link } from "react-router-dom";
import Search from "../Search/Search";
function Navbar({ isDarkTheme, changeTheme }) {
  const isMobile = useMediaQuery("(max-width:600px)");
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
              style={{ outline: "none" }}
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              className="navbar__menu-button"
            >
              <MenuIcon />
            </IconButton>
          )}

          <IconButton onClick={() => changeTheme()} color="inherit" sx={{ ml: 1 }}>
            {isDarkTheme ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button className="navbar__login-button" onClick={fetchToken} color="inherit">
                Войти
              </Button>
            ) : (
              <Button component={Link} to={`/profile/:id`} onClick={() => {}} color="inherit" className="navbar__profile-button">
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
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              className="nav__drawer"
              classes={{ paper: "nav__drawer-paper" }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar className="sidebar" isDarkTheme={isDarkTheme} setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer classes={{ paper: "nav__drawer-paper" }} variant="permanent" open>
              <Sidebar isDarkTheme={isDarkTheme} setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
}

export default Navbar;
