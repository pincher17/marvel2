import React, { useState } from 'react';
import ButtonSearch from './ButtonSearch';
import SearchInput from './SearchInput';
import s from './Search.module.css';
import Sort from './Select';


const Search =(props) => {




  return (
    <div className={s.search_wrapper}>
    <div className={s.sort_wrapper}><Sort onSort={props.onSort} sort={props.sort} valueSort={props.valueSort} /></div>
    <SearchInput search={props.search} onSearchChange={props.onSearchChange} 
      onKeyPressHandler={props.onKeyPressHandler} />
    <div className={s.btn_search} onClick={props.onSearch}><ButtonSearch /></div>
    </div>
  );
}



export default (Search);