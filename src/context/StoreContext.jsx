import React, { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext();

const defaultThemes = [
  {
    id: 1,
    title: "UltraStore Premium",
    description: "A high-converting, vibrant e-commerce theme with full Elementor compatibility and dark glassmorphism design.",
    price: "$59",
    showPrice: true,
    image: "/elite.png",
    gallery: [
      "/elite.png",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=1200"
    ],
    tags: "WooCommerce, Elementor, eCommerce",
    compatiblePlugins: "WooCommerce, Elementor Pro, WPML, Yoast SEO, Contact Form 7",
    rating: "4.9",
    views: 12500,
    dateAdded: "2026-03-20",
    comments: [],
    link: "#",
  },
  {
    id: 2,
    title: "Koora Live Sports",
    description: "Dynamic sports streaming and news theme with Custom Post Types for matches, channels, and live score updates.",
    price: "$49",
    showPrice: true,
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=1200"
    ],
    tags: "Sports, Streaming, News",
    compatiblePlugins: "Elementor, Live Sports Addon, WP Super Cache, SEO Press, ACF Pro",
    rating: "4.8",
    views: 8430,
    dateAdded: "2026-04-05",
    comments: [],
    link: "#",
  }
];

const defaultSettings = {
  siteTitle: "Elite Theme",
  heroBadge: "WordPress Architecture & Theme Design",
  heroTitle: "Premium WordPress Themes Built for <span class='text-gradient'>Conversion & Speed</span>",
  heroDescription: "Explore my carefully crafted portfolio of high-end, responsive WordPress templates designed for modern e-commerce, sports media, and dropshipping businesses."
};

export const StoreProvider = ({ children }) => {
  const [themes, setThemes] = useState(() => {
    const saved = localStorage.getItem('portfolioThemes');
    return saved ? JSON.parse(saved) : defaultThemes;
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('portfolioSettings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAdminAuth') === 'true';
  });

  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem('themeRequests');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('portfolioThemes', JSON.stringify(themes));
  }, [themes]);

  useEffect(() => {
    localStorage.setItem('portfolioSettings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('isAdminAuth', isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('themeRequests', JSON.stringify(requests));
  }, [requests]);

  const addRequest = (req) => {
    setRequests([{ ...req, id: Date.now() }, ...requests]);
  };

  const deleteRequest = (id) => {
    setRequests(requests.filter(r => r.id !== id));
  };

  const addTheme = (theme) => {
    const newTheme = {
      id: Date.now(),
      gallery: [],
      rating: '5.0',
      views: 0,
      dateAdded: new Date().toISOString().split('T')[0],
      comments: [],
      ...theme
    };
    setThemes([...themes, newTheme]);
  };

  const updateTheme = (id, updatedTheme) => {
    setThemes(themes.map(t => t.id === id ? { ...t, ...updatedTheme } : t));
  };

  const deleteTheme = (id) => {
    setThemes(themes.filter(t => t.id !== id));
  };

  const addThemeComment = (themeId, comment) => {
    setThemes(themes.map(t => {
      if (t.id.toString() === themeId.toString()) {
        return {
          ...t,
          comments: [...(t.comments || []), { id: Date.now(), date: new Date().toISOString(), ...comment }]
        };
      }
      return t;
    }));
  };

  const incrementViews = (themeId) => {
    setThemes(themes.map(t => {
      if (t.id.toString() === themeId.toString()) {
        return { ...t, views: (parseInt(t.views) || 0) + 1 };
      }
      return t;
    }));
  };

  const updateSettings = (newSettings) => {
    setSettings({ ...settings, ...newSettings });
  };

  const login = (password) => {
    if (password === 'admin123') { // Simple password for now
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <StoreContext.Provider value={{
      themes, addTheme, updateTheme, deleteTheme, addThemeComment, incrementViews,
      settings, updateSettings,
      isAuthenticated, login, logout,
      requests, addRequest, deleteRequest
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
