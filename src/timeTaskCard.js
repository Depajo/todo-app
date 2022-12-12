import React, { useEffect } from "react";
import { Card } from "@mui/material";
import { useState } from "react";
import { getdata } from "./data";
import { shearchDataById } from "./myFunctions";

function TimeTaskCard(props) {
  //   console.log(props);
  const [task, setTask] = useState();
  const [chosenTask, setChosenTask] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getdata("http://localhost:3010/tasks")
      .then((res) => {
        setTask(res.data);
        setLoading(false);
      })
      .then(() => {
        try {
          let result = [];
          for (let i = 0; i < task.length; i++) {
            result.push(shearchDataById(task, task[i]));
          }
          setChosenTask(result);
        } catch (error) {
          console.log(error);
        }
      });
  }, []);
  //   const SearchManyTasks = () => {
  //     if (loading) {
  //       return <p>loading</p>;
  //     } else {
  //       let result = [];
  //       for (let i = 0; i < task.length; i++) {
  //         result.push(shearchDataById(task, task[i]));
  //       }
  //       setChosenTask(result);

  //       return <Card sx={{ padding: 2, margin: 3 }}>jeee</Card>;
  //     }
  //   };

  return <div>{/* <SearchManyTasks /> */}</div>;
}

export default TimeTaskCard;
