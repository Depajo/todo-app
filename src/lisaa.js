import "./App.css";
import { TextField, Button } from "@mui/material/";
import React, { useEffect, useState } from "react";
import { getdata, postdata } from "./data";
import { CreateKategoryCheckbox } from "./myElements";

function Lisaa() {
  const [categoryData, setCategoryData] = useState([]);

  const [newCategory, setNewKategoria] = useState();

  const [newTaskCategory, setNewTaskCategory] = useState([]);
  const [newTaskName, setNewTaskName] = useState();

  useEffect(() => {
    getdata("http://localhost:3010/kategoriat")
      .then((res) => {
        setCategoryData(res.data);
      })
      .catch(() => console.error("Error"));
  }, []);

  const newCategoryHandel = (event) => {
    setNewKategoria(event.target.value);
  };

  const addNewCategory = () => {
    postdata("http://localhost:3010/kategoriat", { nimi: newCategory })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  const newTaskHandel = (event) => {
    if (event.target.checked) {
      newTaskCategory.push(event.target.value);
    } else {
      let arr = [];
      newTaskCategory.forEach((element, i) => {
        console.log(element);

        if (event.target.value === element) {
          console.log("löyty " + element + " " + i);
        } else {
          arr.push(element);
        }
      });
      setNewTaskCategory(arr);
    }
  };

  const newTaskNameHandel = (event) => {
    setNewTaskName(event.target.value);
  };

  const addNewTask = () => {
    postdata("http://localhost:3010/tasks/", {
      tehtävä: newTaskName,
      kategoria: newTaskCategory,
    });
  };

  return (
    <div className="content">
      <div className="container">
        <div className="container-1">
          <h1>Lisää tehtävä</h1>
          <TextField
            sx={{ width: 300 }}
            label="Tehtävä"
            variant="outlined"
            onChange={newTaskNameHandel}
          />
          <div className="muiCheckboxGroup">
            <CreateKategoryCheckbox
              name="kategoriat"
              newTaskHandel={newTaskHandel}
              kategoriat={categoryData}
              checked={false}
              disabled={false}
            />
          </div>
          <Button variant="contained" onClick={addNewTask}>
            Lisää
          </Button>
        </div>

        <div className="container-2">
          <h1>Lisää kategoria</h1>
          <div className="muiTextField">
            <TextField
              label="Kategoria"
              variant="outlined"
              sx={{ width: 300 }}
              onChange={newCategoryHandel}
            />
          </div>
          <Button variant="contained" className="n" onClick={addNewCategory}>
            Lisää
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Lisaa;
