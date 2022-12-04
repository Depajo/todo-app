import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Etusivu from "./etusivu.js";
import ErrorSivu from "./errorSivu";
import Tietoa from "./tietoa";
import Lisaa from "./lisaa";
import { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function App() {
  const [menuBarShow, setMenuBarShow] = useState("none");

  const buttonHanlder = () =>
    menuBarShow === "none" ? setMenuBarShow("block") : setMenuBarShow("none");

  return (
    <BrowserRouter className="browserRouter">
      <AppBar sx={{ bgcolor: "#35739E" }} position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 3, padding: 4 }}
            onClick={buttonHanlder}
          >
            <MenuIcon sx={{ fontSize: "large" }} />
          </IconButton>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Todo
          </Typography>
        </Toolbar>

        <menu style={{ display: menuBarShow }}>
          <Link className="menuButton" to={"/"} onClick={buttonHanlder}>
            Etusivu
          </Link>
          <Link className="menuButton" to={"/lisaa"} onClick={buttonHanlder}>
            Lisää
          </Link>
          <Link className="menuButton" to={"/tietoa"} onClick={buttonHanlder}>
            Tietoa
          </Link>
        </menu>
      </AppBar>
      <Routes>
        <Route path="/" element={<Etusivu />} t />
        <Route path="/lisaa" element={<Lisaa />} />
        <Route path="/tietoa" element={<Tietoa />} />
        <Route path="*" element={<ErrorSivu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
