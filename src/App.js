import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios'
import React, { useEffect, useState } from 'react';
import CharactersContainer from './components/Characters/CharactersContainer';
import Header from './components/Header/Header.jsx';
import Comics from './components/Comics/Comics.jsx';
import {BrowserRouter, Route} from 'react-router-dom'
import Characters from './components/Characters/Characters';
import Masthead from './components/MastHead/Masthead';
import CharactersFavorites from './components/Characters/CharactersFavorites';
import Banner from './components/banner/Banner';
import Slider from './components/banner/Slider';




function App() {
  return (
    <BrowserRouter>
    <div className="app">
    
    <Header />
    <Route exact path='/' component={Slider}/>
    <Route exact path='/characters' component={CharactersContainer}/>
    <Route exact path='/comics' component={Comics}/>
    <Route exact path='/favorites' component={CharactersFavorites}/>

    </div>
    </BrowserRouter>
  );
}

export default App;
