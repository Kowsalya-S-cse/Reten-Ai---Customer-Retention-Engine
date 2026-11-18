from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import os

app = FastAPI(title="Universal Subscription Retention API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UniversalCustomerData(BaseModel):
    subscription_duration_months: int
    monthly_cost: float
    billing_cycle: str
    engagement_score: int
    last_active_days_ago: int

class PredictionResponse(BaseModel):
    churn_risk_percentage: float
    clv_prediction: str
    recommendation: str

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'ml_engine', 'saved_models', 'churn_pipeline.pkl')

pipeline = None
if os.path.exists(MODEL_PATH):
    pipeline = joblib.load(MODEL_PATH)
else:
    print("WARNING: ML Pipeline not found. Run train_models.py to train the Universal Model.")

@app.get("/health")
def health():
    return {"status": "Universal Engine is Live"}

@app.post("/predict", response_model=PredictionResponse)
def predict_churn(data: UniversalCustomerData):
    if not pipeline:
        return {
            "churn_risk_percentage": 0.0,
            "clv_prediction": "$0",
            "recommendation": "Engine not trained."
        }
        
    df_input = pd.DataFrame([{
        'subscription_duration_months': data.subscription_duration_months,
        'monthly_cost': data.monthly_cost,
        'billing_cycle': data.billing_cycle,
        'engagement_score': data.engagement_score,
        'last_active_days_ago': data.last_active_days_ago
    }])
    
    probability = pipeline.predict_proba(df_input)[0][1] * 100
    clv = data.monthly_cost * 12 * (3 if data.billing_cycle == 'Annual' else 1)
    
    if data.last_active_days_ago > 30 and probability > 70:
        rec = "Critical Inactivity: Send 'We Miss You' 50% comeback offer immediately to revive engagement."
    elif data.engagement_score < 40 and probability > 50:
        rec = "Low Engagement: Send push notifications highlighting personalized content algorithms."
    elif probability > 40:
        rec = "Medium Risk: Offer a 10% discount on the next billing cycle."
    else:
        rec = "Low Risk: Prime candidate for an Annual Subscription/Premium Tier upsell."
        
    return {
        "churn_risk_percentage": float(round(float(probability), 1)),
        "clv_prediction": f"${float(clv):,.2f}",
        "recommendation": rec
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
