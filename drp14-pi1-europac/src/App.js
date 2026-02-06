import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Enterprise from './components/Enterprise';
import BudgetForm from './components/BudgetForm';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/enterprise" element={<Enterprise />} />
        
        {/* Rotas de Produtos Atualizadas */}
        <Route path="/produtos" element={<Products />} />
        <Route path="/produto/:productId" element={<ProductDetails />} />
        
        <Route path="/faleconosco" element={<BudgetForm />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;