import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BarChart3, ShieldCheck, LogOut, Info, Users, BookOpenCheck, Settings as SettingsIcon, Sun, Moon, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ setAuth }) => {
  const [isLightMode, setIsLightMode] = useState(false);

  const toggleTheme = () => {
    if (isLightMode) {
      document.body.classList.remove('light-mode');
      setIsLightMode(false);
    } else {
      document.body.classList.add('light-mode');
      setIsLightMode(true);
    }
  };
  const links = [
    { name: 'Global Analytics', path: '/analytics', icon: <BarChart3 size={20} /> },
    { name: 'Profit & Loss', path: '/financials', icon: <DollarSign size={20} /> },
    { name: 'AI Engine', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Customer Database', path: '/database', icon: <Users size={20} /> },
    { name: 'Retention Playbook', path: '/playbook', icon: <BookOpenCheck size={20} /> },
    { name: 'Settings', path: '/settings', icon: <SettingsIcon size={20} /> }
  ];

  return (
    <motion.div 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="glass-panel"
      style={{ 
        height: 'calc(100vh - 2rem)', 
        width: '260px', 
        position: 'fixed', 
        left: '1rem', 
        top: '1rem', 
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem 1rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '3rem', padding: '0 1rem' }}>
        <div style={{ background: 'var(--primary)', padding: '0.5rem', borderRadius: '10px' }}>
          <ShieldCheck color="white" size={24} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>RetenAI</h2>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0 }}>Enterprise Suite</p>
        </div>
      </div>

      <nav style={{ flex: 1 }}>
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '1rem',
              borderRadius: '12px',
              marginBottom: '0.5rem',
              textDecoration: 'none',
              color: isActive ? 'white' : 'var(--text-muted)',
              background: isActive ? 'linear-gradient(135deg, var(--primary), #9333ea)' : 'transparent',
              transition: 'all 0.3s ease',
              boxShadow: isActive ? '0 4px 15px var(--primary-glow)' : 'none'
            })}
          >
            {link.icon}
            <span style={{ fontWeight: 600 }}>{link.name}</span>
          </NavLink>
        ))}
      </nav>

      <div style={{ marginTop: 'auto' }}>
        <div style={{ 
          background: 'rgba(255,255,255,0.02)', 
          padding: '1rem', 
          borderRadius: '12px', 
          marginBottom: '1rem',
          border: '1px solid var(--panel-border)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', marginBottom: '4px' }}>
            <Info size={14} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Official Access</span>
          </div>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0 }}>Logged in as System Admin</p>
        </div>

        <button 
          onClick={toggleTheme}
          className="primary-btn inactive" 
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '0.5rem' }}
        >
          {isLightMode ? <Moon size={18} /> : <Sun size={18} />} {isLightMode ? 'Dark Mode' : 'Light Mode'}
        </button>

        <button 
          onClick={() => setAuth(false)}
          className="primary-btn inactive" 
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
