import React, { useState } from "react";
import "./App.css";
import { CreateKategoryCheckbox } from "./myElements";
import { TextField, Button } from "@mui/material/";
import { putdata } from "./data";

function MuokkaaTaskia(props) {
  const [category, editCategory] = useState([]);
  const [taskName, setTaskName] = useState([]);

  // useEffect(() => {
  //   console.log("käyty muokkaa");
  // }, []);

  const editTask = () => {
    console.log(props.data.id);
    putdata("http://localhost:3010/tasks/" + props.data.id, {
      tehtävä: taskName,
      kategoria: category,
    });
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

  return (
    <div className="editView">
      <Button onClick={props.closeEditing}>Sulje</Button>
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

        <Button variant="contained" onClick={editTask}>
          Muokkaa
        </Button>
      </div>
    </div>
  );
}

export default MuokkaaTaskia;
