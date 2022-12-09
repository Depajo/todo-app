import React, { useEffect, useState } from "react";
import { FormLabel, Checkbox, Radio } from "@mui/material/";

const CreateCategoryCheckbox = (props) => {
  const isChecked = (name) => {
    for (let i = 0; i < props.checked.length; i++) {
      if (props.checked[i] === name) {
        return true;
      }
    }
  };

  return props.categorys.map((d, i) => {
    return (
      <div key={"div" + i}>
        <FormLabel key={"label" + i}>{d.nimi}</FormLabel>
        <Checkbox
          key={"key" + i}
          name={props.name}
          value={d.nimi}
          onChange={props.newTaskHandel}
          checked={isChecked(d.nimi)}
          disabled={props.disabled}
        ></Checkbox>
      </div>
    );
  });
};

const CreateCategoryRadiobox = (props) => {
  return props.categorys.map((d, i) => {
    return (
      <div key={"div" + i}>
        <FormLabel key={"label" + i}>{d.nimi}</FormLabel>
        <Radio
          key={"key" + i}
          name="kategory"
          value={d.nimi}
          onChange={props.callChange}
        ></Radio>
      </div>
    );
  });
};

const HelpText = (props) => {
  const [helpText, setHelpText] = useState("");

  useEffect(() => {
    if (props.dataType === "") {
      setHelpText("Valitse Kategoria:");
    } else if (props.order === "") {
      setHelpText("Valitse Järjestys:");
    } else {
      setHelpText("");
    }
  }, [helpText, props.dataType, props.order]);

  return <h3 style={{ color: "#ff3333", marginBottom: 0 }}>{helpText}</h3>;
};

export { CreateCategoryCheckbox, CreateCategoryRadiobox, HelpText };
