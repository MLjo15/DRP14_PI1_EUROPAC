import imgDetector from '../assets/images/Detector de Microfuros - Imagem.png';
import imgEnsacadora from '../assets/images/Ensacadora - Imagem.png';
import imgEsteira from '../assets/images/Esteira Reunidora - Imagem.png';
import imgVerificador from '../assets/images/Verificador de Peso - Imagem.png';
import imgPosicionador from '../assets/images/Pente Posicionador - Imagem.png';

export const productsData = [
  {
    id: '0',
    name: 'Detector de Microfuros',
    subName: 'Alta confiabilidade, detecta furos a partir de 0.3mm',
    image: imgDetector,
    video: 'https://www.youtube.com/embed/3oF5W9BFRvc?si=vw50ObPeJ9RnB07D',
    descriptions: [
      '- Estrutura em Aço Carbono e pintura em Epóxi',
      '- Esteiras modulares de acordo com projeto',
      '- Modelos de 01 á 10 bicos',
    ],
    specifications: [
      '- Consumo: 220V, 3A',
      '- Pneumática:',
      '- Peso:',
    ],
  },
  {
    id: '1',
    name: 'Ensacadora',
    subName: 'Armazene embalagens PET ou PEAD - produção de até 6000 frascos/hora',
    image: imgEnsacadora,
    video: 'https://www.youtube.com/embed/IjBtiqUT7yw?si=VofvrcBh0Exp31Ar',
    descriptions: [
      '- Estrutura em Aço Carbono e pintura em Epóxi',
      '- Sistema de apoio para frascos leves na formação do fardo',
      '- Opcional: Mesa com Seladora de fardos',
      '- Proteção de partes móveis e sistema NR12',
    ],
    specifications: ['- Consumo: 220V, 4A', '- Pneumática:', '- Peso:'],
  },
  {
    id: '2',
    name: 'Esteiras Transportadoras',
    subName: 'Esteiras personalizadas de acordo com sua embalagem plástica',
    image: imgEsteira,
    video: 'https://www.youtube.com/embed/hIYcXFTL_NE?si=uW8Bo7V1LUPRDjnq',
    descriptions: [
      '- Chapas em Aço Carbono 2mm e pintura em Epóxi',
      '- Curvas de 45º, 90º e 180º',
      '- Opcional: Automação de transferencia entre esteiras',
    ],
    specifications: ['- Consumo: 220V, 4A', '- Pneumática:', '- Peso:'],
  },
  {
    id: '3',
    name: 'Verificadores de Peso',
    subName: 'Sistema de pesagem de 100% da linha',
    image: imgVerificador,
    video: 'https://www.youtube.com/embed/glIg8JAjzp0?si=1dVC2TaaPjUdkhpb',
    descriptions: ['- Estrutura em Aço Carbono e pintura em Epóxi', '- Embalagens de até 5kg'],
    specifications: ['- Consumo: 220V, 4A', '- Pneumática:', '- Peso:'],
  },
  {
    id: '4',
    name: 'Posicionadores',
    subName: 'Estabilize seus frascos na saída da sopradora PET',
    image: imgPosicionador,
    video: 'https://www.youtube.com/embed/WZyd4jKbWNg?si=mqaSVA_zgOYKqXIV',
    descriptions: ['- Peças em Aço Carbono e pintura em Epóxi', '- Adaptável ao tipo de frasco', '- Sistema com esteira de sucção'],
    specifications: ['- Consumo: 220V, 4A', '- Pneumática:', '- Peso:'],
  },
];