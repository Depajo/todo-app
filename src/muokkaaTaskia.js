import React, { useState } from "react";
import "./App.css";
import { CreateCategoryCheckbox } from "./myElements";
import { TextField, Button } from "@mui/material/";
import { putdata, deletedata } from "./data";
import DeleteIcon from "@mui/icons-material/Delete";

function MuokkaaTaskia(props) {
  const [task] = useState(props.editingTaskId);

  console.log(task);
  const [category, editCategory] = useState([]);
  const [taskName, setTaskName] = useState("");

  const editTask = () => {
    putdata("http://localhost:3010/tasks/" + task.id, {
      tehtävä: taskName,
      kategoria: category,
      prioriteetti: 0,
    });
    props.setOpen(false);
    props.setDataType("");
  };

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

  const editTaskNameHandel = (event) => {
    console.log(event.target.value);
    setTaskName(event.target.value);
  };

  const deletTask = () => {
    deletedata("http://localhost:3010/tasks/" + task.id);
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
