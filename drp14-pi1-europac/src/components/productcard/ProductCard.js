import React from 'react';
import './ProductCard.css'; 

function ProductCard({ imageCap, category }) {
  return (
    <div className="product-card">
      <div className="image-cap">
        {imageCap ? <img src={imageCap} alt="Imagem do Produto" /> : "Image cap"}
      </div>
      <div className="category">{category}</div>
    </div>
  );
}

export default ProductCard;