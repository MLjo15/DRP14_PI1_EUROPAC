import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">LOGO</div>
      <nav className="navigation">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/empresa">Empresa</a></li>
          <li><a href="/produtos">Produtos</a></li>
          <li><a href="/fale-conosco">Fale Conosco</a></li>
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