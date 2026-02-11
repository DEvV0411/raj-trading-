import React, { useState } from 'react';
import './EnquiryModal.css';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';

const EnquiryModal = ({ product, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  // Reset state when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setStatus('idle');
      setFormData({ name: '', email: '', phone: '' });
      setErrors({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Invalid phone number (10-15 digits)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for the specific field when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    if (!navigator.onLine) {
      alert("You appear to be offline. Please check your internet connection.");
      return;
    }

    setStatus('submitting');
    
    // Create a timeout promise
    const timeout = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timed out')), 15000); // Increased to 15s
    });

    try {
      await Promise.race([
        addDoc(collection(db, "enquiries"), {
          ...formData,
          productName: product.name,
          productId: product.id,
          createdAt: serverTimestamp()
        }),
        timeout
      ]);
      setStatus('success');
      setTimeout(() => {
        // Optional: Auto close after success? 
        // onClose(); 
      }, 3000);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert(`Error: ${error.message || "Failed to send enquiry"}. Please try again.`);
      setStatus('idle'); 
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <motion.div 
            className="modal-content glass-panel" 
            onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <button className="btn-close" onClick={onClose}>&times;</button>
            
            {status === 'success' ? (
              <div className="success-message">
                <span className="success-icon">🎉</span>
                <h3 className="success-title">We're On It!</h3>
                <p className="success-desc">
                  Enquiry for <strong>{product.name}</strong> sent successfully. 
                  Sit back, we'll hit you up shortly!
                </p>
                <button className="btn-submit" onClick={onClose} style={{marginTop: '1rem'}}>
                    Close
                </button>
              </div>
            ) : (
              <div>
                <h2 className="modal-title">Let's Talk Props</h2>
                <p className="modal-subtitle">Eying the <span style={{color: 'var(--accent-purple)', fontWeight: 700}}>{product.name}</span>? Good taste.</p>
                
                {/* Product Details Section */}
                <div style={{ backgroundColor: 'rgba(255,255,255,0.5)', padding: '1.2rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', fontSize: '0.9rem', border: '1px solid rgba(0,0,0,0.05)' }}>
                  <p style={{ marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>What you're asking about:</p>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', lineHeight: '1.5' }}>{product.description}</p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Your Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      placeholder="Jane Doe"
                      className={`form-input ${errors.name ? 'input-error' : ''}`}
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && <span className="error-text" style={{color: 'red', fontSize: '0.8rem', marginTop: '4px', display: 'block'}}>{errors.name}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="jane@example.com"
                      className={`form-input ${errors.email ? 'input-error' : ''}`}
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <span className="error-text" style={{color: 'red', fontSize: '0.8rem', marginTop: '4px', display: 'block'}}>{errors.email}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      placeholder="+91 98765..."
                      className={`form-input ${errors.phone ? 'input-error' : ''}`}
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && <span className="error-text" style={{color: 'red', fontSize: '0.8rem', marginTop: '4px', display: 'block'}}>{errors.phone}</span>}
                  </div>
                  
                  <button type="submit" className="btn-submit" disabled={status === 'submitting'}>
                    {status === 'submitting' ? 'Sending... 🚀' : 'Send It 🚀'}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EnquiryModal;
