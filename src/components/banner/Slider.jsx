import React, {useState, useEffect} from "react"
import slide1 from "./wp2903386.webp"
import slide2 from "./marvels-avengers.jpeg"
import slide3 from "./d0bd028c7a266934db1807d7ccee8db704e6d518.jpg"

import s from './Slider.module.css';

const Slider = (props) => {


 
  const img = [
    <img  key={slide1} src={slide1} />,
    <img key={slide2} src={slide2} />,
    <img key={slide3} src={slide3} />,]



const [activeIndex, setActiveIndex] = useState(0);
 
// Хук Effect
useEffect(() => {
    // Запускаем интервал
    const interval = setInterval(() => {
        // Меняем состояние
        setActiveIndex((current) => {
            // Вычисляем индекс следующего слайда, который должен вывестись
            const res = current === img.length - 1 ? 0 : current + 1
            // Возвращаем индекс
            return res
        })
    }, 5000)
    // Выключаем интервал
    return () => clearInterval()
}, [])
 
// Вычисляем индекс предыдущего слайда
const prevImgIndex = activeIndex ? activeIndex - 1 : img.length - 1
// Вычисляем индекс следующего слайда
const nextImgIndex = activeIndex === img.length - 1 ? 0 : activeIndex + 1

  return (
    <div className={s.slider}>
        <div className={s.slider_img + ' ' + s.slider_img_prev}
                key={prevImgIndex}>
            {img[prevImgIndex]}
        </div>
        <div className={s.slider_img}
                key={activeIndex}>
            {img[activeIndex]}
        </div>
        <div className={s.slider_img + ' ' + s.slider_img_next}
                key={nextImgIndex}>
            {img[nextImgIndex]}
        </div>
    </div>
  );
}

export default Slider;