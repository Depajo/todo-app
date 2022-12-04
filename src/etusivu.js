import "./App.css";
import React, { useState, useEffect } from "react";
import { getdata, deletedata, putdata } from "./data";
import {
  Button,
  Dialog,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import { showCategory, TaskCard, orderData } from "./myElements";
import MuokkaaTaskia from "./muokkaaTaskia";
import AddIcon from "@mui/icons-material/Add";

function Etusivu() {
  const [categoryData, setCategoryData] = useState([]);
  const [serverData, setServerData] = useState([]);
  const [dataType, setDataType] = useState("");
  const [order, setOrder] = useState("");
  const [editingTask, setEditingTask] = useState(-1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getdata("http://localhost:3010/tasks")
      .then((res) => {
        setServerData(res.data);
      })
      .catch(() => console.error("Error"));

    getdata("http://localhost:3010/kategoriat")
      .then((res) => {
        setCategoryData(res.data);
      })
      .catch(() => console.error("Error"));
  }, [dataType]);

  const objTasks = showCategory(dataType, serverData);
  const objTasksSorted = orderData(objTasks, order);

  const callChangeDataType = (event) => {
    console.log(event.target.value);
    setDataType(event.target.value);
  };

  const callChangeOrder = (event) => {
    setOrder(event.target.value);
  };

  const closeEditing = () => setOpen(false);

  const editHandle = (task) => {
    setOpen(true);
    console.log("teht numero: " + task.id);

    setEditingTask(task);
  };

  const deletCategory = () => {
    for (let i = 0; i < categoryData.length; i++) {
      if (categoryData[i].nimi === dataType) {
        if (categoryData[i].id === 1) {
          alert("Et voi poistaa tätä kategoriaa");
        } else {
          deletedata("http://localhost:3010/kategoriat/" + categoryData[i].id);
          setDataType("");
          alert("Kategoria poistettu");
        }
      }
    }
  };

  const plusPriority = (task) => {
    if (task.prioriteetti < serverData.length) {
      task.prioriteetti = task.prioriteetti + 1;
      console.log(task.prioriteetti);
      putdata("http://localhost:3010/tasks/" + task.id, {
        tehtävä: task.tehtävä,
        kategoria: task.kategoria,
        prioriteetti: task.prioriteetti,
      });
    }
    setDataType("");
  };

  const minusPriority = (task) => {
    if (task.prioriteetti <= serverData.length && task.prioriteetti > 0) {
      task.prioriteetti = task.prioriteetti - 1;
      console.log(task.prioriteetti);
      putdata("http://localhost:3010/tasks/" + task.id, {
        tehtävä: task.tehtävä,
        kategoria: task.kategoria,
        prioriteetti: task.prioriteetti,
      });
    }
    setDataType("");
  };

  return (
    <div className="content">
      <div style={{ display: "flex" }}>
        <Paper sx={{ margin: 1 }}>
          <FormControl sx={{ margin: 2 }}>
            <InputLabel>Järjestys</InputLabel>
            <Select
              onChange={callChangeOrder}
              value={order}
              label="Järjestys"
              sx={{ minWidth: 250 }}
            >
              <MenuItem value={"prioriteetti"}>Prioriteetti</MenuItem>
              <MenuItem value={"aakkosjärjestys"}>
                Aakkosjärjestyksessä
              </MenuItem>
              <MenuItem value={"uusin ensin"}>Uusin ensin</MenuItem>
              <MenuItem value={"vanhin ensin"}>Vanhin ensin</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ margin: 2 }}>
            <InputLabel>Kategoria</InputLabel>
            <Select
              onChange={callChangeDataType}
              value={dataType}
              label="Kategoria"
              sx={{ minWidth: 250 }}
            >
              {categoryData.map((d, i) => (
                <MenuItem key={i} value={d.nimi}>
                  {d.nimi}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
      </div>

      {objTasksSorted.map((task, i) => (
        <TaskCard
          key={i}
          onetask={task}
          index={i}
          editHandle={editHandle}
          plusPriority={plusPriority}
          minusPriority={minusPriority}
          plusIcon={<AddIcon />}
        />
      ))}

      <Button
        sx={{ margin: 3 }}
        variant="outlined"
        onClick={deletCategory}
        color="error"
      >
        Poista kategoria
      </Button>
      <Dialog open={open}>
        <MuokkaaTaskia
          editingTaskId={editingTask}
          closeEditing={closeEditing}
          setOpen={setOpen}
          setDataType={setDataType}
          categoryData={categoryData}
        />
      </Dialog>
    </div>
  );
}

export default Etusivu;
