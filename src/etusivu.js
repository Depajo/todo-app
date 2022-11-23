import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

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
          <label key={"label" + i}>{d.nimi}</label>
          <input
            key={"key" + i}
            type="radio"
            name="kategory"
            value={d.nimi}
            onChange={callChange}
          ></input>
        </div>
      );
    });
  };

  return (
    <div className="content">
      <h1>TODO</h1>
      <div className="select">{createKategoryButton(kategoriaData)}</div>
      {mapArray(data, dataStatus)}
    </div>
  );
}

const getdata = async function (url) {
  let res = await axios.get(url);
  return res;
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
      let onetask = d.map((d, i) => <p key={i}>{d}</p>);
      return (
        <div className="object" key={i}>
          {onetask}
        </div>
      );
    });
  else {
    return <p>{dataStatus}</p>;
  }
};

export default Etusivu;
