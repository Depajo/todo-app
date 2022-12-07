import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { getdata, patchdata, postdata } from "./data";

function TaskTimer(props) {
  const [timer, setTimer] = useState(0);
  const [task] = useState(props.task);
  const [timerStart, setTimerStart] = useState();

  useEffect(() => {
    setTimerStart(task.ajanlaskenta);
    setTimer(task.aikaalaskettuSec);
    // let interval = null;

    // interval = setInterval(() => {}, 1000);

    // return () => {
    //   clearInterval(interval);
    // };
  }, [task.ajanlaskenta]);

  const timeNowSecond = async () => {
    return Math.floor(Date.now() / 1000);
  };

  const timeCountStart = async () => {
    return await getdata("http://localhost:3010/tasks/" + task.id).then(
      (res) => {
        // console.log("Tehtävä id: " + task.id);
        // console.log(res.data.ajanlaskentaAloitettu);
        return res.data.ajanlaskentaAloitettu;
      }
    );
  };

  const timeCounted = async () => {
    return await getdata("http://localhost:3010/tasks/" + task.id).then(
      (res) => {
        // console.log(res.data.aikaalaskettuSec);
        return res.data.aikaalaskettuSec;
      }
    );
  };

  const differenceBetween = async (timeNow, timeStarted, timeAlredy) => {
    return timeStarted - timeNow + timeAlredy;
  };

  const startTimer = async () => {
    // console.log("START TIMER \n\n");

    let time3;

    await timeCounted().then((res) => {
      time3 = res;
      // console.log("aijemmin laksettu aika " + res);
    });

    await timeNowSecond().then((res) => {
      // console.log("aika nyt " + res);
      saveData(res, time3, true);
    });
  };

  const stopTimer = async () => {
    // console.log("STOP TIMER \n\n");

    let time1;

    await timeCountStart().then((res) => {
      time1 = res;
      console.log("ajan lasku aloitettu " + res);
    });

    let time2;

    await timeNowSecond().then((res) => {
      time2 = res;
      console.log("aika nyt " + res);
    });

    let time3;

    await timeCounted().then((res) => {
      time3 = res;
      // console.log("aijemmin laksettu aika " + res);
    });

    await differenceBetween(time1, time2, time3).then((res) => {
      // console.log("aikaalaskettu " + res);

      postdata("http://localhost:3010/laskuriData/", {
        aloitus: time1,
        lopetus: time2,
        taskId: task.id,
      });

      saveData(0, res, false);
    });
  };

  const saveData = (aloitettu, difference, timerOn) => {
    patchdata("http://localhost:3010/tasks/" + task.id, {
      ajanlaskenta: timerOn,
      aikaalaskettuSec: difference,
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
          {timerStart ? (
            <h4 style={{ color: "green" }}>Lasketaan aikaa...</h4>
          ) : (
            <h4 style={{ color: "red" }}>Ajanlaskenta pysäytetty</h4>
          )}
          {timerStart ? (
            <></>
          ) : (
            <h4>
              Käytetty aikaa: <br /> {timer} sekunttia
            </h4>
          )}
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
