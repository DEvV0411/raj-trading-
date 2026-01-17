import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const isActive = (path) => location.pathname === path ? 'active' : '';

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar fade-in">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Link to="/" className="nav-brand" onClick={closeMenu}>Raj Trading</Link>
        
        <div className={`nav-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          <li><Link to="/" className={`nav-link ${isActive('/')}`} onClick={closeMenu}>Home</Link></li>
          <li><Link to="/products" className={`nav-link ${isActive('/products')}`} onClick={closeMenu}>Products</Link></li>
          <li><Link to="/about" className={`nav-link ${isActive('/about')}`} onClick={closeMenu}>About</Link></li>
          <li><Link to="/contact" className={`nav-link ${isActive('/contact')}`} onClick={closeMenu}>Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
