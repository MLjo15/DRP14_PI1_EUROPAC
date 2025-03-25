import React from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';
import { Link } from 'react-router-dom';

/* Importando imagens */
import product1 from '../assets/images/Detector de Microfuros - Imagem.png';
import product2 from '../assets/images/Ensacadora - Imagem.png';
import product3 from '../assets/images/Esteira Reunidora - Imagem.png';
import product4 from '../assets/images/Verificador de Peso - Imagem.png';
import product5 from '../assets/images/Pente Posicionador - Imagem.png';

// Array de produtos
const products = [
  { image: product1, category: 'Detector de Microfuros' },
  { image: product2, category: 'Ensacadora' },
  { image: product3, category: 'Esteiras Transportadoras' },
  { image: product4, category: 'Verificadores de Peso' },
  { image: product5, category: 'Posicionadores' },
];

function ProductGrid() {
  return (
    <div className="product-grid-container">
      <h2>Nossos produtos</h2>
      <div className="product-grid">
        {products.map((product, index) => (
          <Link to={`/product/${index}`} key={index}>
            <ProductCard imageCap={product.image} category={product.category} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;