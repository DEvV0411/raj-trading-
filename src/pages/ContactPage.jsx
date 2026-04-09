import React from 'react';
import PageTransition from '../components/PageTransition';
import './ContactPage.css';

const ContactPage = () => {
  const contactDetails = {
    address: "Shop No. 2, Crystal Plaza, Basement, Anand Road, Opp. Railway Station, Malad (West), Mumbai - 400064.",
    phones: ["9987463622"],
    email: "rajtrading@example.com" // Placeholder until user provides real one, or I'll just remove email group
  };

  const handleMapsClick = () => {
    const encodedAddress = encodeURIComponent(contactDetails.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  return (
    <PageTransition>
      <div className="container contact-page">
        <h1 className="contact-title">Visit Our <span className="text-gradient">Store</span></h1>
        <p className="contact-subtitle">
          We're located right in the heart of Malad. Come check out our latest collection in person.
        </p>

        <div className="contact-content-card glass-panel">
          <div className="contact-info-section">
            <div className="info-block">
              <h2 className="info-title">📍 Address</h2>
              <p className="info-detail">{contactDetails.address}</p>
              <button className="btn-directions" onClick={handleMapsClick}>
                Get Directions on Maps ➔
              </button>
            </div>

            <div className="info-block">
              <h2 className="info-title">📞 Call Us</h2>
              {contactDetails.phones.map((phone, i) => (
                <p key={i} className="info-detail">
                  <a href={`tel:${phone}`}>+91 {phone}</a>
                </p>
              ))}
            </div>

            <div className="info-block">
              <h2 className="info-title">💬 Message</h2>
              <p className="info-detail">
                <a href={`https://wa.me/91${contactDetails.phones[0]}`} target="_blank" rel="noreferrer">
                  Chat with us on WhatsApp
                </a>
              </p>
            </div>
          </div>
          
          <div className="contact-visual-section">
             {/* This could be a static map image or just a nice graphic */}
             <div className="map-placeholder">
                <span style={{fontSize: '4rem'}}>🏢</span>
                <p style={{marginTop: '1rem', fontWeight: 600}}>Raj Trading Co.</p>
                <p style={{fontSize: '0.8rem', opacity: 0.7}}>Crystal Plaza, Malad (W)</p>
             </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ContactPage;
