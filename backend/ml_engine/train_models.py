import os
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.ensemble import VotingClassifier
from sklearn.linear_model import LogisticRegression
import xgboost as xgb
import joblib

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(os.path.dirname(BASE_DIR), 'data')
MODEL_DIR = os.path.join(BASE_DIR, 'ml_engine', 'saved_models')

os.makedirs(MODEL_DIR, exist_ok=True)

def train_cinema_model():
    print("Initializing Streaming Platform Retention Model Training...")
    
    cinema_data_path = os.path.join(DATA_DIR, 'cinema_churn.csv')
    
    if not os.path.exists(cinema_data_path):
        print(f"ERROR: Dataset not found at {cinema_data_path}")
        return

    print(f"Loading data from {cinema_data_path}")
    df = pd.read_csv(cinema_data_path)
    
    # Target variable
    y = df['churned']
    
    # Features
    numeric_features = [
        'age', 
        'watch_hours', 
        'last_login_days', 
        'monthly_fee', 
        'number_of_profiles', 
        'avg_watch_time_per_day'
    ]
    
    categorical_features = [
        'gender', 
        'subscription_type', 
        'device', 
        'payment_method', 
        'favorite_genre'
    ]
    
    X = df[numeric_features + categorical_features]
    
    # Preprocessing pipelines
    numeric_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='median')),
        ('scaler', StandardScaler())
    ])

    categorical_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='most_frequent')),
        ('onehot', OneHotEncoder(handle_unknown='ignore'))
    ])

    preprocessor = ColumnTransformer(
        transformers=[
            ('num', numeric_transformer, numeric_features),
            ('cat', categorical_transformer, categorical_features)
        ])

    # Hybrid Ensemble Model (XGBoost + Logistic Regression)
    xgb_clf = xgb.XGBClassifier(use_label_encoder=False, eval_metric='logloss', random_state=42)
    lr_clf = LogisticRegression(max_iter=1000, random_state=42)
    
    ensemble_clf = VotingClassifier(
        estimators=[('xgb', xgb_clf), ('lr', lr_clf)],
        voting='soft'
    )

    clf = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('classifier', ensemble_clf)
    ])

    # Train/Test Split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    print("Training XGBoost Classifier on Streaming Data...")
    clf.fit(X_train, y_train)
    
    accuracy = clf.score(X_test, y_test)
    print(f"Streaming Model Accuracy: {accuracy:.4f}")
    
    # Save the model
    model_path = os.path.join(MODEL_DIR, 'cinema_churn_pipeline.pkl')
    joblib.dump(clf, model_path)
    print(f"Model successfully saved to {model_path}")

def train_saas_model():
    print("Initializing SaaS Retention Model Training...")
    saas_data_path = os.path.join(DATA_DIR, 'archive_4', 'ravenstack_accounts.csv')
    if not os.path.exists(saas_data_path):
        print(f"ERROR: Dataset not found at {saas_data_path}")
        return

    df = pd.read_csv(saas_data_path)
    y = df['churn_flag']
    numeric_features = ['seats']
    categorical_features = ['industry', 'country', 'referral_source', 'plan_tier', 'is_trial']
    
    # Preprocessing
    df['is_trial'] = df['is_trial'].astype(str)
    X = df[numeric_features + categorical_features]

    numeric_transformer = Pipeline(steps=[('imputer', SimpleImputer(strategy='median')), ('scaler', StandardScaler())])
    categorical_transformer = Pipeline(steps=[('imputer', SimpleImputer(strategy='most_frequent')), ('onehot', OneHotEncoder(handle_unknown='ignore'))])
    preprocessor = ColumnTransformer(transformers=[('num', numeric_transformer, numeric_features), ('cat', categorical_transformer, categorical_features)])

    ensemble_clf = VotingClassifier(estimators=[
        ('xgb', xgb.XGBClassifier(use_label_encoder=False, eval_metric='logloss', random_state=42)),
        ('lr', LogisticRegression(max_iter=1000, random_state=42))
    ], voting='soft')

    clf = Pipeline(steps=[('preprocessor', preprocessor), ('classifier', ensemble_clf)])
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    clf.fit(X_train, y_train)
    print(f"SaaS Model Accuracy: {clf.score(X_test, y_test):.4f}")
    
    joblib.dump(clf, os.path.join(MODEL_DIR, 'saas_churn_pipeline.pkl'))
    print("SaaS Model saved successfully.")

def train_telco_model():
    print("Initializing Telco Retention Model Training...")
    telco_data_path = os.path.join(DATA_DIR, 'telco_churn.csv')
    if not os.path.exists(telco_data_path):
        print(f"ERROR: Dataset not found at {telco_data_path}")
        return

    df = pd.read_csv(telco_data_path)
    
    # Fix TotalCharges
    df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce')
    df['TotalCharges'] = df['TotalCharges'].fillna(0)
    
    # Fix target
    y = df['Churn'].map({'Yes': 1, 'No': 0})
    
    numeric_features = ['tenure', 'MonthlyCharges', 'TotalCharges']
    categorical_features = ['gender', 'SeniorCitizen', 'Partner', 'Dependents', 'PhoneService', 'MultipleLines', 'InternetService', 'OnlineSecurity', 'OnlineBackup', 'DeviceProtection', 'TechSupport', 'StreamingTV', 'StreamingMovies', 'Contract', 'PaperlessBilling', 'PaymentMethod']
    
    X = df[numeric_features + categorical_features]

    numeric_transformer = Pipeline(steps=[('imputer', SimpleImputer(strategy='median')), ('scaler', StandardScaler())])
    categorical_transformer = Pipeline(steps=[('imputer', SimpleImputer(strategy='most_frequent')), ('onehot', OneHotEncoder(handle_unknown='ignore'))])
    preprocessor = ColumnTransformer(transformers=[('num', numeric_transformer, numeric_features), ('cat', categorical_transformer, categorical_features)])

    ensemble_clf = VotingClassifier(estimators=[
        ('xgb', xgb.XGBClassifier(use_label_encoder=False, eval_metric='logloss', random_state=42)),
        ('lr', LogisticRegression(max_iter=1000, random_state=42))
    ], voting='soft')

    clf = Pipeline(steps=[('preprocessor', preprocessor), ('classifier', ensemble_clf)])
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    clf.fit(X_train, y_train)
    print(f"Telco Model Accuracy: {clf.score(X_test, y_test):.4f}")
    
    joblib.dump(clf, os.path.join(MODEL_DIR, 'telco_churn_pipeline.pkl'))
    print("Telco Model saved successfully.")

if __name__ == "__main__":
    train_cinema_model()
    train_saas_model()
    train_telco_model()
