import React from 'react';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import './HomePage.css';

const HomePage = ({ onEnquiry }) => {
  // Show only first 6 products on Home
  const featuredProducts = products.slice(0, 6);

  return (
    <PageTransition>
      <div className="home-page">
        <Hero />
        
        <section className="container home-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 300, color: 'var(--text-primary)' }}>Featured Collections</h2>
            <Link to="/products" style={{ color: 'var(--text-secondary)', borderBottom: '1px solid var(--text-secondary)' }}>
              View All
            </Link>
          </div>
          <ProductGrid products={featuredProducts} onEnquiry={onEnquiry} />
        </section>

        {/* Feature Section with Hover & Animation */}
        <section style={{ backgroundColor: 'var(--bg-secondary)' }} className="home-section">
          <div className="container" style={{ textAlign: 'center', maxWidth: '1000px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontWeight: 300 }}>Why Choose Raj Trading?</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '4rem', maxWidth: '700px', margin: '0 auto 4rem' }}>
              We specialize in providing high-quality, aesthetic prop solutions that elevate your jewellery's presentation.
            </p>
            
            <div className="feature-grid">
              {[
                { icon: "✨", title: "Premium Quality", desc: "Hand-picked materials and velvet finishes that last for years." },
                { icon: "🎨", title: "Custom Finishes", desc: "Tailored colors and textures to match your showroom's theme." },
                { icon: "🚚", title: "Pan-India Delivery", desc: "Reliable, safe shipping across Mumbai and all of India." }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="feature-card" 
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--accent)' }}>{feature.icon}</div>
                  <h3 style={{ marginBottom: '1rem', fontWeight: 500, fontFamily: 'Playfair Display, serif' }}>{feature.title}</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section (New) */}
        <section className="home-section">
          <div className="container">
            <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 300, marginBottom: '4rem' }}>Trusted by Jewellers</h2>
            
            <div className="testimonial-grid">
              {[
                { name: "Priya J.", role: "Boutique Owner, Bandra", quote: "The velvet bust displays completely transformed our bridal section. The finish is engaging and premium." },
                { name: "Amit Shah", role: "Manager, Zaveri Bazaar", quote: "Raj Trading understands the specific needs of Indian jewellery display. Highly recommended for bulk orders." },
                { name: "Kavita R.", role: "Designer", quote: "I love the custom color options. The emerald green trays match my brand perfectly." }
              ].map((t, i) => (
                 <div key={i} className="testimonial-card">
                   <p style={{ fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>"{t.quote}"</p>
                   <h4 style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{t.name}</h4>
                   <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1px' }}>{t.role}</span>
                 </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
};

export default HomePage;
