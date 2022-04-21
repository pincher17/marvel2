import React, {useState, useEffect} from "react"
import { useSelector } from "react-redux";
import s from './MySlider.module.css';

import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import SvgIcon from '@mui/material/SvgIcon';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { getCharactersHomePageThunk, setAddFavorite, deleteFavorite, 
          sortChangeThunk, searchThunk, setTotalPagesCharacters } from '../../reducers/characters-reducer';



const MySlider = (props) => {

  const characters = useSelector(state => state.characters.charactersHomePage);
  const favorites = useSelector(state => state.characters.favorites);


  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide(activeSlide - 22,22)
  }

  const prevSlide = () => {
    setActiveSlide(activeSlide + 22,22)
  }

  useEffect(() => {
    
    props.getCharactersHomePageThunk(props.sliderSize)
    
  }, []) 

  return (
    <div className={s.slider}>
       <button className={s.btn_left} onClick={prevSlide}>left</button>
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
   <button className={s.btn_right}  onClick={nextSlide}>right</button>
    </div>
  );
}

let mapStateToProps = (state) => {

  return {
    characters: state.characters.items,
    page: state.characters.page,
    sort: state.characters.sort,
    search: state.characters.search,
    favorites: state.characters.favorites,
    fetching: state.fetching.isFetching,
    totalPages: state.characters.totalPages,
    totalCharacters: state.characters.totalCharacters,
    pageSize: state.characters.pageSize,
    sliderSize: state.characters.sliderSize,
  }

}

export default connect(mapStateToProps, {getCharactersHomePageThunk, 
  setAddFavorite, deleteFavorite, 
  sortChangeThunk, searchThunk, setTotalPagesCharacters})(MySlider);