import React from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} // Custom bezier for "smooth" feel
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
