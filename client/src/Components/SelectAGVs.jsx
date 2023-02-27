import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { AGVs } from '../data/DatatDash';
import { Typography } from '@mui/material';


export default function SelectAGVs (){
  const [selected, setSelected] = useState('')
  const handleChange = (event) => {
    setSelected(event.target.value);
  };
  return (
    <div>
      <FormControl sx = {{m: -5, ml: 18, width: 250 }}>
        <InputLabel>
        <Typography>Select AGVs</Typography>
        </InputLabel>
        <Select 
        value ={selected}
        label ="setSelected"
        onChange = {handleChange}
        >  
        {/* {AGVs.map((selected) => (
           <MenuItem
           key={selected}
           value = {selected}
           > {selected}</MenuItem>
        ))} */}
        <MenuItem value ={1}>AGV 1</MenuItem>
        <MenuItem value = {2}>AGV 2</MenuItem>
        <MenuItem value = {3}>AGV 3</MenuItem>
        <MenuItem value = {4}>AGV 4</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

