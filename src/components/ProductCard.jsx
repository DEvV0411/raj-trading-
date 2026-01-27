import React from 'react';
import './ProductCard.css';
import { motion } from 'framer-motion';

const ProductCard = ({ product, onEnquiry }) => {
  return (
    <motion.div 
      className="product-card"
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="product-image-wrapper">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image" 
          loading="lazy"
        />
        <div className="card-overlay">
          <button 
            className="btn-quick-view"
            onClick={() => onEnquiry(product)}
          >
            👀 Quick View
          </button>
        </div>
      </div>
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name">{product.name}</h3>
        <button 
          className="btn-enquiry"
          onClick={() => onEnquiry(product)}
        >
          Enquiry ⚡
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
