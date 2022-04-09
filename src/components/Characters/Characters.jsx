import React from 'react';
import Masthead from '../MastHead/Masthead';
import Pages from '../Pagination/Pagination';
import s from './Characters.module.css';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import SvgIcon from '@mui/material/SvgIcon';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const Characters = (props) => {

  let sortValue = React.createRef();

  let onSort = () => {
    let sort = sortValue.current.value;
    props.sortChangeThunk(props.search, sort)
  }

  let searchValue = React.createRef();
  let onSearch = () => {
    let search = searchValue.current.value;
    props.searchThunk(search, props.sort);
  }

  return (

    <div>

      <Masthead head={'CHARACTERS'} />

      <div className={s.characters_page}>


        <select ref={sortValue} onChange={onSort} className={s.user_profile_color_1}>
          <option value="name">A-z</option>
          <option value="-name">Z-a</option>
        </select>

        <input ref={searchValue} type="search" name="q" placeholder="Поиск по сайту"></input>
        <input type="submit" value="Найти" onClick={onSearch}></input>

        <div className={s.card_character_wrapper}>

          {props.fetching 
            ? <div className={s.spinner_wrapper}>
                <Box sx={{ display: 'flex' }}>
                  <CircularProgress color='error' />
                </Box>
              </div>

            : props.characters.map(item => (

            <div className={s.card_character} key={item.id}>

              <div className={s.favorite_bg}></div>
              {props.favorites.find(i => i.id == item.id)
                ? <div  onClick={() => { props.deleteFavorite(item.id) }} className={s.btn_favorite_star}> 
                   <SvgIcon component={StarRoundedIcon} fontSize="large" />
                 </div>
                : <div onClick={() => { props.setAddFavorite(item.id) }} className={s.btn_favorite_star}>
                    <SvgIcon component={StarBorderRoundedIcon} fontSize="large" />
                  </div>
              }

              <div className={s.card_img} style={{ backgroundImage: 'url(' + item.thumbnail.path + '/portrait_uncanny.jpg' + ')' }}></div>
              <div className={s.card_info}>

                <span className={s.card_name}>{item.name}</span>

              </div>

            </div>
          ))}
          
        </div>
        <Pages {...props} />
      </div>
    </div>
  )
}


export default Characters;