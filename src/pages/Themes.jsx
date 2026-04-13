import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Info, ArrowLeft } from 'lucide-react';
import SiteLogo from '../components/SiteLogo';

const Themes = () => {
  const { themes, settings } = useStore();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Portfolio - ${settings.siteTitle}`;
  }, [settings]);

  return (
    <>
      <nav className="navbar container">
        <SiteLogo />
        <div>
          <Link to="/" className="btn-outline">
            <ArrowLeft size={18} /> Back to Home
          </Link>
        </div>
      </nav>
      
      <main className="container" style={{ padding: '60px 24px 120px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '16px', textAlign: 'center' }}>All <span className="text-gradient">Themes</span></h1>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '40px' }}>Browse our complete collection of premium WordPress themes.</p>
        
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
                className="theme-card"
              >
                <div className="theme-image-container">
                  <img src={theme.image || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"} alt={theme.title} className="theme-image" />
                </div>
                
                <div className="theme-content">
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
            );
          })}
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>© 2026 {settings.siteTitle}. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Themes;
