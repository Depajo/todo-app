import "./App.css";
import React, { useState } from "react";
import Data from "./data";

function Etusivu(props) {
  const [inputValue, setInputValue] = useState([
    "koulu",
    "kissanhoito",
    "koti",
  ]);

  const callChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="content">
      <div className="select">
        <select onChange={callChange} id="selection">
          <option value={["koulu", "kissanhoito", "koti"]}>All</option>
          <option value={["koulu"]}>Koulu</option>
          <option value={["koti"]}>Koti</option>
          <option value={["kissanhoito"]}>Kissanhoito</option>
        </select>
      </div>
      <div className="container-1">
        <Data dataType={{ inputValue }} />
      </div>
    </div>
  );
}

export default Etusivu;
