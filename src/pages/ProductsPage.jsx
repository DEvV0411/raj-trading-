import React from 'react';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';
import PageTransition from '../components/PageTransition';
import './ProductsPage.css';

const ProductsPage = ({ onEnquiry }) => {
  return (
    <PageTransition>
      <div className="container products-page">
        <header className="products-header">
          <h1 className="products-title">Our Collection</h1>
          <p className="products-subtitle">
            Explore our complete range of jewellery displays, organizers, and props.
          </p>
        </header>
        
        {/* Could add filters here later */}
        
        <ProductGrid products={products} onEnquiry={onEnquiry} />
      </div>
    </PageTransition>
  );
};

export default ProductsPage;
