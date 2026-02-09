import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Protect the route
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/admin/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Fetch enquiries
  useEffect(() => {
    const q = query(collection(db, "enquiries"), orderBy("createdAt", "desc"));
    
    // Real-time listener
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const enquiriesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Convert timestamp to date if it exists
        createdAt: doc.data().createdAt?.toDate() 
      }));
      setEnquiries(enquiriesData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching enquiries:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin/login');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const totalEnquiries = enquiries.length;
  // Calculate potential revenue or just fun stats
  const pendingVibes = enquiries.length * 100; 

  if (loading) {
    return (
      <div className="admin-dashboard" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        <div style={{fontSize:'2rem'}}>⌛ Loading vibes...</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="container">
        <header className="dashboard-header">
          <div>
            <h1 className="dashboard-title">admin portal ✨</h1>
            <p style={{color: 'rgba(255,255,255,0.5)', marginTop: '0.5rem'}}>Welcome back, chief.</p>
          </div>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </header>

        {/* Stats Section */}
        <div className="stats-container">
          <div className="stat-card">
            <span className="stat-number" style={{color: '#c084fc'}}>{totalEnquiries}</span>
            <span className="stat-label">Total Enquiries</span>
          </div>
          <div className="stat-card">
            <span className="stat-number" style={{color: '#f472b6'}}>{pendingVibes}%</span>
            <span className="stat-label">Stonks Level</span>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{color: '#4ade80'}}>Active</div>
            <span className="stat-label">System Status</span>
          </div>
        </div>

        {enquiries.length === 0 ? (
          <div className="empty-state">
            <div style={{fontSize: '3rem', marginBottom: '1rem'}}>👻</div>
            <p>It's quiet in here...</p>
            <p style={{fontSize: '0.9rem'}}>Wait for the hype to drop.</p>
          </div>
        ) : (
          <div className="enquiries-grid">
            {enquiries.map(enquiry => (
              <div key={enquiry.id} className="enquiry-card">
                <div className="enquiry-header">
                  <span className="enquiry-badge">NEW DROP</span>
                  <span style={{color: 'rgba(255,255,255,0.3)', fontSize:'0.75rem'}}>#{enquiry.id.slice(0, 4)}</span>
                </div>
                
                <h3 className="product-name">{enquiry.productName}</h3>
                
                <div className="enquiry-detail">
                  <span className="detail-icon">👤</span>
                  <span className="detail-text">{enquiry.name}</span>
                </div>
                
                <div className="enquiry-detail">
                  <span className="detail-icon">📧</span>
                  <span className="detail-text">
                    <a href={`mailto:${enquiry.email}`}>{enquiry.email}</a>
                  </span>
                </div>
                
                <div className="enquiry-detail">
                  <span className="detail-icon">📱</span>
                  <span className="detail-text">
                    <a href={`tel:${enquiry.phone}`}>{enquiry.phone}</a>
                  </span>
                </div>

                <div className="timestamp">
                  {enquiry.createdAt ? enquiry.createdAt.toLocaleString() : 'Just now'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
