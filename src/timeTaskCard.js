import React, { useEffect } from "react";
import { Card } from "@mui/material";
import { useState } from "react";
import { shearchDataById } from "./myFunctions";
import { getdata } from "./data";

function TimeTaskCard(props) {
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(0);
  const [data] = useState(props.taskResult);

  useEffect(() => {
    getdata("http://localhost:3010/tasks/" + props.taskResultId).then((res) => {
      setTask(res.data);
      setLoading(false);
      // console.log(res.data);
    });
    // console.log(props.taskResult);
    data.forEach((element) => {
      if (element.id === props.taskResultId) {
        let alredy = time;
        let newTime = element.time;
        let sum = alredy + newTime;
        console.log(
          sum +
            " valmiina: " +
            alredy +
            " lisättävä: " +
            newTime +
            " id: " +
            sum +
            " pitäs olla: " +
            (time + element.time)
        );

        setTime(sum);
        // setLoading(false);
      }
    });
  }, []);

  if (loading) {
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
            <p className="tehtavakortti-arvo"> {time} minuuttia</p>
          </div>
        </Card>
      </div>
    );
  }
}

export default TimeTaskCard;
