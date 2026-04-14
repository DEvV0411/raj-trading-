import React from 'react';
import './EnquiryModal.css';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars

const EnquiryModal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  const contactDetails = {
    company: "RAJ TRADING COMPANY",
    address: "Shop No. 2, Crystal Plaza, Basement, Anand Road, Opp. Railway Station, Malad (West), Mumbai - 400064.",
    phones: [
      { name: "Kewal Chheda", number: "9987463622" }
    ],
    whatsapp: "919987463622" // Prefixed with 91 for India
  };

  const handleMapsClick = () => {
    const encodedAddress = encodeURIComponent(contactDetails.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <motion.div 
            className="modal-content contact-modal glass-panel" 
            onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <button className="btn-close" onClick={onClose}>&times;</button>
            
            <div className="contact-card-header">
              <span className="brand-badge">{contactDetails.company}</span>
              <h2 className="modal-title">Product Enquiry</h2>
              <p className="modal-subtitle">Direct line for <strong>{product.category}</strong> range</p>
            </div>

            <div className="contact-methods">
              {contactDetails.phones.map((phone, idx) => (
                <motion.a 
                  key={idx}
                  href={`tel:${phone.number}`}
                  className="contact-btn call-btn"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ textDecoration: 'none' }}
                >
                  <span className="method-icon">📞</span>
                  <div className="method-text">
                    <span className="method-label">Call {phone.name}</span>
                    <span className="method-value">{phone.number}</span>
                  </div>
                </motion.a>
              ))}

              <motion.a 
                href={`https://wa.me/${contactDetails.whatsapp}?text=${encodeURIComponent(`Hi, I'm interested in the ${product.category} shown here: ${product.src}`)}`}
                target="_blank"
                rel="noreferrer"
                className="contact-btn whatsapp-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ textDecoration: 'none' }}
              >
                <span className="method-icon">💬</span>
                <div className="method-text">
                  <span className="method-label">WhatsApp Us</span>
                  <span className="method-value">Available Now</span>
                </div>
              </motion.a>
            </div>

            <div className="address-section">
              <p className="address-heading">📍 Visit our Store in Malad (W)</p>
              <p className="address-text">{contactDetails.address}</p>
              <button className="btn-maps" onClick={handleMapsClick}>
                Open in Google Maps 🗺️
              </button>
            </div>

            <div className="modal-footer">
              <p>Manufacturers & Wholesalers Of Hair Accessories, Jewellery Packing & Display Material.</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EnquiryModal;
