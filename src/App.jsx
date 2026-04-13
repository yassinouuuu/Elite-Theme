import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import AboutUs from './pages/AboutUs';
import SingleTheme from './pages/SingleTheme';
import Themes from './pages/Themes';
import Contact from './pages/Contact';
import { StoreProvider } from './context/StoreContext';

const App = () => {
  return (
    <StoreProvider>
      <div className="ambient-orb orb-1"></div>
      <div className="ambient-orb orb-2"></div>
      <div className="ambient-orb orb-3"></div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/themes" element={<Themes />} />
          <Route path="/theme/:id" element={<SingleTheme />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
};

export default App;
