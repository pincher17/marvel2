import React from "react";
import { NavLink } from "react-router-dom";
import s from './Banner.module.css';
import spider from "./spider.png"



const Banner = (props) =>{

    return(

      <div className={s.background}>
      <div className={s.headline_wrapper}>
      <div className={s.headline}>
        <h1 className={s.headline_first}>Explore the Marvel Universe</h1>
        <div className={s.headline_second}>Here you can find any character or comic</div>
        <div className={s.btn_wrapper}>
          <NavLink to={'/characters'} className={s.btn_character}>Characters</NavLink>
          <NavLink to={'/comics'} className={s.btn_comics}>Comics</NavLink>
        </div>
       
      </div>
      <div><img className={s.img} src={spider} alt="spider1" /></div>
      </div>
    </div>
      
    )
}

export default Banner;