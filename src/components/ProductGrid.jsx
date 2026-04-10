import React from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const ProductGrid = ({ products, onEnquiry }) => {
  return (
    <section id="products" className="product-grid-section">
      <motion.div 
        className="product-grid"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {products.map(product => (
          <ProductCard 
            key={product.id}
            product={product} 
            onEnquiry={onEnquiry} 
            variants={item}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default ProductGrid;
