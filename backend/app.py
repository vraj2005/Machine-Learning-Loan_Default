from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import os

app = Flask(__name__)
CORS(app)

MODEL_PATH = os.path.join("Model", "pipeline.joblib")
pipeline = joblib.load(MODEL_PATH)

# Expected column order
EXPECTED_COLUMNS = pipeline.feature_names_in_

# Home Route
@app.route("/")
def home():
    return jsonify({"message": "Loan Default Prediction API Running"})


# Prediction Route
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json

        # Convert JSON to DataFrame
        df = pd.DataFrame([data])

        # Ensure all expected columns exist
        for col in EXPECTED_COLUMNS:
            if col not in df.columns:
                df[col] = 0

        # Ensure correct order
        df = df[EXPECTED_COLUMNS]

        # Convert boolean → numeric
        df = df.astype(float)

        # Model prediction
        prediction = pipeline.predict(df)[0]
        probability = pipeline.predict_proba(df)[0][1]

        # Risk Level Calculation
        prob_percent = float(probability) * 100
        if prob_percent < 10:
            risk_level = "Very Low Risk"
        elif prob_percent < 20:
            risk_level = "Low Risk"
        elif prob_percent < 35:
            risk_level = "Moderate Risk"
        elif prob_percent < 50:
            risk_level = "High Risk"
        else:
            risk_level = "Very High Risk"

        return jsonify({
            "prediction": int(prediction),
            "probability": round(float(probability), 4),
            "risk_level": risk_level
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 400


# Run Server
if __name__ == "__main__":
    app.run(debug=True)