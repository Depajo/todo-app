import { Button, TextField, Paper } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { getMyTime } from "./myFunctions";

function TimeSearch() {
  const [timeChange, setTimeChange] = useState(false);
  const [time1, setTime1] = useState("");
  const [time2, setTime2] = useState("");
  const [searchTime1, setSearchTime1] = useState("");
  const [searchTime2, setSearchTime2] = useState("");

  useEffect(() => {
    console.log("useEffect");
    if (timeChange) {
      console.log("timeChange");
    } else {
      console.log("timeChange false");
      setTime2(getMyTime(true, false, false));
      setTime1(getMyTime(false, false, true));
    }
  }, [time1, time2, timeChange]);

  const convertTimeToSeconds = (times) => {
    console.log("convertTimeToSeconds");
    console.log(time1);
    let timeInSeconds = Date.parse(times) / 1000;

    return timeInSeconds;
  };

  const handleTimeChange1 = (event) => {
    setTimeChange(true);
    setTime1(event.target.value);
  };

  const handleTimeChange2 = (event) => {
    setTimeChange(true);
    setTime2(event.target.value);
  };

  const handleTimeConvert = () => {
    let timeInSeconds = convertTimeToSeconds(time1);
    setSearchTime1(timeInSeconds);
    timeInSeconds = convertTimeToSeconds(time2);
    setSearchTime2(timeInSeconds);
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
      <h4> Eka {searchTime2}</h4>
      <h4> Toka {searchTime1}</h4>
    </div>
  );
}

export default TimeSearch;
