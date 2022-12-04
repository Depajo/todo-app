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

  console.log(props);
  useEffect(() => {
    console.log("helpText useEffect");
    if (props.dataType === "") {
      setHelpText("Valitse Kategoria:");
    } else if (props.order === "") {
      setHelpText("Valitse Järjestys:");
    } else {
      setHelpText("");
    }
  }, [helpText, props.dataType, props.order]);

  console.log(helpText);

  return <h3 style={{ color: "#ff3333", marginBottom: 0 }}>{helpText}</h3>;
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
  showCategory,
  checkValueIsSame,
  orderData,
  shearchDataByTask,
  shearchDataById,
  HelpText,
};
