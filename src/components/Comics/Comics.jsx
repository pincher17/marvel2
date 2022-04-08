import axios from 'axios'
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import Masthead from '../MastHead/Masthead';
import s from './Comics.module.css';

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4
  };

  const img = '/portrait_uncanny.jpg'
  const [items, setItems] = useState([]);

  useEffect(() => {
    let apiUrl = "https://gateway.marvel.com/v1/public/characters?limit=12&ts=1&apikey=bee04bdf1525b71dabcfedee5c7ad617&hash=9c56fc53e014b8e7f336c28a76203510"
    axios.get(apiUrl).then(response => {
      

      setItems(response.data.data.results);
     
    });
  }, [])
  return (

    <div>
      <Masthead head={'COMICS'} />
      <div className={s.comics_page}>
        <Slider {...settings}>

          {items.map(item => (
            <div className={s.card_character_wrapper}>
              <div className={s.card_character} key={item.name}>

                 <div className={s.card_img} style={{ backgroundImage: 'url(' + item.thumbnail.path + img + ')' }}></div>
                 <div className={s.card_info}>

                  <span className={s.card_name}>{item.name}</span>
                  {/* <span className="card-name2">{item.name}</span> */}

                </div>
              </div>
            </div>))}

        </Slider>
      </div>
    </div>
  );
}

