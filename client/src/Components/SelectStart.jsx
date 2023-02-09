import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { StartPoints } from '../data/DatatDash';
import { Typography } from '@mui/material';

export default function SelectStart (title) {
   const [selected_1, setSelected_1] = useState('')
   const handleChange = (event) => {
        setSelected_1(event.target.value)
   }
    return (
        <div>
        <FormControl sx = {{m: -5, ml: 18, width: 250 }}>
            <InputLabel>{title.title}</InputLabel>
            <Select
            value={selected_1}
            label = "setSelected_1"
            onChange = {handleChange}
            >
                {StartPoints.map((selected_1) => (
                    <MenuItem
                    key={selected_1}
                    value = {selected_1}
                    >
                    {selected_1}</MenuItem>
                ))}
                

            </Select>
        </FormControl>
        </div>
    )
}