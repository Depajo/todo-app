import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";

function TaskTimer(props) {
  //   console.log("TaskTimer props", props);
  const [timer, setTimer] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [timerStart, setTimerStart] = useState(0);
  const [timerTime, setTimerTime] = useState(0);
  const [task] = useState(props.task);

  useEffect(() => {
    let interval = null;

    if (timerOn) {
      console.log("timerOn", timerOn);
      interval = setInterval(() => {
        setTimerStart(task.aikaalaskettuMin);
        setTimerTime(timerStart + timerTime);
        setTimer(timer + 1);
        console.log("timerTime", timerTime);
      }, 1000);
    } else if (!timerOn && timerTime !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn, timerStart, timerTime, timer, task.aikaalaskettuMin]);

  const startTimer = () => {
    setTimerOn(true);
    setTimerStart(timer);
    setTimerTime(timerTime);
  };

  const stopTimer = () => {
    setTimerOn(false);
  };

  const resumeTimer = () => {
    setTimerOn(true);
    setTimerStart(timer);
    setTimerTime(timerTime);
  };

  return (
    <div>
      <div className="timer">
        <div className="timer-display">
          <h1>{timer}</h1>
        </div>
        <div className="timer-buttons">
          {!timerOn && timer === 0 && (
            <Button onClick={startTimer}>Start</Button>
          )}
          {timerOn && <Button onClick={stopTimer}>Stop</Button>}
          {!timerOn && timer !== 0 && (
            <Button onClick={resumeTimer}>Resume</Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskTimer;
