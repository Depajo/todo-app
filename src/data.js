import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function Data(props) {
  const [data, setData] = useState("");
  const [dataStatus, setDataStatus] = useState(400);
  const dataType = props.dataType.inputValue;

  useEffect(() => {
    async function getdata(type) {
      let res = await axios.get("http://localhost:3010/" + type);
      setDataStatus(res.status);
      return res;
    }

    async function getAllData() {
      let datatypes = await dataType.toString().split(",");
      console.log(datatypes);
      let allData = [];
      for (let index = 0; index < datatypes.length; index++) {
        let res = await getdata(datatypes[index]).catch(() =>
          console.error("Error")
        );
        allData.push(res.data);
      }
      setData(allData);
    }
    getAllData();
  }, [dataType]);

  const mapArray = () => {
    let allTasks = [];
    for (let i = 0; i < data.length; i++) {
      for (const value of data[i]) {
        let oneTask = [];
        let objectKeysCount = Object.keys(value).length;
        for (let i = 0; i < objectKeysCount; i++) {
          oneTask.push(Object.keys(value)[i] + ": " + Object.values(value)[i]);
        }
        allTasks.push(oneTask);
      }
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

  return <div>{mapArray()}</div>;
}

export default Data;
