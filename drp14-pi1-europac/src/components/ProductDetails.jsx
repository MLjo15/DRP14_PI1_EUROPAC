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
      subName: 'Detector de Microfuros',
      video: '../assets/videos/Detector de Microfuros.mp4',
      description: 'Estrutura em aço carbono e pintura em epóxi.\nCorreia transportadora em PVC verde com guia central e taliscas de 30 mm (passo 400 mm), com aproximadamente 2.500 mm em elevação.\nAcionamento eletro-motorizado.\nAlimentação: 220 V Monofásico.',
      specifications: 'Acionamento eletro-motorizado.\nAlimentação: 220 V Monofásico.',
    },
    {
      name: 'Ensacadora',
      subName: 'Ensacadora',
      video: '../assets/videos/Ensacadora de Frascos.mp4',
      description: 'Estrutura em aço carbono e pintura em epóxi.\nCorreia transportadora em PVC verde com guia central e taliscas de 30 mm (passo 400 mm), com aproximadamente 2.500 mm em elevação.\nAcionamento eletro-motorizado.\nAlimentação: 220 V Monofásico.',
      specifications: 'Acionamento eletro-motorizado.\nAlimentação: 220 V Monofásico.',
    },
    {
      name: 'Esteiras Transportadoras',
      subName: 'Esteiras Transportadoras',
      video: '../assets/videos/Esteira Reunidora.mp4',
      description: 'Estrutura em aço carbono e pintura em epóxi.\nCorreia transportadora em PVC verde com guia central e taliscas de 30 mm (passo 400 mm), com aproximadamente 2.500 mm em elevação.\nAcionamento eletro-motorizado.\nAlimentação: 220 V Monofásico.',
      specifications: 'Acionamento eletro-motorizado.\nAlimentação: 220 V Monofásico.',
    },
    {
      name: 'Verificadores de Peso',
      subName: 'Verificadores de Peso',
      video: '../assets/videos/Verificador de Peso.mp4',
      description: 'Estrutura em aço carbono e pintura em epóxi.\nCorreia transportadora em PVC verde com guia central e taliscas de 30 mm (passo 400 mm), com aproximadamente 2.500 mm em elevação.\nAcionamento eletro-motorizado.\nAlimentação: 220 V Monofásico.',
      specifications: 'Acionamento eletro-motorizado.\nAlimentação: 220 V Monofásico.',
    },
    {
      name: 'Posicionadores',
      subName: 'Posicionadores',
      video: '../assets/videos/Pente Posicionador.mp4',
      description: 'Estrutura em aço carbono e pintura em epóxi.\nCorreia transportadora em PVC verde com guia central e taliscas de 30 mm (passo 400 mm), com aproximadamente 2.500 mm em elevação.\nAcionamento eletro-motorizado.\nAlimentação: 220 V Monofásico.',
      specifications: 'Acionamento eletro-motorizado.\nAlimentação: 220 V Monofásico.',
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
          <video src={product.video} type="video/mp4" controls className="product-video" />
        </div>
        <div className="description-container">
          <h3>CARACTERÍSTICAS</h3>
          <p>{product.description}</p>
          <h3>ESPECIFICAÇÕES</h3>
          <p>{product.specifications}</p>
          <div className="button-container">
            <Link to="/orcamento"> {/* Adicione Link */}
              <button className="budget-button">Orçamento</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;