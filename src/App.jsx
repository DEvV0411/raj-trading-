import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EnquiryModal from './components/EnquiryModal';
import ScrollToTop from './components/ScrollToTop'; 
import FloatingContact from './components/FloatingContact';

// Pages - Lazy Loaded
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AdminLogin = lazy(() => import('./components/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// Loading Fallback
const PageLoader = () => (
  <div style={{ 
    height: '60vh', 
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'center',
    gap: '20px'
  }}>
    <div className="loader-spinner" style={{
      width: '40px',
      height: '40px',
      border: '4px solid var(--bg-secondary)',
      borderTop: '4px solid var(--accent-purple)',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
    <p style={{ color: 'var(--text-secondary)', fontWeight: 500, letterSpacing: '1px' }}>LOADING VIBES...</p>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Core Enquiry Handler
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
      <ScrollToTop />
      <div className="app" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
        <Navbar />
        
        <main style={{ flex: 1 }}>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage onEnquiry={handleEnquiry} />} />
              <Route path="/products" element={<ProductsPage onEnquiry={handleEnquiry} />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </Suspense>
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
