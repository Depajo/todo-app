import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Etusivu from "./mainPage";
import ErrorSivu from "./errorSivu";
import Tietoa from "./infoPage";
import Lisaa from "./addPage";
import Tehtava from "./taskPage";
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
import TimeSearch from "./timeSearch";

function App() {
    const [menuBarShow, setMenuBarShow] = useState("none");

    const buttonHanlder = () =>
        menuBarShow === "none"
            ? setMenuBarShow("block")
            : setMenuBarShow("none");

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

                <div style={{ display: menuBarShow }}>
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
                            href="/addPage"
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
                            href="/time"
                        >
                            Yhteenveto
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
                            href="/infoPage"
                        >
                            Tietoa
                        </Button>
                    </MenuItem>
                </div>
            </AppBar>
            <Routes>
                <Route path="/" element={<Etusivu />} t />
                <Route path="/time" element={<TimeSearch />} />
                <Route path="/tehtava/:id" element={<Tehtava />} />
                <Route path="/addPage" element={<Lisaa />} />
                <Route path="/infoPage" element={<Tietoa />} />
                <Route path="*" element={<ErrorSivu />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
