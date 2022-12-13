import React, { useEffect } from "react";
import { Card } from "@mui/material";
import { useState } from "react";
import { getdata } from "./data";

function TimeTaskCard(props) {
  const [task, setTask] = useState();
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(0);

  useEffect(() => {
    console.log(props);
    // getdata("http://localhost:3010/tasks/" + props.taskResultId).then((res) => {
    //   setTask(res.data);
    //   setLoading(false);
    //   console.log(res.data);
    // });

    props.data.forEach((element) => {
      console.log(element);
      if (element.id === props.taskResultId) {
        setTime(time + element.time);
        setLoading(false);
      }
    });
  }, [props.taskResultId]);

  if (loading || task.length === 0) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <Card sx={{ padding: 2, margin: 2 }}>
          <div className="id">
            <h3 className="tehtavakortti-otsikko">ID:</h3>
            <p className="tehtavakortti-arvo">{task.id}</p>
          </div>
          <div className="tehtava">
            <h3 className="tehtavakortti-otsikko">Tehtävä:</h3>
            <p className="tehtavakortti-arvo">{task.tehtävä}</p>
          </div>
          <div className="ajanlaskenta">
            <h3 className="tehtavakortti-otsikko">Ajanlaskenta:</h3>
            <p className="tehtavakortti-arvo">
              {" "}
              {(task.aikaalaskettuSec / 60).toFixed(2)} minuuttia
            </p>
          </div>
        </Card>
      </div>
    );
  }
}

export default TimeTaskCard;
