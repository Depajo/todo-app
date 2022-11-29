import "./App.css";
import React, { useState, useEffect } from "react";
import { getdata } from "./data";
import { RadioGroup } from "@mui/material";
import { CreateKategoryRadiobox, MapArray } from "./myElements";
import MuokkaaTaskia from "./muokkaaTaskia";

function Etusivu() {
  const [data, setData] = useState([]);
  const [kategoriaData, setKategoriaData] = useState([]);
  const [serverData, setServerData] = useState([]);
  const [dataStatus, setDataStatus] = useState(400);
  const [dataType, setDataType] = useState("Loading");
  const [editingPage, setEditingPage] = useState(-1);

  useEffect(() => {
    console.log("käyty");
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
  if (editingPage === -1) {
    return (
      <div className="content">
        <RadioGroup row className="select">
          <CreateKategoryRadiobox
            kategoriat={kategoriaData}
            callChange={callChange}
          />
        </RadioGroup>
        <MapArray data={data} dataStatus={dataStatus} editHandle={editHandle} />
      </div>
    );
  } else {
    return (
      <div className="content">
        <MuokkaaTaskia
          data={data[editingPage]}
          kategoriaData={kategoriaData}
          closeEditing={closeEditing}
        />
      </div>
    );
  }
}

export default Etusivu;
