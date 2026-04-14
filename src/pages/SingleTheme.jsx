import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ArrowLeft, ExternalLink, ShoppingCart, Check, Shield, Zap, Monitor, Star, Eye, MessageSquare, Calendar, User as UserIcon, Send, CheckCircle, X, Globe, Layers, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import SiteLogo from '../components/SiteLogo';
import SEOHead from '../components/SEOHead';

const SingleTheme = () => {
  const { id } = useParams();
  const { themes, settings, addThemeComment, addRequest } = useStore();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  
  // Comments States
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentRating, setCommentRating] = useState(5);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', details: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundTheme = themes.find(t => t.id.toString() === id);
    if (foundTheme) {
      setTheme(foundTheme);
      setActiveImage(foundTheme.image);
    } else {
      navigate('/');
    }
  }, [id, themes, navigate, settings]);

  if (!theme) return null;

  const allImages = [...new Set([theme.image, ...(theme.gallery || [])])];

  const calculatedRating = theme.comments && theme.comments.length > 0 
    ? (theme.comments.reduce((sum, c) => sum + (c.rating || Number(theme.rating) || 5), 0) / theme.comments.length).toFixed(1)
    : (theme.rating || '5.0');

  const formattedDate = theme.dateAdded 
    ? new Date(theme.dateAdded).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
    : 'N/A';

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentName || !commentText) return;
    addThemeComment(theme.id, { name: commentName, text: commentText, rating: commentRating });
    setCommentName('');
    setCommentText('');
    setCommentRating(5);
  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    addRequest({ ...formData, themeType: `Request: ${theme.title}`, details: formData.details || `I am interested in purchasing ${theme.title}.`, date: new Date().toISOString() });
    
    setTimeout(() => {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', details: '' });
      setTimeout(() => {
        setIsSubmitted(false);
        setIsModalOpen(false);
      }, 3000);
    }, 600);
  };

  const tagsArray = theme.tags ? theme.tags.split(',').map(t => t.trim()) : [];
  const priceValue = theme.price ? theme.price.replace(/[^0-9.]/g, '') : "0";

  // Enhanced JSON-LD for Product/SoftwareApplication
  const jsonLdData = {
    "@context": "https://schema.org/",
    "@type": "SoftwareApplication",
    "name": `${theme.title} – Premium WordPress Theme`,
    "description": theme.description,
    "operatingSystem": "WordPress 6.x",
    "applicationCategory": "WebApplication",
    "applicationSubCategory": "WordPress Theme",
    "image": theme.image,
    "url": `https://elitetheme.dev/theme/${theme.id}`,
    "author": {
      "@type": "Organization",
      "name": "Elite Theme",
      "url": "https://elitetheme.dev"
    },
    "offers": {
      "@type": "Offer",
      "price": priceValue,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Elite Theme"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": calculatedRating,
      "reviewCount": Math.max(theme.comments ? theme.comments.length : 0, 1),
      "bestRating": "5",
      "worstRating": "1"
    },
    "featureList": [
      "Responsive Design",
      "WooCommerce Compatible",
      "Elementor Pro Ready",
      "SEO Optimized",
      "Fast Loading",
      "Mobile Friendly",
      "GPL Licensed"
    ],
    "softwareRequirements": "WordPress 6.0 or higher",
    "keywords": `WordPress theme, ${tagsArray.join(', ')}, premium theme, responsive template`
  };

  // Breadcrumb JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://elitetheme.dev/" },
      { "@type": "ListItem", "position": 2, "name": "WordPress Themes", "item": "https://elitetheme.dev/themes" },
      { "@type": "ListItem", "position": 3, "name": theme.title, "item": `https://elitetheme.dev/theme/${theme.id}` }
    ]
  };

  // Review JSON-LD
  const reviewJsonLd = theme.comments && theme.comments.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": theme.title,
    "review": theme.comments.map(c => ({
      "@type": "Review",
      "author": { "@type": "Person", "name": c.name },
      "reviewRating": { "@type": "Rating", "ratingValue": c.rating || 5, "bestRating": 5 },
      "reviewBody": c.text,
      "datePublished": c.date
    }))
  } : null;

  return (
    <>
      <SEOHead
        title={`${theme.title} – Premium WordPress Theme | Download & Demo`}
        description={`${theme.description.slice(0, 130)}... Download ${theme.title}, a premium WordPress theme with WooCommerce, Elementor support. Responsive, SEO-optimized, fast-loading. Price: ${theme.price || 'Free'}.`}
        keywords={`${theme.title}, WordPress theme, premium WordPress template, ${tagsArray.join(' WordPress theme, ')}, responsive theme, WooCommerce theme, Elementor theme, download WordPress theme, best WordPress themes 2026`}
        canonicalPath={`/theme/${theme.id}`}
        ogImage={theme.image}
        ogType="product"
        jsonLd={jsonLdData}
      />

      {/* Additional structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {reviewJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }} />}

      <header>
        <nav className="navbar container" aria-label="Theme detail navigation">
          <SiteLogo />
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link to="/themes" className="btn-outline">
              <ArrowLeft size={18} /> All Themes
            </Link>
            <Link to="/" className="btn-outline" style={{ padding: '10px 16px' }}>
              Home
            </Link>
          </div>
        </nav>
      </header>

      {/* Breadcrumb Navigation */}
      <div className="container" style={{ padding: '16px 24px 0' }}>
        <nav aria-label="Breadcrumb" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <ol style={{ display: 'flex', gap: '8px', listStyle: 'none', padding: 0, margin: 0 }}>
            <li><Link to="/" style={{ color: 'var(--accent-primary)' }}>Home</Link></li>
            <li>/</li>
            <li><Link to="/themes" style={{ color: 'var(--accent-primary)' }}>WordPress Themes</Link></li>
            <li>/</li>
            <li aria-current="page" style={{ color: 'var(--text-primary)' }}>{theme.title}</li>
          </ol>
        </nav>
      </div>

      <main className="container" style={{ padding: '20px 24px 120px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-panel" 
          style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '40px' }}
          itemScope
          itemType="https://schema.org/SoftwareApplication"
        >
          {/* Header Row */}
          <div className="single-theme-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: '40px', alignItems: 'flex-start' }}>
            
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', position: 'relative', aspectRatio: '16/10', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent' }}>
                <motion.img 
                  key={activeImage}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  src={activeImage} 
                  alt={`${theme.title} - Premium WordPress Theme Screenshot`} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                  itemProp="image"
                  loading="eager"
                />
                <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '8px' }}>
                  {tagsArray.map(tag => (
                    <span key={tag} style={{ background: 'rgba(0,0,0,0.7)', color: 'white', padding: '6px 12px', borderRadius: '12px', fontSize: '0.8rem', backdropFilter: 'blur(4px)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {allImages.length > 1 && (
                <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'thin' }}>
                  {allImages.map((imgUrl, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => setActiveImage(imgUrl)}
                      style={{ 
                        width: '96px', height: '60px', flexShrink: 0, cursor: 'pointer', borderRadius: '12px', overflow: 'hidden', 
                        border: activeImage === imgUrl ? '2px solid var(--accent-primary)' : '2px solid transparent',
                        transition: 'all 0.3s ease', opacity: activeImage === imgUrl ? 1 : 0.6
                      }}
                    >
                      <img src={imgUrl} alt={`${theme.title} screenshot ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ padding: '20px' }}>
              <h1 style={{ fontSize: '3rem', marginBottom: '16px', lineHeight: '1.1' }} itemProp="name">
                {theme.title}
                <span style={{ display: 'block', fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 400, marginTop: '8px' }}>
                  Premium WordPress Theme
                </span>
              </h1>
              
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Star size={16} color="#f59e0b" fill="#f59e0b" /> <span itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating"><span itemProp="ratingValue">{calculatedRating}</span> / <span itemProp="bestRating">5.0</span></span></span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Eye size={16} /> {theme.views || 0} Views</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MessageSquare size={16} /> {(theme.comments || []).length} Reviews</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={16} /> {formattedDate}</span>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '32px', lineHeight: '1.6' }} itemProp="description">
                {theme.description}
              </p>
              
              {theme.showPrice !== false && (
                <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '32px' }} itemProp="offers" itemScope itemType="https://schema.org/Offer">
                  <span itemProp="price" content={priceValue}>{theme.price}</span>
                  <meta itemProp="priceCurrency" content="USD" />
                  <meta itemProp="availability" content="https://schema.org/InStock" />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginLeft: '8px' }}>One-time payment</span>
                </div>
              )}

              {theme.compatiblePlugins && (
                <div style={{ marginBottom: '32px' }}>
                  <h2 style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>Compatible With:</h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {theme.compatiblePlugins.split(',').map(plugin => (
                      <span key={plugin} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.05)', padding: '8px 12px', borderRadius: '8px', fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <Check size={16} color="var(--accent-tertiary)" />
                        {plugin.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '18px', fontSize: '1.05rem' }} aria-label={`Request ${theme.title} WordPress theme`}>
                  <Send size={20} />
                  Request This Theme
                </button>
                <a href={theme.link} target="_blank" rel="noreferrer" className="btn-outline" style={{ width: '100%', justifyContent: 'center', padding: '18px' }} aria-label={`View ${theme.title} live demo`}>
                  <ExternalLink size={20} />
                  Live Demo
                </a>
              </div>
            </div>

          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '20px 0' }} />

          {/* Features / Highlights */}
          <section aria-label="WordPress theme features and highlights">
            <h2 style={{ fontSize: '2rem', marginBottom: '32px' }}>Theme <span className="text-gradient">Highlights</span></h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              
              <div style={{ padding: '24px', background: 'rgba(0,0,0,0.3)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Monitor color="var(--accent-primary)" size={32} style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Responsive WordPress Design</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Flawless rendering on all devices, from ultra-wide monitors to mobile screens. Mobile-first responsive WordPress theme design.</p>
              </div>

              <div style={{ padding: '24px', background: 'rgba(0,0,0,0.3)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Zap color="var(--accent-tertiary)" size={32} style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Performance Optimized</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Lightweight code and optimized assets guarantee perfect Core Web Vitals scores and 90+ Google PageSpeed rating.</p>
              </div>

              <div style={{ padding: '24px', background: 'rgba(0,0,0,0.3)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Shield color="var(--accent-secondary)" size={32} style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Secure & WordPress Compatible</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Tested with the latest WordPress versions, WooCommerce, Elementor Pro, and leading SEO plugins for seamless integration.</p>
              </div>

              <div style={{ padding: '24px', background: 'rgba(0,0,0,0.3)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Globe color="var(--accent-primary)" size={32} style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>WooCommerce Integration</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Full WooCommerce support for building powerful online stores with product management, cart, and checkout pages.</p>
              </div>

              <div style={{ padding: '24px', background: 'rgba(0,0,0,0.3)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Layers color="var(--accent-tertiary)" size={32} style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Elementor Pro Ready</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Drag-and-drop page building with full Elementor Pro and Theme Builder compatibility. No coding required.</p>
              </div>

              <div style={{ padding: '24px', background: 'rgba(0,0,0,0.3)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Smartphone color="var(--accent-secondary)" size={32} style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>SEO Optimized Theme</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Built with semantic HTML5, Schema.org structured data, and optimized for top search engine rankings with Yoast SEO and Rank Math.</p>
              </div>

            </div>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '20px 0' }} />

          {/* Reviews & Comments Section */}
          <section aria-label="Theme reviews and customer comments">
            <h2 style={{ fontSize: '2rem', marginBottom: '32px' }}>Reviews & <span className="text-gradient">Comments</span></h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.5fr)', gap: '40px', alignItems: 'flex-start' }} className="single-theme-layout">
              {/* Form */}
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Leave a Review</h3>
                <form onSubmit={handleAddComment} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} size={28} onClick={() => setCommentRating(star)} color={star <= commentRating ? "#f59e0b" : "var(--text-secondary)"} fill={star <= commentRating ? "#f59e0b" : "transparent"} style={{ cursor: 'pointer', transition: 'all 0.2s' }} />
                    ))}
                  </div>
                  <input required type="text" placeholder="Your Name" value={commentName} onChange={e => setCommentName(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.5)', color: 'white' }} aria-label="Your name" />
                  <textarea required placeholder="Your review of this WordPress theme" value={commentText} onChange={e => setCommentText(e.target.value)} rows={4} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.5)', color: 'white', fontFamily: 'inherit' }} aria-label="Your review" />
                  <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>Post Review</button>
                </form>
              </div>

              {/* Comments List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {!(theme.comments && theme.comments.length > 0) && (
                  <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)', border: '1px dashed var(--border-color)', borderRadius: '16px' }}>
                    Be the first to review this WordPress theme!
                  </div>
                )}
                {theme.comments && theme.comments.map((comment, index) => (
                  <motion.div 
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <UserIcon size={20} color="white" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {comment.name}
                        </h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{new Date(comment.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} color={s <= (comment.rating || 5) ? "#f59e0b" : "transparent"} fill={s <= (comment.rating || 5) ? "#f59e0b" : "transparent"} />)}
                      </div>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{comment.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

        </motion.div>

        {/* Related Themes / Back to collection */}
        <section style={{ marginTop: '60px', textAlign: 'center' }} aria-label="Explore more WordPress themes">
          <h2 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>Explore More <span className="text-gradient">WordPress Themes</span></h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Discover our complete collection of premium WordPress templates and WooCommerce themes.</p>
          <Link to="/themes" className="btn-primary" style={{ padding: '16px 32px' }}>
            Browse All Themes
          </Link>
        </section>
      </main>

      {/* Request Modal Overlay */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', backdropFilter: 'blur(8px)' }}>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-panel"
            style={{ width: '100%', maxWidth: '500px', padding: '40px', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}
          >
            <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }} aria-label="Close request modal">
              <X size={24} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Get <span className="text-gradient">{theme.title}</span></h2>
              <p style={{ color: 'var(--text-secondary)' }}>Send a request and we will contact you immediately.</p>
            </div>

            {isSubmitted ? (
               <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ textAlign: 'center', padding: '40px', background: 'rgba(20, 184, 166, 0.1)', borderRadius: '16px', border: '1px solid rgba(20, 184, 166, 0.2)' }}
              >
                <CheckCircle size={64} color="var(--accent-tertiary)" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '8px', color: 'var(--text-primary)' }}>Request Sent!</h3>
                <p style={{ color: 'var(--text-secondary)' }}>We will send you an email very shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleRequestSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label htmlFor="theme-req-name" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Full Name</label>
                  <input id="theme-req-name" required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.4)', color: 'white' }} />
                </div>
                <div>
                  <label htmlFor="theme-req-email" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Email Address</label>
                  <input id="theme-req-email" required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.4)', color: 'white' }} />
                </div>
                <div>
                  <label htmlFor="theme-req-details" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Additional Details (Optional)</label>
                  <textarea id="theme-req-details" value={formData.details} onChange={(e) => setFormData({...formData, details: e.target.value})} rows={3} placeholder={`I want to buy ${theme.title}...`} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.4)', color: 'white', resize: 'vertical' }} />
                </div>
                
                <button type="submit" className="btn-primary" style={{ display: 'flex', justifyContent: 'center', padding: '14px', marginTop: '8px' }}>
                  <Send size={18} />
                  Send Request
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}

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

export default SingleTheme;
