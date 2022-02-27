import * as React from "react";

import {
  Switch,
  TextField,
  FormControlLabel,
  FormGroup,
  FormControl,
  Grid,
} from "@mui/material";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function AdvancedKeyType({
  advancedConfiguration,
  setAdvancedConfiguration,
}: any) {
  const [state, setState] = React.useState({
    advanced: false,
  });

  const handleChangeSwitch = (event: any) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChangeHdPath = (event: any) => {
    setAdvancedConfiguration({
      ...advancedConfiguration,
      hdpath: event.target.value,
    });
  };

  const handleChange = (event: any) => {
    setAdvancedConfiguration({
      ...advancedConfiguration,
      keyType: event.target.value,
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item>
        <FormControl component="fieldset" variant="standard">
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={state.advanced}
                  onChange={handleChangeSwitch}
                  name="advanced"
                />
              }
              label={state.advanced ? "✨" : "🔧"}
            />
          </FormGroup>
        </FormControl>
      </Grid>

      {state.advanced && (
        <>
          <Grid item>
            <FormControl>
              <InputLabel id="select-key-type-label">Type</InputLabel>
              <Select
                style={{ minWidth: "128px" }}
                labelId="select-key-type-label"
                id="select-key-type"
                value={advancedConfiguration.keyType}
                label="Type"
                onChange={handleChange}
              >
                <MenuItem value={"ed25519"}>Ed25519</MenuItem>
                <MenuItem value={"secp256k1"}>Secp256k1</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item flexGrow={1}>
            <TextField
              label="HD Path"
              fullWidth
              value={advancedConfiguration.hdpath}
              onChange={handleChangeHdPath}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
}
