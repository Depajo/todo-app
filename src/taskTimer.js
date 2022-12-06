import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { getdata, putdata } from "./data";

function TaskTimer(props) {
  const [timer, setTimer] = useState(0);
  const [task] = useState(props.task);
  const [timerStart, setTimerStart] = useState();

  useEffect(() => {
    setTimerStart(task.ajanlaskenta);
    // let interval = null;
    // if (task.ajanlaskenta) {
    //   interval = setInterval(() => {
    // setTimer(timer + 1);
    // }, 1000);
    // }
    // return () => {
    //   clearInterval(interval);
    // };
  }, []);

  const timeKnawSecond = async () => {
    return Math.floor(Date.now() / 1000);
  };

  let timeCountStart = async () => {
    return await getdata("http://localhost:3010/tasks/", task.id).then(
      (res) => {
        console.log(res.data[0].ajanlaskentaAloitettu);
        return res.data[0].ajanlaskentaAloitettu;
      }
    );
  };

  let timeCounted = async () => {
    return await getdata("http://localhost:3010/tasks/", task.id).then(
      (res) => {
        console.log(res.data[0].aikaalaskettuMin);
        return res.data[0].aikaalaskettuMin;
      }
    );
  };

  let differenceBetween = async (time1, time2, time3) => {
    console.log("time1 " + time1);
    console.log("time2 " + time2);
    console.log("time3 " + time3);
    return time2 - time1 + time3;
  };

  const startTimer = async () => {
    console.log("START TIMER \n\n");
    // let timeCounted = await task.aikaalaskettuMin;

    let time3;

    await timeCounted().then((res) => {
      time3 = res;
      console.log("aijemmin laksettu aika " + res);
    });

    await timeKnawSecond().then((res) => saveData(res, time3, true));
  };

  const stopTimer = async () => {
    console.log("STOP TIMER \n\n");

    let time1;

    await timeCountStart().then((res) => {
      time1 = res;
      console.log("ajan lasku aloitettu " + res);
    });

    let time2;

    await timeKnawSecond().then((res) => {
      time2 = res;
      console.log("aika nyt " + res);
    });

    let time3;

    await timeCounted().then((res) => {
      time3 = res;
      console.log("aijemmin laksettu aika " + res);
    });

    await differenceBetween(time1, time2, time3).then((res) => {
      console.log("aikaalaskettu " + res);
      saveData(0, res, false);
    });
  };

  const saveData = (aloitettu, difference, timerOn) => {
    putdata("http://localhost:3010/tasks/" + task.id, {
      tehtävä: task.tehtävä,
      kategoria: task.kategoria,
      prioriteetti: task.prioriteetti,
      luontipvm: task.luontipvm,
      valmis: task.valmis,
      ajanlaskenta: timerOn,
      aikaalaskettuMin: difference,
      ajanlaskentaAloitettu: aloitettu,
    })
      .then(() => {
        setTimer(difference);
        setTimerStart(timerOn);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="timer">
        <div className="timer-display">
          <h1>{timer}</h1>
        </div>
        <div className="timer-buttons">
          {timerStart ? (
            <Button onClick={stopTimer}>Stop</Button>
          ) : (
            <Button onClick={startTimer}>Start</Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskTimer;
