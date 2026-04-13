import React, { useState, useEffect } from 'react';
import { ExternalLink, ShoppingCart, Info, Code, Palette, Zap, ArrowRight, Monitor, Smartphone, LayoutTemplate, ShieldAlert, Send, CheckCircle, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import SiteLogo from '../components/SiteLogo';

const Home = () => {
  const { themes, settings, addRequest } = useStore();
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    themeType: 'e-commerce',
    details: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to context
    addRequest({ ...formData, date: new Date().toISOString() });
    
    setTimeout(() => {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', themeType: 'e-commerce', details: '' });
      setTimeout(() => {
        setIsSubmitted(false);
        setIsModalOpen(false);
      }, 3000);
    }, 800);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (location.hash === '#portfolio') {
      setTimeout(() => {
        document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    document.title = `${settings.siteTitle} - Premium WordPress Themes`;
  }, [location, settings]);

  useEffect(() => {
    setMounted(true);
    
    // Secret keyboard shortcut to go to admin
    const handleKeyDown = (e) => {
      if (e.shiftKey && e.key.toLowerCase() === 'l') {
        navigate('/admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  if (!mounted) return null;

  return (
    <>
      <nav className="navbar container">
        <SiteLogo />
        <div style={{ display: 'flex', gap: '16px' }}>
          <Link to="/about-us" className="btn-outline">
            <Info size={18} />
            About Us
          </Link>
          <Link to="/contact" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
            Contact
          </Link>
        </div>
      </nav>

      <main className="container">
        <section className="hero">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hero-badge"
          >
            {settings.heroBadge}
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            dangerouslySetInnerHTML={{ __html: settings.heroTitle }}
          />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {settings.heroDescription}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ display: 'flex', gap: '16px' }}
          >
            <Link to="/themes" className="btn-primary">
              View Portfolio
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </section>

        <section id="portfolio">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Featured <span className="text-gradient">Themes</span></h2>
              <p style={{ color: 'var(--text-secondary)' }}>Discover my latest handcrafted WordPress solutions.</p>
            </div>
          </div>

          <div className="themes-grid">
            {themes.map((theme, index) => {
              const tagsArray = theme.tags ? theme.tags.split(',').map(t => t.trim()) : [];
              return (
              <motion.article 
                key={theme.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="theme-card glass-panel"
              >
                <div className="theme-image-container">
                  <img src={theme.image || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"} alt={theme.title} className="theme-image" />
                  <div className="theme-overlay">
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span className="theme-tag" style={{ background: 'rgba(99, 102, 241, 0.8)', color: 'white' }}>
                        <Monitor size={12} style={{ display: 'inline', marginRight: '4px' }} />
                        Desktop
                      </span>
                      <span className="theme-tag" style={{ background: 'rgba(236, 72, 153, 0.8)', color: 'white' }}>
                        <Smartphone size={12} style={{ display: 'inline', marginRight: '4px' }} />
                        Mobile Ready
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="theme-content">
                  <div className="theme-tags">
                    {tagsArray.map(tag => (
                      <span key={tag} className="theme-tag">{tag}</span>
                    ))}
                  </div>
                  
                  <h3 className="theme-title">{theme.title}</h3>
                  <p className="theme-desc">{theme.description}</p>
                  
                  <div className="theme-footer">
                    <span className="theme-price">{theme.showPrice !== false ? theme.price : ''}</span>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <a href={theme.link} target="_blank" rel="noreferrer" className="btn-outline" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
                        <ExternalLink size={16} />
                        Demo
                      </a>
                      <Link to={`/theme/${theme.id}`} className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
                        <Info size={16} />
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            )})}
          </div>
        </section>

        <section style={{ padding: '80px 0', borderTop: '1px solid var(--border-color)', margin: '40px 0' }}>
          <div className="glass-panel" style={{ padding: '60px 40px', textAlign: 'center' }}>
            <Zap size={48} color="var(--accent-primary)" style={{ margin: '0 auto 24px' }} />
            <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Need a <span className="text-gradient">Custom</span> Theme?</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 32px', fontSize: '1.1rem' }}>
              I specialize in building custom, high-performance WordPress themes and plugins suited to your specific business needs. Turn your vision into reality.
            </p>
            <button className="btn-primary" style={{ padding: '16px 36px', fontSize: '1.1rem' }} onClick={() => setIsModalOpen(true)}>
              <Code size={20} />
              Start a Project Together
            </button>
          </div>
        </section>
      </main>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', backdropFilter: 'blur(8px)' }}>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-panel"
            style={{ width: '100%', maxWidth: '600px', padding: '40px', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}
          >
            <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
              <X size={24} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Request <span className="text-gradient">Custom Theme</span></h2>
              <p style={{ color: 'var(--text-secondary)' }}>Send us the details and let's craft perfection.</p>
            </div>

            {isSubmitted ? (
               <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ textAlign: 'center', padding: '40px', background: 'rgba(20, 184, 166, 0.1)', borderRadius: '16px', border: '1px solid rgba(20, 184, 166, 0.2)' }}
              >
                <CheckCircle size={64} color="var(--accent-tertiary)" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '8px', color: 'var(--text-primary)' }}>Request Sent Successfully!</h3>
                <p style={{ color: 'var(--text-secondary)' }}>We'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Full Name</label>
                    <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.4)', color: 'white' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Email Address</label>
                    <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.4)', color: 'white' }} />
                  </div>
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Theme Type</label>
                  <select value={formData.themeType} onChange={(e) => setFormData({...formData, themeType: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.6)', color: 'white' }}>
                    <option value="e-commerce">E-Commerce / WooCommerce</option>
                    <option value="dropshipping">Dropshipping Store</option>
                    <option value="corporate">Corporate / Agency</option>
                    <option value="portfolio">Portfolio / CV</option>
                    <option value="real-estate">Real Estate & Property</option>
                    <option value="directory">Directory / Listing</option>
                    <option value="landing">Landing Page / Marketing</option>
                    <option value="education">Education / LMS</option>
                    <option value="media">Streaming / Media (Sports/Video)</option>
                    <option value="blog">Blog / News Magazine</option>
                    <option value="other">Other / Custom App</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Detailed Description</label>
                  <textarea required value={formData.details} onChange={(e) => setFormData({...formData, details: e.target.value})} rows={4} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.4)', color: 'white', resize: 'vertical' }} />
                </div>
                
                <button type="submit" className="btn-primary" style={{ display: 'flex', justifyContent: 'center', padding: '14px' }}>
                  <Send size={18} />
                  Submit Request
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}


      <footer className="footer">
        <div className="container">
          <p>© 2026 {settings.siteTitle}. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Home;
