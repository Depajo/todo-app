import React from "react";
import {
  FormLabel,
  Checkbox,
  Radio,
  Card,
  Button,
  IconButton,
} from "@mui/material/";
import { margin } from "@mui/system";

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
  let prioriteetti = props.onetask.prioriteetti;

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
        <h4 className="tehtavakortti-otsikko">Prioriteetti:</h4>
        <div className="prioriteetti" style={{ display: "flex" }}>
          <h3 className="tehtavakortti-arvo">{prioriteetti}</h3>
          <IconButton
            onClick={() => props.plusPriority(props.onetask)}
            sx={{
              color: "#35739E",
              fontSize: 20,
              margin: 1,
              padding: 2,
              bgcolor: "#e1e1e1",
            }}
            variant="text"
          >
            +
          </IconButton>
          <IconButton
            onClick={() => props.minusPriority(props.onetask)}
            sx={{
              color: "#35739E",
              fontSize: 20,
              margin: 1,
              padding: 2,
              bgcolor: "#e1e1e1",
            }}
            variant="text"
          >
            -
          </IconButton>
        </div>
        <Button
          onClick={() => props.editHandle(props.onetask)}
          sx={{ color: "#35739E" }}
          variant="text"
        >
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

  let allTaskSorted = orderData(allTasksObj, "aakkosjärjestys");

  return allTaskSorted;
};

const orderData = (data, order) => {
  let allTasksObj = [];
  if (order.toLocaleLowerCase() === "aakkosjärjestys") {
    allTasksObj = data.sort((a, b) => {
      return a.tehtävä.localeCompare(b.tehtävä);
    });
  } else if (order.toLocaleLowerCase() === "uusin ensin") {
    allTasksObj = data.sort((a, b) => {
      return b.id - a.id;
    });
  } else if (order.toLocaleLowerCase() === "vanhin ensin") {
    allTasksObj = data.sort((a, b) => {
      return a.id - b.id;
    });
  } else if (order.toLocaleLowerCase() === "kategoria") {
    allTasksObj = data.sort((a, b) => {
      return a.kategoria[0].localeCompare(b.kategoria[0]);
    });
  } else if (order.toLocaleLowerCase() === "tehty") {
    allTasksObj = data.sort((a, b) => {
      return a.tehty - b.tehty;
    });
  } else if (order.toLocaleLowerCase() === "tehtävä") {
    allTasksObj = data.sort((a, b) => {
      return a.tehtävä.localeCompare(b.tehtävä);
    });
  } else if (order.toLocaleLowerCase() === "prioriteetti") {
    allTasksObj = data.sort((a, b) => {
      return a.prioriteetti < b.prioriteetti;
    });
  }

  return allTasksObj;
};

const shearchDataByTask = async (data, shearch) => {
  let allTasksObj = [];
  if (shearch === "") {
    allTasksObj = data;
  } else {
    for (let index = 0; index < data.length; index++) {
      let obj = data[index];
      if (obj.tehtävä.toLowerCase().includes(shearch.toLowerCase())) {
        allTasksObj.push(obj);
      }
    }
  }

  return allTasksObj;
};

const shearchDataById = (data, id) => {
  let allTasksObj = [];
  if (id === "") {
    allTasksObj = data;
  } else {
    for (let index = 0; index < data.length; index++) {
      console.log(data[index].id);
      let obj = data[index];
      if (obj.id === id) {
        allTasksObj.push(obj);
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
  orderData,
  shearchDataByTask,
  shearchDataById,
};
