import React from 'react';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import './HomePage.css';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

const HomePage = ({ onEnquiry }) => {
  // Show only first 6 products on Home
  const featuredProducts = products.slice(0, 6);

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
        
        <motion.section 
          className="container home-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Fresh <span className="text-gradient">Drops</span>
            </h2>
            <Link to="/products" style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '1.1rem' }}>
              See All ➔
            </Link>
          </div>
          <ProductGrid products={featuredProducts} onEnquiry={onEnquiry} />
        </motion.section>

        {/* Feature Section with Hover & Animation */}
        <motion.section 
          style={{ backgroundColor: 'var(--bg-secondary)', padding: '6rem 0', marginTop: '4rem', borderRadius: 'var(--radius-lg)' }} 
          className="home-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <div className="container" style={{ textAlign: 'center', maxWidth: '1000px' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', fontWeight: 800 }}>Why We're The <span style={{ color: 'var(--accent-purple)' }}>GOAT</span></h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '4rem', maxWidth: '700px', margin: '0 auto 4rem', fontSize: '1.2rem' }}>
              We don't just sell props. We sell the vibe that sells your jewellery.
            </p>
            
            <div className="feature-grid">
              {[
                { icon: "✨", title: "Premium AF", desc: "Velvet finishes that feel as expensive as they look." },
                { icon: "🎨", title: "Custom Drip", desc: "Colors that match your brand's aesthetic perfectly." },
                { icon: "🚀", title: "Fast Shipping", desc: "We ship across India faster than you can say 'sold out'." }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  className="feature-card"
                  whileHover={{ y: -10, scale: 1.02 }} 
                  style={{ 
                    background: 'white', 
                    padding: '2rem', 
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{feature.icon}</div>
                  <h3 style={{ marginBottom: '1rem', fontWeight: 700, fontSize: '1.5rem' }}>{feature.title}</h3>
                  <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Testimonials Section (New) */}
        <motion.section 
          className="home-section"
          style={{ padding: '6rem 0' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <div className="container">
            <h2 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 800, marginBottom: '4rem' }}>The Streets are Talking 🗣️</h2>
            
            <div className="testimonial-grid">
              {[
                { name: "Priya J.", role: "Boutique Owner", quote: "Literally obsessed. My bridal set looks insane on these displays." },
                { name: "Amit Shah", role: "Zaveri Bazaar", quote: "Best quality in the market, no cap. Highly recommend." },
                { name: "Kavita R.", role: "Designer", quote: "The emerald green trays are a total vibe. Love it." }
              ].map((t, i) => (
                 <motion.div 
                   key={i} 
                   className="testimonial-card glass-panel"
                   whileHover={{ rotate: i % 2 === 0 ? 2 : -2, scale: 1.05 }}
                   style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}
                 >
                   <p style={{ fontStyle: 'italic', fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '1.5rem', fontWeight: 500 }}>"{t.quote}"</p>
                   <h4 style={{ fontWeight: 800, color: 'var(--accent-purple)' }}>{t.name}</h4>
                   <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>{t.role}</span>
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
