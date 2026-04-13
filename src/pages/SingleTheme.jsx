import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ArrowLeft, ExternalLink, ShoppingCart, Check, Shield, Zap, Monitor, Star, Eye, MessageSquare, Calendar, User as UserIcon, Send, CheckCircle, X } from 'lucide-react';
import { motion } from 'framer-motion';
import SiteLogo from '../components/SiteLogo';

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
      
      // Dynamic SEO Title & Meta
      document.title = `${foundTheme.title} - ${settings.siteTitle}`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.content = foundTheme.description.slice(0, 150) + '...';
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

  const jsonLdData = {
    "@context": "https://schema.org/",
    "@type": "SoftwareApplication",
    "name": theme.title,
    "description": theme.description,
    "operatingSystem": "WordPress",
    "applicationCategory": "WebApplication",
    "image": theme.image,
    "offers": {
      "@type": "Offer",
      "price": theme.price ? theme.price.replace(/[^0-9.]/g, '') : "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": calculatedRating,
      "reviewCount": theme.comments ? (theme.comments.length || 1) : 1
    }
  };

  return (
    <>
      {/* SEO Schema Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }} />
      <nav className="navbar container">
        <SiteLogo />
        <div>
          <Link to="/" className="btn-outline">
            <ArrowLeft size={18} /> Back
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
                  alt={theme.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                />
                <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '8px' }}>
                  {theme.tags && theme.tags.split(',').map(tag => (
                    <span key={tag} style={{ background: 'rgba(0,0,0,0.7)', color: 'white', padding: '6px 12px', borderRadius: '12px', fontSize: '0.8rem', backdropFilter: 'blur(4px)' }}>
                      {tag.trim()}
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
                      <img src={imgUrl} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ padding: '20px' }}>
              <h1 style={{ fontSize: '3rem', marginBottom: '16px', lineHeight: '1.1' }}>{theme.title}</h1>
              
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Star size={16} color="#f59e0b" fill="#f59e0b" /> {calculatedRating} / 5.0</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Eye size={16} /> {theme.views || 0} Views</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MessageSquare size={16} /> {(theme.comments || []).length} Comments</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={16} /> {formattedDate}</span>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '32px', lineHeight: '1.6' }}>
                {theme.description}
              </p>
              
              {theme.showPrice !== false && (
                <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '32px' }}>
                  {theme.price}
                </div>
              )}

              {theme.compatiblePlugins && (
                <div style={{ marginBottom: '32px' }}>
                  <h4 style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>Compatible With:</h4>
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
                <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '18px', fontSize: '1.05rem' }}>
                  <Send size={20} />
                  Request This Theme
                </button>
                <a href={theme.link} target="_blank" rel="noreferrer" className="btn-outline" style={{ width: '100%', justifyContent: 'center', padding: '18px' }}>
                  <ExternalLink size={20} />
                  Live Demo
                </a>
              </div>
            </div>

          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '20px 0' }} />

          {/* Features Row */}
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '32px' }}>Theme <span className="text-gradient">Highlights</span></h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              
              <div style={{ padding: '24px', background: 'rgba(0,0,0,0.3)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Monitor color="var(--accent-primary)" size={32} style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Responsive Design</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Flawless rendering on all devices, from ultra-wide monitors to mobile screens.</p>
              </div>

              <div style={{ padding: '24px', background: 'rgba(0,0,0,0.3)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Zap color="var(--accent-tertiary)" size={32} style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Performance Optimized</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Lightweight code and optimized assets to guarantee score perfect web vitals.</p>
              </div>

              <div style={{ padding: '24px', background: 'rgba(0,0,0,0.3)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Shield color="var(--accent-secondary)" size={32} style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Secure & Compatible</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Tested with the latest WordPress versions, WooCommerce, and leading plugins.</p>
              </div>

            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '20px 0' }} />

          {/* Reviews & Comments Section */}
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '32px' }}>Reviews & <span className="text-gradient">Comments</span></h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.5fr)', gap: '40px', alignItems: 'flex-start' }} className="single-theme-layout">
              {/* Form */}
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Leave a comment</h3>
                <form onSubmit={handleAddComment} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} size={28} onClick={() => setCommentRating(star)} color={star <= commentRating ? "#f59e0b" : "var(--text-secondary)"} fill={star <= commentRating ? "#f59e0b" : "transparent"} style={{ cursor: 'pointer', transition: 'all 0.2s' }} />
                    ))}
                  </div>
                  <input required type="text" placeholder="Your Name" value={commentName} onChange={e => setCommentName(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.5)', color: 'white' }} />
                  <textarea required placeholder="Your Comment or Review" value={commentText} onChange={e => setCommentText(e.target.value)} rows={4} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.5)', color: 'white', fontFamily: 'inherit' }} />
                  <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>Post Comment</button>
                </form>
              </div>

              {/* Comments List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {!(theme.comments && theme.comments.length > 0) && (
                  <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)', border: '1px dashed var(--border-color)', borderRadius: '16px' }}>
                    Be the first to review this theme!
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
          </div>

        </motion.div>
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
            <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
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
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Full Name</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.4)', color: 'white' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Email Address</label>
                  <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.4)', color: 'white' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Additional Details (Optional)</label>
                  <textarea value={formData.details} onChange={(e) => setFormData({...formData, details: e.target.value})} rows={3} placeholder={`I want to buy ${theme.title}...`} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.4)', color: 'white', resize: 'vertical' }} />
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
    </>
  );
};

export default SingleTheme;
