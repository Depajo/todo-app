import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getdata } from "./data";
import "./App.css";

function Tehtava() {
    const [task, setTask] = useState([]);
    const id = useParams().id;
    const [errorMessages, setErrorMessage] = useState();

    useEffect(() => {
        getdata("http://localhost:3010/tasks/" + id)
            .then((res) => {
                setTask(res.data);
                console.log(res.data);
            })
            .catch((e) => setErrorMessage(e.message));
    }, [id]);

    if (task.length === 0) {
        return <div>{errorMessages}.</div>;
    } else {
        return (
            <div className="content">
                <h1>Tehtävä</h1>
                <h2>ID: {task.id}</h2>
                <h2>Kategoriat:</h2>
                <ul className="kategoriat-lista">
                    {task.kategoria.map((e, i) => (
                        <li key={i}>{e}</li>
                    ))}
                </ul>
                <h2>Prioriteetti: {task.prioriteetti}</h2>
            </div>
        );
    }
}

export default Tehtava;
