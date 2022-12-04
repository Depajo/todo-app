import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Etusivu from "./etusivu.js";
import ErrorSivu from "./errorSivu";
import Tietoa from "./tietoa";
import Lisaa from "./lisaa";
import Tehtava from "./tehtava";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Margin } from "@mui/icons-material";
import { margin, maxWidth } from "@mui/system";

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
            sx={{ padding: 4 }}
            onClick={buttonHanlder}
          >
            <MenuIcon sx={{ fontSize: "large" }} />
          </IconButton>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, textAlign: "right" }}
          >
            Todo
          </Typography>
        </Toolbar>

        <menu style={{ display: menuBarShow }}>
          <MenuItem>
            <Button
              sx={{
                color: "#fff",
                padding: 2,
                margin: "auto",
                width: "100%",
                textAlign: "left",
                justifyContent: "left",
                borderColor: "#fff",
              }}
              variant="outlined"
              href="/"
            >
              Etusivu
            </Button>
          </MenuItem>
          <MenuItem sx={{ fontSize: 20 }}>
            <Button
              sx={{
                color: "#fff",
                padding: 2,
                margin: "auto",
                width: "100%",
                textAlign: "left",
                justifyContent: "left",
                borderColor: "#fff",
              }}
              variant="outlined"
              href="/lisaa"
            >
              Lisää
            </Button>
          </MenuItem>
          <MenuItem sx={{ fontSize: 20 }}>
            <Button
              sx={{
                color: "#fff",
                padding: 2,
                margin: "auto",
                width: "100%",
                textAlign: "left",
                justifyContent: "left",
                borderColor: "#fff",
              }}
              variant="outlined"
              href="/tietoa"
            >
              Tietoa
            </Button>
          </MenuItem>
        </menu>
      </AppBar>
      <Routes>
        <Route path="/" element={<Etusivu />} t />
        <Route path="/tehtava/:id" element={<Tehtava />} />
        <Route path="/lisaa" element={<Lisaa />} />
        <Route path="/tietoa" element={<Tietoa />} />
        <Route path="*" element={<ErrorSivu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
