import React, { useEffect, useState } from 'react';
import Masthead from '../MastHead/Masthead';
import Pages from '../Pagination/Pagination';
import s from './Characters.module.css';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import SvgIcon from '@mui/material/SvgIcon';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { connect } from 'react-redux';
import { getCharactersThunk, setAddFavorite, deleteFavorite, 
          sortChangeThunk, searchThunk, setTotalPagesCharacters } from '../../reducers/characters-reducer';
import { NavLink } from 'react-router-dom';


const Characters2 = (props) => {

  useEffect(() => {
    
    props.getCharactersThunk(props.search, props.sort, props.pageSize, props.page)
    
  }, []) 

  
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
                : <div onClick={() => { props.setAddFavorite(item) }} className={s.btn_favorite_star}>
                    <SvgIcon component={StarBorderRoundedIcon} fontSize="large" />
                  </div>
              }
            <NavLink to={'/characters/info/' + item.id } style={{ textDecoration: 'none' }}>
              <div className={s.card_img} style={{ backgroundImage: 'url(' + item.thumbnail.path + '/portrait_uncanny.jpg' + ')' }}></div>
              <div className={s.card_info}>

                <span className={s.card_name}>{item.name}</span>

              </div>
              </NavLink>
            </div>
            
          ))}
          
        </div>
        <Pages thunk={props.getCharactersThunk} total={props.totalCharacters} 
        setTotalPages={props.setTotalPagesCharacters} {...props} />
      </div>
    </div>
  )
}


let mapStateToProps = (state) => {

  return {
    characters: state.characters.items,
    page: state.characters.page,
    sort: state.characters.sort,
    search: state.characters.search,
    favorites: state.characters.favorites,
    fetching: state.fetching.isFetching,
    totalPages: state.characters.totalPages,
    totalCharacters: state.characters.totalCharacters,
    pageSize: state.characters.pageSize
  }

}

export default connect(mapStateToProps, {getCharactersThunk, 
  setAddFavorite, deleteFavorite, 
  sortChangeThunk, searchThunk, setTotalPagesCharacters})(Characters2);