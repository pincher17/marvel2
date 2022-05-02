import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@material-ui/core';

export default function SearchInput(props) {

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
    <Box
      sx={{
        maxWidth: '100%',
      }}
    >
      <TextField fullWidth label="Search" id="fullWidth" color='error' value={props.search}
        onChange={props.onSearchChange} className={classes.root} 
        autoComplete='off' onKeyDown={props.onKeyPressHandler} onBlur={()=>props.setHideAutoComplete(true)}
        onFocus={()=>props.setHideAutoComplete(false)} inputRef={props.inputRef} />
    </Box>
  );
}