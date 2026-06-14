import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Activity, Users, Zap, X, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      setAuth(true);
    }, 800);
  };

  const handleResetRequest = (e) => {
    e.preventDefault();
    setResetSent(true);
    setTimeout(() => {
      setShowForgot(false);
      setResetSent(false);
      setResetEmail('');
    }, 2500);
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      width: '100%', 
      backgroundImage: 'url(/login-bg-clean.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative', 
      overflow: 'hidden', 
      padding: '2rem' 
    }}>
      
      {/* Dark overlay for text readability */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(12, 9, 14, 0.6)' }}></div>

      {/* Top Quote */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ zIndex: 10, textAlign: 'center', marginBottom: '3rem', maxWidth: '700px' }}
      >
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#fff', fontWeight: 600 }}>"Retention is the new growth."</h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', lineHeight: 1.6 }}>
          Stop guessing why customers leave. RetenAI uses multi-domain predictive modeling to identify high-risk accounts and automate rescue playbooks before they hit the cancel button.
        </p>
      </motion.div>

      {/* Main Login Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel"
        style={{ width: '100%', maxWidth: '440px', zIndex: 10, padding: '3rem 2.5rem' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2.5rem' }}>
          <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            style={{ 
              background: 'linear-gradient(135deg, var(--primary), #0284c7)', 
              padding: '1rem', borderRadius: '16px', marginBottom: '1.5rem',
              boxShadow: '0 8px 32px var(--primary-glow)'
            }}
          >
            <ShieldCheck color="white" size={32} />
          </motion.div>
          <h1 style={{ fontSize: '2rem', textAlign: 'center' }}>RetenAI</h1>
          <p className="subtitle" style={{ textAlign: 'center' }}>Enterprise Customer Retention</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="form-group">
            <label>Work Email</label>
            <input 
              type="email" className="input-field" placeholder="admin@company.com"
              value={email} onChange={(e) => setEmail(e.target.value)} required
            />
          </div>
          
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label>Password</label>
              <span 
                onClick={() => setShowForgot(true)}
                style={{ fontSize: '0.8rem', color: 'var(--primary)', cursor: 'pointer' }}
              >
                Forgot?
              </span>
            </div>
            <input 
              type="password" className="input-field" placeholder="••••••••"
              value={password} onChange={(e) => setPassword(e.target.value)} required
            />
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            type="submit" className="primary-btn" 
            style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}
            disabled={isLoading}
          >
            {isLoading ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                <Activity size={20} />
              </motion.div>
            ) : (
              <>Login <ArrowRight size={18} /></>
            )}
          </motion.button>
        </form>
      </motion.div>

      {/* Feature Pills */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        style={{ display: 'flex', gap: '1.5rem', marginTop: '3rem', zIndex: 10, color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: 500 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Users size={16} /> Multi-Domain</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Activity size={16} /> Real-time Analytics</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Zap size={16} /> AI Prediction</div>
      </motion.div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgot && (
          <div style={{ 
            position: 'absolute', inset: 0, zIndex: 100, 
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            background: 'rgba(12, 9, 14, 0.8)', backdropFilter: 'blur(8px)'
          }}>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel"
              style={{ width: '100%', maxWidth: '400px', padding: '2.5rem', position: 'relative' }}
            >
              <button 
                onClick={() => setShowForgot(false)}
                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>

              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ background: 'rgba(20, 184, 166, 0.1)', padding: '1rem', borderRadius: '50%', width: 'fit-content', margin: '0 auto 1.5rem auto' }}>
                  <Mail color="var(--primary)" size={32} />
                </div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Reset Password</h2>
                <p className="subtitle">Enter your work email and we'll send you a rescue link.</p>
              </div>

              {!resetSent ? (
                <form onSubmit={handleResetRequest} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="form-group">
                    <label>Work Email</label>
                    <input 
                      type="email" className="input-field" placeholder="admin@company.com"
                      value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} required
                    />
                  </div>
                  <button type="submit" className="primary-btn" style={{ width: '100%' }}>
                    Send Reset Link
                  </button>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ textAlign: 'center', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', border: '1px solid var(--success)' }}
                >
                  <p style={{ color: 'var(--success)', fontWeight: 600, margin: 0 }}>Reset link sent successfully!</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Check your inbox for further instructions.</p>
                  
                  <button 
                    onClick={() => {
                      setResetSent(false);
                      setResetEmail(resetEmail); // Keep the email for convenience
                    }}
                    style={{ 
                      marginTop: '1rem', background: 'none', border: 'none', 
                      color: 'var(--primary)', cursor: 'pointer', fontSize: '0.85rem', 
                      fontWeight: 600, textDecoration: 'underline' 
                    }}
                  >
                    Didn't receive it? Resend mail
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Login;
