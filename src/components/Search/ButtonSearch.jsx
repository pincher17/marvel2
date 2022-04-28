import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@material-ui/core';
import s from './ButtonSearch.module.css';

export default function ButtonSearch(props) {
  
  const useStyles = makeStyles((theme) =>({
    root: {
        '& button.MuiButtonBase-root-MuiIconButton-root': {
          backgroundColor: 'rgb(212,21,21)',
          color: '#f1f1f1',
          borderRadius: '5px',
          padding: '8px',
         },
         '& button .MuiButtonBase-root-MuiIconButton-root:hover': {
          backgroundColor: 'rgb(212,21,21)',
         },
        
    },
  }))
  
  const classes = useStyles();

  return (
    <Stack direction="row" spacing={1}>
      <div className={s.btn_search}>
        <SearchIcon sx={{ fontSize: 40 }} />
      </div>
    </Stack>
  );
}
