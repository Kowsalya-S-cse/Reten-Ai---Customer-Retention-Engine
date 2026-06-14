import os
import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score,
    f1_score, roc_auc_score
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(os.path.dirname(BASE_DIR), 'data')
MODEL_DIR = os.path.join(BASE_DIR, 'ml_engine', 'saved_models')

def print_metrics(domain, y_test, y_pred, y_prob):
    acc  = accuracy_score(y_test, y_pred)  * 100
    prec = precision_score(y_test, y_pred, zero_division=0) * 100
    rec  = recall_score(y_test, y_pred,    zero_division=0) * 100
    f1   = f1_score(y_test, y_pred,        zero_division=0) * 100
    auc  = roc_auc_score(y_test, y_prob)

    print(f"\n{'='*50}")
    print(f"  {domain.upper()} MODEL METRICS")
    print(f"{'='*50}")
    print(f"  Accuracy  : {acc:.2f}%")
    print(f"  Precision : {prec:.2f}%")
    print(f"  Recall    : {rec:.2f}%")
    print(f"  F1 Score  : {f1:.2f}%")
    print(f"  ROC-AUC   : {auc:.4f}")
    print(f"{'='*50}")

# ── CINEMA ──────────────────────────────────────────────
def eval_cinema():
    path = os.path.join(DATA_DIR, 'cinema_churn.csv')
    model_path = os.path.join(MODEL_DIR, 'cinema_churn_pipeline.pkl')
    if not os.path.exists(model_path):
        print("[cinema] Model not found — skipping."); return

    df = pd.read_csv(path)
    numeric_features   = ['age','watch_hours','last_login_days','monthly_fee','number_of_profiles','avg_watch_time_per_day']
    categorical_features = ['gender','subscription_type','device','payment_method','favorite_genre']
    X = df[numeric_features + categorical_features]
    y = df['churned']

    _, X_test, _, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    clf = joblib.load(model_path)
    y_pred = clf.predict(X_test)
    y_prob = clf.predict_proba(X_test)[:, 1]
    print_metrics("Cinema / Streaming", y_test, y_pred, y_prob)

# ── SaaS ────────────────────────────────────────────────
def eval_saas():
    path = os.path.join(DATA_DIR, 'archive_4', 'ravenstack_accounts.csv')
    model_path = os.path.join(MODEL_DIR, 'saas_churn_pipeline.pkl')
    if not os.path.exists(model_path):
        print("[saas] Model not found — skipping."); return

    df = pd.read_csv(path)
    df['is_trial'] = df['is_trial'].astype(str)
    numeric_features     = ['seats']
    categorical_features = ['industry','country','referral_source','plan_tier','is_trial']
    X = df[numeric_features + categorical_features]
    y = df['churn_flag']

    _, X_test, _, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    clf = joblib.load(model_path)
    y_pred = clf.predict(X_test)
    y_prob = clf.predict_proba(X_test)[:, 1]
    print_metrics("SaaS", y_test, y_pred, y_prob)

# ── TELCO ───────────────────────────────────────────────
def eval_telco():
    path = os.path.join(DATA_DIR, 'telco_churn.csv')
    model_path = os.path.join(MODEL_DIR, 'telco_churn_pipeline.pkl')
    if not os.path.exists(model_path):
        print("[telco] Model not found — skipping."); return

    df = pd.read_csv(path)
    df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce').fillna(0)
    y = df['Churn'].map({'Yes': 1, 'No': 0})
    numeric_features     = ['tenure','MonthlyCharges','TotalCharges']
    categorical_features = ['gender','SeniorCitizen','Partner','Dependents','PhoneService',
                            'MultipleLines','InternetService','OnlineSecurity','OnlineBackup',
                            'DeviceProtection','TechSupport','StreamingTV','StreamingMovies',
                            'Contract','PaperlessBilling','PaymentMethod']
    X = df[numeric_features + categorical_features]

    _, X_test, _, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    clf = joblib.load(model_path)
    y_pred = clf.predict(X_test)
    y_prob = clf.predict_proba(X_test)[:, 1]
    print_metrics("Telecom", y_test, y_pred, y_prob)

if __name__ == "__main__":
    eval_cinema()
    eval_saas()
    eval_telco()
