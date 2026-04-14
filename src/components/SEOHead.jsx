import { useEffect } from 'react';

/**
 * SEOHead Component
 * Dynamically updates document head with SEO meta tags for each page.
 * Since React SPA doesn't naturally support per-page meta, this injects them dynamically.
 */
const SEOHead = ({ 
  title, 
  description, 
  keywords = '', 
  canonicalPath = '/', 
  ogImage = 'https://elitetheme.dev/elite.png',
  ogType = 'website',
  jsonLd = null 
}) => {
  const baseUrl = 'https://elitetheme.dev';
  const fullUrl = `${baseUrl}${canonicalPath}`;
  const fullTitle = title.includes('Elite Theme') ? title : `${title} | Elite Theme – Premium WordPress Themes`;

  useEffect(() => {
    // Title
    document.title = fullTitle;

    // Helper to set or create meta tags
    const setMeta = (attr, attrVal, content) => {
      let el = document.querySelector(`meta[${attr}="${attrVal}"]`);
      if (!el) { 
        el = document.createElement('meta'); 
        el.setAttribute(attr, attrVal); 
        document.head.appendChild(el); 
      }
      el.setAttribute('content', content);
    };

    // Primary meta
    setMeta('name', 'description', description);
    if (keywords) setMeta('name', 'keywords', keywords);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { 
      canonical = document.createElement('link'); 
      canonical.setAttribute('rel', 'canonical'); 
      document.head.appendChild(canonical); 
    }
    canonical.setAttribute('href', fullUrl);

    // Open Graph
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', fullUrl);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:image', ogImage);

    // Twitter
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);

    // JSON-LD structured data
    if (jsonLd) {
      // Remove previous dynamic json-ld
      const existing = document.getElementById('dynamic-jsonld');
      if (existing) existing.remove();

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'dynamic-jsonld';
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);

      return () => {
        const el = document.getElementById('dynamic-jsonld');
        if (el) el.remove();
      };
    }
  }, [fullTitle, description, keywords, fullUrl, ogImage, ogType, jsonLd]);

  return null;
};

export default SEOHead;
