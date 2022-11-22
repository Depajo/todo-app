import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function Server(props) {
  const [data, setData] = useState("");
  const [dataStatus, setDataStatus] = useState(400);
  const dataType = props.dataType.inputValue;

  useEffect(() => {
    async function getdata() {
      let res = await axios.get("http://localhost:3010/" + dataType);
      setDataStatus(res.status);
      setData(res.data);
    }
    getdata().catch(() => console.error("Error"));
  }, [dataType]);

  const mapArray = () => {
    let myarr = [];
    for (const value of data) {
      myarr.push(Object.values(value));
    }

    if (dataStatus === 200)
      return myarr.map((data, i) => <p key={i}>{data.toString()}</p>);
    else {
      return "Loading...";
    }
  };

  return <div>{mapArray()}</div>;
}

export default Server;
