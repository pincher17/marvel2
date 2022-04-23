import React, {useState, useEffect} from "react"
import { useSelector } from "react-redux";
import s from './SliderCharacters.module.css';

import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import SvgIcon from '@mui/material/SvgIcon';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { getCharactersHomePageThunk, setAddFavorite, deleteFavorite} from '../../reducers/characters-reducer';



const SliderCharacters = (props) => {

  const characters = useSelector(state => state.characters.charactersHomePage);
  const favorites = useSelector(state => state.characters.favorites);


  const [activeSlide, setActiveSlide] = useState(0);
  const [hiddenArrow, setHiddenArrow] = useState(false)

  useEffect(() => {
    
    if(activeSlide <= -66.66){
      setHiddenArrow(true)
    }else{
      setHiddenArrow(false)
    }
    
  }, [activeSlide]) 

  const nextSlide = () => {
    if(activeSlide > -66.66){
      setActiveSlide(activeSlide - 22.22)
    }
    
  }

  const prevSlide = () => {
    if(activeSlide < 0){
      setActiveSlide(activeSlide + 22.22)
    }
    
  }

  useEffect(() => {
    
    props.getCharactersHomePageThunk(props.sliderSize)
    
  }, []) 

  return (
    <div className={s.slider_wrapper}>
      
        <span className={s.text_slider}>CHARACTERS</span>
        
    <div className={s.slider}>
      <div onClick={prevSlide} className={s.arrow  + ' ' + s.left}>
        <div className={s.arrow_top}></div>
        <div className={s.arrow_bottom}></div>
      </div>
    <div className={s.carusel}>
     
     
     <div className={s.carusel_wrapper} style={{transform: 'translateX('+ activeSlide +'%)'}}>
     <ul className={s.carusel_ul}>
       
       {characters.map(item => (
            <li className={s.carusel_li}>
            <div className={s.card_character} key={item.id}>
              
              <div className={s.favorite_bg}></div>

              {favorites.find(i => i.id == item.id)
                ? <div  onClick={() => { props.deleteFavorite(item.id) }} className={s.btn_favorite_star}> 
                   <SvgIcon component={StarRoundedIcon} fontSize="large" />
                 </div>
                : <div onClick={() => { props.setAddFavorite(item) }} className={s.btn_favorite_star}>
                    <SvgIcon component={StarBorderRoundedIcon} fontSize="large" />
                  </div>
              }
            <NavLink to={'/characters/info/' + item.id } style={{ textDecoration: 'none' }}>
              <div className={s.card_img} style={{ backgroundImage: 'url(' + item.thumbnail.path + '/portrait_uncanny.jpg' + ')' }}></div>
              <div className={s.card_info}>

                <span className={s.card_name}>{item.name}</span>

              </div>
              </NavLink>
            </div>
            </li>
          ))}
        
        
     </ul>
     </div>
   </div>
   <div onClick={nextSlide} className={s.arrow + ' ' + s.right + ' ' + (hiddenArrow && s.hidden)}>
        <div className={s.arrow_top}></div>
        <div className={s.arrow_bottom}></div>
      </div>
    </div>
    <div className={s.btn_slider}>
    <NavLink to={"/characters"} className={s.btn_character}>
           All Characters
    </NavLink>
    </div>
    </div>
  );
  
}

let mapStateToProps = (state) => {

  return {
    characters: state.characters.items,
    favorites: state.characters.favorites,
    fetching: state.fetching.isFetching,
    sliderSize: state.characters.sliderSize,
  }

}

export default connect(mapStateToProps, {getCharactersHomePageThunk, 
  setAddFavorite, deleteFavorite})(SliderCharacters);