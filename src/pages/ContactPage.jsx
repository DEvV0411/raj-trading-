import React from 'react';
import PageTransition from '../components/PageTransition';

const ContactPage = () => {
  return (
    <PageTransition>
      <div className="container" style={{ padding: '4rem 1rem', maxWidth: '1000px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 300, textAlign: 'center', marginBottom: '1rem' }}>Get in Touch</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '4rem' }}>
          We'd love to hear from you. Visit our store or drop us a message.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
          
          {/* Contact Info */}
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 500, marginBottom: '1.5rem' }}>Contact Information</h2>
            
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Address</h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Raj Trading Co.<br/>
                123 Zaveri Bazaar,<br/>
                Kalbadevi, Mumbai 400002,<br/>
                Maharashtra, India
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Phone</h3>
              <p style={{ color: 'var(--text-secondary)' }}>+91 98765 43210</p>
              <p style={{ color: 'var(--text-secondary)' }}>022 2345 6789</p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Email</h3>
              <p style={{ color: 'var(--text-secondary)' }}>sales@rajtrading.com</p>
              <p style={{ color: 'var(--text-secondary)' }}>support@rajtrading.com</p>
            </div>
          </div>

          {/* General Form */}
          <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '2rem', borderRadius: 'var(--radius-md)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 500, marginBottom: '1.5rem' }}>Send us a Message</h2>
            <form onSubmit={(e) => { e.preventDefault(); alert("Message sent! We will contact you soon."); }}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Name</label>
                <input type="text" required style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ddd' }} />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Email</label>
                <input type="email" required style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ddd' }} />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Message</label>
                <textarea rows="4" required style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ddd', fontFamily: 'inherit' }}></textarea>
              </div>
              <button type="submit" style={{ width: '100%', padding: '1rem', backgroundColor: 'var(--text-primary)', color: 'white', borderRadius: '4px', fontWeight: 500 }}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ContactPage;
