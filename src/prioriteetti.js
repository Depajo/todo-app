import React, { useEffect } from "react";
import { useState } from "react";
import { IconButton } from "@mui/material";
import { patchdata } from "./data.js";

function Prioriteetti(props) {
  const [loading, setloading] = useState(false);

  // Lisää prioriteetin tärkeyttä yhdellä
  const plusPriority = (task) => {
    if (task.prioriteetti < props.serverData.length) {
      task.prioriteetti = task.prioriteetti + 1;

      patchdata("http://localhost:3010/tasks/" + task.id, {
        prioriteetti: task.prioriteetti,
      });
    }

    props.setDataType("");
  };

  // Vähennä prioriteetin tärkeyttä yhdellä
  const minusPriority = (task) => {
    if (task.prioriteetti <= props.serverData.length && task.prioriteetti > 0) {
      task.prioriteetti = task.prioriteetti - 1;

      patchdata("http://localhost:3010/tasks/" + task.id, {
        prioriteetti: task.prioriteetti,
      });
    }

    props.setDataType("");
  };

  useEffect(() => {
    setloading(true);
  }, [props.onetask]);

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
