import React, { useState } from "react";
import "./App.css";
import { CreateCategoryCheckbox } from "./myElements";
import { TextField, Button } from "@mui/material/";
import { patchdata, deletedata } from "./data";
import DeleteIcon from "@mui/icons-material/Delete";

function MuokkaaTaskia(props) {
    const [task] = useState(props.editingTaskId);
    const [category, editCategory] = useState([]);
    const [taskName, setTaskName] = useState("");

    // Muokkaa tehtävää ja sulje ikkuna ja päivitä data
    const editTask = () => {
        if (taskName === "" || category.length === 0) {
            alert(
                "Täytä kaikki kentät! Tehtävällä täytyy olla nimi ja kategoria."
            );
        } else {
            patchdata("https://todo-api-n4pi.onrender.com/tasks/" + task.id, {
                tehtävä: taskName,
                kategoria: category,
            });
            props.setOpen(false);
        }
        // props.setDataType("");
    };

    // Muokkaa kategorioita joita tehtävällä on.
    // Lisää se categoria tehtävälle tai poista categoria jos se on sillä tehtävällä.
    const editTaskCategoryHandel = (event) => {
        if (event.target.checked) {
            category.push(event.target.value);
        } else {
            let arr = [];
            category.forEach((element, i) => {
                if (event.target.value === element) {
                } else {
                    arr.push(element);
                }
            });
            editCategory(arr);
        }
    };

    // Muokkaa tehtävän nimeä
    const editTaskNameHandel = (event) => {
        setTaskName(event.target.value);
    };

    // Poista tehtävä
    const deletTask = () => {
        deletedata("https://todo-api-n4pi.onrender.com/tasks/" + task.id);
        props.setOpen(false);
        props.setDataType("");
    };

    return (
        <div className="editView">
            <div className="content">
                <h1>Muokkaa Tehtävää</h1>
                <h4>Muokkaa tehtävä:</h4>
                <TextField
                    sx={{ width: 300 }}
                    label={task.tehtävä}
                    variant="outlined"
                    onChange={editTaskNameHandel}
                    value={taskName}
                />
                <h3 style={{ marginBottom: 0 }}>Kategoriat</h3>
                <div className="container-muokkaaKategoria">
                    <div className="muiCheckboxGroup">
                        <h4 style={{ marginTop: 0 }}>Uudet:</h4>
                        <CreateCategoryCheckbox
                            name="kategoriat"
                            newTaskHandel={editTaskCategoryHandel}
                            categorys={props.categoryData}
                            checked={false}
                            disabled={false}
                        />
                    </div>
                    <div className="muiCheckboxGroup">
                        <h4 style={{ marginTop: 0 }}>Vanhat:</h4>
                        <CreateCategoryCheckbox
                            name="vanhatkategoriat"
                            categorys={props.categoryData}
                            checked={task.kategoria}
                            disabled={true}
                        />
                    </div>
                </div>
                <div className="edit-buttons">
                    <Button
                        sx={{ marginRight: 1, bgcolor: "#35739E" }}
                        variant="contained"
                        onClick={editTask}
                    >
                        Muokkaa
                    </Button>
                    <Button
                        sx={{ marginRight: 1, color: "#35739E" }}
                        variant="outlined"
                        onClick={props.closeEditing}
                    >
                        Peruuta
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={deletTask}
                        startIcon={<DeleteIcon />}
                        color="error"
                    >
                        Poista
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default MuokkaaTaskia;
