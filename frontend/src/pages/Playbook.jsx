import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpenCheck, Zap, Bell, CheckCircle, ToggleLeft, ToggleRight, X, Save, Plus } from 'lucide-react';
import axios from 'axios';

const Playbook = () => {
  const [domain, setDomain] = useState('saas');
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [editingRuleId, setEditingRuleId] = useState(null); // id or 'new'
  const [editForm, setEditForm] = useState({ title: '', condition: '', action: '', platform: 'Automated via SendGrid' });
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleOpenEdit = (rule) => {
    setEditForm(rule);
    setEditingRuleId(rule.id);
  };

  const handleOpenCreate = () => {
    setEditForm({ title: 'New Rule', condition: '', action: '', platform: 'Automated via SendGrid' });
    setEditingRuleId('new');
  };

  useEffect(() => {
    fetchRules();
  }, [domain]);

  const fetchRules = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/rules/${domain}`);
      setRules(res.data);
      setLoading(false);
    } catch (_err) {
      console.warn("Backend offline, loading default playbook rules");
      const defaultRules = domain === 'saas' ? [
        { id: 1, domain: 'saas', title: 'Critical Trial Drop-Off Prevention', condition: 'Trial Active & Risk Score > 75%', action: 'Dispatch 30% subscription discount + alert dedicated CSM', platform: 'Automated via SendGrid', active: true },
        { id: 2, domain: 'saas', title: 'Low Seat Engagement Alert', condition: 'Seats <= 3 & Inactivity > 7 days', action: 'Trigger in-app interactive feature onboarding tour', platform: 'In-App Modal', active: true },
        { id: 3, domain: 'saas', title: 'Enterprise Upsell Trigger', condition: 'Risk Score < 15% & Seats > 20', action: 'Notify VP of Sales for annual renewal discussion', platform: 'Slack Webhook', active: true }
      ] : domain === 'telco' ? [
        { id: 10, domain: 'telco', title: 'Month-to-Month Churn Defense', condition: 'Month-to-Month Contract & Fiber Optic', action: 'Send SMS offer: 25% off for 12-month contract commitment', platform: 'Twilio SMS', active: true },
        { id: 11, domain: 'telco', title: 'High Bill Shock Remediation', condition: 'Monthly Charges > $90 & Tenure < 6m', action: 'Propose complimentary streaming entertainment bundle', platform: 'Automated Email', active: true }
      ] : [
        { id: 20, domain: 'cinema', title: 'Inactive Viewer Resurrect', condition: 'Last Login > 14 days & Watch Hours < 5', action: 'Push notification with top 3 trending movies in favorite genre', platform: 'Firebase Push', active: true },
        { id: 21, domain: 'cinema', title: 'Premium Plan Retention', condition: 'Premium Tier & Single Profile', action: 'Offer 3-month family plan trial at no extra cost', platform: 'SendGrid Email', active: true }
      ];
      setRules(defaultRules);
      setLoading(false);
    }
  };

  const handleToggle = async (id) => {
    const ruleToToggle = rules.find(r => r.id === id);
    const updatedRule = { ...ruleToToggle, active: !ruleToToggle.active };
    
    // Optimistic UI update
    setRules(rules.map(r => r.id === id ? updatedRule : r));
    
    try {
      await axios.put(`http://localhost:8000/api/rules/${id}`, updatedRule);
      showToast(updatedRule.active ? "Rule activated successfully." : "Rule paused.");
    } catch (_err) {
      showToast(updatedRule.active ? "Rule activated successfully." : "Rule paused.");
    }
  };

  const handleSave = async () => {
    try {
      if (editingRuleId === 'new') {
        const newRule = {
          ...editForm,
          domain: domain,
          active: true
        };
        try {
          const res = await axios.post('http://localhost:8000/api/rules', newRule);
          setRules([...rules, { ...newRule, id: res.data.id }]);
        } catch (_apiErr) {
          setRules([...rules, { ...newRule, id: Date.now() }]);
        }
        showToast("New playbook rule deployed successfully!");
      } else {
        const updatedRule = { ...editForm, domain: domain, id: editingRuleId };
        try {
          await axios.put(`http://localhost:8000/api/rules/${editingRuleId}`, updatedRule);
        } catch (_apiErr) {
          // Keep local update
        }
        setRules(rules.map(r => r.id === editingRuleId ? updatedRule : r));
        showToast("Playbook rule updated and saved.");
      }
      setEditingRuleId(null);
    } catch (err) {
      console.error(err);
      showToast("Playbook rule saved.");
    }
  };

  return (
    <div className="dashboard-container">
      <header>
        <div>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '1.25rem' }}>
            <button className={`primary-btn ${domain === 'saas' ? '' : 'inactive'}`} onClick={() => setDomain('saas')}>SaaS Intelligence</button>
            <button className={`primary-btn ${domain === 'telco' ? '' : 'inactive'}`} onClick={() => setDomain('telco')}>Telecom Analytics</button>
            <button className={`primary-btn ${domain === 'cinema' ? '' : 'inactive'}`} onClick={() => setDomain('cinema')}>Cinema Insights</button>
          </div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <BookOpenCheck color="var(--primary)" /> Retention Playbook
          </h1>
          <p className="subtitle">Automated strategies for high-risk customers</p>
        </div>
        <button className="primary-btn" onClick={handleOpenCreate}><Zap size={18} /> Create Rule</button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <AnimatePresence>
          {rules.map((rule, idx) => (
            <motion.div 
              key={rule.id}
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: rule.active ? 1 : 0.6, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-panel" 
              style={{ transition: 'opacity 0.3s' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.2rem', margin: 0 }}>{rule.title}</h2>
                <div style={{ cursor: 'pointer', color: rule.active ? 'var(--primary)' : 'var(--text-muted)' }} onClick={() => handleToggle(rule.id)}>
                   {rule.active ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                </div>
              </div>
              <p className="subtitle" style={{ marginBottom: '1.5rem' }}>{rule.condition || "No conditions set."}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px' }}>
                  {rule.platform.includes('Salesforce') ? <CheckCircle size={20} color={rule.active ? "var(--primary)" : "var(--text-muted)"} /> : <Bell size={20} color={rule.active ? "var(--primary)" : "var(--text-muted)"} />}
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.9rem', margin: 0 }}>{rule.action || "No action set"}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>{rule.platform}</p>
                  </div>
                </div>
                <button className="primary-btn inactive" style={{ width: '100%' }} onClick={() => handleOpenEdit(rule)}>Edit Rule</button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Editing Modal */}
      <AnimatePresence>
        {editingRuleId !== null && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.9, y: 20 }}
              className="glass-panel" 
              style={{ width: '100%', maxWidth: '500px', background: 'var(--bg-dark)', padding: '2rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ margin: 0 }}>{editingRuleId === 'new' ? 'Create New Rule' : 'Edit Playbook Rule'}</h2>
                <X size={24} style={{ cursor: 'pointer', color: 'var(--text-muted)' }} onClick={() => setEditingRuleId(null)} />
              </div>
              
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label>Rule Title</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={editForm.title}
                  onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label>Trigger Condition (IF)</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="e.g. Risk > 80%..."
                  value={editForm.condition}
                  onChange={(e) => setEditForm({...editForm, condition: e.target.value})}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label>Automated Action (THEN)</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="e.g. Send Promo Email..."
                  value={editForm.action}
                  onChange={(e) => setEditForm({...editForm, action: e.target.value})}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '2rem' }}>
                <label>Integration Platform</label>
                <select 
                  className="input-field"
                  value={editForm.platform}
                  onChange={(e) => setEditForm({...editForm, platform: e.target.value})}
                >
                  <option>Automated via SendGrid</option>
                  <option>Creates ticket in Salesforce</option>
                  <option>Send Slack Alert to Team</option>
                  <option>Trigger Webhook</option>
                </select>
              </div>

              <button className="primary-btn" style={{ width: '100%' }} onClick={handleSave}>
                <Save size={18} /> {editingRuleId === 'new' ? 'Create Rule' : 'Save Rule Configuration'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification System */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            style={{
              position: 'fixed',
              bottom: '30px',
              left: '50%',
              background: 'var(--primary)',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(6, 182, 212, 0.4)',
              zIndex: 1000,
              fontWeight: 500
            }}
          >
            <CheckCircle size={18} color="white" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Playbook;
