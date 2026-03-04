"use client";

import { useState } from "react";

export default function LoanForm() {

  const [formData, setFormData] = useState({
    Age: "",
    Income: "",
    LoanAmount: "",
    CreditScore: "",
    MonthsEmployed: "",
    NumCreditLines: "",
    InterestRate: "",
    LoanTerm: "",
    DTIRatio: "",

    HasMortgage: 0,
    HasDependents: 0,
    HasCoSigner: 0,

    "Education_High School": false,
    "Education_Master's": false,
    "Education_PhD": false,

    "EmploymentType_Part-time": false,
    "EmploymentType_Self-employed": false,
    "EmploymentType_Unemployed": false,

    "MaritalStatus_Married": false,
    "MaritalStatus_Single": false,

    "LoanPurpose_Business": false,
    "LoanPurpose_Education": false,
    "LoanPurpose_Home": false,
    "LoanPurpose_Other": false
  });

  const [result, setResult] = useState(null);

  const handleNumberChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value)
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked
    });
  };

  const handleBinaryChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      setResult(data);

    } catch (error) {
      console.error("API error:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">

      <h2 className="text-2xl font-bold mb-4">
        Loan Default Prediction
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Numeric Fields */}
        {[
          "Age",
          "Income",
          "LoanAmount",
          "CreditScore",
          "MonthsEmployed",
          "NumCreditLines",
          "InterestRate",
          "LoanTerm",
          "DTIRatio"
        ].map((field) => (
          <input
            key={field}
            type="number"
            name={field}
            placeholder={field}
            onChange={handleNumberChange}
            className="w-full border p-2 rounded"
          />
        ))}

        {/* Binary Fields */}
        <div>
          <label>Has Mortgage</label>
          <select name="HasMortgage" onChange={handleBinaryChange} className="w-full border p-2 rounded">
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>

        <div>
          <label>Has Dependents</label>
          <select name="HasDependents" onChange={handleBinaryChange} className="w-full border p-2 rounded">
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>

        <div>
          <label>Has CoSigner</label>
          <select name="HasCoSigner" onChange={handleBinaryChange} className="w-full border p-2 rounded">
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>

        {/* Education */}
        <h3 className="font-semibold mt-4">Education</h3>
        {["Education_High School", "Education_Master's", "Education_PhD"].map((field) => (
          <label key={field} className="block">
            <input
              type="checkbox"
              name={field}
              onChange={handleCheckboxChange}
            /> {field}
          </label>
        ))}

        {/* Employment */}
        <h3 className="font-semibold mt-4">Employment Type</h3>
        {[
          "EmploymentType_Part-time",
          "EmploymentType_Self-employed",
          "EmploymentType_Unemployed"
        ].map((field) => (
          <label key={field} className="block">
            <input
              type="checkbox"
              name={field}
              onChange={handleCheckboxChange}
            /> {field}
          </label>
        ))}

        {/* Marital */}
        <h3 className="font-semibold mt-4">Marital Status</h3>
        {[
          "MaritalStatus_Married",
          "MaritalStatus_Single"
        ].map((field) => (
          <label key={field} className="block">
            <input
              type="checkbox"
              name={field}
              onChange={handleCheckboxChange}
            /> {field}
          </label>
        ))}

        {/* Loan Purpose */}
        <h3 className="font-semibold mt-4">Loan Purpose</h3>
        {[
          "LoanPurpose_Business",
          "LoanPurpose_Education",
          "LoanPurpose_Home",
          "LoanPurpose_Other"
        ].map((field) => (
          <label key={field} className="block">
            <input
              type="checkbox"
              name={field}
              onChange={handleCheckboxChange}
            /> {field}
          </label>
        ))}

        <button className="bg-blue-600 text-white w-full p-2 rounded mt-4">
          Predict
        </button>

      </form>

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <p>Prediction: {result.prediction === 1 ? "Default Risk" : "Safe"}</p>
          <p>Probability: {(result.probability * 100).toFixed(2)}%</p>
        </div>
      )}

    </div>
  );
}