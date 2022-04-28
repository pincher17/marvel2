import React, { useEffect, useState } from 'react';
import Masthead from '../MastHead/Masthead';
import Pages from '../Pagination/Pagination';
import s from './Characters.module.css';
import Tooltip from '@mui/material/Tooltip';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import SvgIcon from '@mui/material/SvgIcon';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { connect } from 'react-redux';
import { getCharactersThunk, setAddFavorite, deleteFavorite, 
          sortChangeThunk, searchThunk, setTotalPagesCharacters, updateSearch } from '../../reducers/characters-reducer';
import { NavLink } from 'react-router-dom';
import Search from '../Search/Search';


const Characters2 = (props) => {

  const [search, setSearch] = useState(props.search)

  useEffect(() => {
    
    props.getCharactersThunk(props.search, props.sort, props.pageSize, props.page)
    
  }, [])


  let onKeyPressHandler = (e) =>{
    if (e.keyCode === 13) {
      props.searchThunk(search, props.sort);
    }
  }

  let onSearch = () => {
    props.searchThunk(search, props.sort);
  }

  let onSearchChange = (e) =>{
    setSearch(e.currentTarget.value)
    props.updateSearch(e.currentTarget.value)
  }

  let onSort = (sort) => {
    props.sortChangeThunk(props.search, sort)
  }
  
  console.log('character')
  return (

    <div>

      <Masthead head={'CHARACTERS'} />

      <div className={s.characters_page}>

      <Search sort={props.sort} onSort={onSort} valueSort={'name'} 
        search={props.search} onSearchChange={onSearchChange} 
        onKeyPressHandler={onKeyPressHandler} onSearch={onSearch} />

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
  sortChangeThunk, searchThunk, setTotalPagesCharacters, updateSearch})(Characters2);