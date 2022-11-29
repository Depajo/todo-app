import "./App.css";
import React, { useState, useEffect } from "react";
import { getdata, deletedata } from "./data";
import { RadioGroup, Button } from "@mui/material";
import { CreateKategoryRadiobox, MapArray } from "./myElements";
import MuokkaaTaskia from "./muokkaaTaskia";

function Etusivu() {
  const [data, setData] = useState([]);
  const [kategoriaData, setKategoriaData] = useState([]);
  const [serverData, setServerData] = useState([]);
  const [dataStatus, setDataStatus] = useState(400);
  const [dataType, setDataType] = useState("kaikki");
  const [editingPage, setEditingPage] = useState(-1);

  useEffect(() => {
    console.log(dataType);
    getdata("http://localhost:3010/tasks")
      .then((res) => {
        setDataStatus(res.status);
        setServerData(res.data);
        // console.log(res.data);
      })
      .catch(() => console.error("Error"));

    getdata("http://localhost:3010/kategoriat")
      .then((res) => {
        setKategoriaData(res.data);
      })
      .catch(() => console.error("Error"));
    showKategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataType, editingPage]);

  const showKategory = () => {
    let dataWhatShow = [];

    if (dataType.toLocaleLowerCase() === "kaikki") {
      dataWhatShow = serverData;
    } else {
      for (let index = 0; index < serverData.length; index++) {
        let d = serverData[index];
        for (let ki = 0; ki < d.kategoria.length; ki++) {
          if (d.kategoria[ki] === dataType) {
            dataWhatShow.push(d);
          }
        }
      }
    }
    setData(dataWhatShow);
  };

  const callChange = (event) => {
    console.log(event.target.value);
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
      console.log(kategoriaData[i].id);
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
        <MapArray data={data} dataStatus={dataStatus} editHandle={editHandle} />
        <Button
          variant="outlined"
          onClick={deletCategory}
          // startIcon={<DeleteIcon />}
          color="error"
        >
          Poista kategoria
        </Button>
      </div>
    );
  } else {
    return (
      <div className="content">
        <MuokkaaTaskia
          data={data[editingPage]}
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
