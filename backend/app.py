from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import os

app = Flask(__name__)
CORS(app)

MODEL_PATH = os.path.join("model", "pipeline.joblib")
pipeline = joblib.load(MODEL_PATH)

# Get expected feature order from pipeline
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
        # Convert input JSON to DataFrame
        df = pd.DataFrame([data])
        # Ensure all expected columns exist
        for col in EXPECTED_COLUMNS:
            if col not in df.columns:
                df[col] = 0
        # Ensure correct column order
        df = df[EXPECTED_COLUMNS]
        # Convert boolean to int (important)
        df = df.astype(float)

        # Make prediction
        prediction = pipeline.predict(df)[0]
        probability = pipeline.predict_proba(df)[0][1]

        return jsonify({
            "prediction": int(prediction),
            "probability": round(float(probability), 4)
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 400

# Run Server
if __name__ == "__main__":
    app.run(debug=True)