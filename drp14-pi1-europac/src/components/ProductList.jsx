import React from 'react';
import { productsData } from './products';
import { Link } from 'react-router-dom';
import Section from './Section'; // Importando o novo componente Section
import './ProductListLayout.css'; // CSS para o container principal

function ProductList() {
  return (
    <div className="product-list-container">
      <h2 className="product-list-title">Nossos Produtos</h2>
      {productsData.map((product, index) => (
        <Section
          key={product.id}
          id={`product-${product.id}`}
          title={product.name}
          reverseOrder={index % 2 !== 0}
          mediaComponent={
            <iframe
              src={product.video}
              title={product.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          }
          content={
            <>
              <p className="sub-name">{product.subName}</p>
              <ul>
                {product.descriptions.map((desc, i) => (
                  <li key={i}>{desc.replace(/^- /, '')}</li>
                ))}
              </ul>
            </>
          }
        >
          <Link to={`/product/${product.id}`} className="details-button">
            Ver Detalhes
          </Link>
        </Section>
      ))}
    </div>
  );
}

export default ProductList;