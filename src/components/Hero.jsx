import React from 'react';
import './Hero.css';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="gradient-blob blob-1"></div>
      <div className="gradient-blob blob-2"></div>
      
      <motion.div 
        className="container hero-content"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <motion.span className="hero-tag" variants={fadeInUp}>
          Premium Showcase Solutions
        </motion.span>
        
        <motion.h1 className="hero-title" variants={fadeInUp}>
          The Definitive Stage for <br />
          <span className="text-gradient">Fine Jewellery.</span>
        </motion.h1>
        
        <motion.p className="hero-subtitle" variants={fadeInUp}>
          Raj Trading Company provides bespoke display accessories and premium showroom props 
          engineered to elevate your collection's perceived value.
        </motion.p>
        
        <motion.div variants={fadeInUp}>
          <Link to="/products" className="hero-btn">
            Shop the Drop ➔
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
