import * as React from 'react';
import s from './Pagination.module.css';
import ReactDOM from 'react-dom';
import { Pagination } from '@mui/material';
import { makeStyles } from '@material-ui/core';

const Pages = (props) => {


  const useStyles = makeStyles((theme) =>({
    root: {
        '& .Mui-selected': {
          backgroundColor: 'rgb(225 39 39) !important',
          color:'white',
          fontWeight: 'bold',
         },
         '& .Mui-selected:hover': {
          backgroundColor: 'rgb(225 39 39)',
          color:'#d1d1d1',
          fontWeight: 'bold',
         },
         '& ul > li > button:not(.Mui-selected)': {
          backgroundColor: 'transparent',
          color:'#4c4c4c',
          borderColor: '#4c4c4c',
          fontWeight: 'bold',
         },
         '& ul > li > button:not(.Mui-selected):hover': {
          backgroundColor: 'rgb(225 39 39)',
          color:'white',
          fontWeight: 'bold',
          borderColor: 'rgb(225 39 39)',
         },

    },
  }))
  
  const classes = useStyles();


  return (
   
        <div className={s.pagination_wrapper}>
          <div className={s.pagination}>
                  <Pagination count={100} onChange={(_, num) => props.pageChange(num)}
                    defaultPage={props.page} variant="outlined" shape="rounded" 
                    className={classes.root} page={props.page}  />
          </div>
        </div>

      
   
  )
}


export default Pages;