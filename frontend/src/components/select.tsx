import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface ISelect {
  label: string;
  items: string[];
  value: string
  handleChange: ((event: SelectChangeEvent<string>, child: ReactNode) => void) | undefined
}

function BasicSelect({ label, items, value, handleChange }: ISelect) {

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={handleChange}
        >
          <MenuItem value="All">All</MenuItem>
          {
            items.map(item => <MenuItem value={item}>{item}</MenuItem>)
          }
        </Select>
      </FormControl>
    </Box>
  );
}

export { BasicSelect }