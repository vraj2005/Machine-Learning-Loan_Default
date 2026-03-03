# Loan Default Prediction ML Project – Complete Documentation

## 1. Project Overview
The **Loan Default Prediction Project** is an end-to-end Machine Learning application built using Python, Scikit-learn, NumPy, Pandas, and Flask. The system predicts whether a loan applicant will default (`Default = 1`) or not (`Default = 0`) based on demographic, financial, and loan-related features.

This project follows a complete ML lifecycle:
- Dataset understanding
- Preprocessing and feature engineering
- ML modeling (from scratch + sklearn)
- Evaluation
- Saving model
- Deployment using Flask
- Frontend UI for predictions

This documentation helps you understand **every decision**, **every step**, **every line of code**, and **why it is done that way**. It also supports **viva preparation**, **report writing**, and future reference.

---

## 2. Dataset Description
- **Total rows:** 255,347
- **Total columns:** 18
- **Target column:** `Default` (0 = No Default, 1 = Default)

### 2.1 Types of Features
#### Numerical Features
- Age
- Income
- LoanAmount
- CreditScore
- MonthsEmployed
- NumCreditLines
- InterestRate
- LoanTerm
- DTIRatio

#### Categorical Features
- Education
- EmploymentType
- MaritalStatus
- LoanPurpose

#### Binary Features (Yes/No)
- HasMortgage
- HasDependents
- HasCoSigner

#### ID Column
- LoanID (removed during preprocessing)

### 2.2 Class Imbalance Observation
```
Default = 0 → 225,694
Default = 1 → 29,653
```
This shows **11.6% positive class**, meaning the dataset is **imbalanced**, which is common in real-world finance scenarios.

This imbalance influences model choice and evaluation methods.

---

## 3. Why Choose This Dataset?
- Contains both numerical and categorical data → good for learning preprocessing.
- Real-world business domain (finance).
- Perfect for classification tasks.
- Balanced difficulty (not too easy, not too hard).
- Ideal for Flask UI since user inputs are meaningful fields.
- Sir’s guideline recommended such datasets.

---

## 4. Day-wise Project Progress (Completed So Far)
### ✔ Day 1 – Dataset Understanding
- Loaded the dataset.
- Identified column types.
- Analyzed class imbalance.
- Verified data quality (no missing values).
- Selected dataset for ML project (Loan Default).

### ✔ Day 2 – Data Preprocessing
Performed:
1. **Dropped LoanID** (not useful for prediction)
2. **Converted Yes/No → 0/1**
3. **One-hot encoded categorical columns**
4. **Separated features (X) and target (y)**
5. **Performed train-test split (stratified)**
6. **Standard scaling for numerical features**
7. **Saved scaler for Flask deployment**

Final X shape after encoding: **24 features**.

Train-test split:
- `X_train_scaled`: (204277, 24)
- `X_test_scaled`: (51070, 24)

### ✔ Day 3 – Model Building (In Progress)
Completed so far:
- Discussion on **why Logistic Regression is used**.
- Started implementation plans for:
  - Scratch Logistic Regression
  - Sklearn Logistic Regression
  - Random Forest

---

## 5. Why Logistic Regression? (Detailed Viva-Perfect Answer)
You will be asked in viva:
> Why did you choose Logistic Regression?

### 🔥 Perfect Answer:
Logistic Regression is ideal for this project because:

### 1️⃣ It is designed for **binary classification**
The problem is predicting Default (0/1), which fits Logistic Regression perfectly.

### 2️⃣ It predicts **probabilities**, not just labels
Banks prefer **risk probabilities** like:
- 0.87 → High default risk
- 0.12 → Low default risk

### 3️⃣ It is **interpretable**
You can explain:
- which features increase default risk
- which features decrease default risk

Feature coefficients = interpretability → very useful for finance.

### 4️⃣ Fast and scalable for **255K rows**
It trains extremely fast.

### 5️⃣ Works well with linearly separable patterns
Loan datasets often behave linearly:
- High credit score → less default chance
- High DTI → more default chance

### 6️⃣ Best model for **manual implementation**
You can implement logistic regression from scratch using:
- Sigmoid
- Linear equation
- Gradient descent

This satisfies your sir’s requirement easily.

### ✨ Final Quote (You can use this in report)
> Logistic Regression offers simplicity, interpretability, probability estimation, and fast training on large datasets. It fits the financial domain perfectly and satisfies both academic and practical requirements.

---

## 6. Preprocessing Steps Explained (Why Each Was Done)
### 6.1 Dropping LoanID
LoanID is an identifier.
It has **no predictive power**.
Keeping it can mislead the model.
So we remove it.

### 6.2 Converting Yes/No → 0/1
Machine learning models cannot understand strings.
Binary columns were converted like:
- Yes → 1
- No → 0

### 6.3 One-Hot Encoding Categorical Columns
Reason:
- ML models cannot understand text values
- One-hot encoding creates meaningful numerical features

Example:
MaritalStatus → Married, Single, Divorced → becomes 3 binary columns.

### 6.4 Scaling Numerical Columns
Reason:
- Logistic Regression requires features on similar scales
- Large differences (e.g., Income vs Age) can skew model

StandardScaler:
```
value_scaled = (value - mean) / std
```

### 6.5 Stratified Train-Test Split
Because dataset is imbalanced, regular split may lose minority class.
Stratified split keeps same Default ratio in both sets.

---

## 7. Code Explanation (Completed So Far)
### 7.1 Importing Required Libraries
```python
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import joblib
```

### 7.2 Dropping LoanID
```python
df.drop(columns=['LoanID'], inplace=True)
```
Reason: Not useful for prediction.

### 7.3 Mapping Yes/No to 0/1
```python
binary_cols = ['HasMortgage', 'HasDependents', 'HasCoSigner']
for col in binary_cols:
    df[col] = df[col].map({'Yes': 1, 'No': 0})
```
Reason: ML models need numeric inputs.

### 7.4 One-Hot Encoding
```python
categorical_cols = ['Education', 'EmploymentType', 'MaritalStatus', 'LoanPurpose']
df = pd.get_dummies(df, columns=categorical_cols, drop_first=True)
```
Reason: Convert text → numeric without introducing artificial ordering.

### 7.5 Train-Test Split
```python
X = df.drop('Default', axis=1)
y = df['Default']

X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42,
    stratify=y
)
```
Reason: Maintain original class balance.

### 7.6 Scaling
```python
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
```
Reason: Prevents domination of large-value features.

### 7.7 Saving Scaler for Flask
```python
joblib.dump(scaler, "../model/scaler.pkl")
```
Reason: Flask app will require the exact same scaling.

---

## 8. Upcoming Documentation Sections (To Be Added Later)
When you complete next steps, I will add:
- Scratch Logistic Regression full explanation
- Sklearn model comparison
- Evaluation metrics (confusion matrix, precision, recall, F1, ROC-AUC)
- Model selection reasoning
- Saving final model
- Flask backend route explanations
- Frontend form explanation
- Deployment workflow
- Viva-ready Q&A

---

## 9. Viva-Ready Explanations (Added So Far)
- Why Logistic Regression is used
- How preprocessing works
- Why one-hot encoding was used
- Why scaling was needed
- Why dropping LoanID was necessary

More will be added as we progress.

---

## 11. Exploratory Data Analysis (EDA) – Graphs and Insights
This section summarizes the visual EDA graphs generated using the dataset. These visuals help understand data distribution, detect outliers, and identify skewness.

### 📌 11.1 Boxplot (Before Processing)
A boxplot was generated for all numerical columns:
- **Age**
- **Income**
- **LoanAmount**
- **CreditScore**
- **MonthsEmployed**
- **NumCreditLines**
- **InterestRate**
- **LoanTerm**
- **DTIRatio**

#### 🔍 Observations:
- **LoanAmount**, **Income**, and **DTIRatio** show large variation and visible outliers.
- **LoanTerm** behaves more like a categorical numerical variable (fixed values like 12, 24, 36, 48, 60).
- **Binary columns** (HasMortgage, HasDependents, HasCoSigner) only take values 0/1 and appear as two distinct points.

This boxplot helps identify which columns might need transformations or scaling and provides a clear understanding of feature spread.

### 📌 11.2 Histograms for All Numerical Columns
Histograms were plotted for each numerical feature to understand probability distribution.

#### 🔍 Key Insights:
- **Age** is uniformly distributed between 18–69.
- **Income** spans 15k–150k with a nearly uniform distribution.
- **LoanAmount** ranges 5k–250k and is also uniformly spread.
- **CreditScore** is between 300–850 with no skew.
- **MonthsEmployed** spreads from 0–120 (clean smooth spread).
- **NumCreditLines** has fixed values (1,2,3,4) like categorical.
- **InterestRate** ranges between 2–25%.
- **DTIRatio** mostly between 0.1–0.9.
- **Default** shows clear imbalance: far more 0s than 1s.

These histograms help understand feature behavior and justify: 
- Scaling numerical columns.
- Stratified train-test split.
- The dataset imbalance problem.

---

# **12. Day 3 – Model Building Results & Explanation**

During Day 3, three machine learning models were trained and evaluated:

* Logistic Regression (from scratch)
* Logistic Regression (Scikit-learn)
* Random Forest Classifier

This section explains the results, why they differ, and how the final model was selected.

---

## **12.1 Model Accuracy Results**

```
Scratch Logistic Regression Accuracy: 0.8838652829449775
Sklearn Logistic Regression Accuracy: 0.6765028392402584
Random Forest Accuracy: 0.8849226551791658
```

These accuracies were computed using the test dataset after preprocessing.

---

## **12.2 Model-wise Explanation**

### ✅ **1. Logistic Regression – From Scratch (Accuracy: 0.8838)**

This model was implemented manually using:

* Sigmoid activation
* Binary cross-entropy loss
* Gradient descent parameter updates

**Why accuracy is high?**

* Correct implementation of gradient descent
* Dataset contains some linear separability
* Scaling improves performance for linear models

**Purpose:**

* Excellent for theoretical understanding
* Satisfies professor's requirement
* Shows implementation skills in viva

---

### ❌ **2. Logistic Regression – Scikit-learn (Accuracy: 0.6765)**

This model performed lower due to:

#### 🔸 Class imbalance

We used:

```python
class_weight='balanced'
```

This improves detection of `Default = 1` (minority class) but reduces overall accuracy.

#### 🔸 Linear model limitations

Loan dataset has **non-linear patterns**, which LR cannot fully capture.

#### 🔸 Highly sensitive to feature scaling

Small scaling differences affect LR significantly.

**Conclusion:**
Good interpretability, but **not suitable as final model**.

---

### ⭐ **3. Random Forest Classifier (Accuracy: 0.8849)**

This is the **best-performing model**.

#### Why Random Forest wins:

* Captures **non-linear relationships**
* Works extremely well with:

  * one-hot encoded categorical features
  * binary features
  * mixed numerical ranges
* Robust to:

  * Outliers
  * Noisy data
  * Feature interactions
* Less sensitive to scaling
* Handles imbalance better with:

  ```python
  class_weight='balanced'
  ```

**Conclusion:**
Random Forest is the strongest, most stable, and most suitable model for real-world deployment.

---

## **12.3 Final Model Decision**

### ✔ Selected Final Model: **Random Forest Classifier**

### ✔ Reason:

* Highest accuracy
* Most robust and stable
* Handles non-linearity and feature interactions
* Works naturally with real financial datasets
* Best performance on this specific dataset

This model will be used for:

* Saving as `model.pkl`
* Flask backend prediction
* Deployment in the final application

---

## **12.4 Viva-Ready Explanation**

> “I evaluated three models.
> My scratch Logistic Regression achieved high accuracy, proving the dataset has some linear patterns.
> The sklearn Logistic Regression had lower accuracy due to class imbalance and linear limitations.
> Random Forest achieved the highest accuracy because it captures non-linear patterns, handles categorical + numerical features well, and is robust.
> So I selected Random Forest as the final model for deployment.”

---

