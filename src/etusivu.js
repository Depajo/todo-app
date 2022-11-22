import "./App.css";
import React, { useState } from "react";
import Server from "./server";

function Etusivu(props) {
  const [inputValue, setInputValue] = useState("newtask");

  const call = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="content">
      <div className="container-1">
        <select onChange={call} id="selection">
          <option value={"newtask"}>Tasks</option>
          <option value={"comments"}>Comments</option>
        </select>
      </div>
      <div className="container-1">
        <Server dataType={{ inputValue }} />
      </div>
    </div>
  );
}

export default Etusivu;
