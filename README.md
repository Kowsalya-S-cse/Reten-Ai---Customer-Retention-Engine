<<<<<<< HEAD
# 🚀 Reten-AI — Customer Retention Engine

<div align="center">

![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100%2B-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![XGBoost](https://img.shields.io/badge/XGBoost-ML_Engine-FF6600?style=for-the-badge&logo=data:image/svg+xml;base64,)
![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

**An AI-powered, multi-domain customer churn prediction & retention platform.**  
Predict churn. Quantify risk. Execute automated retention playbooks — across Streaming, SaaS, and Telecom industries.

[Features](#-features) · [Architecture](#-architecture) · [Getting Started](#-getting-started) · [API Reference](#-api-reference) · [Screenshots](#-screenshots)

</div>

---

## 🧠 What is Reten-AI?

**Reten-AI** is a full-stack intelligent retention engine that helps businesses identify customers at risk of churning before they leave. Using a hybrid ensemble of **XGBoost + Logistic Regression**, it scores each customer in real-time, predicts their **Customer Lifetime Value (CLV)**, and provides actionable retention recommendations — all through a sleek, interactive dashboard.

> **Supports 3 Industry Domains out of the box:**
> - 🎬 **Cinema / Streaming** — Netflix-style churn detection based on watch habits
> - ☁️ **SaaS** — B2B account churn using seat count, plan tier, and adoption signals
> - 📡 **Telecom** — Carrier churn using contract type, charges, and service features

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **AI Churn Prediction** | Real-time churn risk scoring (0–100%) powered by a soft-voting ensemble model |
| 💰 **CLV Forecasting** | Dynamic Customer Lifetime Value estimation based on predicted churn probability |
| 📊 **Deep Analytics Dashboard** | Domain-level churn trends, root cause analysis, watchlists, and stable customer lists |
| ⚡ **Bulk Playbook Execution** | Run AI-driven retention campaigns across thousands of customers in one click |
| 📋 **Retention Playbook Builder** | Create, edit, and toggle automated rules (e.g., "send discount if risk > 80%") |
| 🗄️ **Raw Database Explorer** | Browse the full customer dataset directly in the UI |
| 💹 **Financial Metrics View** | Track profit trends, revenue at risk, and month-over-month financial health |
| 🔐 **Secure Admin Login** | Password-protected access to the platform |
| 🕒 **Prediction History** | All predictions saved to SQLite with timestamps for audit and retraining |

---

## 🏗️ Architecture

```
customer_retention_engine/
├── backend/                    # FastAPI Python Backend
│   ├── app.py                  # Main API server (726 lines, 15+ endpoints)
│   ├── requirements.txt        # Python dependencies
│   ├── database.db             # SQLite — prediction history & playbook rules
│   └── ml_engine/
│       ├── train_models.py     # Model training script (XGBoost + LR Ensemble)
│       └── saved_models/       # Serialized .pkl pipelines (auto-generated)
│           ├── cinema_churn_pipeline.pkl
│           ├── saas_churn_pipeline.pkl
│           └── telco_churn_pipeline.pkl
│
├── frontend/                   # React + Vite Frontend
│   └── src/
│       ├── pages/
│       │   ├── Login.jsx       # Auth page
│       │   ├── Dashboard.jsx   # Prediction input + result card
│       │   ├── Analytics.jsx   # Deep analytics + watchlist
│       │   ├── Playbook.jsx    # Rule builder + bulk execution
│       │   ├── Database.jsx    # Raw data explorer
│       │   ├── Financials.jsx  # Revenue & CLV metrics
│       │   └── Settings.jsx    # App configuration
│       └── components/         # Shared UI components
│
└── data/                       # Training & analytics datasets
    ├── cinema_churn.csv
    ├── telco_churn.csv
    └── archive_4/
        └── ravenstack_accounts.csv   # SaaS dataset
=======
# RetenAI – Enterprise Customer Retention Engine

![Python](https://img.shields.io/badge/Python-3.x-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green)
![React](https://img.shields.io/badge/React-Frontend-61DAFB)
![XGBoost](https://img.shields.io/badge/XGBoost-ML-orange)
![SQLite](https://img.shields.io/badge/SQLite-Database-lightgrey)
![License](https://img.shields.io/badge/License-MIT-yellow)

## Overview

RetenAI is an enterprise-grade Customer Retention Engine that predicts customer churn risk across multiple business domains, including Streaming Services, SaaS Platforms, and Telecommunications.

The platform combines Machine Learning, Business Intelligence, and Retention Analytics to help organizations proactively identify at-risk customers and reduce revenue loss caused by customer churn.

By leveraging domain-specific ML models, real-time churn scoring, and retention playbooks, RetenAI enables businesses to make data-driven customer engagement decisions before customers leave.

---

## Problem Statement

Customer churn is one of the biggest challenges faced by subscription-based and service-oriented businesses. Acquiring new customers is significantly more expensive than retaining existing ones.

Organizations often struggle to:

* Identify customers likely to churn
* Understand customer risk patterns
* Prioritize retention efforts
* Quantify financial impact
* Take proactive intervention measures

RetenAI addresses these challenges through predictive analytics and retention intelligence.

---

## Key Features

### 🎯 Multi-Domain Churn Prediction

* Streaming (Cinema) churn prediction
* SaaS customer retention analysis
* Telecom customer churn forecasting
* Domain-specific prediction workflows

### 🤖 Machine Learning Engine

* Hybrid Soft-Voting Ensemble Architecture
* XGBoost Classifier
* Logistic Regression
* Scikit-Learn preprocessing pipelines
* Automated feature scaling and encoding
* Real-time churn probability scoring

### 📊 Interactive Analytics Dashboard

* Customer churn distribution
* Risk segmentation analysis
* Financial impact simulation
* Historical prediction insights
* Business performance metrics

### 🧠 Retention Intelligence

* Rule-based retention playbooks
* Customer risk categorization
* Automated retention recommendations
* Actionable intervention strategies

### 💾 Data Persistence

* SQLite3 database integration
* Prediction history tracking
* Retention playbook logging
* Audit-friendly records

---

## Technology Stack

### Frontend

* React
* JavaScript
* Recharts
* HTML5
* CSS3

### Backend

* FastAPI
* Python

### Machine Learning

* Scikit-Learn
* XGBoost
* Logistic Regression
* Pandas
* NumPy

### Database

* SQLite3

### Development Tools

* Git
* GitHub

---

## System Architecture

![Architecture Diagram](docs/architecture.png)

### Architecture Flow

```text
React Frontend
       │
       ▼
FastAPI Backend
       │
       ▼
Scikit-Learn Preprocessing Pipeline
       │
       ▼
Soft Voting Ensemble
(XGBoost + Logistic Regression)
       │
       ▼
Churn Prediction Engine
       │
       ▼
SQLite Database
       │
       ▼
Analytics Dashboard
```

---

## Machine Learning Workflow

### Data Processing

* Missing value handling
* Feature normalization
* Feature scaling
* Categorical feature encoding
* Data transformation pipelines

### Model Training

* Logistic Regression baseline model
* XGBoost classifier
* Hybrid Soft-Voting Ensemble

### Prediction Workflow

1. User uploads customer data.
2. Scikit-Learn preprocessing pipeline executes.
3. Ensemble model generates churn probability.
4. Risk categories are assigned.
5. Retention recommendations are generated.
6. Results are stored in SQLite.
7. Dashboard visualizations are updated.

---

## Model Performance

RetenAI uses domain-specific machine learning models optimized for different customer-retention datasets.

### 🎬 Cinema / Streaming Model

| Metric    | Score  |
| --------- | ------ |
| Accuracy  | 99.30% |
| Precision | 99.60% |
| Recall    | 99.00% |
| F1 Score  | 99.30% |
| ROC-AUC   | 0.9987 |

**Performance Summary**

The Streaming model achieves near-perfect classification performance with exceptional precision, recall, and ROC-AUC scores, indicating strong separation between churn and non-churn customers.

---

### ☁️ SaaS Model

| Metric    | Score  |
| --------- | ------ |
| Accuracy  | 84.00% |
| Precision | 60.00% |
| Recall    | 17.65% |
| F1 Score  | 27.27% |
| ROC-AUC   | 0.5790 |

**Performance Summary**

The SaaS dataset exhibits significant class imbalance with relatively few churn events. While recall is lower due to limited positive samples, RetenAI compensates through rule-based retention intelligence and business playbooks that proactively flag high-risk customers.

---

### 📡 Telecom Model

| Metric    | Score  |
| --------- | ------ |
| Accuracy  | 80.98% |
| Precision | 67.33% |
| Recall    | 54.69% |
| F1 Score  | 60.36% |
| ROC-AUC   | 0.8619 |

**Performance Summary**

The Telecom model demonstrates strong predictive capability with a balanced precision-recall tradeoff and a high ROC-AUC score, making it effective for real-world churn prediction scenarios.

---

## Dashboard Screenshots

### Dashboard Overview

![Dashboard](docs/screenshots/dashboard.png)

### Churn Prediction Results

![Prediction Results](docs/screenshots/predictions.png)

### Customer Risk Analysis

![Risk Analysis](docs/screenshots/risk-analysis.png)

### Financial Impact Analysis

![Financial Impact](docs/screenshots/financial-impact.png)

---

## Project Structure

```text
customer_retention_engine/

├── backend/
│   ├── api/
│   ├── database/
│   ├── models/
│   ├── services/
│   └── main.py
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── charts/
│
├── data/
│
├── docs/
│   ├── architecture.png
│   └── screenshots/
│       ├── dashboard.png
│       ├── predictions.png
│       ├── risk-analysis.png
│       └── financial-impact.png
│
└── README.md
>>>>>>> d774251095b45f9eae7fba459a72dbd0958e5e51
```

---

<<<<<<< HEAD
## 🤖 ML Model Details

Each domain has a dedicated **scikit-learn Pipeline** with:

- **Preprocessor:** `ColumnTransformer` with `StandardScaler` (numeric) + `OneHotEncoder` (categorical)
- **Classifier:** `VotingClassifier` (soft voting)
  - `XGBClassifier` — handles non-linear interactions
  - `LogisticRegression` — provides calibrated probability output

### Domain-Specific Features

| Domain | Key Features |
|---|---|
| 🎬 Cinema | `age`, `watch_hours`, `last_login_days`, `avg_watch_time_per_day`, `subscription_type`, `device`, `favorite_genre` |
| ☁️ SaaS | `seats`, `industry`, `country`, `plan_tier`, `is_trial`, `referral_source` |
| 📡 Telco | `tenure`, `MonthlyCharges`, `TotalCharges`, `Contract`, `InternetService`, `PaymentMethod` + 12 service flags |

### 📈 Model Performance Metrics

> Evaluated on a held-out **20% test split** (random_state=42) using the same preprocessing pipeline used in production.

#### 🎬 Cinema / Streaming Model

| Metric    | Score   |
| --------- | ------- |
| Accuracy  | 99.30%  |
| Precision | 99.60%  |
| Recall    | 99.00%  |
| F1 Score  | 99.30%  |
| ROC-AUC   | 0.9987  |

#### ☁️ SaaS Model

| Metric    | Score   |
| --------- | ------- |
| Accuracy  | 84.00%  |
| Precision | 60.00%  |
| Recall    | 17.65%  |
| F1 Score  | 27.27%  |
| ROC-AUC   | 0.5790  |

> ℹ️ The SaaS dataset (RavenStack) is highly imbalanced — very few true churns — which explains the lower Recall and F1. The business-rule override layer in the API compensates for this at prediction time.

#### 📡 Telecom Model

| Metric    | Score   |
| --------- | ------- |
| Accuracy  | 80.98%  |
| Precision | 67.33%  |
| Recall    | 54.69%  |
| F1 Score  | 60.36%  |
| ROC-AUC   | 0.8619  |

---

## 🚀 Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- npm

---

### 1. Clone the Repository

```bash
git clone https://github.com/Kowsalya-S-cse/Reten-Ai---Customer-Retention-Engine.git
cd Reten-Ai---Customer-Retention-Engine
```

---

### 2. Backend Setup
=======
## Installation

### Clone Repository

```bash
git clone https://github.com/Kowsalya-S-cse/Reten-Ai---Customer-Retention-Engine.git

cd Reten-Ai---Customer-Retention-Engine
```

### Backend Setup
>>>>>>> d774251095b45f9eae7fba459a72dbd0958e5e51

```bash
cd backend

<<<<<<< HEAD
# Create and activate a virtual environment
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS / Linux
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
=======
python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend API:

```text
http://localhost:8000
>>>>>>> d774251095b45f9eae7fba459a72dbd0958e5e51
```

---

<<<<<<< HEAD
### 3. Train the ML Models

> ⚠️ **You must train the models before starting the API server.**

```bash
# From the backend/ directory
python ml_engine/train_models.py
```

This will generate three model pipelines inside `backend/ml_engine/saved_models/`:
- `cinema_churn_pipeline.pkl`
- `saas_churn_pipeline.pkl`
- `telco_churn_pipeline.pkl`

---

### 4. Start the Backend Server

```bash
# From the backend/ directory
python app.py
```

The API will be live at: **`http://127.0.0.1:8000`**  
Interactive API docs: **`http://127.0.0.1:8000/docs`**

---

### 5. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will be live at: **`http://localhost:5173`**

---

### 6. Login

Use these demo credentials to access the platform:

| Field | Value |
|---|---|
| Username | `admin` |
| Password | `password` |

---

## 📡 API Reference

### Core Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Health check — confirms all domains are active |
| `POST` | `/login` | Authenticate as admin |
| `POST` | `/predict/cinema` | Run churn prediction for a streaming customer |
| `POST` | `/predict/saas` | Run churn prediction for a SaaS account |
| `POST` | `/predict/telco` | Run churn prediction for a telecom subscriber |

### Analytics & Data

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/analytics/{domain}` | Full analytics: watchlist, root causes, chart data, financials |
| `GET` | `/api/accounts/{domain}` | Sample account list for the prediction form dropdown |
| `GET` | `/api/database/{domain}` | Raw dataset preview (first 100 rows) |
| `GET` | `/api/prediction_history/{domain}` | All past predictions from SQLite |

### Playbook Rules

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/rules/{domain}` | Get all retention rules for a domain |
| `POST` | `/api/rules` | Create a new retention rule |
| `PUT` | `/api/rules/{rule_id}` | Update an existing rule |
| `POST` | `/api/playbook/execute/{domain}` | Bulk-execute active playbook against all at-risk customers |

> 📖 Full interactive documentation available at `/docs` (Swagger UI) when the server is running.

---

## 📦 Tech Stack

### Backend
| Package | Purpose |
|---|---|
| `FastAPI` | High-performance async REST API framework |
| `Uvicorn` | ASGI server |
| `scikit-learn` | ML pipelines, preprocessing, Logistic Regression |
| `XGBoost` | Gradient boosted trees classifier |
| `pandas` | Data ingestion & feature engineering |
| `joblib` | Model serialization |
| `SQLite` | Lightweight prediction history & rules storage |

### Frontend
| Package | Purpose |
|---|---|
| `React 19` | UI component framework |
| `Vite 8` | Next-generation build tool |
| `React Router v7` | Client-side routing |
| `Recharts` | Data visualization charts |
| `Framer Motion` | Smooth page & component animations |
| `Lucide React` | Icon system |
| `Axios` | HTTP client for API calls |

---

## 📊 Datasets

| Dataset | Domain | Source |
|---|---|---|
| `cinema_churn.csv` | Streaming | Synthetic cinema/streaming subscriber data |
| `telco_churn.csv` | Telecom | IBM Telco Customer Churn (Kaggle) |
| `ravenstack_accounts.csv` | SaaS | RavenStack B2B SaaS account data |

---

## 🗺️ Roadmap

- [ ] 🔑 JWT-based authentication with role management
- [ ] 📧 SendGrid / Twilio integration for real action triggers
- [ ] 🧪 A/B test tracking for retention campaign effectiveness
- [ ] 📈 SHAP values for model explainability
- [ ] 🌐 Multi-tenant support for agency/enterprise use
- [ ] 🐳 Docker Compose deployment setup

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

Made with ❤️ by **Kowsalya S**

⭐ Star this repo if you find it useful!

</div>
=======
### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend Application:

```text
http://localhost:5173
```

---

## API Endpoints

| Method | Endpoint | Description                 |
| ------ | -------- | --------------------------- |
| POST   | /predict | Generate churn prediction   |
| GET    | /history | Retrieve prediction history |
| GET    | /health  | Health check endpoint       |

---

## Business Impact

RetenAI helps organizations:

* Reduce customer churn
* Improve customer retention rates
* Increase customer lifetime value
* Minimize revenue loss
* Prioritize customer engagement efforts
* Support data-driven business decisions

---

## Future Enhancements

* Real-time streaming predictions
* Cloud deployment (AWS/Azure)
* Customer sentiment analysis
* LLM-powered retention recommendations
* Automated retention campaigns
* Advanced ensemble learning models
* Enterprise multi-tenant architecture

---

## Live Demo

### Frontend

Coming Soon

### Backend API

Coming Soon

---

## Author

**Kowsalya S**

GitHub: https://github.com/Kowsalya-S-cse

---

## License

This project is licensed under the MIT License.

---

⭐ If you found this project useful, consider giving it a star on GitHub.
>>>>>>> d774251095b45f9eae7fba459a72dbd0958e5e51
