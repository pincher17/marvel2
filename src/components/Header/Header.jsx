import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './Logo2.png'
import s from './Header.module.css';

const Header = () => {

      return ( 
        <header className={s.app_header}>
        <div className={s.nav_wrapper}>
        <img src={logo} className={s.app_logo} alt="logo" />
        <nav class={s.nav_links}>
			    <NavLink exact to="/characters" class={s.nav_item}>CHARACTERS</NavLink>
			    <NavLink exact to="/comics" class={s.nav_item}>СOMICS</NavLink>
			    <NavLink exact to="/favorites" class={s.nav_item}>FAVORITES</NavLink>
		    </nav>
        </div>
      </header>
      );
    }
    
    export default Header;