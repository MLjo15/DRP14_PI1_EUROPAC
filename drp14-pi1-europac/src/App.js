import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* Importando componentes e páginas */
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ProductDetails from './components/ProductDetails';
import BudgetForm from './components/BudgetForm';
import Enterprise from './components/Enterprise'; 
import ProductsPage from './components/ProductsPage';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Hero />} /> {/* Removido o ProductGrid da Home */}
          <Route path="/produtos" element={<ProductsPage />} /> {/* Adicionada a nova rota de produtos */}
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/faleconosco" element={<BudgetForm />} />
          <Route path="/enterprise" element={<Enterprise />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;