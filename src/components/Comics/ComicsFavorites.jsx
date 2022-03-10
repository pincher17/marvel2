import * as axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { deleteFavorite } from '../../reducers/comics-reducer';
import s from './Comics2.module.css';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import SvgIcon from '@mui/material/SvgIcon';


const ComicsFavorites = (props) => {

debugger;
  return (
    <div>

    <div className={s.comics_page}>

      <div className={s.card_comics_wrapper}>
          {props.favorites.map(item => (

            <div className={s.comics} key={item.id}>
              <div className={s.card_comics}>
                <div className={s.favorite_bg}></div>
              
                  <div  onClick={() => { props.deleteFavorite(item.id) }} className={s.btn_favorite_star}> 
                   <SvgIcon component={StarRoundedIcon} fontSize="large" />
                 </div>
              
                
              <div className={s.card_img} style={{ backgroundImage: 'url(' + item.thumbnail.path + '.jpg' + ')' }}></div>
              <div className={s.title}>
              <span className={s.card_title}>{item.title}</span>
              </div>
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
    favorites: state.comics.favorites,
  }

}



export default connect(mapStateToProps, { deleteFavorite })(ComicsFavorites);