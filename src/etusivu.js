import "./App.css";
import React, { useState, useEffect } from "react";
import { getdata, deletedata } from "./data";
import { RadioGroup, Button } from "@mui/material";
import {
  CreateKategoryRadiobox,
  mapArr,
  showKategory,
  TaskCard,
} from "./myElements";
import MuokkaaTaskia from "./muokkaaTaskia";

function Etusivu() {
  const [kategoriaData, setKategoriaData] = useState([]);
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
        setKategoriaData(res.data);
      })
      .catch(() => console.error("Error"));
  }, [dataType, editingPage]);

  const objTasks = showKategory(dataType, serverData);
  const arrTasks = mapArr(objTasks);

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
    for (let i = 0; i < kategoriaData.length; i++) {
      if (kategoriaData[i].nimi === dataType) {
        if (kategoriaData[i].id === 1) {
          alert("Et voi poistaa tätä kategoriaa");
        } else {
          deletedata("http://localhost:3010/kategoriat/" + kategoriaData[i].id);
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
          <CreateKategoryRadiobox
            kategoriat={kategoriaData}
            callChange={callChange}
          />
        </RadioGroup>
        {arrTasks.map((task, i) => (
          <TaskCard key={i} task={task} index={i} editHandle={editHandle} />
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
          kategoriaData={kategoriaData}
          closeEditing={closeEditing}
          setEditingPage={setEditingPage}
          setDataType={setDataType}
        />
      </div>
    );
  }
}

export default Etusivu;
