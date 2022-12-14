import React, { useEffect, useState } from "react";
import { Card, Button } from "@mui/material/";
import TaskTimer from "./taskTimer.js";
import { Prioriteetti } from "./priority.js";

const TaskCard = (props) => {
    const [loading, setloading] = useState(true);
    const [task, setTask] = useState();

    useEffect(() => {
        setTask(props.onetask);
        setloading(false);
    }, [loading, props.onetask, props.serverData]);

    if (loading === false) {
        return (
            <div className="object" key={props.indexi}>
                <Card key={"card" + props.index} sx={{ padding: 3 }}>
                    <div className="id">
                        <h3 className="tehtavakortti-otsikko">ID:</h3>
                        <p className="tehtavakortti-arvo">{task.id}</p>
                    </div>
                    <div
                        className="tehtavakortti"
                        style={{
                            maxHeight: 350,
                            overflow: "scroll",
                        }}
                    >
                        <div className="tehtava">
                            <h3 className="tehtavakortti-otsikko">Tehtävä:</h3>
                            <p className="tehtavakortti-arvo">{task.tehtävä}</p>
                        </div>
                        <div className="kategoriat">
                            <h3 className="tehtavakortti-otsikko">
                                Kategoriat:
                            </h3>
                            <ul className="kategoriat-lista">
                                {task.kategoria.map((e, i) => (
                                    <li style={{ margin: 5 }} key={i}>
                                        {e}{" "}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="ajanlaskenta">
                            <h3 className="tehtavakortti-otsikko">
                                Ajanlaskenta:
                            </h3>
                            <TaskTimer task={task} />
                        </div>
                        <h3 className="tehtavakortti-otsikko">
                            Oma Prioriteetti:
                        </h3>
                        <div
                            className="prioriteetti"
                            style={{
                                display: "flex",
                                displayDirection: "column",
                            }}
                        >
                            <h3 className="tehtavakortti-otsikko">
                                {task.prioriteetti}
                            </h3>
                            <Prioriteetti
                                setServerData={props.setServerData}
                                serverData={props.serverData}
                                setDataType={props.setDataType}
                                onetask={props.onetask}
                            />
                        </div>
                        <div className="luontipvm">
                            <h3 className="tehtavakortti-otsikko">
                                Luontipvm:
                            </h3>
                            <p className="tehtavakortti-arvo">
                                {task.luontipvm}
                            </p>
                        </div>
                        {/* <div className="valmis">
                                <h3 className="tehtavakortti-otsikko">
                                    Valmis:
                                </h3>
                                <p className="tehtavakortti-arvo">{valmis}</p>
                            </div> */}
                    </div>
                    <Button
                        onClick={() => props.editHandle(props.onetask)}
                        sx={{ color: "#35739E" }}
                        variant="text"
                    >
                        Muokkaa
                    </Button>
                    <Button
                        onClick={() => props.openTask(props.onetask)}
                        sx={{ color: "#35739E" }}
                        variant="text"
                    >
                        Avaa tehtävä
                    </Button>
                </Card>
            </div>
        );
    } else {
        return <div> Loading.. </div>;
    }
};

export { TaskCard };
