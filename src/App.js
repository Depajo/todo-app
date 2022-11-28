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

  const buttonHanlder = () => {
    console.log(menuBarShow);
    return menuBarShow === "none"
      ? setMenuBarShow("block")
      : setMenuBarShow("none");
  };

  return (
    <BrowserRouter>
      <div>
        <button onClick={buttonHanlder} className="navButton">
          <img className="navIcon" src={navIcon} alt="menu" />
        </button>
        <menu className="mobileMenu" style={{ display: menuBarShow }}>
          <Link className="menuButton" to={"/"}>
            Etusivu
          </Link>
          <Link className="menuButton" to={"/tietoa"}>
            Tietoa
          </Link>
          <Link className="menuButton" to={"/lisaa"}>
            Lisää
          </Link>
        </menu>
      </div>
      <Routes>
        <Route path="/" element={<Etusivu />} t />
        <Route path="/tietoa" element={<Tietoa />} />
        <Route path="/lisaa" element={<Lisaa />} />
        <Route path="*" element={<ErrorSivu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
