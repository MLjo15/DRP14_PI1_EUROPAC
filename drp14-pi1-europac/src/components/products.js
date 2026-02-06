import React from 'react';
import { Link } from 'react-router-dom';
import { productsData } from './productsData'; // Importa os dados
import './Products.css';

function Products() {
  return (
    <div className="products-container">
      <h1 className="products-title">Nossos Produtos</h1>
      <div className="products-list">
        {productsData.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              {/* Exibe a imagem do produto. Certifique-se de ter o campo 'image' no products.js */}
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="product-card-image" 
                />
              ) : (
                <div className="placeholder-image">Imagem Indisponível</div>
              )}
            </div>
            <div className="product-card-content">
              <h3>{product.name}</h3>
              <p className="product-subname">{product.subName}</p>
              
              {/* Link para a página de detalhes que contém o vídeo */}
              <Link to={`/produto/${product.id}`} className="details-link">
                <button className="details-button">Ver Detalhes</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;