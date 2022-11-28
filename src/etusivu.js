import "./App.css";
import React, { useState, useEffect } from "react";
import { getdata } from "./data";
import { RadioGroup, Radio, FormLabel, Card, Typography } from "@mui/material";

function Etusivu() {
  const [data, setData] = useState([]);
  const [kategoriaData, setKategoriaData] = useState([]);
  const [serverData, setServerData] = useState([]);
  const [dataStatus, setDataStatus] = useState(400);
  const [dataType, setDataType] = useState("Loading");

  useEffect(() => {
    getdata("http://localhost:3010/tasks")
      .then((res) => {
        setDataStatus(res.status);
        setServerData(res.data);
        console.log(res.data);
      })
      .catch(() => console.error("Error"));

    getdata("http://localhost:3010/kategoriat")
      .then((res) => {
        setKategoriaData(res.data);
      })
      .catch(() => console.error("Error"));

    showKategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataType]);

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

  const createKategoryButton = (kategoriat) => {
    const callChange = (event) => {
      if (event.target.checked) {
        setDataType(event.target.value);
      }
    };
    return kategoriat.map((d, i) => {
      return (
        <div key={"div" + i}>
          <FormLabel key={"label" + i}>{d.nimi}</FormLabel>
          <Radio
            key={"key" + i}
            name="kategory"
            value={d.nimi}
            onChange={callChange}
          ></Radio>
        </div>
      );
    });
  };

  return (
    <div className="content">
      <RadioGroup row className="select">
        {createKategoryButton(kategoriaData)}
      </RadioGroup>

      {mapArray(data, dataStatus)}
    </div>
  );
}

const CreateKategoryButton = (kategoriat) => {
  const [dataType, setDataType] = useState("Loading");
  const callChange = (event) => {
    if (event.target.checked) {
      setDataType(event.target.value);
    }
  };
  return kategoriat.map((d, i) => {
    return (
      <div key={"div" + i}>
        <FormLabel key={"label" + i}>{d.nimi}</FormLabel>
        <Radio
          key={"key" + i}
          name="kategory"
          value={d.nimi}
          onChange={callChange}
        ></Radio>
      </div>
    );
  });
};

const mapArray = (data, dataStatus) => {
  let allTasks = [];
  for (const value of data) {
    let oneTask = [];
    let objectKeysCount = Object.keys(value).length;
    for (let i = 0; i < objectKeysCount; i++) {
      oneTask.push(Object.keys(value)[i] + ": " + Object.values(value)[i]);
    }
    // console.log(oneTask);
    allTasks.push(oneTask);
  }

  if (dataStatus === 200)
    return allTasks.map((d, i) => {
      let onetask = d.map((d, i) => (
        <Typography variant="body2" key={i}>
          {d}
        </Typography>
      ));
      return (
        <div className="object" key={i}>
          <Card key={"card" + i} sx={{ padding: 3 }}>
            {onetask}
          </Card>
        </div>
      );
    });
  else {
    return <p>{dataStatus}</p>;
  }
};
export default Etusivu;
