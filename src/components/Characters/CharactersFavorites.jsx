import * as axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { deleteFavorite } from "../../reducers/characters-reducer";
import s from "./Characters.module.css";

import StarRoundedIcon from '@mui/icons-material/StarRounded';
import SvgIcon from '@mui/material/SvgIcon';
import { NavLink } from "react-router-dom";


const CharactersFavorites = (props) => {
  debugger;
  return (
    <div>
      <div className={s.characters_page}>
        <div className={s.card_character_wrapper}>

          {props.favorites.map((item) => (

            <div className={s.card_character} key={item.id}>
              <div className={s.favorite_bg}></div>
                <div
                  onClick={() => {props.deleteFavorite(item.id)}}className={s.btn_favorite_star}>
                  <SvgIcon component={StarRoundedIcon} fontSize="large" />
                </div>
              
              <NavLink to={"/characters/info/" + item.id} style={{ textDecoration: "none" }}>
                <div
                  className={s.card_img}
                  style={{backgroundImage: "url(" + item.thumbnail.path + "/portrait_uncanny.jpg" + ")",}}></div>
                <div className={s.card_info}>
                  <span className={s.card_name}>{item.name}</span>
                </div>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    favorites: state.characters.favorites,
  };
};

export default connect(mapStateToProps, { deleteFavorite })(CharactersFavorites);
