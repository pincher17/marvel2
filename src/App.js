import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CharactersContainer from './components/Characters/CharactersContainer';
import Header from './components/Header/Header.jsx';
import Comics from './components/Comics/Comics.jsx';
import {BrowserRouter, Route} from 'react-router-dom'
import CharactersFavorites from './components/Characters/CharactersFavorites';
import ComicsContainer from './components/Comics/ComicsContainer';
import Slider from './components/banner/Slider';
import Banner from './components/banner/Banner';
import Favorites from './components/favorites/Favorites';
import Characters2 from './components/Characters/Characters2';
import CharacterInfo from './CharacterInfo/CharacterInfo';
import ComicInfo from './ComicInfo/ComicInfo';
import BurgerMenu from './components/Header/BurgerMenu/BurgerMenu';
import { useState } from 'react';



function App() {

  

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
    <div className="app">
    
    <Header />
    
    <Route exact path='/' component={Banner}/>
    <Route exact path='/characters' component={Characters2}/>
    <Route exact path='/characters/info/:characterId?' component={CharacterInfo}/>
    <Route exact path='/comics' component={ComicsContainer}/>
    <Route exact path='/comic/info/:comicId?' component={ComicInfo}/>
    <Route exact path='/favorites' component={Favorites}/>

    </div>
    </BrowserRouter>
  );
}

export default App;