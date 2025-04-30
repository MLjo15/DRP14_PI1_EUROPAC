import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* Importando componentes e páginas */
import Header from './components/header/Header';
import Hero from './components/hero/Hero';
import ProductGrid from './components/productgrid/ProductGrid';
import Footer from './components/footer/Footer';
import ProductDetails from './components/productdetails/ProductDetails';
import BudgetForm from './components/budgetform/BudgetForm';
import Enterprise from './components/enterprise/Enterprise'; 

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<> <Hero /> <ProductGrid /> </>} />
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