import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Send, CheckCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import SiteLogo from '../components/SiteLogo';

const Contact = () => {
  const { addRequest, settings } = useStore();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', details: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Contact Us - ${settings.siteTitle}`;
  }, [settings]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.details) return;
    
    // Save request to Central Inbox in Admin
    addRequest({
      name: formData.name,
      email: formData.email,
      themeType: `Contact: ${formData.subject || 'General Inquiry'}`,
      details: formData.details,
      date: new Date().toISOString()
    });

    setTimeout(() => {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', details: '' });
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 600);
  };

  return (
    <>
      <nav className="navbar container">
        <SiteLogo />
        <div style={{ display: 'flex', gap: '16px' }}>
          <Link to="/" className="btn-outline">
            <ArrowLeft size={18} /> Back Home
          </Link>
        </div>
      </nav>

      <main className="container" style={{ padding: '60px 24px 120px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-panel" 
          style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '40px' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Get in <span className="text-gradient">Touch</span></h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              Have a question about our themes, or want to discuss a custom feature? We would love to hear from you.
            </p>
          </div>

          <div style={{ maxWidth: '800px', width: '100%', margin: '0 auto' }}>
            
            {/* Contact Form */}
            <div style={{ padding: '32px', background: 'rgba(0,0,0,0.3)', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
              {isSubmitted ? (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{ textAlign: 'center', padding: '60px 20px', background: 'rgba(20, 184, 166, 0.1)', borderRadius: '16px', border: '1px solid rgba(20, 184, 166, 0.2)' }}
                >
                  <CheckCircle size={64} color="var(--accent-tertiary)" style={{ margin: '0 auto 16px' }} />
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '8px', color: 'var(--text-primary)' }}>Message Sent Successfully!</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>We'll get back to you to within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Send us a Message</h2>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Your Name</label>
                      <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.5)', color: 'white' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Email Address</label>
                      <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.5)', color: 'white' }} />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Subject (Optional)</label>
                    <input type="text" placeholder="e.g. Custom Theme Request" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.5)', color: 'white' }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Your Message</label>
                    <textarea required value={formData.details} onChange={(e) => setFormData({...formData, details: e.target.value})} rows={6} placeholder="How can we help you today?" style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.5)', color: 'white', resize: 'vertical', fontFamily: 'inherit' }} />
                  </div>
                  
                  <button type="submit" className="btn-primary" style={{ display: 'flex', justifyContent: 'center', padding: '16px', fontSize: '1.1rem' }}>
                    <Send size={20} />
                    Send Message
                  </button>
                </form>
              )}
            </div>

          </div>
        </motion.div>
      </main>
      
      <footer className="footer">
        <div className="container">
          <p>© 2026 {settings.siteTitle}. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Contact;
