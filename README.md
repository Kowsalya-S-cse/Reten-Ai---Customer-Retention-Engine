# 🚀 Reten-AI — Enterprise Customer Retention Engine

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://reten-ai-customer-retention-engine-rho.vercel.app/)
[![Demo Video](https://img.shields.io/badge/Demo_Video-Google_Drive-4285F4?style=for-the-badge&logo=googledrive&logoColor=white)](https://drive.google.com/file/d/1PNiRrq6li9pjnGoxqZ6LZfr9AHPqsvdR/view?usp=drivesdk)
![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100%2B-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![XGBoost](https://img.shields.io/badge/XGBoost-ML_Engine-FF6600?style=for-the-badge)
![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

**An AI-powered, multi-domain customer churn prediction & retention intelligence platform.**  
Predict churn. Quantify risk. Execute automated retention playbooks — across Streaming, SaaS, and Telecom industries.

🌐 **Live Web Application:** [https://reten-ai-customer-retention-engine-rho.vercel.app/](https://reten-ai-customer-retention-engine-rho.vercel.app/)  
🎥 **Project Demonstration Video:** [Watch on Google Drive](https://drive.google.com/file/d/1PNiRrq6li9pjnGoxqZ6LZfr9AHPqsvdR/view?usp=drivesdk)

[Live Demo](#-live-demo) · [Features](#-features) · [Architecture](#-architecture) · [Getting Started](#-getting-started) · [API Reference](#-api-reference) · [Credentials](#-demo-access-credentials)

</div>

---

## 🌐 Live Demo & Walkthrough

- **Live Application:** [https://reten-ai-customer-retention-engine-rho.vercel.app/](https://reten-ai-customer-retention-engine-rho.vercel.app/)
- **Demo Video:** [Google Drive Full Walkthrough](https://drive.google.com/file/d/1PNiRrq6li9pjnGoxqZ6LZfr9AHPqsvdR/view?usp=drivesdk)

### 🔐 Demo Access Credentials

To test the application live, click **Login** on the welcome page (any email/password will authenticate for demo purposes):

| Field | Recommended Value |
|---|---|
| **Work Email** | `admin@company.com` |
| **Password** | `password` |

---

## 🧠 What is Reten-AI?

**Reten-AI** is a full-stack intelligent retention engine that helps businesses identify customers at risk of churning before they leave. Using a hybrid ensemble of **XGBoost + Logistic Regression**, it scores each customer in real-time, predicts their **Customer Lifetime Value (CLV)**, and provides actionable retention recommendations — all through a sleek, interactive multi-page dashboard.

> **Supports 3 Industry Domains out of the box:**
> - 🎬 **Cinema / Streaming** — Netflix-style churn detection based on watch habits and inactivity
> - ☁️ **SaaS** — B2B account churn using seat count, plan tier, trial status, and adoption signals
> - 📱 **Telecom** — Carrier churn using contract type, charges, and service features

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **AI Churn Prediction** | Real-time churn risk scoring (0–100%) powered by soft-voting ensemble models |
| 💰 **CLV Forecasting** | Dynamic Customer Lifetime Value estimation based on predicted churn probability |
| 📊 **Deep Analytics Dashboard** | Domain-level churn trends, root cause analysis, watchlists, and stable customer lists |
| ⚡ **Bulk Playbook Execution** | Run AI-driven retention campaigns across thousands of at-risk accounts in one click |
| 📋 **Retention Playbook Builder** | Create, edit, and toggle automated rules (e.g., "send discount if risk > 80%") |
| 🗄️ **Raw Database Explorer** | Browse the full customer dataset directly in the UI |
| 📈 **Financial Metrics View** | Track profit trends, revenue at risk, and month-over-month financial health |
| 🔒 **Secure Admin Login** | Clean authentication barrier for the enterprise platform |
| 🕒 **Prediction History** | All predictions saved to SQLite with timestamps for audit and model governance |

---

## 🏗️ Architecture

```
customer_retention_engine/
├── backend/                    # FastAPI Python Backend
│   ├── app.py                  # Main API server (15+ endpoints, CORS, SQLite)
│   ├── requirements.txt        # Python dependencies
│   ├── database.db             # SQLite — prediction history & playbook rules
│   └── ml_engine/
│       ├── train_models.py     # Model training script (XGBoost + LR Ensemble)
│       └── saved_models/       # Serialized .pkl pipelines
│           ├── cinema_churn_pipeline.pkl
│           ├── saas_churn_pipeline.pkl
│           └── telco_churn_pipeline.pkl
│
├── frontend/                   # React + Vite Multi-Page Frontend
│   ├── vercel.json             # Vercel SPA routing rules
│   └── src/
│       ├── pages/
│       │   ├── Login.jsx       # Auth page
│       │   ├── Dashboard.jsx   # Prediction input + result card
│       │   ├── Analytics.jsx   # Deep analytics + watchlist
│       │   ├── Playbook.jsx    # Rule builder + bulk execution
│       │   ├── Database.jsx    # Raw data explorer
│       │   ├── Financials.jsx  # Revenue & CLV metrics
│       │   └── Settings.jsx    # App configuration
│       └── components/
│           └── Sidebar.jsx     # Navigation sidebar & dark mode toggle
│
└── data/                       # Datasets
    ├── cinema_churn.csv        # Streaming dataset
    ├── telco_churn.csv         # Telecom dataset
    └── ravenstack_accounts.csv # SaaS dataset
```

---

## ⚙️ Getting Started

### 1. Start the FastAPI Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
```
Backend API will run at `http://127.0.0.1:8000`. Interactive Swagger API docs are available at `http://127.0.0.1:8000/docs`.

### 2. Start the React Frontend
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 📡 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Health check — confirms all ML domains are active |
| `POST` | `/login` | Authenticate as admin |
| `POST` | `/predict/cinema` | Run churn prediction for a streaming customer |
| `POST` | `/predict/saas` | Run churn prediction for a SaaS account |
| `POST` | `/predict/telco` | Run churn prediction for a telecom subscriber |
| `GET` | `/api/analytics/{domain}` | Full analytics: watchlist, root causes, chart data, financials |
| `GET` | `/api/accounts/{domain}` | Sample account list for prediction form dropdown |
| `GET` | `/api/database/{domain}` | Raw dataset preview |
| `GET` | `/api/rules/{domain}` | Get retention playbook rules |
| `POST` | `/api/playbook/execute/{domain}` | Bulk-execute active playbook against at-risk customers |

---

## 👩‍💻 Author

**Kowsalya S**  
- **GitHub:** [@Kowsalya-S-cse](https://github.com/Kowsalya-S-cse)  
- **LinkedIn:** [Kowsalya S](https://www.linkedin.com/in/kowsalya-s-206353346/)

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
