import React, { useRef, useState, useEffect } from 'react';
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
import Search from '../Search/Search';



const Comics2 = (props) => {

 
  const [search, setSearch] = React.useState(props.search)
  const [hideAutoComplete, setHideAutoComplete] = useState(true)
  const wrapperRef = useRef(null);
  const inputRef = useRef();

  useEffect(() => {
    
    setSearch(props.search)
   
  }, [props.search])

  const onScroll = () => {
    wrapperRef.current.scrollIntoView(true);
  }

  let onKeyPressHandler = (e) =>{
    if (e.keyCode === 13) {
      props.searchComicsThunk(search, props.sort);
      setHideAutoComplete(true)
      inputRef.current.blur()
    }
  }

  let onSearch = () => {
    props.searchComicsThunk(search, props.sort);
  }

  let onSearchChange = (e) =>{
    /* setSearch(e.currentTarget.value) */
    let value = e.currentTarget.value
    props.getComicsAutoCompleteThunk(value)
    props.updateSearch(value)
  }

  let onClickAutoComplete = (value) =>{
    /* setSearch(value) */
    props.updateSearch(value)
    props.searchComicsThunk(value, props.sort);
  }

  let onSort = (sort) => {
    props.sortChangeComicsThunk(props.search, sort);
  }


  return (
    <div>

      <Masthead head={'COMICS'} />

      <div className={s.comics_page} ref={wrapperRef}>


 {/*        <select ref={sortValue} onChange={onSort} className={s.user_profile_color_1}>
          <option value="title">A-z</option>
          <option value="-title">Z-a</option>
        </select>

        <input ref={searchValue} type="search" name="q" placeholder="Поиск по сайту"></input>
        <input type="submit" value="Найти" onClick={onSearch}></input> */}

<Search sort={props.sort} onSort={onSort} valueSort={'title'} search={props.search} 
        onSearchChange={onSearchChange} onKeyPressHandler={onKeyPressHandler}
        onSearch={onSearch} autoComplete={props.autoComplete} valueSearch={'title'}
        onClickAutoComplete={onClickAutoComplete} display={hideAutoComplete}
        setHideAutoComplete={setHideAutoComplete} inputRef={inputRef}  />

        

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
          <Pages {...props} onScroll={onScroll} />
      </div>
    </div>
  )
}


export default Comics2;