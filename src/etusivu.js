import "./App.css";
import React, { useState, useEffect } from "react";
import { getdata, deletedata } from "./data";
import {
  Button,
  Dialog,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { ManyTasks } from "./taskCard";
import { HelpText } from "./myElements";
import { showCategory, orderData } from "./myFunctions";

import MuokkaaTaskia from "./muokkaaTaskia";
import { useNavigate } from "react-router-dom";

function Etusivu() {
  const [categoryData, setCategoryData] = useState([]);
  const [serverData, setServerData] = useState([]);
  const [dataType, setDataType] = useState("");
  const [order, setOrder] = useState("");
  const [editingTask, setEditingTask] = useState(-1);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [objTasks, setObjTasks] = useState([]);
  const [objTasksSorted, setObjTasksSorted] = useState([]);

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
  }, [dataType, open, order]);

  useEffect(() => {
    setObjTasks(showCategory(dataType, serverData));
  }, [dataType, serverData]);

  useEffect(() => {
    setObjTasksSorted(orderData(objTasks, order));
  }, [objTasks, order]);

  const callChangeDataType = (event) => {
    setDataType(event.target.value);
  };

  const callChangeOrder = (event) => {
    setOrder(event.target.value);
  };

  const closeEditing = () => setOpen(false);

  const editHandle = (task) => {
    setOpen(true);
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

  const openTask = (task) => {
    navigate("/tehtava/" + task.id);
  };

  return (
    <div className="content">
      <h1>Valitse näkymä</h1>
      <HelpText dataType={dataType} order={order} />
      <div style={{ display: "flex" }}>
        <Paper sx={{ margin: 1 }}>
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

          <FormControl sx={{ margin: 2 }}>
            <InputLabel>Järjestys</InputLabel>
            <Select
              onChange={callChangeOrder}
              value={order}
              label="Järjestys"
              sx={{ minWidth: 250 }}
            >
              <MenuItem value={"prioriteetti"}>Oma Prioriteetti</MenuItem>
              <MenuItem value={"aakkosjärjestys"}>
                Aakkosjärjestyksessä
              </MenuItem>
              <MenuItem value={"uusin ensin"}>Uusin ensin</MenuItem>
              <MenuItem value={"vanhin ensin"}>Vanhin ensin</MenuItem>
            </Select>
          </FormControl>
        </Paper>
      </div>

      <ManyTasks
        tasks={objTasksSorted}
        order={order}
        dataType={dataType}
        editHandle={editHandle}
        setDataType={setDataType}
        serverData={serverData}
        openTask={openTask}
        setServerData={setServerData}
      />

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
