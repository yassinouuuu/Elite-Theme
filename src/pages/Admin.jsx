import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Settings, Plus, Edit, Trash2, Home as HomeIcon, LogOut, Check, X, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Admin = () => {
  const { themes, addTheme, updateTheme, deleteTheme, settings, updateSettings, isAuthenticated, login, logout, requests, deleteRequest } = useStore();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('requests'); // default to requests if someone wants to check inbox
  const navigate = useNavigate();

  // Settings State
  const [siteSettings, setSiteSettings] = useState(settings);

  // Theme Form State
  const [editingTheme, setEditingTheme] = useState(null);
  const [themeForm, setThemeForm] = useState({
    title: '', description: '', price: '', showPrice: true, image: '', gallery: '', tags: '', compatiblePlugins: '', rating: '5.0', views: 0, dateAdded: new Date().toISOString().split('T')[0], link: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(password)) {
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const saveSettings = () => {
    updateSettings(siteSettings);
    alert('Settings saved!');
  };

  const openAddForm = () => {
    setEditingTheme(null);
    setThemeForm({ title: '', description: '', price: '', showPrice: true, image: '', gallery: '', tags: '', compatiblePlugins: '', rating: '5.0', views: 0, dateAdded: new Date().toISOString().split('T')[0], link: '' });
    setActiveTab('themeForm');
  };

  const openEditForm = (theme) => {
    setEditingTheme(theme.id);
    setThemeForm({ 
      ...theme, 
      gallery: theme.gallery && Array.isArray(theme.gallery) ? theme.gallery.join('\n') : '' 
    });
    setActiveTab('themeForm');
  };

  const saveTheme = (e) => {
    e.preventDefault();
    const themeDataToSave = {
      ...themeForm,
      gallery: themeForm.gallery ? themeForm.gallery.split('\n').map(url => url.trim()).filter(url => url) : []
    };
    if (editingTheme) {
      updateTheme(editingTheme, themeDataToSave);
    } else {
      addTheme(themeDataToSave);
    }
    setActiveTab('themes');
  };

  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg-dark)' }}>
        <div className="glass-panel" style={{ padding: '40px', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <Settings size={48} color="var(--accent-primary)" style={{ marginBottom: '24px' }} />
          <h2 style={{ marginBottom: '24px' }}>Admin Login</h2>
          {error && <p style={{ color: 'var(--accent-secondary)', marginBottom: '16px' }}>{error}</p>}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input 
              type="password" 
              placeholder="Enter admin password (admin123)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.5)', color: 'white' }}
            />
            <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>Login</button>
            <Link to="/" style={{ marginTop: '16px', color: 'var(--text-secondary)' }}>Go back to site</Link>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-dark)' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', background: 'rgba(20, 20, 30, 0.8)', borderRight: '1px solid var(--border-color)', padding: '24px' }}>
        <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Settings color="var(--accent-primary)" />
          <h2 style={{ fontSize: '1.25rem' }}>Dashboard</h2>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button 
            onClick={() => setActiveTab('themes')} 
            className={`btn-outline ${activeTab === 'themes' || activeTab === 'themeForm' ? 'active' : ''}`}
            style={{ width: '100%', justifyContent: 'flex-start', border: (activeTab === 'themes' || activeTab === 'themeForm') ? '1px solid var(--accent-primary)' : '' }}
          >
            <HomeIcon size={18} /> Manage Themes
          </button>
          <button 
            onClick={() => setActiveTab('requests')} 
            className={`btn-outline ${activeTab === 'requests' ? 'active' : ''}`}
            style={{ width: '100%', justifyContent: 'flex-start', border: activeTab === 'requests' ? '1px solid var(--accent-primary)' : '' }}
          >
            <Mail size={18} /> Inbox ({requests.length})
          </button>
          <button 
            onClick={() => setActiveTab('settings')} 
            className={`btn-outline ${activeTab === 'settings' ? 'active' : ''}`}
            style={{ width: '100%', justifyContent: 'flex-start', border: activeTab === 'settings' ? '1px solid var(--accent-primary)' : '' }}
          >
            <Settings size={18} /> Site Settings
          </button>
        </nav>
        <div style={{ marginTop: 'auto', paddingTop: '40px' }}>
          <button onClick={handleLogout} className="btn-outline" style={{ width: '100%', justifyContent: 'flex-start', color: '#ec4899', borderColor: 'rgba(236,72,153,0.3)' }}>
            <LogOut size={18} /> Logout
          </button>
          <Link to="/" className="btn-outline" style={{ width: '100%', justifyContent: 'flex-start', marginTop: '12px' }}>
            <HomeIcon size={18} /> View Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        
        {activeTab === 'requests' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2>Inbox Requests ({requests.length})</h2>
            </div>
            
            <div style={{ display: 'grid', gap: '16px' }}>
              {requests.map(req => (
                <div key={req.id} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-primary)', marginBottom: '4px' }}>{req.name}</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}><a href={`mailto:${req.email}`} style={{ textDecoration: 'underline' }}>{req.email}</a> • {new Date(req.date).toLocaleString()} • <strong>{req.themeType}</strong></p>
                    </div>
                    <button className="btn-outline" onClick={() => deleteRequest(req.id)} style={{ padding: '8px', borderColor: 'rgba(236,72,153,0.3)', color: '#ec4899' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div style={{ marginTop: '8px', padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <p style={{ whiteSpace: 'pre-wrap', color: 'var(--text-primary)', lineHeight: '1.6' }}>{req.details}</p>
                  </div>
                </div>
              ))}
              {requests.length === 0 && (
                <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  Your inbox is empty. No new theme requests yet.
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="glass-panel" style={{ padding: '32px', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '24px' }}>Global Site Settings</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Site Title</label>
                <input 
                  type="text" 
                  value={siteSettings.siteTitle} 
                  onChange={(e) => setSiteSettings({...siteSettings, siteTitle: e.target.value})}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.5)', color: 'white' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Hero Badge Text</label>
                <input 
                  type="text" 
                  value={siteSettings.heroBadge} 
                  onChange={(e) => setSiteSettings({...siteSettings, heroBadge: e.target.value})}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.5)', color: 'white' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Hero Title (Supports HTML)</label>
                <input 
                  type="text" 
                  value={siteSettings.heroTitle} 
                  onChange={(e) => setSiteSettings({...siteSettings, heroTitle: e.target.value})}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.5)', color: 'white' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Hero Description</label>
                <textarea 
                  value={siteSettings.heroDescription} 
                  onChange={(e) => setSiteSettings({...siteSettings, heroDescription: e.target.value})}
                  rows={4}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.5)', color: 'white', fontFamily: 'inherit' }}
                />
              </div>
              <button className="btn-primary" onClick={saveSettings} style={{ alignSelf: 'flex-start' }}>
                <Check size={18} /> Save Settings
              </button>
            </div>
          </div>
        )}

        {activeTab === 'themes' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2>Manage Themes</h2>
              <button className="btn-primary" onClick={openAddForm}>
                <Plus size={18} /> Add New Theme
              </button>
            </div>
            
            <div style={{ display: 'grid', gap: '16px' }}>
              {themes.map(theme => (
                <div key={theme.id} className="glass-panel" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <img src={theme.image} alt={theme.title} style={{ width: '96px', height: '60px', objectFit: 'cover', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }} />
                    <div>
                      <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{theme.title}</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{theme.price} - {theme.tags}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn-outline" onClick={() => openEditForm(theme)} style={{ padding: '8px' }}>
                      <Edit size={16} />
                    </button>
                    <button className="btn-outline" onClick={() => deleteTheme(theme.id)} style={{ padding: '8px', borderColor: 'rgba(236,72,153,0.3)', color: '#ec4899' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              {themes.length === 0 && (
                <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No themes found. Add your first theme!
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'themeForm' && (
          <div className="glass-panel" style={{ padding: '32px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2>{editingTheme ? 'Edit Theme' : 'Add New Theme'}</h2>
              <button className="btn-outline" onClick={() => setActiveTab('themes')} style={{ padding: '8px', border: 'none' }}>
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={saveTheme} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Theme Title</label>
                <input required type="text" value={themeForm.title} onChange={(e) => setThemeForm({...themeForm, title: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.5)', color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Description</label>
                <textarea required value={themeForm.description} onChange={(e) => setThemeForm({...themeForm, description: e.target.value})} rows={3} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.5)', color: 'white', fontFamily: 'inherit' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Price Text (e.g. $59)</label>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <input required type="text" value={themeForm.price} onChange={(e) => setThemeForm({...themeForm, price: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.5)', color: 'white' }} />
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', whiteSpace: 'nowrap', cursor: 'pointer' }}>
                      <input type="checkbox" checked={themeForm.showPrice} onChange={(e) => setThemeForm({...themeForm, showPrice: e.target.checked})} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                      Show
                    </label>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Tags (comma separated)</label>
                  <input required type="text" value={themeForm.tags} onChange={(e) => setThemeForm({...themeForm, tags: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.5)', color: 'white' }} placeholder="e.g. WooCommerce, Sports, Blog" />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Compatible Plugins (comma separated)</label>
                <input type="text" value={themeForm.compatiblePlugins || ''} onChange={(e) => setThemeForm({...themeForm, compatiblePlugins: e.target.value})} placeholder="WooCommerce, Elementor, WPML..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.5)', color: 'white' }} />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Rating (e.g. 4.9)</label>
                  <input type="text" value={themeForm.rating || '5.0'} onChange={(e) => setThemeForm({...themeForm, rating: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.5)', color: 'white' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Views Counter</label>
                  <input type="number" value={themeForm.views || 0} onChange={(e) => setThemeForm({...themeForm, views: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.5)', color: 'white' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Date Added</label>
                  <input type="date" value={themeForm.dateAdded || new Date().toISOString().split('T')[0]} onChange={(e) => setThemeForm({...themeForm, dateAdded: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.5)', color: 'white', colorScheme: 'dark' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Demo URL (Link)</label>
                <input required type="url" value={themeForm.link} onChange={(e) => setThemeForm({...themeForm, link: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.5)', color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Image URL (Main Profile)</label>
                <input required type="url" value={themeForm.image} onChange={(e) => setThemeForm({...themeForm, image: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.5)', color: 'white' }} />
                {themeForm.image && <img src={themeForm.image} alt="Preview" style={{ marginTop: '12px', height: '100px', borderRadius: '8px', objectFit: 'cover' }} />}
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Gallery Image URLs (One URL per line)</label>
                <textarea value={themeForm.gallery} onChange={(e) => setThemeForm({...themeForm, gallery: e.target.value})} rows={4} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.5)', color: 'white', fontFamily: 'monospace' }} placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg" />
              </div>
              
              <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
                <Check size={18} /> {editingTheme ? 'Update Theme' : 'Save Theme'}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
