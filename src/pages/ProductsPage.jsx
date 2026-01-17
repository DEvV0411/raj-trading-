import React from 'react';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';
import PageTransition from '../components/PageTransition';

const ProductsPage = ({ onEnquiry }) => {
  return (
    <PageTransition>
      <div className="container" style={{ padding: '2rem 1rem 4rem' }}>
        <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 300, marginBottom: '1rem' }}>Our Collection</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
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
