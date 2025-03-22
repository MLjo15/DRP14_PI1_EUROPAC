import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import ProductDetails from './components/ProductDetails';
import OrcamentoForm from './components/OrcamentoForm'; // Importe

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<> <Hero /> <ProductGrid /> </>} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/orcamento" element={<OrcamentoForm />} /> {/* Adicione a rota */}
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;