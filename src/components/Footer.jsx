import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../assets/logo.jpg';

const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-brand-section">
            <div className="footer-logo-container">
              <img src={logo} alt="Raj Trading Logo" className="footer-logo" />
            </div>
            <p className="footer-tagline">Providing the definitive stage for your finest jewellery collections.</p>
          </div>
          
          <div className="footer-links">
            <div className="link-group">
              <h3>Company</h3>
              <Link to="/">Home</Link>
              <Link to="/products">Collections</Link>
              <Link to="/about">Our Story</Link>
            </div>
            
            <div className="link-group">
              <h3>Support</h3>
              <a href="#contact">Enquiry</a>
              <Link to="/about">About Us</Link>
            </div>
            
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Raj Trading Company. All Rights Reserved.</p>
          <div className="footer-ticker">
            Mumbai • Maharashtra • India • 
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
