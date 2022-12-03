import "./App.css";
import React, { useState, useEffect } from "react";
import { getdata, deletedata } from "./data";
import { RadioGroup, Button } from "@mui/material";
import { CreateCategoryRadiobox, showCategory, TaskCard } from "./myElements";
import MuokkaaTaskia from "./muokkaaTaskia";

function Etusivu() {
  const [categoryData, setCategoryData] = useState([]);
  const [serverData, setServerData] = useState([]);
  const [dataType, setDataType] = useState("");
  const [editingPage, setEditingPage] = useState(-1);

  useEffect(() => {
    getdata("http://localhost:3010/tasks")
      .then((res) => {
        setServerData(res.data);
      })
      .catch(() => console.error("Error"));

    getdata("http://localhost:3010/kategoriat")
      .then((res) => {
        setCategoryData(res.data);
      })
      .catch(() => console.error("Error"));
  }, [dataType, editingPage]);

  const objTasks = showCategory(dataType, serverData);

  const callChange = (event) => {
    if (event.target.checked) {
      setDataType(event.target.value);
    }
  };

  const closeEditing = () => setEditingPage(-1);

  const editHandle = (i) => {
    setEditingPage(i);
  };

  const deletCategory = () => {
    for (let i = 0; i < categoryData.length; i++) {
      if (categoryData[i].nimi === dataType) {
        if (categoryData[i].id === 1) {
          alert("Et voi poistaa tätä kategoriaa");
        } else {
          deletedata("http://localhost:3010/kategoriat/" + categoryData[i].id);
          setDataType("");
          alert("Kategoria poistettu");
        }
      }
    }
  };

  if (editingPage === -1) {
    return (
      <div className="content">
        <h4 style={{ marginBottom: 6 }}>Valitse kategoria:</h4>
        <RadioGroup row className="select">
          <CreateCategoryRadiobox
            categorys={categoryData}
            callChange={callChange}
          />
        </RadioGroup>

        {objTasks.map((task, i) => (
          <TaskCard key={i} onetask={task} index={i} editHandle={editHandle} />
        ))}

        <Button variant="outlined" onClick={deletCategory} color="error">
          Poista kategoria
        </Button>
      </div>
    );
  } else {
    return (
      <div className="content">
        <MuokkaaTaskia
          data={objTasks[editingPage]}
          categoryData={categoryData}
          closeEditing={closeEditing}
          setEditingPage={setEditingPage}
          setDataType={setDataType}
        />
      </div>
    );
  }
}

export default Etusivu;
