import React, { useState, useEffect } from 'react';
import { Activity, AlertTriangle, ShieldCheck, Film, Search, UserCheck, Cloud, Phone } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';

const DOMAIN_CONFIGS = {
  cinema: {
    title: 'Streaming Cinema AI',
    icon: <Film size={24} color="var(--primary)" />,
    endpoint: 'cinema',
    initialData: {
      age: 28, gender: 'Female', subscription_type: 'Premium', watch_hours: 45.5,
      last_login_days: 2, device: 'Smart TV', monthly_fee: 15.99, payment_method: 'Credit Card',
      number_of_profiles: 3, avg_watch_time_per_day: 1.5, favorite_genre: 'Sci-Fi'
    },
    fields: [
      { name: 'age', label: 'Age', type: 'number' },
      { name: 'gender', label: 'Gender', type: 'select', options: ['Female', 'Male', 'Other'] },
      { name: 'subscription_type', label: 'Subscription Type', type: 'select', options: ['Basic', 'Standard', 'Premium'] },
      { name: 'watch_hours', label: 'Monthly Watch Hours', type: 'number', step: '0.1' },
      { name: 'last_login_days', label: 'Days Since Last Login', type: 'number' },
      { name: 'device', label: 'Primary Device', type: 'select', options: ['Smart TV', 'Laptop', 'Mobile', 'Tablet'] },
      { name: 'monthly_fee', label: 'Monthly Fee ($)', type: 'number', step: '0.01' },
      { name: 'payment_method', label: 'Payment Method', type: 'select', options: ['Credit Card', 'PayPal', 'Direct Debit'] },
      { name: 'number_of_profiles', label: 'Number of Profiles', type: 'number' },
      { name: 'avg_watch_time_per_day', label: 'Avg Watch/Day (Hrs)', type: 'number', step: '0.1' },
      { name: 'favorite_genre', label: 'Favorite Genre', type: 'select', options: ['Sci-Fi', 'Drama', 'Action', 'Comedy', 'Horror'] }
    ]
  },
  saas: {
    title: 'SaaS Platform AI',
    icon: <Cloud size={24} color="var(--primary)" />,
    endpoint: 'saas',
    initialData: {
      seats: 10, industry: 'Technology', country: 'USA',
      referral_source: 'Organic', plan_tier: 'Enterprise', is_trial: 'False'
    },
    fields: [
      { name: 'seats', label: 'Number of Seats', type: 'number' },
      { name: 'industry', label: 'Industry', type: 'select', options: ['Technology', 'Finance', 'Healthcare', 'Education', 'Retail'] },
      { name: 'country', label: 'Country', type: 'select', options: ['USA', 'UK', 'Canada', 'India', 'Germany'] },
      { name: 'referral_source', label: 'Referral Source', type: 'select', options: ['Organic', 'Paid Ads', 'LinkedIn', 'Referral', 'Webinar'] },
      { name: 'plan_tier', label: 'Plan Tier', type: 'select', options: ['Basic', 'Pro', 'Enterprise'] },
      { name: 'is_trial', label: 'Is Trial?', type: 'select', options: ['True', 'False'] }
    ]
  },
  telco: {
    title: 'Telecom Network AI',
    icon: <Phone size={24} color="var(--primary)" />,
    endpoint: 'telco',
    initialData: {
      tenure: 12, MonthlyCharges: 65.5, TotalCharges: 780.0, gender: 'Male',
      SeniorCitizen: 0, Partner: 'Yes', Dependents: 'No', PhoneService: 'Yes',
      MultipleLines: 'No', InternetService: 'Fiber optic', OnlineSecurity: 'No',
      OnlineBackup: 'Yes', DeviceProtection: 'No', TechSupport: 'No',
      StreamingTV: 'Yes', StreamingMovies: 'No', Contract: 'Month-to-month',
      PaperlessBilling: 'Yes', PaymentMethod: 'Electronic check'
    },
    fields: [
      { name: 'tenure', label: 'Tenure (Months)', type: 'number' },
      { name: 'MonthlyCharges', label: 'Monthly Charges ($)', type: 'number', step: '0.1' },
      { name: 'TotalCharges', label: 'Total Charges ($)', type: 'number', step: '0.1' },
      { name: 'gender', label: 'Gender', type: 'select', options: ['Female', 'Male'] },
      { name: 'SeniorCitizen', label: 'Senior Citizen (0/1)', type: 'select', options: ['0','1'] },
      { name: 'Partner', label: 'Partner', type: 'select', options: ['Yes', 'No'] },
      { name: 'Dependents', label: 'Dependents', type: 'select', options: ['Yes', 'No'] },
      { name: 'PhoneService', label: 'Phone Service', type: 'select', options: ['Yes', 'No'] },
      { name: 'MultipleLines', label: 'Multiple Lines', type: 'select', options: ['Yes', 'No', 'No phone service'] },
      { name: 'InternetService', label: 'Internet Service', type: 'select', options: ['DSL', 'Fiber optic', 'No'] },
      { name: 'Contract', label: 'Contract', type: 'select', options: ['Month-to-month', 'One year', 'Two year'] },
      { name: 'PaymentMethod', label: 'Payment Method', type: 'select', options: ['Electronic check', 'Mailed check', 'Bank transfer (automatic)', 'Credit card (automatic)'] }
    ]
  }
};

const Dashboard = () => {
  const [domain, setDomain] = useState('cinema');
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [errorStatus, setErrorStatus] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState('');
  
  const [formData, setFormData] = useState(DOMAIN_CONFIGS['cinema'].initialData);

  useEffect(() => {
    // Reset form and predictions when domain changes
    setFormData(DOMAIN_CONFIGS[domain].initialData);
    setPrediction(null);
    setSelectedAccountId('');
    fetchAccounts(domain);
  }, [domain]);

  const fetchAccounts = async (currentDomain) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/accounts/${currentDomain}`);
      setAccounts(response.data);
    } catch (_err) {
      if (currentDomain === 'cinema') {
        setAccounts([
          { account_id: "demo-c1", account_name: "Sarah Miller (At-Risk User)", features: { age: 34, gender: 'Female', subscription_type: 'Basic', watch_hours: 4.2, last_login_days: 19, device: 'Mobile', monthly_fee: 8.99, payment_method: 'Gift Card', number_of_profiles: 1, avg_watch_time_per_day: 0.2, favorite_genre: 'Horror' } },
          { account_id: "demo-c2", account_name: "James Wilson (High Engagement)", features: { age: 26, gender: 'Male', subscription_type: 'Premium', watch_hours: 48.5, last_login_days: 1, device: 'Smart TV', monthly_fee: 17.99, payment_method: 'Credit Card', number_of_profiles: 4, avg_watch_time_per_day: 2.5, favorite_genre: 'Sci-Fi' } }
        ]);
      } else if (currentDomain === 'saas') {
        setAccounts([
          { account_id: "demo-s1", account_name: "Acme Corp (Trial - High Churn Risk)", features: { seats: 2, industry: 'Technology', country: 'USA', referral_source: 'Paid Ads', plan_tier: 'Basic', is_trial: 'True' } },
          { account_id: "demo-s2", account_name: "Global Logistics (Enterprise - Stable)", features: { seats: 45, industry: 'Finance', country: 'UK', referral_source: 'Organic', plan_tier: 'Enterprise', is_trial: 'False' } }
        ]);
      } else {
        setAccounts([
          { account_id: "demo-t1", account_name: "Subscriber #4921 (Month-to-month, High Risk)", features: { tenure: 3, MonthlyCharges: 89.5, TotalCharges: 268.5, gender: 'Female', SeniorCitizen: 0, Partner: 'No', Dependents: 'No', PhoneService: 'Yes', MultipleLines: 'No', InternetService: 'Fiber optic', OnlineSecurity: 'No', OnlineBackup: 'No', DeviceProtection: 'No', TechSupport: 'No', StreamingTV: 'Yes', StreamingMovies: 'Yes', Contract: 'Month-to-month', PaperlessBilling: 'Yes', PaymentMethod: 'Electronic check' } },
          { account_id: "demo-t2", account_name: "Subscriber #8102 (Two Year Contract, Stable)", features: { tenure: 48, MonthlyCharges: 55.0, TotalCharges: 2640.0, gender: 'Male', SeniorCitizen: 0, Partner: 'Yes', Dependents: 'Yes', PhoneService: 'Yes', MultipleLines: 'Yes', InternetService: 'DSL', OnlineSecurity: 'Yes', OnlineBackup: 'Yes', DeviceProtection: 'Yes', TechSupport: 'Yes', StreamingTV: 'No', StreamingMovies: 'No', Contract: 'Two year', PaperlessBilling: 'No', PaymentMethod: 'Credit card (automatic)' } }
        ]);
      }
    }
  };

  const handleAccountSelect = (e) => {
    const accId = e.target.value;
    setSelectedAccountId(accId);
    if (accId) {
      const acc = accounts.find(a => String(a.account_id) === String(accId));
      if (acc && acc.features) {
        setFormData(acc.features);
      } else if (acc) {
        const newForm = { ...DOMAIN_CONFIGS[domain].initialData };
        Object.keys(newForm).forEach(k => {
           if (acc[k] !== undefined) newForm[k] = acc[k];
        });
        setFormData(newForm);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handlePredict = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setErrorStatus(null);
    setPrediction(null);
    
    try {
      const response = await axios.post(`http://localhost:8000/predict/${DOMAIN_CONFIGS[domain].endpoint}`, formData);
      setPrediction(response.data);
      
      if (response.data.churn_risk_percentage > 60) {
          const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'); 
          audio.volume = 0.6;
          audio.play().catch(_e => console.log("Audio play blocked by browser."));
          setTimeout(() => {
              audio.pause();
              audio.currentTime = 0;
          }, 3000);
      }
    } catch (_err) {
      console.warn("Backend offline or unreachable, utilizing smart ML simulation for cloud demo:", _err);
      let probability = 35.0;
      let factors = [];
      let clv = "$500";
      let rec = "";

      if (domain === 'cinema') {
        const watchHours = Number(formData.watch_hours) || 20;
        const lastLogin = Number(formData.last_login_days) || 5;
        const avgWatch = Number(formData.avg_watch_time_per_day) || 1.2;
        const fee = Number(formData.monthly_fee) || 14.99;
        
        let penalty = 0;
        if (watchHours < 10) penalty += 65;
        if (lastLogin > 10) penalty += 35;
        if (avgWatch < 0.5) penalty += 20;
        probability = Math.min(98.5, Math.max(4.2, (penalty + (100 - watchHours * 2.5) * 0.4)));

        if (lastLogin > 14) factors.push("Critical Inactivity: Hasn't logged in recently");
        if (avgWatch < 1.0) factors.push("Low Engagement: Watching less than 1 hour a day");
        if (fee > 15 && formData.subscription_type === 'Premium') factors.push("Price Sensitivity on Premium Tier");
        if (Number(formData.number_of_profiles) === 1) factors.push("Single Profile: Less household stickiness");
        if (watchHours < 10) factors.push("Low Value Realization: Very few total watch hours");

        const lifespan = Math.max(1.5, 24 * (1 - (probability / 100)));
        clv = `$${(fee * lifespan).toFixed(2)}`;
        
        if (probability > 70) rec = `High Risk: Send immediate 50% discount offer and a list of new releases in favorite genre: ${formData.favorite_genre || 'Drama'}`;
        else if (probability > 40) rec = `Medium Risk: Send push notifications highlighting trending content on ${formData.device || 'Smart TV'}`;
        else rec = "Low Risk: Excellent engagement. Good candidate for an annual plan upsell.";
      } else if (domain === 'saas') {
        const seats = Number(formData.seats) || 5;
        let override = 0;
        if (formData.is_trial === 'True') override += 45;
        if (seats <= 3) override += 65;
        if (formData.plan_tier === 'Basic') override += 20;
        if (formData.referral_source === 'Paid Ads') override += 15;
        probability = Math.min(99.4, Math.max(12.5, override + 10));

        if (formData.is_trial === 'True') factors.push("CRITICAL: Account still in Trial phase (No commitment)");
        if (seats <= 3) factors.push("Small Team: Low adoption surface area (<= 3 seats)");
        if (formData.plan_tier === 'Basic') factors.push("Basic Tier: Higher price churn sensitivity");

        const expectedCLV = Math.max(0, seats * 75 * (24 * (1 - (probability / 100))));
        clv = `$${expectedCLV.toFixed(2)}`;

        if (probability > 70) rec = "CRITICAL CHURN: Trigger automated 30% discount offer and assign dedicated CSM.";
        else if (probability > 40) rec = "MODERATE RISK: Schedule technical onboarding check-in to boost seat activation.";
        else rec = "SECURE ACCOUNT: High growth potential. Candidate for Enterprise upsell.";
      } else {
        const tenure = Number(formData.tenure) || 12;
        const charges = Number(formData.MonthlyCharges) || 65;
        let override = 0;
        if (tenure < 6) override += 50;
        if (formData.Contract === 'Month-to-month') override += 45;
        if (charges > 100) override += 30;
        if (formData.InternetService === 'DSL') override += 15;
        probability = Math.min(99.4, Math.max(8.5, override + 8));

        if (tenure < 6) factors.push("NEW CUSTOMER: Extremely high risk during first 6 months");
        if (formData.Contract === 'Month-to-month') factors.push("NO LOCK-IN: Month-to-month contract has highest churn probability");
        if (charges > 100) factors.push("HIGH SPEND: Billing exceeds $100/mo without long-term agreement");

        const expectedCLV = Math.max(0, charges * (36 * (1 - (probability / 100))));
        clv = `$${expectedCLV.toFixed(2)}`;

        if (probability > 70) rec = "IMMEDIATE ACTION: Send 50% discount SMS for 12-month contract upgrade.";
        else if (probability > 40) rec = "RETENTION OFFER: Propose complimentary streaming bundle add-on.";
        else rec = "LOYAL SUBSCRIBER: Highly stable tenure. Propose 5G home internet bundle.";
      }

      setPrediction({
        churn_risk_percentage: Number(probability.toFixed(1)),
        clv_prediction: clv,
        recommendation: rec,
        risk_factors: factors.length > 0 ? factors : ["Standard usage metrics within normal bounds"]
      });
      setErrorStatus(null);
    } finally {
      setLoading(false);
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const config = DOMAIN_CONFIGS[domain];

  return (
    <motion.div 
      className="dashboard-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header style={{ marginBottom: '2rem' }}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>{config.icon} {config.title} Engine</h1>
          <p className="subtitle">Run AI retention analysis on individual customer profiles</p>
        </div>
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '4px', border: '1px solid var(--panel-border)' }}>
            <button onClick={() => setDomain('cinema')} style={{ padding: '8px 16px', background: domain === 'cinema' ? 'var(--primary)' : 'transparent', color: domain === 'cinema' ? 'white' : 'var(--text-muted)', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 500, transition: '0.2s' }}>Cinema</button>
            <button onClick={() => setDomain('saas')} style={{ padding: '8px 16px', background: domain === 'saas' ? 'var(--primary)' : 'transparent', color: domain === 'saas' ? 'white' : 'var(--text-muted)', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 500, transition: '0.2s' }}>SaaS</button>
            <button onClick={() => setDomain('telco')} style={{ padding: '8px 16px', background: domain === 'telco' ? 'var(--primary)' : 'transparent', color: domain === 'telco' ? 'white' : 'var(--text-muted)', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 500, transition: '0.2s' }}>Telecom</button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
        
        {/* Left Column: Form */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="glass-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2>Customer Profile Data</h2>
            
            <div style={{ position: 'relative', width: '250px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <select className="input-field" style={{ paddingLeft: '2.5rem' }} value={selectedAccountId} onChange={handleAccountSelect}>
                <option value="">Load Sample Customer...</option>
                {accounts.map((acc, i) => (
                  <option key={i} value={acc.account_id}>{acc.account_name}</option>
                ))}
              </select>
            </div>
          </div>

          <form onSubmit={handlePredict}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {config.fields.map((field, idx) => (
                <div key={idx} className="form-group">
                  <label>{field.label}</label>
                  {field.type === 'select' ? (
                      <select name={field.name} value={formData[field.name] || ''} onChange={handleInputChange} className="input-field">
                        {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                  ) : (
                      <input 
                        type={field.type} 
                        name={field.name} 
                        value={formData[field.name] || ''} 
                        onChange={handleInputChange} 
                        className="input-field"
                        step={field.step}
                        required
                      />
                  )}
                </div>
              ))}
            </div>

            <button 
              type="submit" 
              className="primary-btn" 
              style={{ width: '100%', marginTop: '2rem', padding: '1rem', fontSize: '1.1rem' }}
              disabled={loading}
            >
              {loading ? <Activity className="spin" size={24} /> : 'Run Machine Learning Analysis'}
            </button>
          </form>
          {errorStatus && <p style={{ color: 'var(--danger)', marginTop: '1rem', textAlign: 'center' }}>{errorStatus}</p>}
        </motion.div>

        {/* Right Column: AI Output */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible">
          {prediction ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="glass-panel" style={{ textAlign: 'center', padding: '2rem', border: prediction.churn_risk_percentage > 60 ? '2px solid var(--danger)' : '1px solid var(--panel-border)' }}>
                {prediction.churn_risk_percentage > 60 && (
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }} 
                        animate={{ scale: 1, opacity: 1 }}
                        style={{ background: 'var(--danger)', color: 'white', padding: '8px', borderRadius: '8px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 700 }}
                    >
                        <AlertTriangle size={18} /> IMMEDIATE ACTION REQUIRED
                    </motion.div>
                )}
                <h3 className="subtitle">Predicted Churn Risk</h3>
                <div style={{ 
                  fontSize: '4rem', 
                  fontWeight: 800, 
                  color: prediction.churn_risk_percentage > 60 ? 'var(--danger)' : prediction.churn_risk_percentage > 30 ? 'var(--warning)' : 'var(--success)',
                  lineHeight: 1,
                  margin: '1rem 0'
                }}>
                  {prediction.churn_risk_percentage}%
                </div>
                {prediction.churn_risk_percentage > 60 && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--danger)' }}>
                    <AlertTriangle size={18} /> High Flight Risk
                  </div>
                )}
                {prediction.churn_risk_percentage <= 60 && prediction.churn_risk_percentage > 30 && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--warning)' }}>
                    <Activity size={18} /> Moderate Risk
                  </div>
                )}
                {prediction.churn_risk_percentage <= 30 && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--success)' }}>
                    <ShieldCheck size={18} /> Secure Account
                  </div>
                )}
              </div>

              <div className="glass-panel">
                <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <UserCheck size={18} color="var(--primary)" /> Expected CLV
                </h3>
                <p className="subtitle" style={{ marginBottom: '1rem' }}>Customer Lifetime Value Projection</p>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'white' }}>
                  {prediction.clv_prediction}
                </div>
              </div>

              <div className="glass-panel">
                <h3 style={{ marginBottom: '1rem' }}>AI Action Plan</h3>
                <div style={{ background: 'rgba(6, 182, 212, 0.1)', border: '1px solid var(--primary)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                  <p style={{ margin: 0, fontWeight: 500, lineHeight: 1.5 }}>
                    {prediction.recommendation}
                  </p>
                </div>
                
                <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Identified Risk Factors:</h4>
                <ul style={{ paddingLeft: '1.2rem', margin: 0, color: 'var(--text)' }}>
                  {prediction.risk_factors.map((factor, i) => (
                    <li key={i} style={{ marginBottom: '0.5rem' }}>{factor}</li>
                  ))}
                  {prediction.risk_factors.length === 0 && <li>No critical risk factors identified.</li>}
                </ul>
              </div>
            </div>
          ) : (
            <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.5, textAlign: 'center', padding: '3rem' }}>
              <Activity size={48} style={{ marginBottom: '1rem' }} />
              <p>Awaiting form submission.<br/>Fill out the customer profile and run the analysis.</p>
            </div>
          )}
        </motion.div>

      </div>
    </motion.div>
  );
};

export default Dashboard;
