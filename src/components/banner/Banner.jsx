import React, { Component } from "react";
import Slider from "react-slick";
import s from './Banner.module.css';





function SampleNextArrow(props) {
  debugger;
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red", color: "green", right: "50px"}}
      onClick={onClick}
    />
  );
}



export default class PauseOnHover extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: false,
      nextArrow: <SampleNextArrow />,
    };
    return (
      <div className={s.banner}>

        <Slider {...settings}>
          <div>
            <div className={s.background}></div>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
        </Slider>
      </div>
    );
  }
}

