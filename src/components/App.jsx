import React from "react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components
import { Actors, MovieInformation, Movies, Navbar, Profile } from "./index";
import "./App.css";
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        {/* CssBaseline - Global Reset */}
        <CssBaseline />
        <Navbar />
        {/* Routing v6 */}
        <main className="app__content">
          <div className="app__toolbar" />
          <Routes>
            <Route path="/" element={<Movies />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/movie/:id" element={<MovieInformation />} />
            <Route path="/actors/:id" element={<Actors />} />
            <Route path="*" element="Error 404" />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
