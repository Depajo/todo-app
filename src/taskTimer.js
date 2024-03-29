import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { getdata, patchdata, postdata } from "./data";
import { differenceBetween, timeNowSecond } from "./timerFunctions";

function TaskTimer(props) {
    const [timer, setTimer] = useState(0);
    const [task] = useState(props.task);
    const [timerStart, setTimerStart] = useState();

    useEffect(() => {
        setTimerStart(task.ajanlaskenta);
        setTimer(task.aikaalaskettuSec);
    }, [task.ajanlaskenta, task.aikaalaskettuSec]);

    // Palauttaa ajan jolloin ajanlaskenta aloitettiin
    const timeCountStart = async (id) => {
        return await getdata(
            "https://todo-api-n4pi.onrender.com/tasks/" + id
        ).then((res) => {
            // console.log("Tehtävä id: " + task.id);
            // console.log(res.data.ajanlaskentaAloitettu);
            return res.data.ajanlaskentaAloitettu;
        });
    };

    // Palauttaa ajan joka on jo laskettu
    const timeCounted = async (id) => {
        return await getdata(
            "https://todo-api-n4pi.onrender.com/tasks/" + id
        ).then((res) => {
            // console.log(res.data.aikaalaskettuSec);
            return res.data.aikaalaskettuSec;
        });
    };

    const startTimer = async (id) => {
        // console.log("START TIMER \n\n");
        console.log("ajan lasku aloitettu " + id);

        let time3;

        await timeCounted(id).then((res) => {
            time3 = res;
            // console.log("aijemmin laksettu aika " + res);
        });

        await timeNowSecond().then((res) => {
            // console.log("aika nyt " + res);
            saveData(res, time3, true);
        });
    };

    // Pysäyttää ajanlaskennan ja tallentaa ajan
    const stopTimer = async (id) => {
        // console.log("STOP TIMER \n\n");
        console.log("ajan lasku pysäytetty " + id);

        let time1;

        await timeCountStart(id).then((res) => {
            time1 = res;
            console.log("ajan lasku aloitettu " + res);
        });

        let time2;

        await timeNowSecond().then((res) => {
            time2 = res;
            console.log("aika nyt " + res);
        });

        let time3;

        await timeCounted(id).then((res) => {
            time3 = res;
            // console.log("aijemmin laksettu aika " + res);
        });

        await differenceBetween(time1, time2, time3).then((res) => {
            // console.log("aikaalaskettu " + res);

            postdata("https://todo-api-n4pi.onrender.com/laskuriData/", {
                aloitus: time1,
                lopetus: time2,
                taskId: task.id,
            });

            saveData(0, res, false);
        });
    };

    // Tallentaa ajan ja ajanlaskennan tilan
    const saveData = (aloitettu, difference, timerOn) => {
        patchdata("https://todo-api-n4pi.onrender.com/tasks/" + task.id, {
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
                        <h4 style={{ color: "red" }}>
                            Ajanlaskenta pysäytetty
                        </h4>
                    )}
                    {timerStart ? (
                        <></>
                    ) : (
                        <h4>
                            Käytetty aikaa: <br /> {(timer / 60).toFixed(2)}{" "}
                            minuuttia
                        </h4>
                    )}
                </div>
                <div className="timer-buttons">
                    {timerStart ? (
                        <Button onClick={() => stopTimer(task.id)}>Stop</Button>
                    ) : (
                        <Button onClick={() => startTimer(task.id)}>
                            Start
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TaskTimer;
