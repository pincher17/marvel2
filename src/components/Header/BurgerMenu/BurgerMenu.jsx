import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './BurgerMenu.module.css';

const BurgerMenu = (props) => {

     let active = props.active

      return (
      
      <div className={props.active ? s.blur + ' ' + s.active : s.blur } onClick={()=> props.setMenuActive(!active)}>
        <div className={props.active ? s.burger_menu_wrapper + ' ' + s.active : s.burger_menu_wrapper}>
          <div className={s.menu_content}>
          <nav className={s.nav_links}>
			     <NavLink exact to="/characters" className={s.nav_item} activeClassName={s.activeLink}>CHARACTERS</NavLink>
			     <NavLink exact to="/comics" className={s.nav_item} activeClassName={s.activeLink}>СOMICS</NavLink>
			     <NavLink exact to="/favorites" className={s.nav_item} activeClassName={s.activeLink}>FAVORITES</NavLink>
		      </nav>
          </div>
        </div>
      </div>
      );
    }
    
    export default BurgerMenu;