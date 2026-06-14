import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, Activity, Clock, User, Database as DatabaseIcon } from 'lucide-react';
import axios from 'axios';

const Database = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [viewType, setViewType] = useState('predictions'); // 'predictions' or 'raw'
  const [domain, setDomain] = useState('cinema'); // 'cinema', 'saas', 'telco'

  useEffect(() => {
    fetchData();
  }, [viewType, domain]);

  const fetchData = async () => {
    setLoading(true);
    try {
        const endpoint = viewType === 'predictions' 
            ? `http://localhost:8000/api/prediction_history/${domain}`
            : `http://localhost:8000/api/database/${domain}`;
        const res = await axios.get(endpoint);
        setData(res.data);
    } catch (err) {
        console.error(err);
    }
    setLoading(false);
  };

  const handleExport = () => {
    if (data.length === 0) {
      alert("No data available to export.");
      return;
    }
    
    let headers = Object.keys(data[0]);
    let csvRows = [headers.join(',')];
    
    data.forEach(row => {
        csvRows.push(headers.map(h => `"${typeof row[h] === 'object' ? JSON.stringify(row[h]).replace(/"/g, '""') : row[h]}"`).join(','));
    });
    
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `${domain}_${viewType}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const filtered = data.filter(item => {
      return Object.values(item).some(val => 
          String(val).toLowerCase().includes(search.toLowerCase())
      );
  });

  return (
    <div className="dashboard-container">
      <header>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><DatabaseIcon size={28} color="var(--primary)" /> Enterprise Database</h1>
          <p className="subtitle">View predictions and raw user datasets across all domains</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '4px', border: '1px solid var(--panel-border)' }}>
                <button onClick={() => setViewType('predictions')} style={{ padding: '8px 16px', background: viewType === 'predictions' ? 'var(--primary)' : 'transparent', color: viewType === 'predictions' ? 'white' : 'var(--text-muted)', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 500, transition: '0.2s' }}>AI Predictions</button>
                <button onClick={() => setViewType('raw')} style={{ padding: '8px 16px', background: viewType === 'raw' ? 'var(--primary)' : 'transparent', color: viewType === 'raw' ? 'white' : 'var(--text-muted)', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 500, transition: '0.2s' }}>Raw Datasets</button>
            </div>
            <button className="primary-btn" onClick={handleExport}><Download size={18} /> Export CSV</button>
        </div>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="glass-panel"
        style={{ padding: '0', overflow: 'hidden' }}
      >
        <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--panel-border)', background: 'rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => setDomain('cinema')} className={`tab-btn ${domain === 'cinema' ? 'active' : ''}`} style={{ padding: '6px 12px', background: 'transparent', color: domain === 'cinema' ? 'white' : 'var(--text-muted)', border: 'none', borderBottom: domain === 'cinema' ? '2px solid var(--primary)' : '2px solid transparent', cursor: 'pointer', fontWeight: 500 }}>Cinema Domain</button>
                <button onClick={() => setDomain('saas')} className={`tab-btn ${domain === 'saas' ? 'active' : ''}`} style={{ padding: '6px 12px', background: 'transparent', color: domain === 'saas' ? 'white' : 'var(--text-muted)', border: 'none', borderBottom: domain === 'saas' ? '2px solid var(--primary)' : '2px solid transparent', cursor: 'pointer', fontWeight: 500 }}>SaaS Domain</button>
                <button onClick={() => setDomain('telco')} className={`tab-btn ${domain === 'telco' ? 'active' : ''}`} style={{ padding: '6px 12px', background: 'transparent', color: domain === 'telco' ? 'white' : 'var(--text-muted)', border: 'none', borderBottom: domain === 'telco' ? '2px solid var(--primary)' : '2px solid transparent', cursor: 'pointer', fontWeight: 500 }}>Telecom Domain</button>
            </div>

          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search across all fields..." 
              className="input-field" 
              style={{ width: '100%', paddingLeft: '2.5rem', height: '36px' }} 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        
        <div style={{ overflowX: 'auto', padding: '1.5rem', maxHeight: '600px', overflowY: 'auto' }}>
          {loading ? (
             <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                <Activity className="spin" size={24} style={{ marginBottom: '10px' }}/> 
                <p>Loading database records from Server...</p>
             </div>
          ) : data.length === 0 ? (
             <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                <p>No records found for this database.</p>
             </div>
          ) : (
          <table style={{ textAlign: 'left', width: '100%', whiteSpace: 'nowrap' }}>
            <thead>
              <tr>
                {Object.keys(data[0]).map(key => (
                    <th key={key} style={{ paddingRight: '2rem', textTransform: 'capitalize', color: 'var(--primary)' }}>{key.replace(/_/g, ' ')}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {Object.keys(item).map(key => {
                    const val = item[key];
                    let displayVal = val;
                    if (key === 'churn_risk_percentage') {
                        return <td key={key}><span className={`status-badge status-${val > 50 ? 'danger' : 'success'}`}>{val}%</span></td>;
                    }
                    if (key === 'clv_prediction') {
                        return <td key={key} style={{ color: 'var(--primary)', fontWeight: 500 }}>{val}</td>;
                    }
                    if (key === 'timestamp') {
                        displayVal = new Date(val + 'Z').toLocaleString(undefined, {month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit'});
                        return <td key={key} style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{displayVal}</td>;
                    }
                    if (key === 'risk_factors') {
                        return <td key={key}><button className="primary-btn inactive" style={{ padding: '4px 8px', fontSize: '0.8rem' }} onClick={() => alert(`Risk Factors:\n\n${val.join('\n')}`)}>View Factors</button></td>;
                    }
                    return <td key={key} style={{ padding: '12px 0' }}>{String(displayVal)}</td>;
                })}
              </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Database;
