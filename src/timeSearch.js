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
import { convertTimeToSeconds } from "./timerFunctions";

function TimeSearch() {
  const [timeChange, setTimeChange] = useState(false);
  const [time1, setTime1] = useState("");
  const [time2, setTime2] = useState("");
  const [tasks, setTasks] = useState([]);
  const [timerData, setTimerData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getdata("http://localhost:3010/laskuriData").then((res) => {
      setTimerData(res.data);
      setLoading(false);
    });

    console.log("useEffect");
    if (timeChange) {
      console.log("timeChange");
    } else {
      console.log("timeChange false");
      setTime2(getMyTime(true, false, false));
      setTime1(getMyTime(false, false, true));
    }

    getdata("http://localhost:3010/tasks").then((data) => {
      setTasks(data);
    });
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
      await convertTimeToSeconds(time1)
        .then((data) => {
          console.log("data1");
          console.log(data);
          end = data + 60; // Lisätään 60 sekuntia, jotta saadaan myös viimeinen sekunti mukaan.git
        })
        .then(() => {
          console.log("end");
          console.log(end);
        });
    } catch (error) {
      console.log(error);
    }

    let start;
    try {
      await convertTimeToSeconds(time2)
        .then((data) => {
          console.log("data2");
          console.log(data);
          start = data;
        })
        .then(() => {
          console.log("start");
          console.log(start);
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

    console.log("taskTimerData");
    console.log(taskTimerData);
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
          sx={{ alignItems: "center", justifyContent: "center", margin: 1 }}
          onClick={handleTimeConvert}
        >
          Hae
        </Button>
      </Paper>
      {time2}
      <br />
      {time1}
      <br />
      {/* <h4> Eka {searchTime2}</h4>
      <h4> Toka {searchTime1}</h4> */}
    </div>
  );
}

export default TimeSearch;
