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
            Our Heritage & <br />
            <span className="text-gradient">Manufacturing Excellence</span>
          </h1>
          <p className="about-subtitle">SINCE 2024 • THE HEART OF MUMBAI</p>
        </motion.div>

        <div className="about-content-wrapper">
          <motion.section 
            className="about-main-section"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="about-section-title">The Raj Trading Journey 🏛️</h2>
            <p className="about-text">
              Raj Trading Company was established with a singular vision: to revolutionize the **jewellery display industry in India**. 
              We recognized a significant gap between the intricate beauty of traditional jewellery and the lacklustre quality of standard market retail props.
            </p>
            <p className="about-text">
              What began as a localized effort to improve showroom aesthetics in Mumbai has grown into a vertically integrated manufacturing powerhouse, 
              serving independent designers and major retail chains with the same dedication to precision and elegance.
            </p>
          </motion.section>

          <div className="about-grid">
            <motion.div 
              className="glass-panel stat-box"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h3>15+ Years</h3>
              <p>Combined Industry Expertise</p>
            </motion.div>
            <motion.div 
              className="glass-panel stat-box"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3>100% In-House</h3>
              <p>Production & Quality Control</p>
            </motion.div>
          </div>

          <motion.section 
            className="manufacturing-section"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="about-section-title">Superior Manufacturing 💎</h2>
            <div className="process-grid">
              {[
                { title: "Material Selection", desc: "We source only high-density wood and premium velvets from globally recognized suppliers." },
                { title: "Precision Design", desc: "Every tray and stand is CAD-designed to maximize display area while ensuring structural integrity." },
                { title: "Hand-Finished", desc: "Our skilled artisans hand-glue and finish each edge to ensure a seamless, premium feel." }
              ].map((item, i) => (
                <div key={i} className="process-card">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section 
            className="glass-panel promise-section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="about-section-title">Our Institutional Commitment 🧘‍♂️</h2>
            <div className="promise-grid">
              {[
                { title: "Uncompromising Integrity", desc: "What you see is what you get. Every material is exactly as described." },
                { title: "Sustainable Growth", desc: "We prioritize long-term partnerships over short-term gains." },
                { title: "Client Confidentiality", desc: "Your custom designs and showroom layouts remain your exclusive intellectual property." }
              ].map((item, index) => (
                <div key={index} className="promise-item">
                  <span className="promise-icon">✔</span>
                  <div className="promise-text">
                    <strong>{item.title}:</strong> {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </PageTransition>
  );
};

export default AboutPage;
