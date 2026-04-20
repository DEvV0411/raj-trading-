import React from 'react';
import ProductGrid from '../components/ProductGrid';
import galleryData from '../data/galleryData.json';
import PageTransition from '../components/PageTransition';

import './ProductsPage.css';

const ProductsPage = ({ onEnquiry }) => {
  const images = galleryData.images;

  return (
    <PageTransition>
      <div className="container products-page">
        <header className="products-header">
          <h1 className="products-title">Complete <span className="text-gradient">Collection</span></h1>
          <p className="products-subtitle">
            Explore our full range of {images.length} premium solutions for your jewellery display needs.
          </p>
        </header>
        
        <ProductGrid products={images} onEnquiry={onEnquiry} />

        {images.length === 0 && (
          <div className="empty-state-notice">
             <p>No products found in the collection.</p>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default ProductsPage;
