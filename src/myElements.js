import React from "react";
import {
  FormLabel,
  Checkbox,
  Radio,
  Card,
  Typography,
  Button,
} from "@mui/material/";

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

const TaskCard = (props) => {
  let id = props.onetask.id;
  let kategotiat = props.onetask.kategoria.map((e, i) => (
    <li style={{ margin: 5 }} key={i}>
      {e}
    </li>
  ));
  let tehtava = props.onetask.tehtävä;

  // console.log(kategotiat);

  return (
    <div className="object" key={props.indexi}>
      <Card key={"card" + props.index} sx={{ padding: 3 }}>
        <div className="id">
          <h4 className="tehtavakortti-otsikko">ID:</h4>
          <p className="tehtavakortti-arvo">{id}</p>
        </div>
        <div className="tehtava">
          <h4 className="tehtavakortti-otsikko">Tehtävä:</h4>
          <p className="tehtavakortti-arvo">{tehtava}</p>
        </div>
        <div className="kategoriat">
          <h4 className="tehtavakortti-otsikko">Kategoriat:</h4>
          <ul className="kategoriat-lista">{kategotiat}</ul>
        </div>
        <Button onClick={() => props.editHandle(props.index)} variant="text">
          Muokkaa
        </Button>
      </Card>
    </div>
  );
};

const showCategory = (dataType, serverData) => {
  let allTasksObj = [];
  if (dataType.toLocaleLowerCase() === "kaikki") {
    allTasksObj = serverData;
  } else {
    for (let index = 0; index < serverData.length; index++) {
      let obj = serverData[index];
      for (
        let categoryIndex = 0;
        categoryIndex < obj.kategoria.length;
        categoryIndex++
      ) {
        if (obj.kategoria[categoryIndex] === dataType) {
          allTasksObj.push(obj);
        }
      }
    }
  }

  return allTasksObj;
};

const mapArr = (data) => {
  let allTasks = [];
  for (const value of data) {
    let oneTask = [];
    let objectKeysCount = Object.keys(value).length;
    for (let i = 0; i < objectKeysCount; i++) {
      oneTask.push(Object.keys(value)[i] + ": " + Object.values(value)[i]);
    }
    allTasks.push(oneTask);
  }

  return allTasks;
};

const checkValueIsSame = (target, value) => {
  console.log(target + " + " + value);
  if (value === target || target === "") {
    return false;
  } else {
    return true;
  }
};

export {
  CreateCategoryCheckbox,
  CreateCategoryRadiobox,
  mapArr,
  TaskCard,
  showCategory,
  checkValueIsSame,
};
