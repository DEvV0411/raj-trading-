import React, { useState } from 'react';
import './ProductCard.css';
import { motion } from 'framer-motion';

const ProductCard = ({ product, onEnquiry, variants }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  if (imageError) return null;

  return (
    <motion.div 
      className="product-card glass-panel"
      whileHover={{ y: -8, scale: 1.01 }}
      variants={variants}
      layout
    >
      <div className="product-image-wrapper">
        <img 
          src={product.src} 
          alt={product.name} 
          className="product-image"
          loading="lazy"
          onError={handleImageError}
        />
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.category}</h3>
        
        <div className="product-actions">
          <button 
            className="enquiry-btn"
            onClick={() => onEnquiry(product)}
          >
            Enquiry <span className="btn-icon">⚡</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
