import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Settings, Plus, Edit, Trash2, Home as HomeIcon, LogOut, Check, X, Mail, Shield, Key, User, Lock, AlertTriangle, Smartphone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { QRCodeSVG as QRCode } from 'qrcode.react';

const Admin = () => {
  const { 
    themes, addTheme, updateTheme, deleteTheme, 
    settings, updateSettings, 
    adminCredentials, updateCredentials,
    isAuthenticated, is2FAVerified, login, verify2FA, secretLogin, logout, 
    requests, deleteRequest 
  } = useStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secretKeyInput, setSecretKeyInput] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [loginStep, setLoginStep] = useState('login'); // 'login', '2fa', 'secret'
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('requests');
  const navigate = useNavigate();

  // Security Settings State
  const [securitySettings, setSecuritySettings] = useState({
    username: adminCredentials.username,
    password: adminCredentials.password,
    secretKey: adminCredentials.secretKey,
    is2FAEnabled: adminCredentials.is2FAEnabled
  });

  // Settings State
  const [siteSettings, setSiteSettings] = useState(settings);

  // Theme Form State
  const [editingTheme, setEditingTheme] = useState(null);
  const [themeForm, setThemeForm] = useState({
    title: '', description: '', price: '', showPrice: true, image: '', gallery: '', tags: '', compatiblePlugins: '', rating: '5.0', views: 0, dateAdded: new Date().toISOString().split('T')[0], link: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const result = login(username, password);
    if (result.success) {
      if (result.needs2FA) {
        setLoginStep('2fa');
        setError('');
      } else {
        setError('');
      }
    } else {
      setError('Invalid username or password');
    }
  };

  const handle2FAVerify = (e) => {
    e.preventDefault();
    if (verify2FA(twoFactorCode)) {
      setError('');
    } else {
      setError('Invalid 2FA code');
    }
  };

  const handleSecretLogin = (e) => {
    e.preventDefault();
    if (secretLogin(secretKeyInput)) {
      setError('');
    } else {
      setError('Invalid secret key');
    }
  };

  const handleLogout = () => {
    logout();
    setLoginStep('login');
    setUsername('');
    setPassword('');
    setTwoFactorCode('');
    setSecretKeyInput('');
    navigate('/admin');
  };

  const saveSettings = () => {
    updateSettings(siteSettings);
    alert('Settings saved!');
  };

  const saveSecuritySettings = () => {
    updateCredentials(securitySettings);
    alert('Security settings updated successfully!');
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg-dark)', padding: '20px' }}>
        <div className="glass-panel" style={{ padding: '40px', width: '100%', maxWidth: '450px', textAlign: 'center' }}>
          
          {loginStep === 'login' && (
            <>
              <Shield size={48} color="var(--accent-primary)" style={{ marginBottom: '24px' }} />
              <h2 style={{ marginBottom: '8px' }}>Admin Access</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.9rem' }}>Enter your credentials to manage the platform</p>
              
              {error && <div style={{ background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.2)', color: '#ec4899', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>{error}</div>}
              
              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                  <input 
                    type="text" 
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.5)', color: 'white' }}
                  />
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                  <input 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.5)', color: 'white' }}
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ justifyContent: 'center', padding: '14px' }}>Authorize Session</button>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '10px 0' }}>
                  <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>OR</span>
                  <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
                </div>

                <button type="button" onClick={() => setLoginStep('secret')} style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', background: 'none', border: 'none', cursor: 'pointer' }}>
                  Login with Secret Key
                </button>
              </form>
            </>
          )}

          {loginStep === '2fa' && (
            <>
              <Smartphone size={48} color="var(--accent-primary)" style={{ marginBottom: '24px' }} />
              <h2 style={{ marginBottom: '8px' }}>Two-Factor Authentication</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.9rem' }}>Enter the 6-digit code from your authenticator app</p>
              
              {error && <div style={{ background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.2)', color: '#ec4899', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>{error}</div>}
              
              <form onSubmit={handle2FAVerify} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input 
                  type="text" 
                  placeholder="000000"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, '').substring(0, 6))}
                  required
                  autoFocus
                  style={{ width: '100%', padding: '16px', fontSize: '1.5rem', letterSpacing: '8px', textAlign: 'center', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.5)', color: 'white' }}
                />
                <button type="submit" className="btn-primary" style={{ justifyContent: 'center', padding: '14px' }}>Verify & Enter</button>
                <button type="button" onClick={() => setLoginStep('login')} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', background: 'none', border: 'none', cursor: 'pointer', marginTop: '10px' }}>
                  Back to Login
                </button>
              </form>
            </>
          )}

          {loginStep === 'secret' && (
            <>
              <Key size={48} color="var(--accent-primary)" style={{ marginBottom: '24px' }} />
              <h2 style={{ marginBottom: '8px' }}>Master Key Access</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.9rem' }}>Enter your emergency bypass secret key</p>
              
              {error && <div style={{ background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.2)', color: '#ec4899', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>{error}</div>}
              
              <form onSubmit={handleSecretLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ position: 'relative' }}>
                  <Key size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                  <input 
                    type="password" 
                    placeholder="Secret Admin Key"
                    value={secretKeyInput}
                    onChange={(e) => setSecretKeyInput(e.target.value)}
                    required
                    style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.5)', color: 'white' }}
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ justifyContent: 'center', padding: '14px' }}>Unlock Dashboard</button>
                <button type="button" onClick={() => setLoginStep('login')} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', background: 'none', border: 'none', cursor: 'pointer', marginTop: '10px' }}>
                  Back to Standard Login
                </button>
              </form>
            </>
          )}

          <Link to="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '30px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            <HomeIcon size={14} /> Back to Homepage
          </Link>
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
          <button 
            onClick={() => setActiveTab('security')} 
            className={`btn-outline ${activeTab === 'security' ? 'active' : ''}`}
            style={{ width: '100%', justifyContent: 'flex-start', border: activeTab === 'security' ? '1px solid var(--accent-primary)' : '' }}
          >
            <Shield size={18} /> Security
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

        {activeTab === 'security' && (
          <div className="glass-panel" style={{ padding: '32px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Shield size={24} color="var(--accent-primary)" />
              <h2 style={{ margin: 0 }}>Security & Authentication</h2>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {/* Primary Credentials */}
              <section>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Login Credentials</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Admin Username</label>
                    <input 
                      type="text" 
                      value={securitySettings.username} 
                      onChange={(e) => setSecuritySettings({...securitySettings, username: e.target.value})}
                      style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.5)', color: 'white' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Admin Password</label>
                    <input 
                      type="password" 
                      value={securitySettings.password} 
                      onChange={(e) => setSecuritySettings({...securitySettings, password: e.target.value})}
                      style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.5)', color: 'white' }}
                    />
                  </div>
                </div>
              </section>

              {/* Secret Key Bypass */}
              <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <Key size={18} color="var(--accent-secondary)" />
                  <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Emergency Master Key</h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px' }}>This key allows you to bypass 2FA and standard login in case of emergency. Keep it safe!</p>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    value={securitySettings.secretKey} 
                    onChange={(e) => setSecuritySettings({...securitySettings, secretKey: e.target.value})}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.5)', color: 'var(--accent-secondary)', fontWeight: 'bold' }}
                  />
                </div>
              </section>

              {/* Two-Factor Authentication */}
              <section style={{ background: 'rgba(0,0,0,0.2)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Smartphone size={24} color={securitySettings.is2FAEnabled ? 'var(--accent-primary)' : 'var(--text-secondary)'} />
                    <div>
                      <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Google Authenticator (2FA)</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>Add an extra layer of security to your account.</p>
                    </div>
                  </div>
                  <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
                    <input 
                      type="checkbox" 
                      checked={securitySettings.is2FAEnabled}
                      onChange={(e) => setSecuritySettings({...securitySettings, is2FAEnabled: e.target.checked})}
                      style={{ opacity: 0, width: 0, height: 0 }}
                    />
                    <span style={{ 
                      position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, 
                      backgroundColor: securitySettings.is2FAEnabled ? 'var(--accent-primary)' : '#444', 
                      borderRadius: '24px', transition: '0.4s' 
                    }}>
                      <span style={{ 
                        position: 'absolute', content: '""', height: '18px', width: '18px', left: securitySettings.is2FAEnabled ? '28px' : '4px', bottom: '3px', 
                        backgroundColor: 'white', borderRadius: '50%', transition: '0.4s' 
                      }}></span>
                    </span>
                  </label>
                </div>

                {securitySettings.is2FAEnabled && (
                  <div style={{ display: 'flex', gap: '24px', padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', alignItems: 'center' }}>
                    <div style={{ padding: '12px', background: 'white', borderRadius: '8px', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: '100%', height: '100%', background: 'white' }}>
                        <QRCode value={`otpauth://totp/Admin?secret=${adminCredentials.twoFactorSecret}&issuer=EliteThemes`} size={120} />
                      </div>
                    </div>
                    <div>
                      <h4 style={{ color: 'white', marginBottom: '8px' }}>Setup Instructions</h4>
                      <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <li>Install Google Authenticator on your phone</li>
                        <li>Scan the QR code or enter the secret manually</li>
                        <li>Secret: <code style={{ color: 'var(--accent-primary)', background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>{adminCredentials.twoFactorSecret}</code></li>
                        <li>Verification 2FA code is: <code style={{ color: 'var(--accent-primary)' }}>{adminCredentials.twoFactorSecret.substring(0, 6)}</code></li>
                      </ol>
                      <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px', color: '#fbbf24', fontSize: '0.8rem' }}>
                        <AlertTriangle size={14} />
                        <span>Save this secret. You won't be able to see it again after saving.</span>
                      </div>
                    </div>
                  </div>
                )}
              </section>

              <button className="btn-primary" onClick={saveSecuritySettings} style={{ padding: '14px 28px' }}>
                <Check size={18} /> Update Security Profile
              </button>
            </div>
          </div>
        )}

        {/* Previous tabs logic... */}
        {activeTab === 'settings' && (
          <div className="glass-panel" style={{ padding: '32px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Settings size={24} color="var(--accent-primary)" />
              <h2 style={{ margin: 0 }}>Global Site Settings</h2>
            </div>
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
