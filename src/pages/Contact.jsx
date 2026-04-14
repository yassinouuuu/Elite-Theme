import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Send, CheckCircle, ArrowLeft, Mail, MessageSquare, Clock, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import SiteLogo from '../components/SiteLogo';
import SEOHead from '../components/SEOHead';

const Contact = () => {
  const { addRequest, settings } = useStore();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', details: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Elite Theme – WordPress Theme Support & Custom Development",
    "description": "Get in touch with Elite Theme for WordPress theme inquiries, custom theme development, support, and business partnerships.",
    "url": "https://elitetheme.dev/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "Elite Theme",
      "url": "https://elitetheme.dev",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": ["English"],
        "url": "https://elitetheme.dev/contact"
      }
    }
  };

  return (
    <>
      <SEOHead
        title="Contact Elite Theme – WordPress Theme Support & Custom Theme Development"
        description="Get in touch with Elite Theme for premium WordPress theme inquiries, custom WooCommerce theme development, Elementor theme support, and business partnerships. We respond within 24 hours."
        keywords="contact Elite Theme, WordPress theme support, custom WordPress theme development, hire WordPress developer, WordPress theme inquiry, WooCommerce theme developer, Elementor theme customization, WordPress theme help, buy WordPress themes, custom theme request"
        canonicalPath="/contact"
        jsonLd={jsonLd}
      />

      <header>
        <nav className="navbar container" aria-label="Contact page navigation">
          <SiteLogo />
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link to="/themes" className="btn-outline" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
              Browse Themes
            </Link>
            <Link to="/" className="btn-outline">
              <ArrowLeft size={18} /> Back Home
            </Link>
          </div>
        </nav>
      </header>

      <main className="container" style={{ padding: '60px 24px 120px' }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
          <ol style={{ display: 'flex', gap: '8px', listStyle: 'none', padding: 0, margin: 0 }}>
            <li><Link to="/" style={{ color: 'var(--accent-primary)' }}>Home</Link></li>
            <li>/</li>
            <li aria-current="page" style={{ color: 'var(--text-primary)' }}>Contact Us</li>
          </ol>
        </nav>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-panel" 
          style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '40px' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Get in <span className="text-gradient">Touch</span></h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
              Have a question about our premium WordPress themes, need custom theme development, or want to discuss a WooCommerce project? We'd love to hear from you.
            </p>
          </div>

          {/* Contact Info Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
            <div style={{ padding: '20px', background: 'rgba(0,0,0,0.3)', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <Mail size={28} color="var(--accent-primary)" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '1rem', marginBottom: '4px' }}>Email Us</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>support@elitetheme.dev</p>
            </div>
            <div style={{ padding: '20px', background: 'rgba(0,0,0,0.3)', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <Clock size={28} color="var(--accent-tertiary)" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '1rem', marginBottom: '4px' }}>Response Time</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Within 24 hours</p>
            </div>
            <div style={{ padding: '20px', background: 'rgba(0,0,0,0.3)', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <Shield size={28} color="var(--accent-secondary)" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '1rem', marginBottom: '4px' }}>Secure & Private</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Your data is safe</p>
            </div>
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
                  <p style={{ color: 'var(--text-secondary)' }}>We'll get back to you within 24 hours regarding your WordPress theme inquiry.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Send us a <span className="text-gradient">Message</span></h2>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '0.95rem' }}>
                    Whether it's about WordPress themes, WooCommerce development, or custom Elementor templates – we're here to help.
                  </p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                    <div>
                      <label htmlFor="contact-name" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Your Name</label>
                      <input id="contact-name" required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.5)', color: 'white' }} />
                    </div>
                    <div>
                      <label htmlFor="contact-email" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Email Address</label>
                      <input id="contact-email" required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.5)', color: 'white' }} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Subject (Optional)</label>
                    <select id="contact-subject" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.6)', color: 'white' }}>
                      <option value="">Select a topic...</option>
                      <option value="WordPress Theme Inquiry">WordPress Theme Inquiry</option>
                      <option value="Custom WordPress Theme Development">Custom WordPress Theme Development</option>
                      <option value="WooCommerce Theme Support">WooCommerce Theme Support</option>
                      <option value="Elementor Theme Customization">Elementor Theme Customization</option>
                      <option value="Bulk/Agency Licensing">Bulk / Agency Licensing</option>
                      <option value="Partnership Opportunity">Partnership Opportunity</option>
                      <option value="General Question">General Question</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Your Message</label>
                    <textarea id="contact-message" required value={formData.details} onChange={(e) => setFormData({...formData, details: e.target.value})} rows={6} placeholder="Tell us about your WordPress project, theme requirements, or any questions you have..." style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.5)', color: 'white', resize: 'vertical', fontFamily: 'inherit' }} />
                  </div>
                  
                  <button type="submit" className="btn-primary" style={{ display: 'flex', justifyContent: 'center', padding: '16px', fontSize: '1.1rem' }} aria-label="Send message about WordPress themes">
                    <Send size={20} />
                    Send Message
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* SEO Content */}
          <div style={{ maxWidth: '800px', margin: '40px auto 0', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>WordPress Theme <span className="text-gradient">Services</span></h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.95rem' }}>
              At Elite Theme, we offer a full range of <strong>WordPress theme services</strong> including premium theme sales, <strong>custom WordPress theme development</strong>, <strong>WooCommerce store setup</strong>, <strong>Elementor template customization</strong>, theme migration, and ongoing maintenance. Whether you need a ready-made <strong>premium WordPress template</strong> or a fully custom solution, our team delivers professional, SEO-optimized results that drive conversions and growth.
            </p>
          </div>
        </motion.div>
      </main>
      
      <footer className="footer" role="contentinfo">
        <div className="container">
          <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', fontSize: '0.9rem' }}>
            <Link to="/" style={{ color: 'var(--text-secondary)' }}>Home</Link>
            <Link to="/themes" style={{ color: 'var(--text-secondary)' }}>WordPress Themes</Link>
            <Link to="/about-us" style={{ color: 'var(--text-secondary)' }}>About</Link>
            <Link to="/contact" style={{ color: 'var(--text-secondary)' }}>Contact</Link>
          </div>
          <p>© 2026 {settings.siteTitle}. Premium WordPress Themes & Templates. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Contact;
