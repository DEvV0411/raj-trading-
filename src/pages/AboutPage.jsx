import React from 'react';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import './AboutPage.css';

const AboutPage = () => {
  return (
    <PageTransition>
      <div className="container about-page">
        <motion.div 
          className="about-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="about-title">
            Not Your Average <br />
            <span className="text-gradient">Prop Shop.</span>
          </h1>
          <p className="about-subtitle">EST. 2024 • MUMBAI</p>
        </motion.div>

        <div className="about-grid">
          <motion.section 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="about-section-title">The Lore 📖</h2>
            <p className="about-text">
              We started Raj Trading because we were bored of the same old dusty velvet displays. 
              Jewellery is art. It deserves a stage that screams "expensive" (even if the budget says otherwise).
            </p>
            <p className="about-text">
              From a small garage in Mumbai to supplying the biggest showrooms, we've kept one thing constant: 
              <strong style={{ color: 'var(--text-primary)' }}> The Vibe.</strong>
            </p>
          </motion.section>

          <motion.section 
            className="glass-panel"
            style={{ padding: '3rem' }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="about-section-title">Our Philosophy 🧘‍♂️</h2>
            <ul className="philosophy-list">
              {[
                { title: "Aesthetics First", desc: "If it's not Instagrammable, we don't want it." },
                { title: "Quality Check", desc: "We touch grass (and velvet) so you don't have to worry about finish." },
                { title: "You-Centric", desc: "Your brand is the main character. We're just the hype man." }
              ].map((item, index) => (
                <li key={index} className="philosophy-item">
                  <span className="philosophy-number">
                    {index + 1}
                  </span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>{item.title}:</strong> {item.desc}
                  </span>
                </li>
              ))}
            </ul>
          </motion.section>
        </div>
      </div>
    </PageTransition>
  );
};

export default AboutPage;
