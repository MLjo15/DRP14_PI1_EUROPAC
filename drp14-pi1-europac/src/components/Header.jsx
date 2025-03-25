import React from 'react';
import './Header.css';
import logoImage from '../assets/images/Europac.png';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="logo"><img src={logoImage} alt="Logo da Empresa" /></div>
      <nav className="navigation">
        <ul>
          <li><a href="/">Home</a></li>
          <li><Link to="/enterprise">Empresa</Link></li>
          <li><a href="/produtos">Produtos</a></li>
          <li><Link to="/faleconosco">Fale Conosco</Link></li>
        </ul>
      </nav>
      <div className="search-bar">
        <input type="text" placeholder="Search" />
        <button>Search</button>
      </div>
    </header>
  );
}

export default Header;