import React, { useState } from "react";
import "./App.css";
import { CreateKategoryCheckbox } from "./myElements";
import { TextField, Button } from "@mui/material/";
import { putdata, deletedata } from "./data";
import DeleteIcon from "@mui/icons-material/Delete";
import { margin } from "@mui/system";

function MuokkaaTaskia(props) {
  const [category, editCategory] = useState([]);
  const [taskName, setTaskName] = useState([]);

  const editTask = () => {
    console.log(props.data.id);
    putdata("http://localhost:3010/tasks/" + props.data.id, {
      tehtävä: taskName,
      kategoria: category,
    });
    props.setEditingPage(-1);
    props.setDataType("");
  };

  const editTaskCategoryHandel = (event) => {
    if (event.target.checked) {
      category.push(event.target.value);
    } else {
      let arr = [];
      category.forEach((element, i) => {
        console.log(element);
        if (event.target.value === element) {
          console.log("löyty " + element + " " + i);
        } else {
          arr.push(element);
        }
      });
      editCategory(arr);
    }
  };

  const editTaskNameHandel = (event) => {
    setTaskName(event.target.value);
  };

  const deletTask = () => {
    deletedata("http://localhost:3010/tasks/" + props.data.id);
    props.setEditingPage(-1);
    props.setDataType("");
  };

  return (
    <div className="editView">
      <div className="content">
        <h1>Muokkaa Tehtävää</h1>
        <h4>Muokkaa tehtävä:</h4>
        <TextField
          sx={{ width: 300 }}
          label={props.data.tehtävä}
          variant="outlined"
          onChange={editTaskNameHandel}
        />
        <h3 style={{ marginBottom: 0 }}>Kategoriat</h3>
        <div className="container-muokkaaKategoria">
          <div className="muiCheckboxGroup">
            <h4 style={{ marginTop: 0 }}>Uudet:</h4>
            <CreateKategoryCheckbox
              name="kategoriat"
              newTaskHandel={editTaskCategoryHandel}
              kategoriat={props.kategoriaData}
              checked={false}
              disabled={false}
            />
          </div>
          <div className="muiCheckboxGroup">
            <h4 style={{ marginTop: 0 }}>Vanhat:</h4>
            <CreateKategoryCheckbox
              name="vanhatkategoriat"
              kategoriat={props.kategoriaData}
              checked={props.data.kategoria}
              disabled={true}
            />
          </div>
        </div>
        <div className="edit-buttons">
          <Button
            sx={{ marginRight: 1 }}
            variant="contained"
            onClick={editTask}
          >
            Muokkaa
          </Button>
          <Button
            sx={{ marginRight: 1 }}
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
