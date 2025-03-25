import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
import './ProductDetails.css';

function ProductDetails() {
  const { productId } = useParams();

  // Dados dos produtos
  const products = [
    {
      name: 'Detector de Microfuros',
      subName: 'Alta confiabilidade, detecta furos a partir de 0.3mm',
      //video: '../assets/videos/Detector de Microfuros.mp4',
      video: 'https://www.youtube.com/embed/c8eYD7TROvQ?si=Y11m-Q5d02C9JHnT',
      description1: '- Estrutura em Aço Carbono e pintura em Epóxi',
      description2: '- Esteiras modulares de acordo com projeto',
      description3: '- Modelos de 01 á 10 bicos',
      description4: '',
      specifications1: '- Consumo: 220V, 3A',
      specifications2: '- Pneumática:',
      specifications3: '- Peso:',
    },
    {
      name: 'Ensacadora',
      subName: 'Armazene embalagens PET ou PEAD - produção de até 6000 frascos/hora',
      video: 'https://www.youtube.com/embed/c8eYD7TROvQ?si=Y11m-Q5d02C9JHnT',
      description1: '- Estrutura em Aço Carbono e pintura em Epóxi',
      description2: '- Sistema de apoio para frascos leves na formação do fardo',
      description3: '- Opcional: Mesa com Seladora de fardos',
      description4: '- Proteção de partes móveis e sistema NR12',
      specifications1: '- Consumo: 220V, 4A',
      specifications2: '- Pneumática:',
      specifications3: '- Peso:',
    },
    {
      name: 'Esteiras Transportadoras',
      subName: 'Esteiras personalizadas de acordo com sua embalagem plástica',
      video: 'https://www.youtube.com/embed/c8eYD7TROvQ?si=Y11m-Q5d02C9JHnT',
      description1: '- Chapas em Aço Carbono 2mm e pintura em Epóxi',
      description2: '- Curvas de 45º, 90º e 180º',
      description3: '- Opcional: Automação de transferencia entre esteiras',
      description4: '',
      specifications1: '- Consumo: 220V, 4A',
      specifications2: '- Pneumática:',
      specifications3: '- Peso:',
    },
    {
      name: 'Verificadores de Peso',
      subName: 'Sistema de pesagem de 100% da linha',
      video: 'https://www.youtube.com/embed/c8eYD7TROvQ?si=Y11m-Q5d02C9JHnT',
      description1: '- Estrutura em Aço Carbono e pintura em Epóxi',
      description2: '- Embalagens de até 5kg',
      description3: '',
      description4: '',
      specifications1: '- Consumo: 220V, 4A',
      specifications2: '- Pneumática:',
      specifications3: '- Peso:',
    },
    {
      name: 'Posicionadores',
      subName: 'Estabilize seus frascos na saída da sopradora PET',
      video: 'https://www.youtube.com/embed/c8eYD7TROvQ?si=Y11m-Q5d02C9JHnT',
      description1: '- Peças em Aço Carbono e pintura em Epóxi',
      description2: '- Adaptável ao tipo de frasco',
      description3: '- Sistema com esteira de sucção',
      description4: '',
      specifications1: '- Consumo: 220V, 4A',
      specifications2: '- Pneumática:',
      specifications3: '- Peso:',
    },
  ];

  const product = products[productId];

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
          <p>{product.description1}</p>
          <p>{product.description2}</p>
          <p>{product.description3}</p>
          <p>{product.description4}</p>
          <h3>ESPECIFICAÇÕES</h3>
          <p>{product.specifications1}</p>
          <p>{product.specifications2}</p>
          <p>{product.specifications3}</p>
          <div className="button-container">
            <Link to="/faleconosco"> {/* Adicione Link */}
              <button className="budget-button">Orçamento</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

