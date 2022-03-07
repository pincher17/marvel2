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



function App() {
  return (
    <BrowserRouter>
    <div className="app">
    
    <Header />
    <Route exact path='/' component={Banner}/>
    <Route exact path='/characters' component={CharactersContainer}/>
    <Route exact path='/comics' component={ComicsContainer}/>
    <Route exact path='/favorites' component={CharactersFavorites}/>

    </div>
    </BrowserRouter>
  );
}

export default App;