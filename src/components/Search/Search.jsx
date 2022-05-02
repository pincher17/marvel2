import React, { useState } from 'react';
import ButtonSearch from './ButtonSearch';
import SearchInput from './SearchInput';
import s from './Search.module.css';
import Sort from './Select';
import SearchList from './SearchList/SearchList';


const Search =(props) => {




  return (
    <div className={s.search_wrapper}>
    <div className={s.sort_wrapper}><Sort onSort={props.onSort} sort={props.sort} valueSort={props.valueSort} /></div>
    <div className={s.search_input_wrapper}>
    <SearchInput search={props.search} onSearchChange={props.onSearchChange} 
      onKeyPressHandler={props.onKeyPressHandler} setHideAutoComplete={props.setHideAutoComplete}
      inputRef={props.inputRef} />
    <div className={props.display ? s.none : s.search_list_wrapper}>
      <SearchList autoComplete={props.autoComplete} valueSearch={props.valueSearch} 
                  onClickAutoComplete={props.onClickAutoComplete} search={props.search} />
      </div>
    </div>
    <div className={s.btn_search} onClick={props.onSearch}><ButtonSearch /></div>
    </div>
  );
}



export default (Search);