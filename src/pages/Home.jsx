import React, { useState, useEffect } from 'react';
import { ExternalLink, ShoppingCart, Info, Code, Palette, Zap, ArrowRight, Monitor, Smartphone, LayoutTemplate, ShieldAlert, Send, CheckCircle, X, Star, Shield, Search, Globe, Layers, Cpu, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import SiteLogo from '../components/SiteLogo';
import SEOHead from '../components/SEOHead';

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
  const [openFaq, setOpenFaq] = useState(null);

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

  const faqs = [
    {
      question: "What are the best premium WordPress themes for 2026?",
      answer: "The best premium WordPress themes for 2026 focus on performance, responsive design, and SEO optimization. ThemeJungle offers cutting-edge themes like UltraStore Premium, featuring WooCommerce integration, Elementor compatibility, and modern glassmorphism aesthetics that deliver exceptional user experiences and high conversion rates."
    },
    {
      question: "Are your WordPress themes compatible with WooCommerce and Elementor?",
      answer: "Yes, all our WordPress themes are fully compatible with WooCommerce for e-commerce functionality and Elementor Pro for drag-and-drop page building. We also support WPML for multilingual sites, Yoast SEO for search optimization, and Contact Form 7 for lead generation."
    },
    {
      question: "How fast are ThemeJungle WordPress templates?",
      answer: "Our WordPress themes are engineered for maximum speed with lightweight, clean code, optimized assets, lazy loading images, and minimal HTTP requests. They consistently achieve 90+ scores on Google PageSpeed Insights and pass all Core Web Vitals assessments including LCP, FID, and CLS."
    },
    {
      question: "Can I request a custom WordPress theme for my business?",
      answer: "Absolutely! We offer custom WordPress theme development services tailored to your specific needs. Whether you need an e-commerce store, dropshipping platform, corporate website, portfolio, real estate listing, educational LMS, or media streaming site, our team can build a professionally designed, conversion-optimized theme for your brand."
    },
    {
      question: "Do your WordPress themes support mobile responsive design?",
      answer: "All ThemeJungle WordPress templates feature fully responsive design that adapts perfectly to any screen size – from ultra-wide desktop monitors to tablets and smartphones. Our mobile-first approach ensures your website provides an optimal user experience across all devices."
    },
    {
      question: "Are these WordPress themes SEO friendly?",
      answer: "Absolutely. All our themes are built with SEO best practices including semantic HTML5 markup, structured data (Schema.org), fast loading speeds, mobile responsiveness, clean URL structures, and full compatibility with leading SEO plugins like Yoast SEO and Rank Math Pro."
    }
  ];

  const features = [
    { icon: <Zap size={36} />, title: "Lightning Performance", desc: "Optimized code with 90+ PageSpeed scores and passing Core Web Vitals." },
    { icon: <Monitor size={36} />, title: "Responsive Design", desc: "Pixel-perfect rendering across all devices and screen sizes." },
    { icon: <Shield size={36} />, title: "Secure & Updated", desc: "Built with security best practices and regularly updated for WordPress compatibility." },
    { icon: <Search size={36} />, title: "SEO Optimized", desc: "Semantic HTML, structured data, and fast loading for top search engine rankings." },
    { icon: <Layers size={36} />, title: "Elementor Ready", desc: "Full compatibility with Elementor Pro and Theme Builder for visual editing." },
    { icon: <Globe size={36} />, title: "WooCommerce Ready", desc: "Complete e-commerce integration with WooCommerce for powerful online stores." },
  ];

  if (!mounted) return null;

  return (
    <>
      <SEOHead
        title="ThemeJungle – Premium WordPress Themes & Templates 2026 | Best WooCommerce Themes"
        description="Discover ThemeJungle's collection of premium WordPress themes and templates for 2026. High-performance, responsive WooCommerce themes built for speed, SEO, and conversions. Browse professional WordPress templates today."
        keywords="WordPress themes, premium WordPress templates, best WordPress themes 2026, WooCommerce themes, responsive WordPress themes, professional WordPress themes, Elementor themes, e-commerce WordPress themes, dark WordPress themes, modern WordPress templates, buy WordPress themes, custom WordPress themes, fast WordPress themes, SEO optimized WordPress themes, mobile-friendly WordPress themes, GPL WordPress themes, dropshipping themes, business WordPress themes"
        canonicalPath="/"
      />

      <header>
        <nav className="navbar container" aria-label="Main navigation">
          <SiteLogo />
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link to="/themes" className="btn-outline" aria-label="Browse WordPress themes">
              <LayoutTemplate size={18} />
              Themes
            </Link>
            <Link to="/about-us" className="btn-outline" aria-label="Learn about ThemeJungle">
              <Info size={18} />
              About Us
            </Link>
            <Link to="/contact" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }} aria-label="Contact ThemeJungle">
              Contact
            </Link>
          </div>
        </nav>
      </header>

      <main className="container">
        {/* Hero Section */}
        <section className="hero" aria-label="Premium WordPress Themes Hero">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hero-badge"
          >
            {settings.heroBadge || "⚡ #1 Premium WordPress Theme Marketplace 2026"}
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Premium <span className="text-gradient">WordPress Themes</span> Built for Conversion & Speed
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore our carefully crafted collection of professional WordPress templates designed for modern e-commerce, WooCommerce stores, and high-performance business websites. Elementor-ready, SEO-optimized, and fully responsive.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <Link to="/themes" className="btn-primary" aria-label="Browse all WordPress themes">
              Browse All Themes
              <ArrowRight size={18} />
            </Link>
            <button className="btn-outline" onClick={() => setIsModalOpen(true)} aria-label="Request a custom WordPress theme">
              <Code size={18} />
              Request Custom Theme
            </button>
          </motion.div>
        </section>

        {/* Trust Badges */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', padding: '20px 0 60px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}
          aria-label="Trust indicators"
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Star size={18} color="#f59e0b" fill="#f59e0b" /> 4.9/5 Avg Rating</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Globe size={18} /> 100% Responsive</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Shield size={18} /> GPL Licensed</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Zap size={18} /> 90+ PageSpeed</span>
        </motion.section>

        {/* Featured WordPress Themes */}
        <section id="portfolio" aria-label="Featured premium WordPress themes">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Featured <span className="text-gradient">WordPress Themes</span></h2>
              <p style={{ color: 'var(--text-secondary)' }}>Discover our latest handcrafted premium WordPress templates and WooCommerce themes.</p>
            </div>
            <Link to="/themes" className="btn-outline" style={{ padding: '10px 20px', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
              View All
              <ArrowRight size={16} />
            </Link>
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
                itemScope
                itemType="https://schema.org/SoftwareApplication"
              >
                <div className="theme-image-container">
                  <img src={theme.image || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"} alt={`${theme.title} - Premium WordPress Theme`} className="theme-image" itemProp="image" loading="lazy" />
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
                      <span key={tag} className="theme-tag" itemProp="applicationCategory">{tag}</span>
                    ))}
                  </div>
                  
                  <h3 className="theme-title" itemProp="name">{theme.title}</h3>
                  <p className="theme-desc" itemProp="description">{theme.description}</p>
                  
                  <div className="theme-footer">
                    <span className="theme-price" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                      {theme.showPrice !== false && <span itemProp="price">{theme.price}</span>}
                      <meta itemProp="priceCurrency" content="USD" />
                    </span>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <a href={theme.link} target="_blank" rel="noreferrer" className="btn-outline" style={{ padding: '10px 20px', fontSize: '0.9rem' }} aria-label={`View ${theme.title} live demo`}>
                        <ExternalLink size={16} />
                        Demo
                      </a>
                      <Link to={`/theme/${theme.id}`} className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }} aria-label={`View ${theme.title} details`}>
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

        {/* Why Choose Section (SEO content) */}
        <section style={{ padding: '80px 0' }} aria-label="Why choose ThemeJungle WordPress templates">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Why Choose <span className="text-gradient">ThemeJungle</span> WordPress Templates?</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
              Every theme is built with cutting-edge technology, clean code architecture, and conversion-focused design to help your WordPress website succeed.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-panel"
                style={{ padding: '32px', textAlign: 'center' }}
              >
                <div style={{ color: 'var(--accent-primary)', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>{feature.icon}</div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{feature.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* WordPress Theme Categories (SEO-rich internal linking) */}
        <section style={{ padding: '40px 0 80px' }} aria-label="WordPress theme categories">
          <div className="glass-panel" style={{ padding: '48px 40px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '16px', textAlign: 'center' }}>Browse WordPress Themes by <span className="text-gradient">Category</span></h2>
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
              Find the perfect WordPress template for your project. We offer themes for every industry and business type.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
              {[
                'E-Commerce & WooCommerce', 'Dropshipping Store', 'Corporate & Agency',
                'Portfolio & CV', 'Real Estate & Property', 'Directory & Listing',
                'Landing Page & Marketing', 'Education & LMS', 'Sports & Media Streaming',
                'Blog & News Magazine', 'Restaurant & Food', 'Health & Fitness'
              ].map((category, i) => (
                <Link 
                  to="/themes" 
                  key={i}
                  style={{
                    padding: '14px 18px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-secondary)',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  className="category-link"
                >
                  <ArrowRight size={14} style={{ opacity: 0.5 }} />
                  {category} WordPress Themes
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Custom Theme CTA */}
        <section style={{ padding: '40px 0 80px', borderTop: '1px solid var(--border-color)' }} aria-label="Custom WordPress theme development">
          <div className="glass-panel" style={{ padding: '60px 40px', textAlign: 'center' }}>
            <Zap size={48} color="var(--accent-primary)" style={{ margin: '0 auto 24px' }} />
            <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Need a <span className="text-gradient">Custom WordPress Theme</span>?</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 32px', fontSize: '1.1rem' }}>
              We specialize in building custom, high-performance WordPress themes and WooCommerce templates suited to your specific business needs. Turn your vision into a professional, SEO-optimized reality.
            </p>
            <button className="btn-primary" style={{ padding: '16px 36px', fontSize: '1.1rem' }} onClick={() => setIsModalOpen(true)} aria-label="Request custom WordPress theme development">
              <Code size={20} />
              Start a Project Together
            </button>
          </div>
        </section>

        {/* FAQ Section for SEO */}
        <section style={{ padding: '40px 0 80px' }} aria-label="Frequently asked questions about WordPress themes" id="faq">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px', textAlign: 'center' }}>
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
            Everything you need to know about our premium WordPress themes and templates.
          </p>
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-panel"
                style={{ overflow: 'hidden' }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontFamily: 'inherit',
                    textAlign: 'left',
                    gap: '16px'
                  }}
                  aria-expanded={openFaq === i}
                >
                  <span>{faq.question}</span>
                  {openFaq === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    style={{ padding: '0 24px 20px', color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.95rem' }}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* SEO Content Section (keyword-rich text for search engines) */}
        <section style={{ padding: '40px 0 80px', borderTop: '1px solid var(--border-color)' }} aria-label="About ThemeJungle WordPress templates">
          <div className="glass-panel" style={{ padding: '48px 40px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '24px', textAlign: 'center' }}>Professional <span className="text-gradient">WordPress Themes</span> for Every Business</h2>
            <div style={{ columns: '2 350px', gap: '32px', color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.95rem' }}>
              <p style={{ marginBottom: '16px' }}>
                ThemeJungle is a leading provider of <strong>premium WordPress themes and templates</strong> designed for businesses, agencies, and entrepreneurs in 2026. Our carefully crafted collection includes <strong>WooCommerce themes</strong> for e-commerce, <strong>Elementor-compatible templates</strong> for visual page building, and specialized themes for sports media, dropshipping, and corporate websites.
              </p>
              <p style={{ marginBottom: '16px' }}>
                Each <strong>WordPress theme</strong> in our collection is built with <strong>SEO best practices</strong>, including semantic HTML5 markup, Schema.org structured data, optimized Core Web Vitals, and mobile-first responsive design. Our themes consistently achieve <strong>90+ scores on Google PageSpeed Insights</strong>, ensuring your website ranks higher in search results and delivers exceptional user experiences.
              </p>
              <p style={{ marginBottom: '16px' }}>
                Whether you're looking for a <strong>responsive WordPress theme</strong> for your online store, a <strong>professional business template</strong> for your corporate site, or a <strong>custom WordPress theme</strong> tailored to your unique requirements, ThemeJungle has you covered. All our themes are <strong>GPL licensed</strong>, fully documented, and come with dedicated support.
              </p>
              <p>
                Our WordPress templates support the latest WordPress versions and are compatible with popular plugins including <strong>WooCommerce, Elementor Pro, WPML, Yoast SEO, Rank Math, Contact Form 7, and WP Super Cache</strong>. Start building your dream website today with ThemeJungle's premium collection of <strong>best WordPress themes for 2026</strong>.
              </p>
            </div>
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
            <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }} aria-label="Close modal">
              <X size={24} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Request <span className="text-gradient">Custom Theme</span></h2>
              <p style={{ color: 'var(--text-secondary)' }}>Send us the details and let's craft your perfect WordPress theme.</p>
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
                    <label htmlFor="req-name" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Full Name</label>
                    <input id="req-name" required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.4)', color: 'white' }} />
                  </div>
                  <div>
                    <label htmlFor="req-email" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Email Address</label>
                    <input id="req-email" required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.4)', color: 'white' }} />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="req-type" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Theme Type</label>
                  <select id="req-type" value={formData.themeType} onChange={(e) => setFormData({...formData, themeType: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.6)', color: 'white' }}>
                    <option value="e-commerce">E-Commerce / WooCommerce WordPress Theme</option>
                    <option value="dropshipping">Dropshipping Store WordPress Theme</option>
                    <option value="corporate">Corporate / Agency WordPress Theme</option>
                    <option value="portfolio">Portfolio / CV WordPress Theme</option>
                    <option value="real-estate">Real Estate WordPress Theme</option>
                    <option value="directory">Directory / Listing WordPress Theme</option>
                    <option value="landing">Landing Page WordPress Template</option>
                    <option value="education">Education / LMS WordPress Theme</option>
                    <option value="media">Streaming / Media WordPress Theme</option>
                    <option value="blog">Blog / News Magazine WordPress Theme</option>
                    <option value="other">Other / Custom WordPress App</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="req-details" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Detailed Description</label>
                  <textarea id="req-details" required value={formData.details} onChange={(e) => setFormData({...formData, details: e.target.value})} rows={4} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.4)', color: 'white', resize: 'vertical' }} />
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


      <footer className="footer" role="contentinfo">
        <div className="container">
          <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', fontSize: '0.9rem' }}>
            <Link to="/themes" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }}>WordPress Themes</Link>
            <Link to="/about-us" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }}>About Us</Link>
            <Link to="/contact" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }}>Contact</Link>
            <a href="#faq" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }}>FAQ</a>
          </div>
          <p>© 2026 {settings.siteTitle}. Premium WordPress Themes & Templates. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Home;
