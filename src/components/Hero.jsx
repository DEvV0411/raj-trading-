import React from 'react';
import './Hero.css';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } 
  }
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const Hero = () => {
  return (
    <motion.section 
      className="container hero"
      initial="hidden"
      animate="visible"
      variants={stagger}
    >
      <motion.h1 className="hero-title" variants={fadeInUp}>
        Elegance in Every Detail
      </motion.h1>
      <motion.p className="hero-subtitle" variants={fadeInUp}>
        Curated jewellery props and display accessories designed to enhance the beauty of your collection.
      </motion.p>
      <motion.div className="hero-divider" variants={fadeInUp}></motion.div>
    </motion.section>
  );
};

export default Hero;
