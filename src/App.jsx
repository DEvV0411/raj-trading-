import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EnquiryModal from './components/EnquiryModal';
import ScrollToTop from './components/ScrollToTop'; 
import FloatingContact from './components/FloatingContact'; // New

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEnquiry = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  return (
    <Router>
      <div className="app" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
        <ScrollToTop />
        <Navbar />
        
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage onEnquiry={handleEnquiry} />} />
            <Route path="/products" element={<ProductsPage onEnquiry={handleEnquiry} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        <Footer />
        <FloatingContact />
        
        <EnquiryModal 
          product={selectedProduct} 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
        />
      </div>
    </Router>
  );
}

export default App;
