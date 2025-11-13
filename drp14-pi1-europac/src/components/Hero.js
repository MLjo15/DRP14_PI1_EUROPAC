import React, { useState } from 'react';
import './Hero.css';

const images = [
  '/img/ensacadora_2.jpg',
  '/img/ensacadora.jpg',
  '/img/ensacadora (1).jpg'
];

function Hero() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="hero">
      <button className="arrow left-arrow" onClick={prevSlide}>&lt;</button>
      <div className="banner-image">
        <img src={images[current]} alt="banner" />
      </div>
      <button className="arrow right-arrow" onClick={nextSlide}>&gt;</button>
      <div className="pagination">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === current ? 'active' : ''}`}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default Hero;
