import React, { useState, useEffect } from 'react';
import ProductGrid from '../components/ProductGrid';
import galleryData from '../data/galleryData.json';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import './ProductsPage.css';

const ProductsPage = ({ onEnquiry }) => {
  const [categories] = useState(galleryData.categories);
  const [images] = useState(galleryData.images);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isFixed, setIsFixed] = useState(false);

  // Monitor scroll for fixed category bar
  useEffect(() => {
    const handleScroll = () => {
      // Pin bar when user scrolls past header area (approx 150px)
      if (window.scrollY > 150) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = activeCategory === 'All' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  // Calculate counts for badges
  const getCount = (category) => {
    if (category === 'All') return images.length;
    return images.filter(img => img.category === category).length;
  };

  return (
    <PageTransition>
      <div className="container products-page">
        <header className="products-header">
          <h1 className="products-title">Complete <span className="text-gradient">Collection</span></h1>
          <p className="products-subtitle">
            Showing {filteredProducts.length} premium solutions for your jewellery display needs.
          </p>
        </header>
        
        {/* Sticky Category Selection */}
        <div className={`sticky-filters-container ${isFixed ? 'is-fixed' : ''}`}>
          <div className="category-filters">
            {categories.map(cat => (
              <button 
                key={cat}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat} 
                <span className="count-badge">{getCount(cat)}</span>
              </button>
            ))}
          </div>
        </div>
        
        <ProductGrid products={filteredProducts} onEnquiry={onEnquiry} />

        {filteredProducts.length === 0 && (
          <div className="empty-state-notice">
             <p>No products found in this category.</p>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default ProductsPage;
