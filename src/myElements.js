import React, { useState } from "react";
import {
  FormLabel,
  Checkbox,
  Radio,
  Card,
  Typography,
  Button,
} from "@mui/material/";

const CreateKategoryCheckbox = (props) => {
  const isChecked = (nimi) => {
    for (let i = 0; i < props.checked.length; i++) {
      if (props.checked[i] === nimi) {
        return true;
      }
    }
  };

  return props.kategoriat.map((d, i) => {
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

const CreateKategoryRadiobox = (props) => {
  return props.kategoriat.map((d, i) => {
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

const TaskCard = (props) => {
  return (
    <div className="object" key={props.indexi}>
      <Card key={"card" + props.index} sx={{ padding: 3 }}>
        {props.onetask}
        <Button onClick={() => props.editHandle(props.index)} variant="text">
          Muokkaa
        </Button>
      </Card>
    </div>
  );
};

const MapArray = (props) => {
  let allTasks = [];

  for (const value of props.data) {
    let oneTask = [];
    let objectKeysCount = Object.keys(value).length;
    for (let i = 0; i < objectKeysCount; i++) {
      oneTask.push(Object.keys(value)[i] + ": " + Object.values(value)[i]);
    }
    // console.log(oneTask);
    allTasks.push(oneTask);
  }
  console.log(allTasks);
  if (props.dataStatus === 200)
    return allTasks.map((task, i) => {
      let onetask = task.map((task, i) => (
        <Typography variant="body2" key={i}>
          {task}
        </Typography>
      ));

      return (
        <TaskCard
          key={i}
          onetask={onetask}
          index={i}
          editHandle={props.editHandle}
        />
      );
    });
  else {
    return <p>{props.dataStatus}</p>;
  }
};

export { CreateKategoryCheckbox, CreateKategoryRadiobox, MapArray };
