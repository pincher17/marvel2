import * as axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import s from "./ComicInfo.module.css";
import { getComicInfoThunk } from "../../reducers/comicInfo-reducer";
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import SvgIcon from '@mui/material/SvgIcon';
import { setAddFavorite, deleteFavorite } from '../../reducers/comics-reducer';



const ComicInfo = (props) => {

  let comicId = props.match.params.comicId;

  useEffect(() => {
    props.getComicInfoThunk(comicId);
  }, []);



  return (
    <div className={s.wrapper_all}>
      {props.comicInfo.map((item) => (
        <div className={s.wrapper}>
          <div className={s.wrapper_img}>
            <img
              src={item.thumbnail.path + "/portrait_uncanny.jpg"}
              alt="comic"
            />
          </div>
          <div className={s.wrapper_info_text}>
          <div className={s.wrapper_title}>
            <span className={s.name}>{item.title}</span>
            {props.favorites.find(i => i.id == item.id)
                ? (<div  onClick={() => { props.deleteFavorite(item.id) }} className={s.btn_favorite_star}> 
                   <SvgIcon component={StarRoundedIcon} fontSize="inherit" />
                 </div>)
                : (<div onClick={() => { props.setAddFavorite(item) }} className={s.btn_favorite_star}>
                    <SvgIcon component={StarBorderRoundedIcon} fontSize="inherit" />
                  </div>)
              }
              </div>
            {item.description ? (
              <div>
                <p className={s.description}>Description:</p>
                <p className={s.info_character}>{item.description}</p>
              </div>
            ) : (
              <div>
                <p className={s.info_character}>No description</p>
                </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    comicInfo: state.comicInfo.comic,
    favorites: state.comics.favorites,
  };
};

export default connect(mapStateToProps, {
  getComicInfoThunk,
  setAddFavorite, deleteFavorite
})(withRouter(ComicInfo));
