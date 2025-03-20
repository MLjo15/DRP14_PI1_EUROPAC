import React from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';

/* Importando imagens */
import product1 from '../assets/images/Detector de Microfuros - Imagem.png';
import product2 from '../assets/images/Ensacadora - Imagem.png';
import product3 from '../assets/images/Esteira Reunidora - Imagem.png';
import product4 from '../assets/images/Verificador de Peso - Imagem.jpg';
import product5 from '../assets/images/Pente Posicionador - Imagem.png'; 

function ProductGrid() {
  return (
    <div className="product-grid-container">
      <h2>Produtos</h2>
      <div className="product-grid">
        <ProductCard imageCap={product1} category="Detector de Microfuros" />
        <ProductCard imageCap={product2} category="Ensacadora" />
        <ProductCard imageCap={product3} category="Esteiras Transportadoras" />
        <ProductCard imageCap={product4} category="Verificadores de Peso" />
        <ProductCard imageCap={product5} category="Posicionadores" />
      </div>
    </div>
  );
}

export default ProductGrid;