import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from './Logo2.png'
import s from './Header.module.css';
import BurgerMenu from './BurgerMenu/BurgerMenu';
import BurgerBtn from './BurgerMenu/BurgerBtn/BurgerBtn';

const Header = () => {

  const [menuActive, setMenuActive] = useState(false)

      return ( 
        <header className={s.app_header}>
        <div className={s.nav_wrapper}>
        <NavLink exact to="/"><img src={logo} className={s.app_logo} alt="logo" /></NavLink>
        <nav className={s.nav_links}>
			    <NavLink exact to="/characters" className={s.nav_item} activeClassName={s.activeLink}>CHARACTERS</NavLink>
			    <NavLink exact to="/comics" className={s.nav_item} activeClassName={s.activeLink}>СOMICS</NavLink>
			    <NavLink exact to="/favorites" className={s.nav_item} activeClassName={s.activeLink}>FAVORITES</NavLink>
          
		    </nav>
        <BurgerBtn active={menuActive} setMenuActive={setMenuActive} />
        <BurgerMenu active={menuActive} setMenuActive={setMenuActive} />
        </div>
      </header>
      );
    }
    
    export default Header;