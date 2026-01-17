import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onEnquiry }) => {
  return (
    <div className="product-card fade-in">
      <div className="product-image-wrapper">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image" 
          loading="lazy"
        />
      </div>
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name">{product.name}</h3>
        <button 
          className="btn-enquiry"
          onClick={() => onEnquiry(product)}
        >
          Enquiry
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
