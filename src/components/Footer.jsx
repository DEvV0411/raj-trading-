import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-brand-section">
            <h2 className="footer-brand">Raj Trading<span className="dot">.</span></h2>
            <p className="footer-tagline">Making your jewellery look ✨ expensive ✨ since forever.</p>
          </div>
          
          <div className="footer-links">
            <div className="link-group">
              <h3>Explore</h3>
              <Link to="/">Home</Link>
              <Link to="/products">The Goods</Link>
              <Link to="/about">Our Story</Link>
            </div>
            
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Raj Trading. Built different.</p>
          <div className="footer-ticker">
            Mumbai • Maharashtra • India • 
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
