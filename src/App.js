import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Etusivu from "./etusivu.js";
import ErrorSivu from "./errorSivu";
import Tietoa from "./tietoa";
import Lisaa from "./lisaa";
import { useState } from "react";
import navIcon from "./menu_nav_icon.png";

function App() {
  const [menuBarShow, setMenuBarShow] = useState("none");

  const buttonHanlder = () =>
    menuBarShow === "none" ? setMenuBarShow("block") : setMenuBarShow("none");

  return (
    <BrowserRouter className="browserRouter">
      <button onClick={buttonHanlder} className="navButton">
        <img className="navIcon" src={navIcon} alt="menu" />
      </button>
      <div className="mobileMenu">
        <h1>TODO</h1>
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
      </div>
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
