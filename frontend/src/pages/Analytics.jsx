import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Globe, TrendingUp, AlertTriangle, UserMinus, Search, Info, HelpCircle, CheckCircle, Send, X } from 'lucide-react';
import axios from 'axios';

const Analytics = () => {
  const [domain, setDomain] = useState('saas');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showOfferModal, setShowOfferModal] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionSummary, setExecutionSummary] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, [domain]);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:8000/api/analytics/${domain}`);
      setData(response.data);
    } catch (err) {
      console.error("Failed to fetch analytics");
      setError("Failed to connect to the Analytics AI engine. Please ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleRunBulkPlaybook = async () => {
    setIsExecuting(true);
    try {
      const res = await axios.post(`http://localhost:8000/api/playbook/execute/${domain}`);
      setExecutionSummary(res.data);
    } catch (err) {
      console.error(err);
      alert("Error executing bulk playbook");
    } finally {
      setIsExecuting(false);
    }
  };

  const handleSendOffer = (customer) => {
    setShowOfferModal(customer);
    setTimeout(() => {
      setShowOfferModal(null);
    }, 6000);
  };

  const filteredWatchlist = data?.watchlist?.filter(item => 
    (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) || 
    (item.id && item.id.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  const filteredStable = data?.stable_customers?.filter(item => 
    (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) || 
    (item.id && item.id.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="dashboard-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <header>
        <div>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '1.25rem' }}>
            <button className={`primary-btn ${domain === 'saas' ? '' : 'inactive'}`} onClick={() => setDomain('saas')}>SaaS Intelligence</button>
            <button className={`primary-btn ${domain === 'telco' ? '' : 'inactive'}`} onClick={() => setDomain('telco')}>Telecom Analytics</button>
            <button className={`primary-btn ${domain === 'cinema' ? '' : 'inactive'}`} onClick={() => setDomain('cinema')}>Cinema Insights</button>
          </div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Globe color="var(--primary)" /> Industry Prediction & Root Cause Analysis
          </h1>
          <p className="subtitle">Core AI Objectives: Who is leaving (Future Risk) and Why (Root Cause)</p>
        </div>
      </header>

      {loading ? (
        <div className="fullscreen-center" style={{ minHeight: '40vh' }}>
          <div className="status-badge">AI Running Global Diagnostics...</div>
        </div>
      ) : error ? (
        <div className="fullscreen-center" style={{ minHeight: '40vh', color: 'var(--danger)', textAlign: 'center' }}>
          <div className="status-badge" style={{ background: 'rgba(20, 108, 125, 0.1)', border: '1px solid var(--danger)' }}>{error}</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Search Bar & Bulk Action */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
              <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input 
                type="text" 
                placeholder="Search customers by name or ID..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '12px 12px 12px 40px', background: 'var(--panel-bg)', border: '1px solid var(--panel-border)', borderRadius: '8px', color: 'var(--text-main)', fontSize: '0.9rem', outline: 'none' }}
              />
            </div>
            <button 
              className={`primary-btn ${isExecuting ? 'inactive' : ''}`} 
              onClick={handleRunBulkPlaybook} 
              disabled={isExecuting}
              style={{ padding: '12px 24px', minWidth: '280px' }}
            >
              {isExecuting ? (
                <>AI processing bulk remediation...</>
              ) : (
                <>Run Automated Playbook for All ({data?.total_high_risk_count?.toLocaleString() || '1,000+'}) High Risk</>
              )}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            
            {/* SECTION 1: WHO WILL LEAVE (Future Risk Watchlist) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <motion.div variants={itemVariants} className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: 0, fontSize: '1.2rem' }}>
                <Search size={20} color="var(--primary)" /> Future Churn Watchlist
              </h2>
              <div className="status-badge" style={{ background: 'rgba(244, 63, 94, 0.1)', color: 'var(--danger)' }}>
                Predictive Risk (High)
              </div>
            </div>
            
            <p className="subtitle" style={{ marginBottom: '1.5rem' }}>AI identified these active customers as high-risk for future departure based on behavior trends.</p>

            <div style={{ flex: 1 }}>
              <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '400px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px' }}>
                  <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--panel-border)' }}>
                      <th style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>CUSTOMER</th>
                      <th style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>AI RISK SCORE</th>
                      <th style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>EXPECTED CLV</th>
                      <th style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>PREDICTED REASON</th>
                      <th style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>DATE PREDICTED</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredWatchlist.map((item, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--panel-border)', cursor: 'pointer' }} onClick={() => handleSendOffer(item)}>
                        <td style={{ padding: '1rem', fontWeight: 500 }}>{item.name}</td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '60px', height: '6px', background: 'var(--panel-border)', borderRadius: '3px', overflow: 'hidden' }}>
                              <div style={{ width: `${item.risk_score}%`, height: '100%', background: 'var(--primary)' }} />
                            </div>
                            <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{item.risk_score}%</span>
                          </div>
                        </td>
                        <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-main)' }}>${item.expected_clv?.toLocaleString() || '0'}</td>
                        <td style={{ padding: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.reason}</td>
                        <td style={{ padding: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.prediction_date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredWatchlist.length === 0 && (
                  <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No customers match your search.</div>
                )}
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(6, 182, 212, 0.05)', borderRadius: '12px', display: 'flex', gap: '12px' }}>
              <Info size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                These customers are currently active but show statistical signals similar to past churners. Immediate intervention recommended.
              </p>
            </div>
          </motion.div>
            </div>

          {/* SECTION 2: WHY THEY QUIT (Root Cause Analysis) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <motion.div variants={itemVariants} className="glass-panel">
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', fontSize: '1.2rem' }}>
                <AlertTriangle size={20} color="var(--accent)" /> Immediate Root Cause Analysis
              </h2>
              <p className="subtitle" style={{ marginBottom: '1.5rem' }}>AI analysis of the "{domain}" dataset identifying the primary drivers for immediate churn.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {data?.root_causes?.map((rc, i) => (
                  <div key={i} style={{ padding: '1.25rem', background: 'var(--panel-bg)', borderRadius: '15px', border: '1px solid var(--panel-border)', display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: rc.impact === 'High' ? 'rgba(244, 63, 94, 0.1)' : 'rgba(251, 191, 36, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <UserMinus color={rc.impact === 'High' ? 'var(--danger)' : 'var(--accent)'} size={20} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <h4 style={{ margin: 0 }}>{rc.factor}</h4>
                        <span style={{ fontSize: '0.65rem', background: rc.impact === 'High' ? 'var(--danger)' : 'var(--accent)', color: 'white', padding: '2px 8px', borderRadius: '10px', textTransform: 'uppercase' }}>{rc.impact} Impact</span>
                      </div>
                      <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{rc.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="glass-panel" style={{ flex: 1 }}>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', fontSize: '1.2rem' }}>
                <TrendingUp size={20} color="var(--success)" /> Churn Probability by Sector
              </h2>
              <div style={{ width: '100%', height: 200 }}>
                <ResponsiveContainer>
                  <BarChart data={data?.chart_data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--panel-border)" vertical={false} />
                    <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="var(--text-muted)" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: 'var(--bg-dark)', borderColor: 'var(--panel-border)', borderRadius: '12px' }} />
                    <Bar dataKey="value" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

        </div>

        {/* STABLE CUSTOMERS SECTION */}
        <motion.div variants={itemVariants} className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: 0, fontSize: '1.2rem' }}>
              <CheckCircle size={20} color="var(--success)" /> Active / Stable Customers
            </h2>
            <div className="status-badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
              Low Risk
            </div>
          </div>
          
          <div style={{ flex: 1, overflowX: 'auto', overflowY: 'auto', maxHeight: '400px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--panel-border)' }}>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>CUSTOMER</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>AI RISK SCORE</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>EXPECTED CLV</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>STATUS</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>DATE PREDICTED</th>
                </tr>
              </thead>
              <tbody>
                {filteredStable.map((item, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--panel-border)' }}>
                    <td style={{ padding: '1rem', fontWeight: 500 }}>{item.name}</td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '60px', height: '6px', background: 'var(--panel-border)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${item.risk_score}%`, height: '100%', background: 'var(--success)' }} />
                        </div>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{item.risk_score}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-main)' }}>${item.expected_clv?.toLocaleString() || '0'}</td>
                    <td style={{ padding: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.reason}</td>
                    <td style={{ padding: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.prediction_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredStable.length === 0 && (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No customers match your search.</div>
            )}
          </div>
        </motion.div>
        </div>
      )}

      <AnimatePresence>
        {showOfferModal && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            style={{ position: 'fixed', top: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999, background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(16px)', border: '1px solid var(--success)', borderRadius: '16px', padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start', maxWidth: '500px', width: '90%', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
          >
            <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '12px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Send color="var(--success)" size={24} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                Offer Sent Successfully
                <button onClick={() => setShowOfferModal(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}>
                  <X size={18} />
                </button>
              </h3>
              <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
                The Retention Playbook has automatically triggered an API call to Salesforce/SendGrid.
              </p>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--primary)' }}>
                <strong>Action:</strong> Dispatched 50% discount code.<br/>
                <strong>Target:</strong> {showOfferModal.name} (ID: {showOfferModal.id})<br/>
                <strong>Status:</strong> Delivered via Email.
              </div>
            </div>
          </motion.div>
        )}

        {executionSummary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="glass-panel"
              style={{ maxWidth: '600px', width: '100%', padding: '2.5rem', background: 'var(--bg-dark)', border: '1px solid var(--primary)' }}
            >
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(6, 182, 212, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <Send color="var(--primary)" size={40} />
                </div>
                <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.8rem' }}>Batch Execution Complete</h2>
                <p style={{ color: 'var(--text-muted)', margin: 0 }}>The AI has successfully processed the global {domain.toUpperCase()} watchlist.</p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', textAlign: 'center' }}>
                    <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Processed</p>
                    <p style={{ margin: '4px 0 0', fontSize: '1.4rem', fontWeight: 700, color: 'var(--primary)' }}>{executionSummary.total_processed.toLocaleString()}</p>
                  </div>
                  <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', textAlign: 'center' }}>
                    <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>High Risk Remediated</p>
                    <p style={{ margin: '4px 0 0', fontSize: '1.4rem', fontWeight: 700, color: 'var(--success)' }}>{executionSummary.high_risk_detected.toLocaleString()}</p>
                  </div>
                </div>

                <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem', textTransform: 'uppercase' }}>Action Breakdown (Mock)</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {Object.entries(executionSummary.actions_triggered).map(([platform, count]) => (
                    <div key={platform} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                      <span style={{ fontSize: '0.9rem' }}>{platform}</span>
                      <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{count.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <span>Execution Time: {executionSummary.execution_time}</span>
                <span>Status: API Delivered</span>
              </div>

              <button className="primary-btn" style={{ width: '100%', padding: '15px' }} onClick={() => setExecutionSummary(null)}>
                Dismiss & View Updated Dashboard
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default Analytics;
