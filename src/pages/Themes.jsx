import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Info, ArrowLeft, Star, Shield, Zap, Monitor, Globe } from 'lucide-react';
import SiteLogo from '../components/SiteLogo';
import SEOHead from '../components/SEOHead';

const Themes = () => {
  const { themes, settings } = useStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [settings]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Premium WordPress Themes Collection – Elite Theme",
    "description": "Browse our complete collection of premium WordPress themes and templates. Professional WooCommerce, Elementor-compatible themes for e-commerce, business, and media websites.",
    "url": "https://elitetheme.dev/themes",
    "publisher": {
      "@type": "Organization",
      "name": "Elite Theme"
    },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": themes.length,
      "itemListElement": themes.map((theme, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "item": {
          "@type": "SoftwareApplication",
          "name": theme.title,
          "description": theme.description,
          "image": theme.image,
          "url": `https://elitetheme.dev/theme/${theme.id}`,
          "operatingSystem": "WordPress",
          "applicationCategory": "WebApplication",
          "offers": {
            "@type": "Offer",
            "price": theme.price ? theme.price.replace(/[^0-9.]/g, '') : "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          }
        }
      }))
    }
  };

  return (
    <>
      <SEOHead
        title="Premium WordPress Themes & Templates Collection 2026 – Browse All Themes"
        description={`Browse ${themes.length}+ premium WordPress themes and WooCommerce templates. Professional, responsive, SEO-optimized themes for e-commerce, business, sports, and media websites. Elementor-ready, fast-loading WordPress templates.`}
        keywords="WordPress themes collection, browse WordPress templates, all WordPress themes, premium themes marketplace, WooCommerce themes, Elementor themes, responsive WordPress templates, best WordPress themes 2026, professional WordPress themes, modern WordPress templates, e-commerce themes, business WordPress themes"
        canonicalPath="/themes"
        jsonLd={jsonLd}
      />

      <header>
        <nav className="navbar container" aria-label="Themes page navigation">
          <SiteLogo />
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link to="/" className="btn-outline">
              <ArrowLeft size={18} /> Back to Home
            </Link>
            <Link to="/contact" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
              Contact Us
            </Link>
          </div>
        </nav>
      </header>
      
      <main className="container" style={{ padding: '60px 24px 120px' }}>
        <section aria-label="WordPress themes catalog">
          <h1 style={{ fontSize: '3rem', marginBottom: '16px', textAlign: 'center' }}>
            All Premium <span className="text-gradient">WordPress Themes</span>
          </h1>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '16px', maxWidth: '700px', margin: '0 auto 16px' }}>
            Browse our complete collection of professional WordPress themes and templates. Every theme is meticulously crafted for performance, SEO, and conversions.
          </p>
          
          {/* Trust badges */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', marginBottom: '40px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Star size={14} color="#f59e0b" fill="#f59e0b" /> Top Rated</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Shield size={14} /> GPL Licensed</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Zap size={14} /> Fast Loading</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Monitor size={14} /> Responsive</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Globe size={14} /> WooCommerce Ready</span>
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
                  className="theme-card"
                  itemScope
                  itemType="https://schema.org/SoftwareApplication"
                >
                  <div className="theme-image-container">
                    <img 
                      src={theme.image || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"} 
                      alt={`${theme.title} - Premium WordPress Theme Preview`} 
                      className="theme-image" 
                      itemProp="image" 
                      loading="lazy"
                      width="600"
                      height="375"
                    />
                  </div>
                  
                  <div className="theme-content">
                    <div className="theme-tags">
                      {tagsArray.map(tag => (
                        <span key={tag} className="theme-tag">{tag}</span>
                      ))}
                    </div>
                    <h2 className="theme-title" itemProp="name">{theme.title}</h2>
                    <p className="theme-desc" itemProp="description">{theme.description}</p>
                    
                    <div className="theme-footer">
                      <span className="theme-price">{theme.showPrice !== false ? theme.price : ''}</span>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <a href={theme.link} target="_blank" rel="noreferrer" className="btn-outline" style={{ padding: '10px 20px', fontSize: '0.9rem' }} aria-label={`View ${theme.title} live demo`}>
                          <ExternalLink size={16} />
                          Demo
                        </a>
                        <Link to={`/theme/${theme.id}`} className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }} aria-label={`View ${theme.title} details and features`}>
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
        </section>

        {/* SEO Content */}
        <section style={{ marginTop: '80px', borderTop: '1px solid var(--border-color)', paddingTop: '60px' }} aria-label="About our WordPress themes">
          <div className="glass-panel" style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', textAlign: 'center' }}>
              Discover the Best <span className="text-gradient">WordPress Themes</span> for 2026
            </h2>
            <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.95rem' }}>
              <p style={{ marginBottom: '16px' }}>
                Our curated collection of <strong>premium WordPress themes</strong> represents the finest in modern web design and development. Each <strong>WordPress template</strong> is handcrafted with attention to detail, featuring <strong>responsive design</strong>, <strong>SEO optimization</strong>, and full compatibility with <strong>WooCommerce</strong> and <strong>Elementor Pro</strong>.
              </p>
              <p style={{ marginBottom: '16px' }}>
                Whether you're building a <strong>professional e-commerce store</strong>, a <strong>corporate business website</strong>, a <strong>sports streaming platform</strong>, or a <strong>dropshipping business</strong>, our themes provide the perfect foundation. Every theme includes clean, optimized code that ensures <strong>fast page load times</strong>, excellent <strong>Core Web Vitals scores</strong>, and higher search engine rankings.
              </p>
              <p>
                All themes are <strong>GPL licensed</strong>, fully documented, and come with professional support. Start building your dream WordPress website today with Elite Theme's premium collection.
              </p>
            </div>
          </div>
        </section>
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

export default Themes;
