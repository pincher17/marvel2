import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from '@material-ui/core';


export default function Sort(props) {
  


  const handleChange = (event) => {
    props.onSort(event.target.value)
  };

  const useStyles = makeStyles((theme) =>({
    root: {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgb(212,21,21)',
         },
         '& .MuiOutlinedInput-notchedOutline:hover': {
          borderColor: 'none',
         },

    },
  }))
  
  const classes = useStyles();
 
  return (
    <Box sx={{ Width: 50 }}>
      <FormControl fullWidth>
        <InputLabel color='error'  id="demo-simple-select-label">Sort by</InputLabel>
        <Select
          focused
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.sort}
          label="Sort by"
          onChange={handleChange}
          color='error'
          className={classes.root}
        >
          <MenuItem value={props.valueSort}>A-z</MenuItem>
          <MenuItem value={'-'+props.valueSort}>Z-a</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
