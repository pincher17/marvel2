import * as axios from 'axios';
import React from 'react';
import Masthead from '../MastHead/Masthead';
import s from './Characters.module.css';

const Characters = (props) => {

  let allPages = [];
  for (let i = 1; i <= 10; i++) {
    allPages.push(i);
  }



  let sortValue = React.createRef();

  let onSort = () => {
    let sort = sortValue.current.value;
    props.sortChange(sort);
    // props.dispatch(onPostChangeActionCreator(text))
  }

  let searchValue = React.createRef();
  let onSearch = () => {
    let search = searchValue.current.value;
    props.search(search);
    // props.dispatch(onPostChangeActionCreator(text))
  }
  debugger;
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
          {props.characters.map(item => (

            <div className={s.card_character} key={item.id}>

              <div className={s.card_img} style={{ backgroundImage: 'url(' + item.thumbnail.path + '/portrait_uncanny.jpg' + ')' }}></div>
              <div className={s.card_info}>

                <span className={s.card_name}>{item.name}</span>
                {/* <span className="card-name2">{item.name}</span> */}
                {/* <div> */}
                {props.favorites.find(i => i.id == item.id)
                  ? <button onClick={() => { props.deleteFavorite(item.id) }} className={s.btn_favorite_delete}>delete</button>
                  : <button onClick={() => { props.setAddFavorite(item.id) }} className={s.btn_favorite}>add favorite</button>}
                {/*  </div> */}
              </div>

            </div>
          ))}
        </div>

        <div>
          {allPages.map(p => {
            return (
              <span onClick={() => { props.pageChange(p) }} className={props.page === p && s.selected}>{p}</span>)

          })}
        </div>

      </div>
    </div>
  )
}


export default Characters;