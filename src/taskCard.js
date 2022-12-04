import React from "react";
import { Card, Button, IconButton, Link } from "@mui/material/";

const TaskCard = (props) => {
  console.log(props.onetask);
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
        <h4 className="tehtavakortti-otsikko">Oma Prioriteetti:</h4>
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
            plusPriority={props.plusPriority}
            minusPriority={props.minusPriority}
            openTask={props.openTask}
          />
        ))}
      </div>
    );
  }
}

export { TaskCard, ManyTasks };
