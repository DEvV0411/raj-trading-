import React from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';
import { motion } from 'framer-motion';

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
        viewport={{ once: true, margin: "-100px" }}
      >
        {products.map(product => (
          <motion.div key={product.id} variants={item}>
            <ProductCard 
              product={product} 
              onEnquiry={onEnquiry} 
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ProductGrid;
