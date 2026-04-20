import React, { useState } from 'react';
import './ProductCard.css';
import './ImageZoom.css';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars

const ProductCard = ({ product, onEnquiry, variants }) => {
  const [imageError, setImageError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const toggleZoom = (e) => {
    e.stopPropagation();
    setIsZoomed(!isZoomed);
  };

  if (imageError) return null;

  return (
    <>
      <motion.div 
        className="product-card glass-panel"
        whileHover={{ y: -8, scale: 1.01 }}
        variants={variants}
        layout
        onDoubleClick={toggleZoom}
      >
        <div className="product-image-wrapper">
          <img 
            src={product.src} 
            alt={`${product.category} - Premium Jewellery Accessories by Raj Trading`} 
            className="product-image"
            loading="lazy"
            onError={handleImageError}
          />
          <div className="zoom-hint">Double click to zoom 🔍</div>
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

      <AnimatePresence>
        {isZoomed && (
          <motion.div 
            className="zoom-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleZoom}
          >
            <motion.div 
              className="zoom-image-container"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="zoom-close-btn" onClick={toggleZoom}>&times;</button>
              <img 
                src={product.src} 
                alt={product.category} 
                className="zoomed-image" 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCard;
