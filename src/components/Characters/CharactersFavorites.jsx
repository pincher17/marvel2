import * as axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { deleteFavoriteActionCreator } from '../../reducers/characters-reducer';
import Masthead from '../MastHead/Masthead';
import s from './Characters.module.css';

const CharactersFavorites = (props) => {

debugger;
  return (
    <div>

      <Masthead head={'FAVORITES'} />

      <div className={s.characters_page}>


        <div className={s.card_character_wrapper}>
          {props.favorites.map(item => (

            <div className={s.card_character} key={item.id}>

              <div className={s.card_img} style={{ backgroundImage: 'url(' + item.thumbnail.path + '/portrait_uncanny.jpg' + ')' }}></div>
              <div className={s.card_info}>

                <span className={s.card_name}>{item.name}</span>
                {/* <span className="card-name2">{item.name}</span> */}
                {/* <div> */}
                <button onClick={() => props.deleteFavoriteActionCreator(item.id)} className={s.btn_favorite_delete}>delete</button>
                {/*  </div> */}
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}


let mapStateToProps = (state) => {

  return {
    favorites: state.characters.favorites,
  }

}



export default connect(mapStateToProps, { deleteFavoriteActionCreator })(CharactersFavorites);