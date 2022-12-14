import React, { useEffect, useRef } from "react";
import { Card } from "@mui/material";
import { useState } from "react";
import { getdata } from "./data";
import { all } from "axios";

function TimeTaskCard(props) {
    const [task, setTask] = useState([]);
    const [loading, setLoading] = useState(false);
    const time = useRef(0);
    const [data, setData] = useState(props.taskResult);

    useEffect(() => {
        getdata("http://localhost:3010/tasks/" + props.taskResultId).then(
            (res) => {
                setTask(res.data);
                setLoading(false);
                // console.log(res.data);
            }
        );
        // console.log(props.taskResult);

        let allTime = [];
        data.forEach((element) => {
            if (element.taskId === props.taskResultId) {
                // if (!allTime.includes(element)) {
                console.log("already included");
                allTime.push(element);
                setLoading(false);
                // }
            }
        });
        console.log(allTime);
        allTime.forEach((element) => {
            time.current += element.time;
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <Card sx={{ padding: 2, margin: 2 }}>
                    <div className="id" style={{ display: "flex" }}>
                        <h3 className="tehtavakortti-otsikko">ID:</h3>
                        <p className="tehtavakortti-arvo">{task.id}</p>
                    </div>
                    <div className="tehtava">
                        <h4 className="tehtavakortti-otsikko">Tehtävä:</h4>
                        <p className="tehtavakortti-arvo">{task.tehtävä}</p>
                    </div>
                    <div className="ajanlaskenta">
                        <h4 className="tehtavakortti-otsikko">Ajanlaskenta:</h4>
                        <p className="tehtavakortti-arvo">
                            {" "}
                            {time.current / 2} sekunttia
                        </p>
                    </div>
                </Card>
            </div>
        );
    }
}

export default TimeTaskCard;
