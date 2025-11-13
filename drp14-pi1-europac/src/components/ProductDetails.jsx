import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
import './ProductDetails.css';
import { productsData } from './products'; // Caminho corrigido para o arquivo local

function ProductDetails() {
  const { productId } = useParams();

  // 2. Removido o array de produtos 'hardcoded' e a declaração duplicada.
  //    Usa .find() para buscar o produto no array importado.
  const product = productsData.find(p => p.id === productId);

  if (!product) {
    return <div>Produto não encontrado.</div>;
  }

  return (
    <div className="product-details-container">
      <h1>{product.name}</h1>
      <h2>{product.subName}</h2>
      <div className="product-content">
        <div className="video-container">
          <iframe
            width="600" // Ajuste conforme necessário
            height="450" // Ajuste conforme necessário
            src={product.video}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Vídeo do Produto"
            className="product-video" // Mantive a classe para possível CSS existente
          ></iframe>
        </div>
        <div className="description-container">
          <h3>CARACTERÍSTICAS</h3>
          {/* 3. Renderização limpa e dinâmica das descrições */}
          {product.descriptions.map((desc, index) => (
            <p key={`desc-${index}`}>{desc}</p>
          ))}
          <h3>ESPECIFICAÇÕES</h3>
          {/* 3. Renderização limpa e dinâmica das especificações */}
          {product.specifications.map((spec, index) => (
            <p key={`spec-${index}`}>{spec}</p>
          ))}
          <div className="button-container">
            {/* 4. Corrigido o Link duplicado */}
            <Link to="/faleconosco">
              <button className="budget-button">Orçamento</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
