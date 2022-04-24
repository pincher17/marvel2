import * as React from 'react';
import Masthead from '../MastHead/Masthead';
import s from './Comics2.module.css';
import Pages from '../Pagination/Pagination';
import Tooltip from '@mui/material/Tooltip';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import SvgIcon from '@mui/material/SvgIcon';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';



const Comics2 = (props) => {

  let sortValue = React.createRef();

  let onSort = () => {
    let sort = sortValue.current.value;
    props.sortChangeComicsThunk(props.search, sort);
  }

  let searchValue = React.createRef();
  let onSearch = () => {
    let search = searchValue.current.value;
    props.searchComicsThunk(search, props.sort);
  }
 

 /*  const useStyles = makeStyles((theme) =>({
    root: {
        

    },
  }))
  
  const classes = useStyles(); */


  return (
    <div>

      <Masthead head={'COMICS'} />

      <div className={s.comics_page}>


        <select ref={sortValue} onChange={onSort} className={s.user_profile_color_1}>
          <option value="title">A-z</option>
          <option value="-title">Z-a</option>
        </select>

        <input ref={searchValue} type="search" name="q" placeholder="Поиск по сайту"></input>
        <input type="submit" value="Найти" onClick={onSearch}></input>

        <div className={s.card_comics_wrapper}>
        
        {props.fetching 
            ? <div className={s.spinner_wrapper}>
                <Box sx={{ display: 'flex' }}>
                  <CircularProgress color='error' />
                </Box>
              </div>

            :props.comics.map(item => (
            
            <div className={s.comics} key={item.id}>
              <div className={s.card_comics}>
                <div className={s.favorite_bg}></div>
              {props.favorites.find(i => i.id == item.id)
                ? <Tooltip title="Delete favorite">
                 <div  onClick={() => { props.deleteFavorite(item.id) }} className={s.btn_favorite_star}> 
                   <SvgIcon component={StarRoundedIcon} fontSize="large" />
                 </div>
                 </Tooltip>
                : <Tooltip title="Add favorite">
                  <div onClick={() => { props.setAddFavorite(item) }} className={s.btn_favorite_star}>
                    <SvgIcon component={StarBorderRoundedIcon} fontSize="large" />
                  </div>
                  </Tooltip>
              }
              <NavLink to={'/comic/info/' + item.id } style={{ textDecoration: 'none' }}>
              <div className={s.card_img} style={{ backgroundImage: 'url(' + item.thumbnail.path + '.jpg' + ')' }}></div>
              <div className={s.title}>
              <span className={s.card_title}>{item.title}</span>
              </div>
              </NavLink>
              </div>
            </div>
            
          ))}
        </div>
          <Pages {...props} />
      </div>
    </div>
  )
}


export default Comics2;