# Loan Default Prediction using Machine Learning

## 📌 Project Overview

This project is an **end-to-end Machine Learning application** that predicts whether a customer will **default on a loan** based on financial, demographic, and loan-related attributes.

The project follows a **complete ML lifecycle**, including data exploration, preprocessing, model building (including one model implemented from scratch), evaluation, and deployment using a **Flask web application** with a user-friendly interface.

---

## 🎯 Problem Statement

Loan default prediction is a critical task in the financial sector.
The objective of this project is to **classify loan applicants as defaulters or non-defaulters** using historical data, helping financial institutions reduce risk and make informed lending decisions.

---

## 📂 Dataset Description

* **Dataset Name:** Loan Default Dataset
* **Total Records:** 255,347
* **Total Features:** 18 (before preprocessing)
* **Target Variable:** `Default`

  * `0` → No Default
  * `1` → Default

### Feature Types:

* **Numerical:** Age, Income, LoanAmount, CreditScore, InterestRate, etc.
* **Categorical:** Education, EmploymentType, MaritalStatus, LoanPurpose
* **Binary:** HasMortgage, HasDependents, HasCoSigner

The dataset is **imbalanced**, with approximately **11.6% default cases**, making it suitable for advanced evaluation metrics.

---

## 🛠️ Technologies Used

* **Programming Language:** Python
* **Libraries:**

  * NumPy
  * Pandas
  * Matplotlib
  * Seaborn
  * Scikit-learn
  * Joblib
* **Backend Framework:** Flask
* **Frontend:** React, Tailwind Css
* **Development Environment:** Jupyter Notebook, VS Code

---

## 🧠 Project Workflow

### 1️⃣ Data Exploration

* Loaded dataset and analyzed structure
* Identified target variable and feature types
* Checked class distribution and data quality

### 2️⃣ Data Preprocessing

* Removed irrelevant columns (LoanID)
* Converted binary categorical values to numerical form
* Applied One-Hot Encoding on categorical features
* Scaled numerical features using `StandardScaler`
* Performed stratified train-test split to handle class imbalance

### 3️⃣ Model Building

* **From Scratch Implementation:**

  * Logistic Regression using NumPy and Gradient Descent
* **Library-Based Models:**

  * Logistic Regression (Scikit-learn)
  * Random Forest Classifier

### 4️⃣ Model Evaluation

* Evaluated models using:

  * Accuracy
  * Precision
  * Recall
  * F1-score
  * Confusion Matrix
  * ROC-AUC Curve
* Compared performance to select the best model

### 5️⃣ Model Deployment

* Saved trained model and scaler using `joblib`
* Built a Flask web application
* Created a user interface for entering loan details
* Displayed prediction results and probabilities

---

## 🧩 Project Structure

```
ml-loan-default/
│
├── notebooks/
│   ├── 1_exploration.ipynb
│   ├── 2_preprocessing_eda.ipynb
│   ├── 3_model_from_scratch.ipynb
│   ├── 4_sklearn_models.ipynb
│   └── 5_evaluation_visuals.ipynb
│
├── model/
│   ├── model.pkl
│   └── scaler.pkl
│
├── app/
│   ├── app.py
│   ├── templates/
│   │   ├── index.html
│   │   └── result.html
│   └── static/
│       ├── css/
│       └── js/
│
├── data/
│   ├── raw.csv
│   └── clean.csv
│
├── requirements.txt
└── README.md
```

---

## ▶️ How to Run the Project Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/loan-default-prediction.git
cd loan-default-prediction
```

### 2️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

### 3️⃣ Run Flask Application

```bash
cd app
python app.py
```

### 4️⃣ Open in Browser

```
http://127.0.0.1:5000/
```

---

## 📊 Results & Conclusion

* The project successfully predicts loan default risk with good performance.
* Handling class imbalance using appropriate metrics improved model evaluation.
* Random Forest provided strong predictive power, while Logistic Regression offered interpretability.
* The Flask-based UI demonstrates real-world deployment of an ML model.

---

## 🚀 Future Enhancements

* Add hyperparameter tuning
* Implement advanced imbalance handling techniques (SMOTE)
* Deploy application on cloud platforms (Render / Railway)
* Add dashboard-style visualization for model metrics

---

## 👨‍🎓 Author

**Vraj Nakum**
B.Tech CSE, Darshan University
Aspiring ML & Web Developer
"# Machine-Learning-Loan-Default-" 
"# Machine-Learning-Loan-Default-" 
"# Machine-Learning-Loan-Default-" 
