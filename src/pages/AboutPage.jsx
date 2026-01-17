import React from 'react';
import PageTransition from '../components/PageTransition';

const AboutPage = () => {
  return (
    <PageTransition>
      <div className="container" style={{ padding: '4rem 1rem 6rem', maxWidth: '900px' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 300, marginBottom: '1.5rem' }}>About Raj Trading</h1>
          <div style={{ width: '60px', height: '2px', backgroundColor: 'var(--accent)', margin: '0 auto' }}></div>
        </div>

        <div style={{ display: 'grid', gap: '3rem' }}>
          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 500, marginBottom: '1rem' }}>Our Story</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              Established with a passion for excellence, Raj Trading has been a trusted name in the jewellery packaging and display industry. 
              We understand that jewellery is not just a product but an emotion, and its presentation should reflect its true worth.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              Over the years, we have evolved from a small trading unit to a comprehensive supplier of premium display props, serving showrooms and boutiques across India.
            </p>
          </section>

          <section style={{ backgroundColor: 'var(--bg-secondary)', padding: '3rem', borderRadius: 'var(--radius-md)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 500, marginBottom: '1rem' }}>Our Philosophy</h2>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
                <span style={{ color: 'var(--accent)' }}>&#10003;</span>
                <span style={{ color: 'var(--text-secondary)' }}><strong>Aesthetics First:</strong> We believe beauty lies in details.</span>
              </li>
              <li style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
                <span style={{ color: 'var(--accent)' }}>&#10003;</span>
                <span style={{ color: 'var(--text-secondary)' }}><strong>Quality Commitment:</strong> Never compromising on material or finish.</span>
              </li>
              <li style={{ display: 'flex', gap: '1rem' }}>
                <span style={{ color: 'var(--accent)' }}>&#10003;</span>
                <span style={{ color: 'var(--text-secondary)' }}><strong>Customer Centric:</strong> Tailored solutions for your brand identity.</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default AboutPage;
