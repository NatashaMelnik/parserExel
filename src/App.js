import React, { useState } from 'react';
import { Charts } from './charts';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function App() {

  const [numberRange, setRange] = useState(0);
  const [intervalsCount, setIntervals] = useState(0);
  const [tryCount, setTrys] = useState(0);
  const [showChartsStatus, setStatus] = useState(false);

  const onChangeNumberRange = (event) => {
    setRange(event.target.value);
  }

  const onChangeIntervalsCount = (event) => {
    setIntervals(event.target.value);
  }

  const onChangeTrysCount = (event) => {
    setTrys(event.target.value);
  }

  const showCharts = () => {
    setStatus(true);
  }

  return (
    <div className="App">
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField type="number" id="outlined-basic" label="interval of generation" variant="outlined" onChange={onChangeNumberRange} />
        <TextField type="number" id="outlined-basic" label="number of intervals" variant="outlined" onChange={onChangeIntervalsCount} />
        <TextField type="number" id="outlined-basic" label="count of trys" variant="outlined" onChange={onChangeTrysCount} />
      </Box>
      <div className="inputs">
        <div className="startButtons" onClick={showCharts}>
          <Button variant="outlined" color="primary">
            generate
          </Button>
        </div>
        <>
          {showChartsStatus ? <Charts props={[numberRange, intervalsCount, tryCount]} /> : <></>}
        </>
      </div>
    </div>
  );
}

export default App;
