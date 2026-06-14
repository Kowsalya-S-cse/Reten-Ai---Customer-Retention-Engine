import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Database, Link, Shield } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [platformName, setPlatformName] = useState('RetenAI Enterprise');
  
  // Interactive States
  const [pgConnected, setPgConnected] = useState(false);
  const [sfConnected, setSfConnected] = useState(true);
  const [sgConnected, setSgConnected] = useState(true);
  
  const handleSave = () => {
    alert(`Settings saved for ${platformName}! Database connections and policies updated.`);
  };

  return (
    <div className="dashboard-container">
      <header>
        <div>
          <h1>Settings & Integrations</h1>
          <p className="subtitle">Configure your enterprise AI environment</p>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button 
              onClick={() => setActiveTab('general')}
              className={activeTab === 'general' ? "primary-btn" : "primary-btn inactive"} 
              style={{ justifyContent: 'flex-start', background: activeTab === 'general' ? 'rgba(6, 182, 212, 0.1)' : 'transparent', color: activeTab === 'general' ? 'var(--primary)' : 'var(--text-muted)', boxShadow: 'none', border: activeTab === 'general' ? '1px solid var(--primary)' : 'none' }}
            ><SettingsIcon size={18} /> General</button>
            <button 
              onClick={() => setActiveTab('data')}
              className={activeTab === 'data' ? "primary-btn" : "primary-btn inactive"} 
              style={{ justifyContent: 'flex-start', background: activeTab === 'data' ? 'rgba(6, 182, 212, 0.1)' : 'transparent', color: activeTab === 'data' ? 'var(--primary)' : 'var(--text-muted)', boxShadow: 'none', border: activeTab === 'data' ? '1px solid var(--primary)' : 'none' }}
            ><Database size={18} /> Data Sources</button>
            <button 
              onClick={() => setActiveTab('integrations')}
              className={activeTab === 'integrations' ? "primary-btn" : "primary-btn inactive"} 
              style={{ justifyContent: 'flex-start', background: activeTab === 'integrations' ? 'rgba(6, 182, 212, 0.1)' : 'transparent', color: activeTab === 'integrations' ? 'var(--primary)' : 'var(--text-muted)', boxShadow: 'none', border: activeTab === 'integrations' ? '1px solid var(--primary)' : 'none' }}
            ><Link size={18} /> Integrations</button>
            <button 
              onClick={() => setActiveTab('security')}
              className={activeTab === 'security' ? "primary-btn" : "primary-btn inactive"} 
              style={{ justifyContent: 'flex-start', background: activeTab === 'security' ? 'rgba(6, 182, 212, 0.1)' : 'transparent', color: activeTab === 'security' ? 'var(--primary)' : 'var(--text-muted)', boxShadow: 'none', border: activeTab === 'security' ? '1px solid var(--primary)' : 'none' }}
            ><Shield size={18} /> Security</button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel">
          {activeTab === 'general' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 style={{ marginBottom: '2rem' }}>General Settings</h2>
              
              <div className="form-group" style={{ marginBottom: '1.5rem', maxWidth: '500px' }}>
                <label>Platform Name</label>
                <input type="text" className="input-field" value={platformName} onChange={e => setPlatformName(e.target.value)} />
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem', maxWidth: '500px' }}>
                <label>Admin Email</label>
                <input type="email" className="input-field" defaultValue="admin@company.com" />
              </div>

              <div className="form-group" style={{ marginBottom: '2.5rem', maxWidth: '500px' }}>
                <label>Default Domain Model</label>
                <select className="input-field">
                  <option value="cinema">Cinema / Streaming</option>
                  <option value="saas">SaaS (B2B)</option>
                  <option value="telco">Telecom</option>
                </select>
              </div>

              <h2 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', marginTop: '2.5rem' }}>AI Notification Alerts</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem', background: 'rgba(255,255,255,0.02)', borderRadius: '15px', border: '1px solid var(--panel-border)' }}>
                      <div>
                          <span style={{ fontWeight: 600 }}>Audio Alerts</span>
                          <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Play an alert sound when High Risk (&gt;60%) is detected.</p>
                      </div>
                      <div className="status-badge status-success">Enabled</div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem', background: 'rgba(255,255,255,0.02)', borderRadius: '15px', border: '1px solid var(--panel-border)' }}>
                      <div>
                          <span style={{ fontWeight: 600 }}>Visual Emergency Banner</span>
                          <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Show a flashing red 'IMMEDIATE ACTION' banner.</p>
                      </div>
                      <div className="status-badge status-success">Enabled</div>
                  </div>
              </div>

              <button className="primary-btn" style={{ marginTop: '2rem' }} onClick={handleSave}>Save Changes</button>
            </motion.div>
          )}

          {activeTab === 'data' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 style={{ marginBottom: '2rem' }}>Data Sources</h2>
              <p className="subtitle">Connect your databases to RetenAI so the AI has numbers to analyze.</p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <div style={{ padding: '1.5rem', border: '1px solid var(--panel-border)', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', flex: 1 }}>
                   <h3 style={{ marginBottom: '0.5rem' }}>Snowflake</h3>
                   <span className="status-badge status-success">Connected</span>
                   <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1rem' }}>Reading telecom & cinema logs.</p>
                </div>
                <div style={{ padding: '1.5rem', border: '1px solid var(--panel-border)', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', flex: 1 }}>
                   <h3 style={{ marginBottom: '0.5rem' }}>PostgreSQL</h3>
                   {pgConnected ? (
                     <span className="status-badge status-success">Connected</span>
                   ) : (
                     <button className="primary-btn inactive" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', marginTop: '0.5rem' }} onClick={() => setPgConnected(true)}>Connect Database</button>
                   )}
                   <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1rem' }}>For raw customer profiles.</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'integrations' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 style={{ marginBottom: '2rem' }}>Active Integrations</h2>
              <p className="subtitle">Destinations for automated playbook actions. This is how the system sends emails or files tickets.</p>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '2rem' }}>
                <li style={{ padding: '1rem', borderBottom: '1px solid var(--panel-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontWeight: 600 }}>Salesforce (CRM)</span>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Used to alert human account managers.</p>
                  </div>
                  {sfConnected ? (
                    <button className="primary-btn inactive" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => setSfConnected(false)}>Disconnect</button>
                  ) : (
                    <button className="primary-btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => setSfConnected(true)}>Connect Salesforce</button>
                  )}
                </li>
                <li style={{ padding: '1rem', borderBottom: '1px solid var(--panel-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontWeight: 600 }}>SendGrid (Email)</span>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Used to send 50% off promo emails automatically.</p>
                  </div>
                  {sgConnected ? (
                    <button className="primary-btn inactive" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => setSgConnected(false)}>Disconnect</button>
                  ) : (
                    <button className="primary-btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => setSgConnected(true)}>Connect SendGrid</button>
                  )}
                </li>
              </ul>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 style={{ marginBottom: '2rem' }}>Security & Access</h2>
              <p className="subtitle">Manage how your employees log into this dashboard.</p>
              <div className="form-group" style={{ marginBottom: '1.5rem', maxWidth: '500px', marginTop: '2rem' }}>
                <label>Two-Factor Authentication</label>
                <select className="input-field">
                  <option value="required">Required for all users</option>
                  <option value="optional">Optional</option>
                </select>
              </div>
              <button className="primary-btn" onClick={handleSave}>Update Security</button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
