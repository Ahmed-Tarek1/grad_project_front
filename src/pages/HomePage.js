import React from "react";
import Slider from "react-slick";
import "../styles.css";

const HomePage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };

  return (
    <div>
      {/* Slider */}
      <Slider {...settings} className="full-width-slider">
        
        <div>
          <img
            src="/assets/images/istockphoto-2111376087-2048x2048.jpg"
            alt="Beautiful Landscape"
          />
        </div>
        <div>
          <img
            src="/assets/images/snorkling.jpg"
            alt="Tomb Landscape"
          />
        </div>
        <div>
          <img
            src="/assets/images/playa-dromedarios-dahab.jpg"
            alt="Dromedarios Dahab"
          />
        </div>
      </Slider>
    </div>
  );
};

export default HomePage;
