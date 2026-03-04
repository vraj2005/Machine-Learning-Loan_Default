"use client";

import { useState } from "react";
import ResultCard from "@/components/ResultCard";

export default function LoanForm() {
  const [formData, setFormData] = useState({
    Age: "",
    Income: "",
    CreditScore: "",
    MonthsEmployed: "",
    LoanAmount: "",
    InterestRate: "",
    LoanTerm: "",
    DTIRatio: "",
    NumCreditLines: "",
    HasMortgage: "",
    HasDependents: "",
    HasCoSigner: "",
    Education: "",
    EmploymentType: "",
    MaritalStatus: "",
    LoanPurpose: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const toNumber = (value) => (value === "" ? 0 : Number(value));

  const presetPayloads = {
    "Very Low Risk": {
      Age: 38,
      Income: 65000,
      LoanAmount: 30000,
      CreditScore: 690,
      MonthsEmployed: 72,
      NumCreditLines: 4,
      InterestRate: 11,
      LoanTerm: 48,
      DTIRatio: 0.3,
      HasMortgage: 1,
      HasDependents: 1,
      HasCoSigner: 0,
      "Education_High School": false,
      "Education_Master's": true,
      Education_PhD: false,
      "EmploymentType_Part-time": false,
      "EmploymentType_Self-employed": false,
      EmploymentType_Unemployed: false,
      MaritalStatus_Married: true,
      MaritalStatus_Single: false,
      LoanPurpose_Business: false,
      LoanPurpose_Education: true,
      LoanPurpose_Home: false,
      LoanPurpose_Other: false,
    },
    "Low Risk": {
      Age: 34,
      Income: 42000,
      LoanAmount: 55000,
      CreditScore: 610,
      MonthsEmployed: 36,
      NumCreditLines: 3,
      InterestRate: 14.5,
      LoanTerm: 48,
      DTIRatio: 0.42,
      HasMortgage: 0,
      HasDependents: 1,
      HasCoSigner: 0,
      "Education_High School": true,
      "Education_Master's": false,
      Education_PhD: false,
      "EmploymentType_Part-time": true,
      "EmploymentType_Self-employed": false,
      EmploymentType_Unemployed: false,
      MaritalStatus_Married: false,
      MaritalStatus_Single: true,
      LoanPurpose_Business: false,
      LoanPurpose_Education: true,
      LoanPurpose_Home: false,
      LoanPurpose_Other: false,
    },
    "Moderate Risk": {
      Age: 27,
      Income: 25000,
      LoanAmount: 80000,
      CreditScore: 520,
      MonthsEmployed: 18,
      NumCreditLines: 2,
      InterestRate: 20,
      LoanTerm: 60,
      DTIRatio: 0.65,
      HasMortgage: 0,
      HasDependents: 1,
      HasCoSigner: 0,
      "Education_High School": true,
      "Education_Master's": false,
      Education_PhD: false,
      "EmploymentType_Part-time": false,
      "EmploymentType_Self-employed": true,
      EmploymentType_Unemployed: false,
      MaritalStatus_Married: false,
      MaritalStatus_Single: true,
      LoanPurpose_Business: true,
      LoanPurpose_Education: false,
      LoanPurpose_Home: false,
      LoanPurpose_Other: false,
    },
    "High Risk": {
      Age: 22,
      Income: 15000,
      LoanAmount: 120000,
      CreditScore: 410,
      MonthsEmployed: 4,
      NumCreditLines: 1,
      InterestRate: 25,
      LoanTerm: 72,
      DTIRatio: 0.85,
      HasMortgage: 0,
      HasDependents: 1,
      HasCoSigner: 0,
      "Education_High School": true,
      "Education_Master's": false,
      Education_PhD: false,
      "EmploymentType_Part-time": false,
      "EmploymentType_Self-employed": false,
      EmploymentType_Unemployed: true,
      MaritalStatus_Married: false,
      MaritalStatus_Single: true,
      LoanPurpose_Business: false,
      LoanPurpose_Education: false,
      LoanPurpose_Home: false,
      LoanPurpose_Other: true,
    },
    "Very High Risk": {
      Age: 22,
      Income: 15000,
      LoanAmount: 120000,
      CreditScore: 410,
      MonthsEmployed: 4,
      NumCreditLines: 1,
      InterestRate: 25,
      LoanTerm: 72,
      DTIRatio: 0.85,
      HasMortgage: 0,
      HasDependents: 1,
      HasCoSigner: 0,
      "Education_High School": true,
      "Education_Master's": false,
      Education_PhD: false,
      "EmploymentType_Part-time": false,
      "EmploymentType_Self-employed": false,
      EmploymentType_Unemployed: true,
      MaritalStatus_Married: false,
      MaritalStatus_Single: true,
      LoanPurpose_Business: false,
      LoanPurpose_Education: false,
      LoanPurpose_Home: false,
      LoanPurpose_Other: true,
    },
  };

  const mapPayloadToForm = (payload) => {
    const education = payload["Education_Master's"]
      ? "Master's"
      : payload.Education_PhD
      ? "PhD"
      : payload["Education_High School"]
      ? "High School"
      : "";

    const employment = payload["EmploymentType_Part-time"]
      ? "Part Time"
      : payload["EmploymentType_Self-employed"]
      ? "Self Employed"
      : payload.EmploymentType_Unemployed
      ? "Unemployed"
      : "Full Time";

    const marital = payload.MaritalStatus_Married
      ? "Married"
      : payload.MaritalStatus_Single
      ? "Single"
      : "";

    const purpose = payload.LoanPurpose_Business
      ? "Business"
      : payload.LoanPurpose_Education
      ? "Education"
      : payload.LoanPurpose_Home
      ? "Home"
      : payload.LoanPurpose_Other
      ? "Other"
      : "";

    return {
      Age: String(payload.Age ?? ""),
      Income: String(payload.Income ?? ""),
      CreditScore: String(payload.CreditScore ?? ""),
      MonthsEmployed: String(payload.MonthsEmployed ?? ""),
      LoanAmount: String(payload.LoanAmount ?? ""),
      InterestRate: String(payload.InterestRate ?? ""),
      LoanTerm: String(payload.LoanTerm ?? ""),
      DTIRatio: String(payload.DTIRatio ?? ""),
      NumCreditLines: String(payload.NumCreditLines ?? ""),
      HasMortgage: String(payload.HasMortgage ?? ""),
      HasDependents: String(payload.HasDependents ?? ""),
      HasCoSigner: String(payload.HasCoSigner ?? ""),
      Education: education,
      EmploymentType: employment,
      MaritalStatus: marital,
      LoanPurpose: purpose,
    };
  };

  const applyPreset = (label) => {
    const payload = presetPayloads[label];
    if (!payload) return;
    setFormData(mapPayloadToForm(payload));
    setResult(null);
    setError("");
  };

  const buildPayload = () => {
    const payload = {
      Age: toNumber(formData.Age),
      Income: toNumber(formData.Income),
      LoanAmount: toNumber(formData.LoanAmount),
      CreditScore: toNumber(formData.CreditScore),
      MonthsEmployed: toNumber(formData.MonthsEmployed),
      NumCreditLines: toNumber(formData.NumCreditLines),
      InterestRate: toNumber(formData.InterestRate),
      LoanTerm: toNumber(formData.LoanTerm),
      DTIRatio: toNumber(formData.DTIRatio),
      HasMortgage: Number(formData.HasMortgage),
      HasDependents: Number(formData.HasDependents),
      HasCoSigner: Number(formData.HasCoSigner),
      "Education_High School": formData.Education === "High School" ? 1 : 0,
      "Education_Master's": formData.Education === "Master's" ? 1 : 0,
      Education_PhD: formData.Education === "PhD" ? 1 : 0,
      "EmploymentType_Part-time":
        formData.EmploymentType === "Part Time" ? 1 : 0,
      "EmploymentType_Self-employed":
        formData.EmploymentType === "Self Employed" ? 1 : 0,
      EmploymentType_Unemployed:
        formData.EmploymentType === "Unemployed" ? 1 : 0,
      MaritalStatus_Married: formData.MaritalStatus === "Married" ? 1 : 0,
      MaritalStatus_Single: formData.MaritalStatus === "Single" ? 1 : 0,
      LoanPurpose_Business: formData.LoanPurpose === "Business" ? 1 : 0,
      LoanPurpose_Education: formData.LoanPurpose === "Education" ? 1 : 0,
      LoanPurpose_Home: formData.LoanPurpose === "Home" ? 1 : 0,
      LoanPurpose_Other: formData.LoanPurpose === "Other" ? 1 : 0,
    };

    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Prediction failed.");
      }
      setResult(data);
    } catch (err) {
      setResult(null);
      setError(err.message || "Unable to reach the prediction service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-24">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-soft)]">
            Prediction Console
          </p>
          <h2 className="font-display text-3xl text-[var(--text)]">
            Loan Risk Assessment
          </h2>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Fill in the borrower profile to generate a live default risk score.
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[color:var(--surface)]/70 px-4 py-3 text-xs text-[var(--text-muted)]">
          Powered by ML pipeline and risk signals
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {Object.keys(presetPayloads).map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => applyPreset(label)}
            className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[color:var(--surface)]/70 px-4 py-2 text-xs font-semibold text-[var(--text)] shadow-sm transition hover:-translate-y-0.5"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3Z" />
            </svg>
            {label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass-card glow-border rounded-3xl p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent)]/15">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-[var(--text-soft)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M4 20h16M6 16h12M8 12h8M10 8h4" />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-xl text-[var(--text)]">
                  Personal Financial Data
                </h3>
                <p className="text-xs text-[var(--text-soft)]">
                  Core borrower indicators
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { name: "Age", label: "Age" },
                { name: "Income", label: "Income" },
                { name: "CreditScore", label: "Credit Score" },
                { name: "MonthsEmployed", label: "Months Employed" },
              ].map((field) => (
                <label key={field.name} className="text-xs text-[var(--text-soft)]">
                  {field.label}
                  <input
                    type="number"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[color:var(--surface)]/70 px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
                    required
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="glass-card glow-border rounded-3xl p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent-strong)]/15">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-[var(--text-muted)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M3 7h18M5 7l2 10h10l2-10" />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-xl text-[var(--text)]">Loan Details</h3>
                <p className="text-xs text-[var(--text-soft)]">
                  Amounts, rates, and duration
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { name: "LoanAmount", label: "Loan Amount" },
                { name: "InterestRate", label: "Interest Rate" },
                { name: "LoanTerm", label: "Loan Term" },
                { name: "DTIRatio", label: "Debt-to-Income Ratio" },
                { name: "NumCreditLines", label: "Number of Credit Lines" },
              ].map((field) => (
                <label key={field.name} className="text-xs text-[var(--text-soft)]">
                  {field.label}
                  <input
                    type="number"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[color:var(--surface)]/70 px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
                    required
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="glass-card glow-border rounded-3xl p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent)]/15">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-[var(--text-muted)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M6 12h12M6 8h12M6 16h12" />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-lg text-[var(--text)]">Financial Status</h3>
                <p className="text-xs text-[var(--text-soft)]">Assets and obligations</p>
              </div>
            </div>
            {["HasMortgage", "HasDependents", "HasCoSigner"].map((field) => (
              <label key={field} className="mb-4 block text-xs text-[var(--text-soft)]">
                {field === "HasMortgage"
                  ? "Has Mortgage"
                  : field === "HasDependents"
                  ? "Has Dependents"
                  : "Has Co-Signer"}
                <select
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[color:var(--surface)]/70 px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
                >
                  <option value="">Select</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </label>
            ))}
          </div>

          <div className="glass-card glow-border rounded-3xl p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent-strong)]/15">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-[var(--text-muted)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M12 3v18M5 8h14M6 20h12" />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-lg text-[var(--text)]">Education</h3>
                <p className="text-xs text-[var(--text-soft)]">Highest qualification</p>
              </div>
            </div>
            <label className="block text-xs text-[var(--text-soft)]">
              Education Level
              <select
                name="Education"
                value={formData.Education}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[color:var(--surface)]/70 px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
              >
                <option value="">Select</option>
                <option>High School</option>
                <option>Master's</option>
                <option>PhD</option>
              </select>
            </label>
          </div>

          <div className="glass-card glow-border rounded-3xl p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent)]/15">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-[var(--text-muted)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M4 7h16v10H4z" />
                  <path d="M9 7V5h6v2" />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-lg text-[var(--text)]">Employment Type</h3>
                <p className="text-xs text-[var(--text-soft)]">Work status</p>
              </div>
            </div>
            <label className="block text-xs text-[var(--text-soft)]">
              Employment
              <select
                name="EmploymentType"
                value={formData.EmploymentType}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[color:var(--surface)]/70 px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
              >
                <option value="">Select</option>
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Self Employed</option>
                <option>Unemployed</option>
              </select>
            </label>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass-card glow-border rounded-3xl p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent-strong)]/15">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-[var(--text-muted)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M12 6v12M6 12h12" />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-lg text-[var(--text)]">Marital Status</h3>
                <p className="text-xs text-[var(--text-soft)]">Household context</p>
              </div>
            </div>
            <label className="block text-xs text-[var(--text-soft)]">
              Status
              <select
                name="MaritalStatus"
                value={formData.MaritalStatus}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[color:var(--surface)]/70 px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
              >
                <option value="">Select</option>
                <option>Married</option>
                <option>Single</option>
              </select>
            </label>
          </div>

          <div className="glass-card glow-border rounded-3xl p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent)]/15">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-[var(--text-muted)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M4 6h16v4H4z" />
                  <path d="M6 14h12v4H6z" />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-lg text-[var(--text)]">Loan Purpose</h3>
                <p className="text-xs text-[var(--text-soft)]">Intended usage</p>
              </div>
            </div>
            <label className="block text-xs text-[var(--text-soft)]">
              Purpose
              <select
                name="LoanPurpose"
                value={formData.LoanPurpose}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[color:var(--surface)]/70 px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
              >
                <option value="">Select</option>
                <option>Business</option>
                <option>Education</option>
                <option>Home</option>
                <option>Other</option>
              </select>
            </label>
          </div>
        </div>

        <div className="glass-card glow-border rounded-3xl p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-xl text-[var(--text)]">Run Prediction</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Submit to compute probability of default.
              </p>
            </div>
            <button
              type="submit"
              className="flex items-center gap-3 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-strong)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[color:var(--accent)]/30 transition hover:opacity-90 disabled:opacity-60"
              disabled={loading}
            >
              {loading && <span className="spinner" />}
              {loading ? "Running Prediction" : "Predict"}
            </button>
          </div>
          {error && (
            <p className="mt-4 rounded-2xl border border-[var(--danger)]/40 bg-[var(--danger)]/10 px-4 py-3 text-sm text-[var(--danger)]">
              {error}
            </p>
          )}
        </div>
      </form>

      <ResultCard result={result} />
    </section>
  );
}