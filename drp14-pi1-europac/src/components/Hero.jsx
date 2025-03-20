import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <div className="hero">
      <button className="arrow left-arrow">&lt;</button>
      <div className="banner-image">
        {/* Aqui você colocaria a imagem do banner */}
      </div>
      <button className="arrow right-arrow">&gt;</button>
      <div className="pagination">
        <span className="dot active"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  );
}

export default Hero;