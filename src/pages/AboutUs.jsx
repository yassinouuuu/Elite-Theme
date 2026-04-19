import React, { useEffect } from 'react';
import { Palette, ArrowLeft, Star, Award, Zap, Code, Shield, Globe, Monitor, Layers, Users, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import SiteLogo from '../components/SiteLogo';
import SEOHead from '../components/SEOHead';

const AboutUs = () => {
  const { settings } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [settings]);

  const features = [
    { icon: <Star />, title: "Premium WordPress Quality", desc: "Every WordPress theme is meticulously crafted to meet the highest visual and performance standards in the WordPress ecosystem." },
    { icon: <Zap />, title: "Lightning Fast Themes", desc: "Optimized for extreme speed and Core Web Vitals, giving your WordPress website users a seamless browsing experience with 90+ PageSpeed scores." },
    { icon: <Code />, title: "Modern WordPress Stack", desc: "Built using cutting-edge technologies, ensuring full compatibility with Elementor Pro, WooCommerce, WPML, and the latest WordPress versions." },
    { icon: <Award />, title: "Conversion Focused Design", desc: "WordPress themes designed explicitly to turn your website visitors into customers with strategically placed CTAs, layouts, and UX patterns." },
    { icon: <Shield />, title: "Secure & GPL Licensed", desc: "All WordPress themes follow security best practices with clean, audited code. 100% GPL licensed for complete ownership and customization freedom." },
    { icon: <Globe />, title: "SEO Optimized Templates", desc: "Built with semantic HTML5, Schema.org structured data, and optimized for search engines to help your WordPress website rank higher in Google." },
    { icon: <Monitor />, title: "Fully Responsive Design", desc: "Every WordPress template adapts perfectly to all devices – desktops, laptops, tablets, and smartphones with mobile-first responsive design." },
    { icon: <Layers />, title: "Elementor Pro Integration", desc: "Full drag-and-drop page building with Elementor Pro and Theme Builder. Customize every aspect of your WordPress site without coding." },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About ThemeJungle – Premium WordPress Theme Developers",
    "description": "Learn about ThemeJungle, a premier provider of premium WordPress themes and templates for e-commerce, business, and media websites.",
    "url": "https://themejungle.dev/about-us",
    "mainEntity": {
      "@type": "Organization",
      "name": "ThemeJungle",
      "description": "Professional WordPress theme development studio specializing in premium, SEO-optimized, conversion-focused themes for WooCommerce, Elementor, and modern web development.",
      "url": "https://themejungle.dev",
      "foundingDate": "2026",
      "knowsAbout": ["WordPress Theme Development", "WooCommerce", "Elementor", "Web Design", "SEO", "E-commerce"],
      "makesOffer": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Premium WordPress Theme Development",
            "description": "Custom and pre-built premium WordPress themes for e-commerce, business, and media websites."
          }
        }
      ]
    }
  };

  return (
    <>
      <SEOHead
        title="About ThemeJungle – Premium WordPress Theme Developers & Designers"
        description="Learn about ThemeJungle, a premier WordPress theme development studio creating premium, SEO-optimized, conversion-focused themes. We specialize in WooCommerce themes, Elementor-compatible templates, and custom WordPress development for businesses worldwide."
        keywords="about ThemeJungle, WordPress theme developers, WordPress theme designers, premium WordPress themes company, WooCommerce theme developers, Elementor theme creators, custom WordPress development, professional WordPress templates, WordPress theme studio"
        canonicalPath="/about-us"
        jsonLd={jsonLd}
      />

      <header>
        <nav className="navbar container" aria-label="About page navigation">
          <SiteLogo />
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link to="/themes" className="btn-outline" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
              Browse Themes
            </Link>
            <Link to="/" className="btn-outline">
              <ArrowLeft size={18} />
              Back to Home
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
            <li aria-current="page" style={{ color: 'var(--text-primary)' }}>About Us</li>
          </ol>
        </nav>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-panel" 
          style={{ padding: '60px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}
        >
          <h1 style={{ fontSize: '3rem', marginBottom: '24px' }}>About <span className="text-gradient">ThemeJungle</span></h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--accent-primary)', marginBottom: '16px', fontWeight: 600 }}>
            Premium WordPress Theme Development Studio
          </p>
          
          <div style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '40px', textAlign: 'left', maxWidth: '800px', margin: '0 auto 40px' }}>
            <p style={{ marginBottom: '20px' }}>
              Welcome to <strong>ThemeJungle</strong>, your premier destination for high-end, professionally designed <strong>WordPress themes and templates</strong>. We believe that your website is the digital storefront of your brand, and it deserves nothing less than perfection.
            </p>
            <p style={{ marginBottom: '20px' }}>
              Born from a passion for pixel-perfect design and robust architecture, our mission is to empower creators, agencies, and businesses with <strong>premium WordPress themes</strong> that not only look breathtaking but also drive real, measurable results. Whether you are building an <strong>e-commerce empire with WooCommerce</strong>, a <strong>dropshipping store</strong>, a <strong>corporate business website</strong>, or a <strong>digital media platform</strong>, ThemeJungle provides the ultimate foundation.
            </p>
            <p style={{ marginBottom: '20px' }}>
              Our team specializes in creating <strong>SEO-optimized WordPress templates</strong> with clean, lightweight code that ensures exceptional performance. Every theme in our collection achieves <strong>90+ Google PageSpeed scores</strong>, passes all <strong>Core Web Vitals</strong> assessments, and is built with <strong>semantic HTML5</strong> and <strong>Schema.org structured data</strong> to maximize your search engine visibility.
            </p>
            <p>
              We are committed to delivering <strong>WordPress themes</strong> that are fully compatible with the latest industry tools including <strong>Elementor Pro, WooCommerce, WPML, Yoast SEO, Rank Math, and Contact Form 7</strong>. All our themes are <strong>100% GPL licensed</strong>, fully documented, and backed by professional support to ensure your success.
            </p>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '24px', marginBottom: '60px', maxWidth: '600px', margin: '0 auto 60px' }}>
            {[
              { number: "90+", label: "PageSpeed Score" },
              { number: "100%", label: "Responsive" },
              { number: "GPL", label: "Licensed" },
              { number: "24/7", label: "Support" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                style={{ padding: '20px', background: 'rgba(0,0,0,0.3)', borderRadius: '16px', border: '1px solid var(--border-color)' }}
              >
                <div className="text-gradient" style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '4px' }}>{stat.number}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Features */}
          <h2 style={{ fontSize: '2rem', marginBottom: '32px' }}>Why Choose Our <span className="text-gradient">WordPress Themes</span>?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + (i * 0.08) }}
                style={{ padding: '24px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'left' }}
              >
                <div style={{ color: 'var(--accent-primary)', marginBottom: '16px' }}>{feature.icon}</div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', color: 'var(--text-primary)' }}>{feature.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ marginTop: '60px', padding: '40px', background: 'rgba(0,0,0,0.3)', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Ready to Build Your <span className="text-gradient">WordPress Website</span>?</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '500px', margin: '0 auto 24px' }}>
              Browse our collection of premium WordPress themes or request a custom theme built for your business.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/themes" className="btn-primary" style={{ padding: '14px 32px' }}>
                Browse WordPress Themes
              </Link>
              <Link to="/contact" className="btn-outline" style={{ padding: '14px 32px' }}>
                Contact Us
              </Link>
            </div>
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

export default AboutUs;
