import React, { useEffect, useRef, useState } from 'react';
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
          sortChangeThunk, searchThunk, setTotalPagesCharacters, 
          updateSearch, setPageChange, getCharactersAutoCompleteThunk } from '../../reducers/characters-reducer';
import { NavLink } from 'react-router-dom';
import Search from '../Search/Search';


const Characters2 = (props) => {

  const [search, setSearch] = useState(props.search)
  const [hideAutoComplete, setHideAutoComplete] = useState(true)
  const wrapperRef = useRef(null);
  const inputRef = useRef();

  useEffect(() => {
    
    props.getCharactersThunk(props.search, props.sort, props.pageSize, props.page)
   
  }, [])

  useEffect(() => {
    
    setSearch(props.search)
   
  }, [props.search])



  const onScroll = () => {
    wrapperRef.current.scrollIntoView(true);
  }
  
  let onKeyPressHandler = (e) =>{
    if (e.keyCode === 13) {
      props.searchThunk(search, props.sort);
      setHideAutoComplete(true)
      inputRef.current.blur()
    }
  }

  let onSearch = () => {
    props.searchThunk(search, props.sort);
  }

  let onSearchChange = (e) =>{
    let value = e.currentTarget.value
    /* setSearch(value) */
    props.getCharactersAutoCompleteThunk(value)
    props.updateSearch(value)
  }

  let onClickAutoComplete = (value) =>{
    /* setSearch(value) */
    props.updateSearch(value)
    props.searchThunk(value, props.sort);
  }

  let onSort = (sort) => {
    props.sortChangeThunk(props.search, sort)
  }
  
  
  return (

    <div>

      <Masthead head={'CHARACTERS'}  />

      <div className={s.characters_page} ref={wrapperRef} >

      <Search sort={props.sort} onSort={onSort} valueSort={'name'} 
        search={props.search} onSearchChange={onSearchChange} 
        onKeyPressHandler={onKeyPressHandler} onSearch={onSearch}
        autoComplete={props.autoComplete} valueSearch={'name'}
        onClickAutoComplete={onClickAutoComplete} display={hideAutoComplete}
        setHideAutoComplete={setHideAutoComplete} inputRef={inputRef} />

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

              {props.favorites.find(i => i.id === item.id)
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
              <div className={s.card_img} style={{ backgroundImage: `url(${item.thumbnail.path}/portrait_uncanny.jpg)` }}></div>
              <div className={s.card_info}>

                <span className={s.card_name}>{item.name}</span>

              </div>
              </NavLink>
            </div>
            
          ))}
          
        </div>
        <Pages thunk={props.getCharactersThunk} total={props.totalCharacters} 
        setTotalPages={props.setTotalPagesCharacters} onScroll={onScroll} {...props} />
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
    pageSize: state.characters.pageSize,
    pageChange: state.characters.pageChange,
    autoComplete: state.characters.autoComplete,
  }

}

export default connect(mapStateToProps, {getCharactersThunk, 
  setAddFavorite, deleteFavorite, 
  sortChangeThunk, searchThunk, setTotalPagesCharacters, updateSearch, setPageChange, getCharactersAutoCompleteThunk })(Characters2);