import React from 'react';
import './Section.css';

/**
 * @file src/components/Section.jsx
 * @description Componente reutilizável para criar seções de conteúdo na página.
 * Permite exibir um título, texto, uma imagem ou um componente de mídia,
 * e pode inverter a ordem da imagem/mídia e do texto.
 */

/**
 * Componente Section.
 * Renderiza uma seção de conteúdo com um título, texto, e opcionalmente uma imagem
 * ou um componente de mídia. A ordem da mídia e do texto pode ser invertida.
 *
 * @param {object} props - As propriedades do componente.
 * @param {string} props.id - O ID da seção, usado para navegação e identificação.
 * @param {string} props.title - O título principal da seção.
 * @param {React.ReactNode} props.content - O conteúdo textual da seção.
 * @param {React.ReactNode} [props.mediaComponent] - Um componente React para ser exibido no lugar da imagem (ex: carrossel).
 * @param {boolean} [props.reverseOrder=false] - Se `true`, inverte a ordem da mídia e do texto.
 * @param {React.ReactNode} [props.children] - Conteúdo adicional a ser renderizado dentro da área de texto da seção (ex: botões).
 * @returns {JSX.Element} O elemento JSX que representa a seção.
 */
const Section = ({ id, title, content, mediaComponent, reverseOrder, children }) => {
  const sectionClasses = `section ${reverseOrder ? 'reverse-order' : ''}`;

  return (
    <section id={id} className={sectionClasses}>
      <div className="section-media">{mediaComponent}</div>
      <div className="section-text">
        <h2>{title}</h2>
        <div>{content}</div>
        {children}
      </div>
    </section>
  );
};

export default Section;