import React, {useState, useEffect} from "react"
import { useSelector } from "react-redux";
import s from './SliderComics.module.css';

import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import SvgIcon from '@mui/material/SvgIcon';
import Tooltip from '@mui/material/Tooltip';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { getComicsHomePageThunk, setAddFavorite, deleteFavorite } from '../../reducers/comics-reducer';



const SliderComics = (props) => {

  const comics = useSelector(state => state.comics.comicsHomePage);
  const favorites = useSelector(state => state.comics.favorites);


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
    
    props.getComicsHomePageThunk(props.sliderSize)
    
  }, []) 

  return (
    <div className={s.slider_wrapper}>
      
        <span className={s.text_slider}>COMICS</span>
        
    <div className={s.slider}>
      <div onClick={prevSlide} className={s.arrow  + ' ' + s.left}>
        <div className={s.arrow_top}></div>
        <div className={s.arrow_bottom}></div>
      </div>
    <div className={s.carusel}>
     
     
     <div className={s.carusel_wrapper} style={{transform: 'translateX('+ activeSlide +'%)'}}>
     <ul className={s.carusel_ul}>
       
       {comics.map(item => (
            <li className={s.carusel_li}>
              <div className={s.comics} key={item.id}>
              <div className={s.card_comics}>
                <div className={s.favorite_bg}></div>
              {favorites.find(i => i.id == item.id)
                ? <div  onClick={() => { props.deleteFavorite(item.id) }} className={s.btn_favorite_star}> 
                   <SvgIcon component={StarRoundedIcon} fontSize="large" />
                 </div>
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
    <NavLink to={"/comics"} className={s.btn_comics}>
           All Comics
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
    sliderSize: state.comics.sliderSize,
  }

}

export default connect(mapStateToProps, {getComicsHomePageThunk, 
  setAddFavorite, deleteFavorite})(SliderComics);