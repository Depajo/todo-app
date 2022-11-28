import "./App.css";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material/";

function Lisaa() {
  return (
    <div className="content">
      <div className="container-3">
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </Box>
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </Box>
      </div>
    </div>
  );
}

export default Lisaa;
