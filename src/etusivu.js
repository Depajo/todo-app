import "./App.css";
import React, { useState, useEffect } from "react";
import { getdata, deletedata } from "./data";
import { Button, Dialog } from "@mui/material";
import { TaskCard } from "./taskCard";
import { HelpText } from "./myElements";
import Selector from "./select";
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

  // Haetaan dataa
  useEffect(() => {
    console.log("Etusivu useEffect");
    console.log("dataType: ", dataType);
    getdata("http://localhost:3010/tasks")
      .then((res) => {
        setServerData(res.data);
        console.log("res.data: ", res.data);
      })
      .then(() => {
        console.log("serverData: ", serverData);
        let obj = showCategory(dataType, serverData);
        console.log("obj: ", obj);
        let objSorted = orderData(obj, order);
        console.log("objSorted: ", objSorted);
        setObjTasks(objSorted);
      })
      .catch(() => console.error("Error"));
  }, [dataType, order, categoryData, open]);

  // Suljetaan muokkausikkuna
  const closeEditing = () => setOpen(false);

  // Avataan muokkausikkuna
  const editHandle = (task) => {
    setOpen(true);
    setEditingTask(task);
  };

  // Avataan tehtävä
  const openTask = (task) => {
    navigate("/tehtava/" + task.id);
  };

  return (
    // Etusivu
    <div className="content">
      <Selector
        setDataType={setDataType}
        setOrder={setOrder}
        setCategoryData={setCategoryData}
        order={order}
        dataType={dataType}
        categoryData={categoryData}
      />

      {objTasks.length === 0 ? (
        <div>
          <h3>Ei tehtäviä</h3>
          <Button sx={{ color: "#35739E" }} variant="outlined" href="/lisaa">
            Lisää tehtävä
          </Button>
        </div>
      ) : (
        objTasks.map((task, i) => (
          <TaskCard
            key={i}
            onetask={task}
            index={i}
            editHandle={editHandle}
            serverData={serverData}
            setDataType={setDataType}
            setServerData={setServerData}
          />
        ))
      )}

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
