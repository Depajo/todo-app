import "./App.css";
import { TextField, Button } from "@mui/material/";
import React, { useEffect, useState } from "react";
import { getdata, postdata } from "./data";
import { CreateCategoryCheckbox, checkValueIsSame } from "./myElements";

function Lisaa() {
  const [categoryData, setCategoryData] = useState([]);

  const [newCategory, setNewCategory] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState([]);
  const [newTaskName, setNewTaskName] = useState("");

  useEffect(() => {
    getdata("http://localhost:3010/kategoriat")
      .then((res) => {
        setCategoryData(res.data);
      })
      .catch(() => console.error("Error"));
  }, [newCategory]);

  const newCategoryHandel = (event) => {
    setNewCategory(event.target.value);
  };

  const addNewCategory = () => {
    let addCategory = true;

    categoryData.forEach((e, i) => {
      setNewCategory("");
      if (addCategory) {
        addCategory = checkValueIsSame(newCategory, categoryData[i].nimi);
      }
    });
    if (addCategory) {
      postdata("http://localhost:3010/kategoriat", { nimi: newCategory });
      alert("Kategoria lisätty");
      setNewCategory("");
    } else {
      alert("Kategoria on jo olemassa tai\nyrität lisästä tyhjää kategoriaa");
    }
  };

  const newTaskHandel = (event) => {
    if (event.target.checked) {
      newTaskCategory.push(event.target.value);
    } else {
      let arr = [];
      newTaskCategory.forEach((element, i) => {
        if (event.target.value === element) {
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
    alert("Tehtävä lisätty");
    setNewTaskName("");
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
            value={newTaskName}
          />

          <div className="muiCheckboxGroup">
            <CreateCategoryCheckbox
              name="kategoriat"
              newTaskHandel={newTaskHandel}
              categorys={categoryData}
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
              value={newCategory}
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
