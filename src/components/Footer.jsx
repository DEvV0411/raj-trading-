import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-brand">Raj Trading</div>
        <div className="footer-info">
          <p>Mumbai, Maharashtra, India</p>
          <p>contact@rajtrading.com | +91 98765 43210</p>
        </div>
        <div className="copyright">
          &copy; {new Date().getFullYear()} Raj Trading. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
