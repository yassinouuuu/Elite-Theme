import React, { useEffect } from 'react';
import { Palette, ArrowLeft, Star, Award, Zap, Code } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import SiteLogo from '../components/SiteLogo';

const AboutUs = () => {
  const { settings } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `About Us - ${settings.siteTitle}`;
  }, [settings]);

  const features = [
    { icon: <Star />, title: "Premium Quality", desc: "Every theme is meticulously crafted to meet the highest visual and performance standards in the WordPress ecosystem." },
    { icon: <Zap />, title: "Lightning Fast", desc: "Optimized for extreme speed and core web vitals, giving your users a seamless browsing experience." },
    { icon: <Code />, title: "Modern Stack", desc: "Built using cutting-edge technologies, ensuring full compatibility with Elementor, WooCommerce, and latest WordPress versions." },
    { icon: <Award />, title: "Conversion Focused", desc: "Designed explicitly to turn your visitors into customers with strategically placed features and layouts." },
  ];

  return (
    <>
      <nav className="navbar container">
        <SiteLogo />
        <div style={{ display: 'flex', gap: '16px' }}>
          <Link to="/" className="btn-outline">
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>
      </nav>

      <main className="container" style={{ padding: '60px 24px 120px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-panel" 
          style={{ padding: '60px', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}
        >
          <h1 style={{ fontSize: '3rem', marginBottom: '24px' }}>About <span className="text-gradient">Elite Theme</span></h1>
          
          <div style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '40px' }}>
            <p style={{ marginBottom: '20px' }}>
              Welcome to <strong>Elite Theme</strong>, your premier destination for high-end, professionally designed WordPress templates. We believe that your website is the digital storefront of your brand, and it deserves nothing less than perfection.
            </p>
            <p>
              Born from a passion for pixel-perfect design and robust architecture, our mission is to empower creators, agencies, and businesses with themes that not only look breathtaking but also drive real, measurable results. Whether you are building an e-commerce empire, a dropshipping store, or a digital media platform, Elite Theme provides the ultimate foundation.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginTop: '60px' }}>
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + (i * 0.1) }}
                style={{ padding: '24px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'left' }}
              >
                <div style={{ color: 'var(--accent-primary)', marginBottom: '16px' }}>{feature.icon}</div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--text-primary)' }}>{feature.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </>
  );
};

export default AboutUs;
