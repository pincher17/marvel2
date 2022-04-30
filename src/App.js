import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import {BrowserRouter, Route} from 'react-router-dom'
import ComicsContainer from './components/Comics/ComicsContainer';
import Banner from './components/banner/Banner';
import Favorites from './components/favorites/Favorites';
import Characters2 from './components/Characters/Characters2';
import CharacterInfo from './components/CharacterInfo/CharacterInfo';
import ComicInfo from './components/ComicInfo/ComicInfo';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';



function App() {

  

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
    <div className="app">
    <ScrollToTop />
    <Header />
    <Route exact path='/' component={Banner}/>
    <Route exact path='/characters' component={Characters2}/>
    <Route exact path='/characters/info/:characterId?' component={CharacterInfo}/>
    <Route exact path='/comics' component={ComicsContainer}/>
    <Route exact path='/comic/info/:comicId?' component={ComicInfo}/>
    <Route exact path='/favorites' component={Favorites}/>
    <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;