import React from 'react';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import galleryData from '../data/galleryData.json';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import './HomePage.css';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

const HomePage = ({ onEnquiry }) => {
  // Show only the latest 6 products added to folders
  const featuredProducts = galleryData.images.slice(-6).reverse();

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <PageTransition>
      <div className="home-page">
        <Hero />
        
        {/* Market Presence / Stats Strip */}
        <section className="impact-strip">
          <div className="container">
            <div className="impact-grid">
              {[
                { label: "Products Available", value: "74+" },
                { label: "Premium Finishes", value: "12+" },
                { label: "Quality Checks", value: "100%" },
                { label: "Artisan Finished", value: "Yes" }
              ].map((stat, i) => (
                <div key={i} className="stat-card">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <motion.section 
          className="container home-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="section-header">
            <h2 className="section-title">
              Signature <span className="text-gradient">Collections</span>
            </h2>
            <Link to="/products" className="see-all-link">
              Explore All ➔
            </Link>
          </div>
          <ProductGrid products={featuredProducts} onEnquiry={onEnquiry} />
        </motion.section>

        {/* Core Pillars / Genuineness Section */}
        <motion.section 
          className="home-section institutional-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <div className="container" style={{ textAlign: 'center', maxWidth: '1000px' }}>
            <h2 className="section-title">Established <span style={{ color: 'var(--accent-purple)' }}>Excellence</span></h2>
            <p className="section-subtitle">
              Raj Trading is India's leading manufacturer of premium **jewellery display stands**, wholesale storage trays, and luxury **showroom accessories**. 
              Our bespoke props are engineered for durability and designed to elevate your brand's retail presence in Mumbai and across the globe.
            </p>
            
            <div className="feature-grid">
              {[
                { icon: "🏛️", title: "Direct Registry", desc: "Supplying directly from our manufacturing units to ensure unbeatable quality control." },
                { icon: "💎", title: "Precision Finish", desc: "Each piece is hand-finished with high-grade velvet and premium acrylics." },
                { icon: "🤝", title: "Trusted Partner", desc: "For over a decade, we've been the silent partner to some of India's biggest showrooms." }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  className="feature-card glass-panel"
                  whileHover={{ y: -10 }}
                >
                  <div className="feature-icon">{feature.icon}</div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-desc">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Professional Testimonials */}
        <motion.section 
          className="home-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <div className="container">
            <h2 className="section-title" style={{ textAlign: 'center' }}>Voice of the <span className="text-gradient">Industry</span></h2>
            
            <div className="testimonial-grid">
              {[
                { name: "Rajesh Mehra", role: "Owner, Mehra Jewellers", quote: "Raj Trading has transformed our showroom floor. Their displays don't just hold jewellery; they enhance it." },
                { name: "Sunil K.", role: "Manager, Zaveri Plaza", quote: "The durability of their stands is unmatched. We've been using their trays for years without a single complaint." },
                { name: "Anjali Gupta", role: "Boutique Designer", quote: "The custom color options allowed us to match our brand's unique aesthetic perfectly. Truly professional." }
              ].map((t, i) => (
                 <motion.div 
                   key={i} 
                   className="testimonial-card glass-panel"
                   whileHover={{ scale: 1.05 }}
                 >
                   <div className="quote-icon">"</div>
                   <p className="testimonial-quote">{t.quote}</p>
                   <h4 className="testimonial-name">{t.name}</h4>
                   <span className="testimonial-role">{t.role}</span>
                 </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

      </div>
    </PageTransition>
  );
};

export default HomePage;
