import React from 'react';
import { Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const SiteLogo = () => {
  const { settings } = useStore();
  const navigate = useNavigate();

  return (
    <motion.div 
      className="logo floating"
      whileHover={{ scale: 1.05 }}
      style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
      onClick={() => navigate('/')}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180, filter: "blur(10px)" }}
        animate={{ scale: 1, rotate: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, type: "spring", bounce: 0.4 }}
      >
        <Palette className="accent-color" style={{ color: "var(--accent-primary)" }} size={32} />
      </motion.div>
      <motion.div
        style={{ display: 'flex' }}
        className="text-gradient"
      >
        {settings.siteTitle.split('').map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.1 + index * 0.05,
              type: "spring",
              stiffness: 150,
              damping: 12
            }}
            whileHover={{ 
              y: -5,
              color: "var(--accent-secondary)",
              transition: { duration: 0.2 }
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default SiteLogo;
