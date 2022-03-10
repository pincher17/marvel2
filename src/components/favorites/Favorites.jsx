import * as React from 'react';
import CharactersFavorites from '../Characters/CharactersFavorites';
import ComicsFavorites from '../Comics/ComicsFavorites';
import Masthead from '../MastHead/Masthead';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { makeStyles } from '@material-ui/core';



const Favorites = (props) => {

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  
  const useStyles = makeStyles((theme) =>({
    root: {
        '& .MuiTabs-flexContainer': {
          justifyContent: 'center' 
         },
         '& .Mui-selected': {
          color: '#d41515 !important'
         },
         '& .MuiTabs-indicator': {
          backgroundColor: '#d41515'
         },
    },
  }))
  
  const classes = useStyles();


  return (
    <div>

      <Masthead head={'FAVORITES'} />
      
      

      <Box sx={{ width: '100%', typography: 'body1', }} className={classes.root}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider',  }} >
          <TabList onChange={handleChange} aria-label="lab API tabs example" >
            <Tab label="Characters" value="1" />
            <Tab label="comics" value="2" />
          </TabList>
        </Box>
        <TabPanel  value="1"><CharactersFavorites /></TabPanel>
        <TabPanel  value="2"><ComicsFavorites /></TabPanel>
      </TabContext>
    </Box>

    </div>
  )
}





export default Favorites;