import React, { useEffect } from "react";
import { useState } from "react";
import { IconButton } from "@mui/material";
import { patchdata } from "./data.js";

function Prioriteetti(props) {
    const [loading, setloading] = useState(false);

    useEffect(() => {
        setloading(true);
    }, [props.onetask]);

    // Lisää prioriteetin tärkeyttä yhdellä
    const plusPriority = (task) => {
        if (task.prioriteetti < props.serverData.length) {
            task.prioriteetti = task.prioriteetti + 1;

            patchdata("https://todo-api-n4pi.onrender.com/tasks/" + task.id, {
                prioriteetti: task.prioriteetti,
            });
            props.setDataType("");
        } else {
            alert(
                "Prioriteetti ei voi olla suurempi kuin " + task.prioriteetti
            );
        }
    };

    // Vähennä prioriteetin tärkeyttä yhdellä
    const minusPriority = (task) => {
        if (
            task.prioriteetti <= props.serverData.length &&
            task.prioriteetti > 0
        ) {
            task.prioriteetti = task.prioriteetti - 1;

            patchdata("https://todo-api-n4pi.onrender.com/tasks/" + task.id, {
                prioriteetti: task.prioriteetti,
            });
            props.setDataType("");
        } else if (task.prioriteetti > props.serverData.length) {
            task.prioriteetti = props.serverData.length;

            patchdata("https://todo-api-n4pi.onrender.com/tasks/" + task.id, {
                prioriteetti: task.prioriteetti,
            });
            props.setDataType("");
        } else {
            alert("Prioriteetti ei voi olla negatiivinen");
        }
    };

    if (loading === false) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <IconButton
                onClick={() => plusPriority(props.onetask)}
                sx={{
                    color: "#35739E",
                    fontSize: 20,
                    margin: 1,
                    padding: 2,
                    bgcolor: "#e1e1e1",
                }}
                variant="text"
            >
                +
            </IconButton>
            <IconButton
                onClick={() => minusPriority(props.onetask)}
                sx={{
                    color: "#35739E",
                    fontSize: 20,
                    margin: 1,
                    padding: 2,
                    bgcolor: "#e1e1e1",
                }}
                variant="text"
            >
                -
            </IconButton>
        </div>
    );
}

export { Prioriteetti };
