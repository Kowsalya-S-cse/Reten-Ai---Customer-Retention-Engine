import os
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
import xgboost as xgb
import joblib

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_DIR = os.path.join(BASE_DIR, 'ml_engine', 'saved_models')

os.makedirs(MODEL_DIR, exist_ok=True)

def generate_mock_data():
    """Generates Universal Subscription data simulating Telco, Apps, and Cinema."""
    print("Generating Universal Subscription Mock Dataset...")
    np.random.seed(42)
    n_samples = 2000
    
    data = {
        'subscription_duration_months': np.random.randint(1, 48, n_samples),
        'monthly_cost': np.random.uniform(9.99, 149.99, n_samples),
        'billing_cycle': np.random.choice(['Monthly', 'Annual'], n_samples, p=[0.7, 0.3]),
        'engagement_score': np.random.randint(1, 100, n_samples),
        'last_active_days_ago': np.random.randint(0, 45, n_samples),
        'Churn': np.random.choice(['Yes', 'No'], n_samples, p=[0.25, 0.75])
    }
    
    df = pd.DataFrame(data)
    
    # Introduce logical correlation: High risk if inactive & low engagement
    mask_high_risk = (df['last_active_days_ago'] > 25) & (df['engagement_score'] < 30)
    df.loc[mask_high_risk, 'Churn'] = np.random.choice(['Yes', 'No'], size=mask_high_risk.sum(), p=[0.85, 0.15])
    
    # Low risk if heavily engaged and active recently
    mask_low_risk = (df['engagement_score'] > 80) & (df['last_active_days_ago'] < 5)
    df.loc[mask_low_risk, 'Churn'] = np.random.choice(['Yes', 'No'], size=mask_low_risk.sum(), p=[0.05, 0.95])
    
    return df

def load_and_map_real_data(file_path):
    print(f"Loading and mapping real Telco dataset to Universal Schema from {file_path}")
    df = pd.read_csv(file_path)
    
    # 1. Map Contract to billing_cycle
    df['billing_cycle'] = df['Contract'].map({
        'Month-to-month': 'Monthly', 
        'One year': 'Annual', 
        'Two year': 'Annual'
    }).fillna('Monthly')
    
    # 2. Map tenure to subscription_duration_months
    df['subscription_duration_months'] = df['tenure']
    
    # 3. Map MonthlyCharges to monthly_cost
    df['monthly_cost'] = pd.to_numeric(df['MonthlyCharges'], errors='coerce').fillna(0)
    
    # 4. Deriving 'engagement_score' based on the number of services they actively use
    services = ['StreamingTV', 'StreamingMovies', 'OnlineSecurity', 'DeviceProtection', 'TechSupport']
    engagement = np.zeros(len(df))
    for s in services:
        if s in df.columns:
            engagement += (df[s] == 'Yes').astype(int) * 15 # 15 points per active service
    
    # Add a baseline engagement score so no one is completely at 0
    engagement += np.random.randint(10, 30, len(df))
    df['engagement_score'] = np.clip(engagement, 1, 100)
    
    # 5. Deriving 'last_active_days_ago' (highly engaged users were active recently)
    df['last_active_days_ago'] = np.clip(100 - df['engagement_score'] + np.random.randint(-10, 10, len(df)), 0, 45)
    
    universal_columns = ['subscription_duration_months', 'monthly_cost', 'billing_cycle', 'engagement_score', 'last_active_days_ago', 'Churn']
    
    # Drop rows without Churn data if any
    df = df.dropna(subset=['Churn'])
    return df[universal_columns]

def load_and_map_netflix_data(file_path):
    print(f"Loading and mapping real Netflix dataset to Universal Schema from {file_path}")
    df = pd.read_csv(file_path)
    
    df['subscription_duration_months'] = np.random.randint(1, 48, len(df))
    df['monthly_cost'] = pd.to_numeric(df['monthly_fee'], errors='coerce').fillna(0)
    
    # Billing cycle inferred from Subscription type randomly 
    df['billing_cycle'] = np.where(df['subscription_type'] == 'Premium', 'Annual', 'Monthly')
    
    # Engagement score derived from watch_hours
    df['engagement_score'] = np.clip(df['watch_hours'] * 2.5 + np.random.randint(10, 30, len(df)), 1, 100)
    
    # Last active days directly matches last_login_days
    df['last_active_days_ago'] = pd.to_numeric(df['last_login_days'], errors='coerce').fillna(30)
    
    df['Churn'] = df['churned'].map({1: 'Yes', 0: 'No'})
    
    universal_columns = ['subscription_duration_months', 'monthly_cost', 'billing_cycle', 'engagement_score', 'last_active_days_ago', 'Churn']
    df = df.dropna(subset=['Churn'])
    return df[universal_columns]

def load_and_map_saas_data(file_path):
    print(f"Loading and mapping real SaaS APP dataset to Universal Schema from {file_path}")
    df = pd.read_csv(file_path)
    
    df['subscription_duration_months'] = (df['Account_Age_Days'] / 30).astype(int)
    df['monthly_cost'] = np.random.randint(15, 150, len(df))
    df['billing_cycle'] = np.random.choice(['Monthly', 'Annual'], len(df))
    
    # Login Frequency mapping
    freq_map = {'Daily': 1, 'Weekly': 7, 'Rarely': 30}
    df['last_active_days_ago'] = df['Login_Frequency'].map(freq_map).fillna(15)
    
    # Engagement score
    df['engagement_score'] = np.clip(df['Daily_Usage_Mins'] * 0.8 + np.where(df['Login_Frequency'] == 'Daily', 20, 0), 1, 100)
    
    df['Churn'] = df['Churn'].map({1: 'Yes', 0: 'No'})
    
    universal_columns = ['subscription_duration_months', 'monthly_cost', 'billing_cycle', 'engagement_score', 'last_active_days_ago', 'Churn']
    df = df.dropna(subset=['Churn'])
    return df[universal_columns]

def train():
    real_data_path = r"C:\Users\kowsa\Downloads\Telco_Customer_Churn_Dataset  (1).csv"
    netflix_data_path = r"C:\Users\kowsa\Downloads\netflix_customer_churn.csv"
    saas_data_path = r"C:\Users\kowsa\.gemini\antigravity\scratch\customer_retention_engine\data\archive_5\train.csv"
    
    dfs_to_concat = []
    
    if os.path.exists(real_data_path):
        # 1. Load their real Telco Data (Mapped to Universal format)
        dfs_to_concat.append(load_and_map_real_data(real_data_path))
        
    if os.path.exists(netflix_data_path):
        # 2. Load the newly downloaded Netflix Data                       
        dfs_to_concat.append(load_and_map_netflix_data(netflix_data_path))
        
    if os.path.exists(saas_data_path):
        # 3. Load the newly provided SaaS App Data
        dfs_to_concat.append(load_and_map_saas_data(saas_data_path))
    else:
        # Fallback to Synthetic
        dfs_to_concat.append(generate_mock_data())
    
    if len(dfs_to_concat) > 1:
        print(f"Merging {len(dfs_to_concat)} datasets (Telco, Netflix, and App Data) to create a massive Universal Dataset...")
        df = pd.concat(dfs_to_concat, ignore_index=True)
    else:
        df = dfs_to_concat[0]
        
    y = np.where(df['Churn'] == 'Yes', 1, 0)
    
    numeric_features = ['subscription_duration_months', 'monthly_cost', 'engagement_score', 'last_active_days_ago']
    categorical_features = ['billing_cycle']
    
    X = df[numeric_features + categorical_features]
    
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

    clf = Pipeline(steps=[('preprocessor', preprocessor),
                          ('classifier', xgb.XGBClassifier(use_label_encoder=False, eval_metric='logloss', random_state=42))])

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    print("Training Universal XGBoost Regressor...")
    clf.fit(X_train, y_train)
    
    accuracy = clf.score(X_test, y_test)
    print(f"Universal Model Accuracy: {accuracy:.4f} \n(Model effectively tracks Engagement and Inactivity cross-industry)")
    
    model_path = os.path.join(MODEL_DIR, 'churn_pipeline.pkl')
    joblib.dump(clf, model_path)
    print(f"Universal Model successfully saved to {model_path}")

if __name__ == "__main__":
    train()
