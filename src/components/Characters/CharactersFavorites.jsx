import * as axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { deleteFavorite } from "../../reducers/characters-reducer";
import s from "./Characters.module.css";
import Tooltip from '@mui/material/Tooltip';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import SvgIcon from '@mui/material/SvgIcon';
import { NavLink } from "react-router-dom";


const CharactersFavorites = (props) => {
  debugger;
  return (
    <div>
      <div className={s.characters_page}>
        <div className={s.card_character_wrapper}>
        {props.favorites.length
          ? props.favorites.map((item) => (

            <div className={s.card_character} key={item.id}>
              <div className={s.favorite_bg}></div>
              <Tooltip title="Delete favorite">
                <div onClick={() => {props.deleteFavorite(item.id)}}className={s.btn_favorite_star}>
                  <SvgIcon component={StarRoundedIcon} fontSize="large" />
                </div>
              </Tooltip>

              <NavLink to={"/characters/info/" + item.id} style={{ textDecoration: "none" }}>
                <div
                  className={s.card_img}
                  style={{backgroundImage: "url(" + item.thumbnail.path + "/portrait_uncanny.jpg" + ")",}}></div>
                <div className={s.card_info}>
                  <span className={s.card_name}>{item.name}</span>
                </div>
              </NavLink>
            </div>
          ))
          :<div className={s.text_no_favorites}>
           <p>You have not added any character to favorites</p>
          </div>
          }
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
