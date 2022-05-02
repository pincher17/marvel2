import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import s from "./CharacterInfo.module.css";
import {
  getCharacterInfoThunk,
  getCharacterInfoComicsThunk,
} from "../../reducers/characterInfo-reducer";
import {setAddFavorite, deleteFavorite} from '../../reducers/characters-reducer';
import { NavLink } from "react-router-dom";
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import SvgIcon from '@mui/material/SvgIcon';
import { useParams } from "react-router-dom";




const CharacterInfo = (props) => {
 
  let { characterId } = useParams();
  const info = useSelector(state => state.characterInfo.character);
  console.log(props.characterInfo)
  
  useEffect(() => {
    
    props.getCharacterInfoThunk(characterId);
  }, []);

  useEffect(() => {
    props.getCharacterInfoComicsThunk(characterId);
  }, []);
  
  return (
    <div className={s.wrapper_all}>
      {props.characterInfo.map((item) => (
        <div className={s.wrapper}>
          <div className={s.wrapper_img}>
            <img
              src={item.thumbnail.path + "/portrait_uncanny.jpg"}
              alt="character"
            />
          </div>
          <div className={s.wrapper_info_text}>
            <div className={s.wrapper_name}>
            <span className={s.name}>{item.name}</span>
            {props.favorites.find(i => i.id === item.id)
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
              <div></div>
            )}
            <p className={s.head_comics}>Comics with {item.name}:</p>
            <div className={s.comics_wrapper}>

              {props.characterComics.map((item) => (
                <NavLink to={'/comic/info/' + item.id } style={{ textDecoration: 'none' }}>
                <div className={s.comic}>
                  <img
                    src={item.thumbnail.path + "/portrait_xlarge.jpg"}
                    alt=""
                  />
                  <p className={s.comic_title}>{item.title}</p>
                </div>
                </NavLink>

              ))}
              
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    characterInfo: state.characterInfo.character,
    characterComics: state.characterInfo.characterComics,
    favorites: state.characters.favorites,
  };
};

export default connect(mapStateToProps, {
  getCharacterInfoThunk,
  getCharacterInfoComicsThunk,
  deleteFavorite,
  setAddFavorite,
})(CharacterInfo);
