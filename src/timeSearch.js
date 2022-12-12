import {
  Button,
  TextField,
  Paper,
  getAccordionDetailsUtilityClass,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { getMyTime } from "./myFunctions";
import { getdata } from "./data";
import { convertTimeToSeconds, differenceBetween } from "./timerFunctions";
import TimeTaskCard from "./timeTaskCard";

function TimeSearch() {
  const [timeChange, setTimeChange] = useState(false);
  const [time1, setTime1] = useState("");
  const [time2, setTime2] = useState("");
  const [timerData, setTimerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(0);
  const [taskResultId, setTaskResultId] = useState([]);

  useEffect(() => {
    getdata("http://localhost:3010/laskuriData").then((res) => {
      setTimerData(res.data);
      setLoading(false);
    });

    if (timeChange) {
      console.log("timeChange");
    } else {
      console.log("timeChange false");
      setTime2(getMyTime(true, false, false));
      setTime1(getMyTime(false, false, true));
    }
  }, [time1, time2, timeChange]);

  const handleTimeChange1 = (event) => {
    setTimeChange(true);
    setTime1(event.target.value);
  };

  const handleTimeChange2 = (event) => {
    setTimeChange(true);
    setTime2(event.target.value);
  };

  // Tietokannan aikojen vertailu käyttäjän antamalta aikaväliltä.
  const handleTimeConvert = async () => {
    let end;

    try {
      await convertTimeToSeconds(time1).then((data) => {
        // console.log("data1");
        // console.log(data);
        end = data + 60; // Lisätään 60 sekuntia, jotta saadaan myös viimeinen sekunti mukaan.git
      });
    } catch (error) {
      console.log(error);
    }

    let start;
    try {
      await convertTimeToSeconds(time2).then((data) => {
        start = data;
      });
    } catch (error) {
      console.log(error);
    }

    let taskTimerData = [];

    try {
      await showTasksWhereTimeIsBetween(timerData, start, end).then((data) => {
        taskTimerData = data;
      });
    } catch (error) {
      console.log(error);
    }

    try {
      let allId = await getAllIdOnArray(taskTimerData).then((data) => data);
      setTaskResultId(allId);
    } catch (error) {}

    plusArrayTime(taskTimerData);
  };

  const getAllIdOnArray = async (array) => {
    let allId = [];

    array.forEach((element) => {
      if (!allId.includes(element.taskId)) {
        allId.push(element.taskId);
      }
    });

    return allId;
  };

  const plusArrayTime = (array) => {
    try {
      let sum = 0;
      array.forEach(async (element, i) => {
        await differenceBetween(element.aloitus, element.lopetus, 0).then(
          (data) => {
            sum += data;
            setResult(sum);
          }
        );
      });
    } catch (error) {}
  };

  // Tietokannan aikojen vertailu käyttäjän antamalta aikaväliltä.
  // Palauttaa taulukon jossa on aikavälillä olevat tehtävät.
  const showTasksWhereTimeIsBetween = async (data, start, end) => {
    let tasksToShow = [];
    data.forEach((task) => {
      if (task.aloitus >= start && task.lopetus <= end) {
        tasksToShow.push(task);
      }
    });
    return tasksToShow;
  };

  return (
    <div className="content">
      <h3>Päivämäärä ja Aika</h3>
      <Paper sx={{ padding: 1 }}>
        <TextField
          variant="outlined"
          type="datetime-local"
          value={time2}
          onChange={handleTimeChange2}
          sx={{ width: 250, margin: 1 }}
        />
        <TextField
          variant="outlined"
          type="datetime-local"
          value={time1}
          onChange={handleTimeChange1}
          sx={{ width: 250, margin: 1 }}
        />
        <br></br>
        <Button
          variant="outlined"
          sx={{
            display: "flex",
            margin: "auto",
            paddingLeft: 5,
            paddingRight: 5,
          }}
          onClick={handleTimeConvert}
        >
          Hae
        </Button>
      </Paper>
      <br />
      <Paper sx={{ padding: 2 }}>
        <h3 style={{ marginBottom: 0 }}>Yhteensä aikaa on käytetty:</h3>
        <h4 style={{ marginTop: 7 }}>{(result / 60).toFixed(2)} minuuttia</h4>
        <h4>
          {" "}
          {taskResultId.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </h4>
      </Paper>
      <TimeTaskCard taskResultId={taskResultId} />
    </div>
  );
}

export default TimeSearch;
