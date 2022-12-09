import React, { useEffect, useState } from "react";
import { Card, Button } from "@mui/material/";
import { getdata } from "./data.js";
import TaskTimer from "./taskTimer.js";
import { Prioriteetti } from "./prioriteetti.js";

const TaskCard = (props) => {
  const [loading, setloading] = useState(false);
  const [ajanlaskenta, setAjanlaskenta] = useState(false);

  // useEffect(() => {
  //   // console.log("TaskCard useEffect");
  //   // console.log(props.onetask);
  // }, [props.onetask, loading, ajanlaskenta]);

  getdata("http://localhost:3010/tasks/" + props.onetask.id).then((res) => {
    setAjanlaskenta(res.data.ajanlaskenta);
    setloading(true);
  });

  let prioriteetti = props.onetask.prioriteetti;
  let timer = props.onetask.aikaalaskettuSec;

  let id = props.onetask.id;

  let kategotiat = props.onetask.kategoria.map((e, i) => (
    <li style={{ margin: 5 }} key={i}>
      {e}
    </li>
  ));

  let tehtava = props.onetask.tehtävä;

  let luontipvm = props.onetask.luontipvm;

  // let valmis = props.onetask.valmis;

  if (loading === true) {
    return (
      <div className="object" key={props.indexi}>
        <Card key={"card" + props.index} sx={{ padding: 3 }}>
          <div className="id">
            <h3 className="tehtavakortti-otsikko">ID:</h3>
            <p className="tehtavakortti-arvo">{id}</p>
          </div>
          <div className="tehtava">
            <h3 className="tehtavakortti-otsikko">Tehtävä:</h3>
            <p className="tehtavakortti-arvo">{tehtava}</p>
          </div>
          <div className="kategoriat">
            <h3 className="tehtavakortti-otsikko">Kategoriat:</h3>
            <ul className="kategoriat-lista">{kategotiat}</ul>
          </div>
          <h3 className="tehtavakortti-otsikko">Oma Prioriteetti:</h3>
          <div className="prioriteetti" style={{ display: "flex" }}>
            <h3 className="tehtavakortti-otsikko">{prioriteetti}</h3>
            <Prioriteetti
              setServerData={props.setServerData}
              serverData={props.serverData}
              setDataType={props.setDataType}
              onetask={props.onetask}
            />
          </div>
          <div className="luontipvm">
            <h3 className="tehtavakortti-otsikko">Luontipvm:</h3>
            <p className="tehtavakortti-arvo">{luontipvm}</p>
          </div>
          {/* <div className="valmis">
            <h3 className="tehtavakortti-otsikko">Valmis:</h3>
            <p className="tehtavakortti-arvo">{valmis}</p>
          </div> */}
          <div className="ajanlaskenta">
            <h3 className="tehtavakortti-otsikko">Ajanlaskenta:</h3>
            <TaskTimer task={props.onetask} />

            <h4>
              Käytetty aikaa: <br /> {timer} sekunttia
            </h4>
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
  } else {
    return <div> Loading.. </div>;
  }
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
            setServerData={props.setServerData}
          />
        ))}
      </div>
    );
  }
}

export { TaskCard, ManyTasks };
