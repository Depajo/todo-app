import React, { useEffect } from "react";
import { useState } from "react";
import { HelpText } from "./myElements";
import {
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
} from "@mui/material";
import { getdata, deletedata } from "./data";

function Selector(props) {
    const [loading, setLoading] = useState(true);

    // Haetaan kategoriat
    useEffect(() => {
        // console.log("Selector useEffect");
        // console.log("dataType: ", propsdataType);
        // console.log("order: ", order);

        getdata("http://localhost:3010/kategoriat").then((res) => {
            // console.log("res.data: ", res.data);
            props.setCategoryData(res.data);
            setLoading(false);
        });
    }, [props.dataType, props.order, props.open]);

    // Muutetaan kategoriaa
    const callChangeDataType = (event) => {
        props.setDataType(event.target.value);
    };

    // Muutetaan järjestystä
    const callChangeOrder = (event) => {
        props.setOrder(event.target.value);
    };

    // Poistetaan kategoria
    const deletCategory = () => {
        for (let i = 0; i < props.categoryData.length; i++) {
            if (props.categoryData[i].nimi === props.dataType) {
                if (props.categoryData[i].id === 1) {
                    alert("Et voi poistaa tätä kategoriaa");
                } else {
                    deletedata(
                        "http://localhost:3010/kategoriat/" +
                            props.categoryData[i].id
                    );
                    props.setDataType("");
                    alert("Kategoria poistettu");
                }
            }
        }
    };

    // Jos dataa ei ole vielä ladattu
    if (loading) {
        return <div>loading...</div>;
    } else {
        // Jos data on ladattu
        return (
            <div className="content">
                <h1>Valitse näkymä</h1>
                <HelpText dataType={props.dataType} order={props.order} />
                <div style={{ display: "flex" }}>
                    <Paper
                        sx={{
                            margin: 1,
                            display: "flex",
                            flexDirection: "row-reverse",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <FormControl sx={{ margin: 2 }}>
                                <InputLabel>Järjestys</InputLabel>
                                <Select
                                    onChange={callChangeOrder}
                                    value={props.order}
                                    label="Järjestys"
                                    sx={{ minWidth: 250 }}
                                >
                                    <MenuItem value={"prioriteetti"}>
                                        Oma Prioriteetti
                                    </MenuItem>
                                    <MenuItem value={"aakkosjärjestys"}>
                                        Aakkosjärjestyksessä
                                    </MenuItem>
                                    <MenuItem value={"uusin ensin"}>
                                        Uusin ensin
                                    </MenuItem>
                                    <MenuItem value={"vanhin ensin"}>
                                        Vanhin ensin
                                    </MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl sx={{ margin: 2 }}>
                                <InputLabel>Kategoria</InputLabel>
                                <Select
                                    onChange={callChangeDataType}
                                    value={props.dataType}
                                    label="Kategoria"
                                    sx={{ minWidth: 250 }}
                                >
                                    {props.categoryData.map((d, i) => (
                                        <MenuItem key={i} value={d.nimi}>
                                            {d.nimi}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </Paper>
                </div>
                {props.dataType === "Kaikki" || props.dataType === "" ? (
                    <div></div>
                ) : (
                    <Button
                        sx={{
                            margin: 0,
                            marginBottom: 1,
                        }}
                        variant="outlined"
                        onClick={deletCategory}
                        color="error"
                    >
                        Poista kategoria
                    </Button>
                )}
            </div>
        );
    }
}

export default Selector;
