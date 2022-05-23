import React from 'react';
import s from './BurgerBtn.module.css';

const BurgerBtn = (props) => {

     let active = props.menuActive

      return ( 
      <div className={s.burger_btn} onClick={()=> props.setMenuActive(!active)}>
        <span></span>
      </div>
      );
    }
    
    export default BurgerBtn;