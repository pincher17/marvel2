import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

export default function SearchList(props) {
    
  return (
    <Box sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
      <nav aria-label="secondary mailbox folders">
        <List >
        {props.search
        ? props.autoComplete.map(item => (
          <ListItem disablePadding >
            <ListItemButton onMouseDown={()=>props.onClickAutoComplete(item[props.valueSearch])} >
              <ListItemText primary={item[props.valueSearch] || 'No results'} />
            </ListItemButton>
          </ListItem>
          ))
        :  <ListItem >
            
              <ListItemText primary="keep typing..." />
            
          </ListItem>
          }
        </List>
      </nav>
    </Box>
  );
}
