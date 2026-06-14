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
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Kowsalya-S-cse/Reten-Ai---Customer-Retention-Engine.git

cd Reten-Ai---Customer-Retention-Engine
```

### Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend API:

```text
http://localhost:8000
```

---

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
