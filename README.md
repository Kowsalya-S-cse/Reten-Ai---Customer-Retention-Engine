# 📊 Reten-AI — Enterprise Customer Retention Engine

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6.0+-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-1.4+-F7931E?logo=scikit-learn&logoColor=white)](https://scikit-learn.org)
[![Video Demo](https://img.shields.io/badge/Video_Demo-Google_Drive-4285F4?logo=googledrive&logoColor=white)](https://drive.google.com/file/d/1PNiRrq6li9pjnGoxqZ6LZfr9AHPqsvdR/view?usp=drivesdk)

**Reten-AI** is a multi-domain, machine learning-powered customer churn prediction and retention engine built for **Cinema/Streaming**, **SaaS/Apps**, and **Telecom** enterprise ecosystems. It combines soft-voting ensemble ML models, automated Customer Lifetime Value (CLV) estimation, and actionable retention playbooks into an interactive analytics dashboard.

> 🎥 **Video Demonstration:** [Watch the Full Project Walkthrough on Google Drive](https://drive.google.com/file/d/1PNiRrq6li9pjnGoxqZ6LZfr9AHPqsvdR/view?usp=drivesdk)

---

## 🎥 Video Demonstration

Click below to watch the complete end-to-end video demonstration of Reten-AI:
- **[▶ Watch Reten-AI Demo Video on Google Drive](https://drive.google.com/file/d/1PNiRrq6li9pjnGoxqZ6LZfr9AHPqsvdR/view?usp=drivesdk)**

The video demonstrates:
1. Cross-industry selector (Cinema/Netflix, SaaS/Apps, Telecom).
2. Dynamic feature adjustment: subscription duration, monthly plan cost, billing cycle, engagement score, and days since last active.
3. Real-time Churn Risk classification (**Low, Medium, High**).
4. Automated Customer Lifetime Value (CLV) predictions and customized retention playbooks.

---

## 🏛️ System Architecture

```
+---------------------------------------------------------------------------------+
|                              1. REACT + VITE FRONTEND                           |
|   - Multi-Domain Switcher (Cinema/Streaming, SaaS/Apps, Telecom)                |
|   - Real-Time Churn Risk & CLV Dashboard (Recharts + Lucide Icons)              |
|   - Client-Side Fallback Engine for 100% Offline/Cloud Portfolio Access         |
+---------------------------------------------------------------------------------+
                                       ▲
                                       │ (REST / JSON / CORS)
                                       ▼
+---------------------------------------------------------------------------------+
|                              2. FASTAPI BACKEND API                             |
|   - Endpoint: POST /predict                                                     |
|   - Pydantic Data Validation & Serialization                                    |
|   - Scikit-Learn & Joblib Model Inference Pipeline                              |
+---------------------------------------------------------------------------------+
                                       ▲
                                       │ (Serialized ML Model)
                                       ▼
+---------------------------------------------------------------------------------+
|                       3. MACHINE LEARNING ENSEMBLE ENGINE                       |
|   - Hybrid Soft-Voting Classifier: XGBoost + Logistic Regression                |
|   - Feature Scaling, Imputation & Categorical Encoding Pipeline                 |
|   - Automated Risk Tiers (Low < 35%, Medium 35-65%, High > 65%)                 |
+---------------------------------------------------------------------------------+
```

---

## ⚙️ Quick Start Guide

### 1. Start the FastAPI Backend
```bash
cd backend
python -m venv .venv
# Windows:
.venv\Scripts\activate
# Mac/Linux:
# source .venv/bin/activate

pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```
Backend API will run at `http://localhost:8000`. Swagger API docs available at `http://localhost:8000/docs`.

### 2. Start the React Frontend
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
