import React from 'react';
import PageTransition from '../components/PageTransition';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <PageTransition>
      <div className="container contact-page">
        <h1 className="contact-title">Get in Touch</h1>
        <p className="contact-subtitle">
          We'd love to hear from you. Visit our store or drop us a message.
        </p>

        <div className="contact-grid">
          
          {/* Contact Info */}
          <div>
            <h2 className="contact-section-title">Contact Information</h2>
            
            <div className="contact-info-group">
              <h3 className="contact-info-label">Address</h3>
              <p className="contact-info-text">
                Raj Trading Co.<br/>
                123 Zaveri Bazaar,<br/>
                Kalbadevi, Mumbai 400002,<br/>
                Maharashtra, India
              </p>
            </div>

            <div className="contact-info-group">
              <h3 className="contact-info-label">Phone</h3>
              <p className="contact-info-text">+91 98765 43210</p>
              <p className="contact-info-text">022 2345 6789</p>
            </div>

            <div className="contact-info-group">
              <h3 className="contact-info-label">Email</h3>
              <p className="contact-info-text">sales@rajtrading.com</p>
              <p className="contact-info-text">support@rajtrading.com</p>
            </div>
          </div>

          {/* General Form */}
          <div className="contact-form-card">
            <h2 className="contact-section-title">Send us a Message</h2>
            <form onSubmit={(e) => { e.preventDefault(); alert("Message sent! We will contact you soon."); }}>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input type="text" required className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" required className="form-input" />
              </div>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Message</label>
                <textarea rows="4" required className="form-textarea"></textarea>
              </div>
              <button type="submit" className="btn-send">
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
