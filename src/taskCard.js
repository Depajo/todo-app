import React from "react";
import { Card, Button, IconButton, Link } from "@mui/material/";
import { putdata } from "./data.js";
import TaskTimer from "./taskTimer.js";

const TaskCard = (props) => {
  let id = props.onetask.id;

  let kategotiat = props.onetask.kategoria.map((e, i) => (
    <li style={{ margin: 5 }} key={i}>
      {e}
    </li>
  ));

  let tehtava = props.onetask.tehtävä;

  let prioriteetti = props.onetask.prioriteetti;

  let luontipvm = props.onetask.luontipvm;

  let valmis = props.onetask.valmis;

  let ajanlaskenta = props.onetask.ajanlaskenta;

  let aikaalaskettuMin = props.onetask.aikaalaskettuMin;

  let ajanlaskentaKaynistyksetJaLopetukset =
    props.onetask.ajanlaskentaKaynistyksetJaLopetukset;

  const plusPriority = (task) => {
    if (task.prioriteetti < props.serverData.length) {
      task.prioriteetti = task.prioriteetti + 1;
      console.log(task.prioriteetti);
      putdata("http://localhost:3010/tasks/" + task.id, {
        tehtävä: task.tehtävä,
        kategoria: task.kategoria,
        prioriteetti: task.prioriteetti,
        luontipvm: task.luontipvm,
        valmis: task.valmis,
        ajanlaskenta: task.ajanlaskenta,
        aikaalaskettuMin: task.aikaalaskettuMin,
        ajanlaskentaKaynistyksetJaLopetukset:
          task.ajanlaskentaKaynistyksetJaLopetukset,
      });
    }
    props.setDataType("");
  };

  const minusPriority = (task) => {
    if (task.prioriteetti <= props.serverData.length && task.prioriteetti > 0) {
      task.prioriteetti = task.prioriteetti - 1;
      console.log(task.prioriteetti);
      putdata("http://localhost:3010/tasks/" + task.id, {
        tehtävä: task.tehtävä,
        kategoria: task.kategoria,
        prioriteetti: task.prioriteetti,
        luontipvm: task.luontipvm,
        valmis: task.valmis,
        ajanlaskenta: task.ajanlaskenta,
        aikaalaskettuMin: task.aikaalaskettuMin,
        ajanlaskentaKaynistyksetJaLopetukset:
          task.ajanlaskentaKaynistyksetJaLopetukset,
      });
    }
    props.setDataType("");
  };

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
        <h4 className="tehtavakortti-otsikko">Oma Prioriteetti:</h4>
        <div className="prioriteetti" style={{ display: "flex" }}>
          <h3 className="tehtavakortti-arvo">{prioriteetti}</h3>
          <IconButton
            onClick={() => plusPriority(props.onetask)}
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
            onClick={() => minusPriority(props.onetask)}
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
        <div className="luontipvm">
          <h4 className="tehtavakortti-otsikko">Luontipvm:</h4>
          <p className="tehtavakortti-arvo">{luontipvm}</p>
        </div>
        <div className="valmis">
          <h4 className="tehtavakortti-otsikko">Valmis:</h4>
          <p className="tehtavakortti-arvo">{valmis}</p>
        </div>
        <div className="ajanlaskenta">
          <h4 className="tehtavakortti-otsikko">Ajanlaskenta:</h4>
          <TaskTimer task={props.onetask} />
          {props.onetask.ajanlaskenta ? "lasketaan" : "ei lasketa"}
        </div>
        <div className="aikaalaskettuMin">
          <h4 className="tehtavakortti-otsikko">AikaalaskettuMin:</h4>
          <p className="tehtavakortti-arvo">{aikaalaskettuMin}</p>
        </div>

        <Button
          onClick={() => props.editHandle(props.onetask)}
          sx={{ color: "#35739E" }}
          variant="text"
        >
          Muokkaa
        </Button>
        <Button
          onClick={() => props.openTask(props.onetask)}
          sx={{ color: "#35739E" }}
          variant="text"
        >
          Avaa tehtävä
        </Button>
      </Card>
    </div>
  );
};

function ManyTasks(props) {
  if (
    props.tasks.length === 0 &&
    props.order.length > 0 &&
    props.dataType.length > 0
  ) {
    return (
      <div>
        <h3>Ei tehtäviä</h3>
        <Button sx={{ color: "#35739E" }} variant="outlined" href="/lisaa">
          Lisää tehtävä
        </Button>
      </div>
    );
  } else {
    return (
      <div>
        {props.tasks.map((task, i) => (
          <TaskCard
            key={i}
            onetask={task}
            index={i}
            editHandle={props.editHandle}
            serverData={props.serverData}
            setDataType={props.setDataType}
            openTask={props.openTask}
          />
        ))}
      </div>
    );
  }
}

export { TaskCard, ManyTasks };
